<!DOCTYPE html>
<html>
<head>
    <base href="/">
    <title></title>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>

    <link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri();?>/assets/img/apple-touch-icon.png">
    <link rel="icon" href="<?php echo get_stylesheet_directory_uri();?>/assets/img/favicon.png">

    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?php echo get_stylesheet_directory_uri();?>/assets/img/win8-tile-icon.png">
    <?php wp_head(); ?>
    <link rel='stylesheet' id='style-css'  href='<?php echo get_stylesheet_directory_uri();?>/style.css' type='text/css' media='all' />
    <link rel='stylesheet' id='style-css'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/main.min.css' type='text/css' media='all' />

    <link rel='stylesheet' id='style-css-bootstrap'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap.css' type='text/css' media='all' />
    <link rel='stylesheet' id='style-css-grid-bootstrap'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap-grid.css' type='text/css' media='all' />


    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
    <script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js'></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css">

    <script type='text/javascript' src='<?php echo get_stylesheet_directory_uri();?>/assets/js/main.js'></script>
</head>
<body class="home page page-id-4 page-template page-template-page-home page-template-page-home-php">

<div class="navigation-toggle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-247 370.9 100 100"><path d="M-166.9 439.6h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2zm0-20.5h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2zm-60.2-16.9h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2z"/></svg>
</div>

<nav role="navigation" class="mobile-navigation clearfix">
    <ul id="menu-mobile-navigation" class="mobile-nav">
        <li><a href="#">Profiel</a>
            <ul>
                <li><a href="<?php echo site_url(); ?>">Jouw profiel</a></li>
                <li><a href="/baby">Naam kind</a></li>
            </ul>
        </li>
        <li><a href="#">Tools</a>
            <ul>
                <li><a href="/timer">Weeëntimer</a></li>
                <li><a href="/checklists">Checklists</a></li>
                <li><a href="/albums">Albums</a></li>
                <li><a href="/agenda">Agenda</a></li>
                <li><a href="/dagboek">Dagboek</a></li>
            </ul>
        </li>
        <li><a href="#">Help</a>
            <ul>
                <li><a href="/tips">Tips &amp; Tricks</a>
                <li><a href="/financieël">Financieël</a></li>
            </ul>
        </li>

    </ul>
</nav>

<div id="page" ng-app="app">
    <div ng-view></div>

<!--    <footer>
        &copy; <?php /*echo date( 'Y' ); */?>
    </footer>-->
</div>
<?php wp_footer(); ?>
<script type='text/javascript' src='<?php echo get_stylesheet_directory_uri();?>/assets/js/timer.js'></script>

<script type='text/javascript' src='<?php echo get_stylesheet_directory_uri();?>/assets/js/wp-embed.min.js'></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/assets/js/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>
<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-2.2.0.js"></script>
<!--<link href="//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
-->

</body>
</html>