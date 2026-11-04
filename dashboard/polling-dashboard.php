<?php
session_start();
require_once __DIR__ . '/../config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode([]);
    exit;
}

$users = supabase_get('users', '', '*', 'created_at.desc');
echo json_encode($users ?? []);
