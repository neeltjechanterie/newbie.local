<?php get_header();


$edit = true;
?>


<div class="navigation-toggle">
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
                       <a href="/baby">
                           <?php the_field('name_child', $current_id_var); ?>
                       </a>
                   </li>
                <?php endif; ?>
                <?php endif; ?>


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
<div class="hidden"><?php wp_editor( '', ''); ?></div>

<?php get_footer(); ?>
