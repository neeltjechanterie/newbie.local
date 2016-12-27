<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( function_exists( "register_field_group" ) ) {
    register_field_group( array(
		'id' => 'acf_checklists_acf-to-rest-api',
		'title' => 'ACF to REST API',
		'fields' => array(
			array(
				'key' => 'field_4444444444ddd',
				'label' => 'Repeater',
				'name' => 'ag_repeater_checklist',
				'type' => 'repeater',
				'sub_fields' => array(
                    array(
                        'key' => 'field_1111111111aaa',
                        'label' => 'True False',
                        'name' => 'ag_true_false',
                        'type' => 'true_false',
                        'message' => '',
                        'default_value' => 0,
                        'column_width' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'formatting' => 'html',
                        'maxlength' => '',
                    ),
					array(
						'key' => 'field_2222222222bbb',
						'label' => 'Checklist item',
						'name' => 'ag_checklist_item',
						'type' => 'text',
						'column_width' => '',
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'formatting' => 'html',
						'maxlength' => '',
					),
                    array(
                        'key' => 'field_3333333333ccc',
                        'label' => 'User',
                        'name' => 'ag_user',
                        'type' => 'user',
                        'role' => array(
                            0 => 'all',
                        ),
                        'field_type' => 'select',
                        'allow_null' => 0,
                        'column_width' => '',
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'formatting' => 'html',
                        'maxlength' => '',
                    ),
				),
				'row_min' => '',
				'row_limit' => '',
				'layout' => 'table',
				'button_label' => 'Add Row',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'checklist',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array(
			'position' => 'normal',
			'layout' => 'no_box',
			'hide_on_screen' => array(
			),
		),
		'menu_order' => 0,
	) );
}
