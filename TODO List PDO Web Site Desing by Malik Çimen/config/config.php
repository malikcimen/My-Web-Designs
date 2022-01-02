<?php  
@session_start();
@ob_start();
require_once 'class.mysqli.php';
include 'function.php';
$dbh = new MysqliDb ('localhost', 'root', '', 'vize');
?>