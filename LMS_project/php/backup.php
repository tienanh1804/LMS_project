<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_DBMS";

date_default_timezone_set("Asia/Ho_Chi_Minh");

$backupDir = "C:/xampp/htdocs/project_DBMS/LMS_project/Backup&Restore/$dbname";
if (!file_exists($backupDir)) {
    mkdir($backupDir);
}

$binlogDir = "C:/xampp/htdocs/project_DBMS/LMS_project/Backup&Restore/bin";

$backupFiles = glob($backupDir . "/*.sql");
$backupCount = count($backupFiles);

// Maximum number of backups to keep
$maxBackups = 7;

// Remove the furthest backup until there are only 6 backups left
while ($backupCount >= $maxBackups) {
    // Find the oldest backup file
    $oldestBackup = null;
    $oldestTime = PHP_INT_MAX;
    foreach ($backupFiles as $file) {
        $fileTime = filemtime($file);
        if ($fileTime < $oldestTime) {
            $oldestBackup = $file;
            $oldestTime = $fileTime;
        }
    }

    // Delete the oldest backup file
    if ($oldestBackup !== null && file_exists($oldestBackup)) {
        unlink($oldestBackup);
    }

    // Update the backup files array and count
    $backupFiles = glob($backupDir . "*.sql");
    $backupCount = count($backupFiles);
}
echo $backupCount;


$filename = $dbname . "_" . date("F_d_Y") . "@" . date("g_ia") . uniqid("_", false);
$folder = "\"C:/xampp/htdocs/project_DBMS/LMS_project/Backup&Restore/$dbname/" . $filename . ".sql\"";


$mysqldumpPath = "\"C:/Program Files/MySQL/MySQL Server 8.2/bin/mysqldump\"";
$configFile = "C:/xampp/htdocs/project_DBMS/LMS_project/my.cnf";

$command = "{$mysqldumpPath} --defaults-extra-file={$configFile} --host={$servername} --flush-logs {$dbname} --result-file={$folder}";

exec($command, $output);

print_r($output);
