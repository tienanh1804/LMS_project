<?php
session_start();
if (isset($_SESSION['username']) && isset($_SESSION['user_id']) && isset($_SESSION['user_role'])) {
    $username = $_SESSION['username'];
    $user_id = $_SESSION['user_id'];
    $user_role = $_SESSION['user_role'];
} else {
    $_SESSION['username'] = $username = "Guest";
    $_SESSION['user_id'] = $user_id = 0;
    $_SESSION['user_role'] = $user_role = 2;
} 

