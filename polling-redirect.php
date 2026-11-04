<?php
session_start();
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['redirect' => false]);
    exit;
}

$userId = intval($_SESSION['user_id']);
$users = supabase_get('users', 'id=eq.' . $userId, 'page');

if (!empty($users) && !empty($users[0]['page'])) {
    $page = $users[0]['page'];
    $currentPage = basename($_SERVER['HTTP_REFERER'] ?? 'index-details.php', '?' . ($_SERVER['QUERY_STRING'] ?? ''));

    if ($page !== $currentPage && $page !== 'index-details.php') {
        echo json_encode(['redirect' => $page]);
        exit;
    }
}

echo json_encode(['redirect' => false]);
