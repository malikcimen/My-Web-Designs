<?php include 'config/config.php'; ?>
<!doctype html>
<html lang="TR">

<head>
    <meta name="googlebot" content="noindex">
    <meta name="robots" content="noindex">
    <meta charset="utf-8">
    <title>Programming Languages II Project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="icon" type="image/x-icon" href="public/assets/img/favicon.png">
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/icon.css" rel="stylesheet">
    <link href="assets/css/theme.css?v=<?php echo substr(rand(),0,2) ?>" rel="stylesheet">
    <link href="assets/css/responsive.css?v=<?php echo substr(rand(),0,2) ?>" rel="stylesheet">
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>

<body style="background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(0,0,0,1) 100%); " class="">
    <header class="app-header navbar navbar-expand-lg" id="header">
        <div class="container">
            <a href="javascript:;" class="nav-link px-3 d-flex d-lg-none" data-toggle="modal" data-target="#mobile-menu">
                <i class="far fa-bars fa-lg"></i>
            </a>
            <a href="index" class="navbar-brand"><img src="assets/img/logo.png" ></a>
            <ul class="navbar-nav mr-auto d-none d-lg-flex">
                <li class="nav-item">
                    <a href="index" class="nav-link">
                        <span class="nav-text">Contact</span>
                    </a>
                </li>
            </ul>
        </div>
    </header>

     