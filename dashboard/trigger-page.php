<?php
session_start();
require_once __DIR__ . '/../config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$userId = $_POST['userId'] ?? null;
$page = $_POST['page'] ?? null;

if (!$userId || !$page) {
    echo json_encode(['success' => false, 'error' => 'Missing parameters']);
    exit;
}

$result = supabase_update('users', 'id=eq.' . intval($userId), [
    'page' => $page,
    'updated_at' => date('Y-m-d H:i:s')
]);

echo json_encode(['success' => true]);
