<?php
session_start();
require_once __DIR__ . '/../config.php';

if (!isset($_SESSION['admin_logged_in'])) {
    echo 'Unauthorized';
    exit;
}

$user_id = $_GET['user_id'] ?? null;
$status = $_GET['status'] ?? null;
$url = $_GET['url'] ?? null;

if ($user_id && $url) {
    supabase_update('users', 'id=eq.' . intval($user_id), [
        'page' => $url,
        'updated_at' => date('Y-m-d H:i:s')
    ]);
}

echo 'Record updated successfully!';
