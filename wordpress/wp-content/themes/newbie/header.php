<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo bloginfo( 'name' ); ?></title>

	<base href="/">

	<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri();?>/assets/img/apple-touch-icon.png">
	<link rel="icon" href="<?php echo get_stylesheet_directory_uri();?>/assets/img/favicon.png">

	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<?php echo get_stylesheet_directory_uri();?>/assets/img/win8-tile-icon.png">
	<?php wp_head(); ?>
	<link rel='stylesheet' id='style-css'  href='<?php echo get_stylesheet_directory_uri();?>/style.css' type='text/css' media='all' />
	<link rel='stylesheet' id='style-css'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/main.min.css' type='text/css' media='all' />

	<link rel='stylesheet' id='style-css-bootstrap'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap.css' type='text/css' media='all' />
	<link rel='stylesheet' id='style-css-grid-bootstrap'  href='<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap-grid.css' type='text/css' media='all' />
	<link rel='stylesheet' id='style-css-datepicker-bootstrap'  href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.min.css' type='text/css' media='all' />

	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
	<script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js'></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css">

	<script type='text/javascript' src='<?php echo get_stylesheet_directory_uri();?>/assets/js/main.js'></script>

	<?php wp_head(); ?>

</head>


<body <?php body_class(); ?>>