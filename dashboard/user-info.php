<?php
session_start();
require_once __DIR__ . '/../config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$id = intval($_GET['id'] ?? 0);
if ($id <= 0) {
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

$users = supabase_get('users', 'id=eq.' . $id);
if (!empty($users)) {
    echo json_encode($users[0]);
} else {
    echo json_encode(['error' => 'User not found']);
}
