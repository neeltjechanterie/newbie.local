<?php get_header();


$edit = true;
?>

<?php if ( ! is_user_logged_in() ) : ?>
    <header class="header" role="banner">
        <div class="header-inner clearfix">
            <p class="logo">
                Newbie
            </p>
        </div>
    </header>
    <div class="wrapper">
        <div class="content container  col-xs 12 col-md-6 offset-md-3">
            <h1>Hey Newbie!</h1>
                <p>Welkom op de Newbie zwangerschaps-webapp!</p>
                <p>Ben je zwanger? Dan is dit de ideale manier om jouw zwangerschap op de voet op te volgen.</p>
                <p>Klik <a href="/login" onclick='location.reload(true);'>hier</a> om een profiel aan te maken.</p>

            <a class="btn secondary" href="<?php echo wp_login_url( $redirect ); ?>">LOGIN</a>
            <br><br>
            <a class="btn secondary" href="<?php echo wp_login_url( $redirect ); ?>">REGISTREER</a>
        </div>
    </div>
<?php else : ?>
<div class="navigation-toggle" id="navigation">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-247 370.9 100 100"><path d="M-166.9 439.6h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2zm0-20.5h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2zm-60.2-16.9h60.3c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2h-60.3c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2z"/></svg>
</div>

<nav role="navigation" class="mobile-navigation clearfix">
    <ul id="menu-mobile-navigation" class="mobile-nav">
        <li><a href="#">Profiel</a>
            <ul>
                <li><a href="<?php echo site_url(); ?>">Jouw profiel <?php $current_user = wp_get_current_user();
                        echo $current_user->display_name; ?>
                    </a>
                </li>
                <?php
                $current_user = wp_get_current_user();
                $current_id = $current_user->ID;
                $current_id_var = "user_" . $current_id;

               if ( get_field('is_de_baby_geboren', $current_id_var) != '0') :
               if( get_field('name_child', $current_id_var) ): ?>
                   <li>
                       <a href="/child">
                           <?php the_field('name_child', $current_id_var); ?>
                       </a>
                   </li>
                <?php endif; ?>
                <?php endif; ?>


            </ul>
        </li>
        <li><a href="#">Tools</a>
            <ul>
                <li><a id="timer" href="/timer">Weeëntimer</a></li>
                <li><a id="checklist" href="/checklists">Checklists</a></li>
                <li><a id="albums" href="/albums">Albums</a></li>
                <li><a id="agenda" href="/agenda">Agenda</a></li>
                <li><a id="dagboek" href="/dagboek">Dagboek</a></li>
            </ul>
        </li>
        <li><a href="#">Help</a>
            <ul>
                <li><a id="tips" href="/tips">Tips &amp; Tricks</a>
                <li><a id="gids" href="/financieël">Financieël</a></li>
            </ul>
        </li>
        <li><a href="<?php echo wp_logout_url(); ?>">Logout</a></li>

    </ul>
</nav>
<div id="page" ng-app="app">
    <div ng-view></div>

<!--    <footer>
        &copy; <?php /*echo date( 'Y' ); */?>
    </footer>-->
</div>
<?php endif; ?>
<div class="hidden"><?php wp_editor( '', ''); ?></div>

<?php get_footer(); ?>
