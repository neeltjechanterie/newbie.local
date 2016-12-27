<?php

get_header();

$edit = true;

if ( $edit ) {
	global $post;

	$post_id = 9;
	$url     = site_url( 'wp-json/acf/v2/checklists/' ) . $post_id;
	$post    = get_post( $post_id );

	setup_postdata( $post );
} else {
	$url = site_url( 'wp-json/wp/v2/checklists' );
}

?>


<div class="container">


	<div class="row">

		<div class="col-lg-12">
			<div class="input-group">
				<span class="input-group-addon">Endpoint</span>
				<input type="text" class="form-control" value="<?php echo esc_url( $url ); ?>" readonly>
			</div>
		</div>

		<div class="col-lg-12">

			<form action="<?php echo esc_url( $url ); ?>" method="<?php echo $edit ? 'PUT' : 'POST'; ?>">

				<?php if( ! $edit ) : ?>
					<div class="form-group">
						<label for="acf-title">Title</label>
						<input type="text" name="title" class="form-control" id="acf-title">
					</div>

					<div class="form-group">
						<label for="acf-content">Content</label>
						<textarea name="content" class="form-control" rows="3"  id="acf-content"></textarea>
					</div>
				<?php endif; ?>



				<div role="tabpanel" class="tab-pane" id="cnt-repeater">
					<p class="bg-warning">You need to have the plugin <a href="http://www.advancedcustomfields.com/add-ons/repeater-field/" target="_blank">ACF Repeater Field</a>.</p>
					<!-- repeater -->
					<?php
					$repeater = get_field( 'ag_repeater_checklist' );
					if ( ! $repeater ) {
						$repeater = array(
							array(
								'ag_true_false' => '',
								'ag_checklist_item' => '',
								'ag_user'  => '',
							)
						);
					}
					?>
					<div class="repeater">
						<?php foreach ( $repeater as $k => $v ) : ?>
							<div class="item">
								<!-- true / false -->
								<?php $checked = get_field( 'ag_true_false' );
								$true = '';
								if ($v['ag_true_false'] != null) { $true = 'checked'; }?>
								<label>True / False</label>
								<div class="form-group">
									<label class="radio-inline">
										<input type="checkbox" name="fields[ag_repeater_checklist][<?php echo absint( $k ); ?>][ag_true_false]" <?php echo $true; ?> > Check
									</label>
									<?php if (isset($_POST['fields[ag_repeater_checklist][<?php echo absint( $k ); ?>][ag_true_false]'])) {
										echo "checked!";
									}
									?>
								</div>
								<div class="form-group">
									<label>Tekst</label>
									<input type="text" name="fields[ag_repeater_checklist][<?php echo absint( $k ); ?>][ag_checklist_item]" class="form-control" value="<?php echo esc_attr( $v['ag_checklist_item'] ); ?>">
								</div>

								<div class="form-group">
									<label for="acf-user">User</label>
									<select class="form-control input-sm" id="acf-user" name="fields[ag_repeater_checklist][<?php echo absint( $k ); ?>][ag_user]">
										<option value="">-- select --</option>
										<?php

										foreach ( (array) get_users() as $u ) :
											if ( isset( $user_ID ) ) {
												$selected = selected( $user_ID, $u->ID, false );
											} else {
												$selected = '';
											}
											?>
											<option value="<?php echo $u->ID; ?>" <?php echo esc_attr( $selected ); ?> ><?php echo $u->display_name; ?></option>
										<?php endforeach; ?>
									</select>
								</div>
								<button type="button" class="btn btn-danger remove-row">remove</button>
								<hr>
							</div>
						<?php endforeach; ?>
						<button type="button" class="btn btn-primary add-row">add row</button>
					</div>

				</div><!-- tab-pane -->


				<button type="submit" class="btn btn-success">Save</button>
			</form>
		</div><!-- /col-lg-12 -->
	</div>


</div> <!-- /container -->

<div class="modal fade" id="modalResponse" tabindex="-1" role="dialog" aria-labelledby="modalResponseLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalResponseLabel">Response</h4>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>

</body>
</html>