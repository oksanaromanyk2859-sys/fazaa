<?php
session_start();
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    exit;
}

$userId = intval($_SESSION['user_id']);

if (isset($_POST['action']) && $_POST['action'] === 'offline') {
    supabase_update('users', 'id=eq.' . $userId, [
        'is_online' => false,
        'updated_at' => date('Y-m-d H:i:s')
    ]);
} else {
    supabase_update('users', 'id=eq.' . $userId, [
        'is_online' => true,
        'last_input_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ]);
}
