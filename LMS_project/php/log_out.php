<?php 
session_start();
$_SESSION['username'] = "Guest";
$_SESSION['user_id'] = 0;
$_SESSION['role'] = "2";

echo 'Loged out!';