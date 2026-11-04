<?php
session_start();
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 0, 'url' => '']);
    exit;
}

$userId = intval($_SESSION['user_id']);
$users = supabase_get('users', 'id=eq.' . $userId, 'page');

if (!empty($users) && !empty($users[0]['page'])) {
    $page = $users[0]['page'];
    if ($page !== 'wait-payment.php' && $page !== 's.php') {
        echo json_encode(['status' => 1, 'url' => $page]);
        exit;
    }
}

echo json_encode(['status' => 0, 'url' => '']);
