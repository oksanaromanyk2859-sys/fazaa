<?php
session_start();
require_once __DIR__ . '/../config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['online_count' => 0, 'total_visits' => 0, 'online_users' => []]);
    exit;
}

$online_users = supabase_get('users', 'is_online=eq.true');
$online_count = is_array($online_users) ? count($online_users) : 0;

$visits = supabase_get('visits', '', 'id');
$total_visits = is_array($visits) ? count($visits) : 0;

$online_ids = [];
if (is_array($online_users)) {
    foreach ($online_users as $u) {
        $online_ids[] = $u['id'];
    }
}

echo json_encode([
    'online_count' => $online_count,
    'total_visits' => $total_visits,
    'online_users' => $online_ids
]);
