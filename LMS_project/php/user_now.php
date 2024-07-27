<?php
include_once "get_user.php";

$query = "";

$user = array(
    'username' => $username,
    'user_id' => $user_id,
    'user_role' => $user_role
);

echo json_encode($user);
