<?php

$edit = true;

if ( $edit ) {
	global $post;

	$url     = 'http://newbie.local/wp-json/acf/v2/checklists/';
	//$post    = get_post( $post_id );

	//setup_postdata( $post );
} else {
	$url = 'http://newbie.local/wp-json/wp/v2/checklists';
}

?>




<form action="{{url}}" method="<?php echo $edit ? 'PUT' : 'POST'; ?>" class="editForm">
	<header class="header" role="banner">
		<div class="header-inner clearfix">
			<p class="logo">
				{{checklist.title.rendered}}
			</p>


		</div>
	</header>
	<div class="sub-header clearfix ">
		<div class="row">
			<!--<a href="#" class="pull-left col-xs-2 col-lg-1"><i class="icons icon-arrow-left"> </i></a>-->
			<div class="pull-left col-xs-2 col-lg-1 subnav-btn"><button ng-click="deletePost(checklist.id)"><i class="icon icon-trash"></i></button>
			</div>
			<p class="col-xs-8 col-lg-10">
				{{checklist.title.rendered}}
			</p>
			<div class="pull-right col-xs-2 col-lg-1 subnav-btn"> <button type="submit"><i class="icon icon-pencil"></i></button> </div>

			<!--<pre>You are currently on page {{currentPage}}</pre>
			<ul uib-pager total-items="totalItems" ng-model="currentPage"></ul>-->
			<!--<a href="#" class="col-xs-2 col-lg-1"><i class="icons icon-arrow-right"> </i></a>-->

		</div>
	</div>



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




			<div class="wrapper">
				<div class="content container">

					<div class="clearfix row" role="main">
						<div class="col-xs-12">
							<div class="list-group checklist repeater">
								<div ng-repeat="item in checklist.acf.ag_repeater_checklist">
									<div class="item">
										<!-- true / false checkbox changed -->
										<?php if (isset($_POST['fields[ag_repeater_checklist][<?php echo absint( $k ); ?>][ag_true_false]'])) {
											echo "checked!";
										}
										?>
										<div class="form-group list-group-item">
												<!-- true / false -->
											<input type="checkbox" id="fields[ag_repeater_checklist][{{$index}}][ag_checklist_item]" name="fields[ag_repeater_checklist][{{$index}}][ag_true_false]" checked="{{item.ag_true_false}}" value="{{item.ag_true_false}}" ng-model="item.ag_true_false">
												<!-- name item -->
											<label for="fields[ag_repeater_checklist][{{$index}}][ag_checklist_item]">
												<input type="text" name="fields[ag_repeater_checklist][{{$index}}][ag_checklist_item]" class="form-control" value="{{item.ag_checklist_item}}">
											</label>
											<button type="button" class="remove-row btn"><i class="icon icon-trash"></i></button>

										</div>

										<div class="form-group hidden hide">
											<label for="acf-user">User</label>
											<select class="form-control input-sm" id="acf-user" name="fields[ag_repeater_checklist][{{$index}}][ag_user]">
												<option value="{{user.id}}" selected>{{user.nickname}}</option>
											</select>
										</div>
									</div>

								</div>
								<div ng-if="!checklist.acf.ag_repeater_checklist.length">
									<div class="item">
										<!-- true / false checkbox changed -->
										<div class="form-group list-group-item">
											<!-- true / false -->
											<input type="checkbox" id="fields[ag_repeater_checklist][0][ag_checklist_item]" name="fields[ag_repeater_checklist][0][ag_true_false]" checked="{{item.ag_true_false}}" value="false" ng-model="item.ag_true_false" class="ng-pristine ng-untouched ng-valid ng-empty">
											<!-- name item -->
											<label for="fields[ag_repeater_checklist][0][ag_checklist_item]">
												<input type="text" name="fields[ag_repeater_checklist][0][ag_checklist_item]" class="form-control" value="">
											</label>
											<button type="button" class="remove-row btn"><i class="icon icon-trash"></i></button>

										</div>

										<div class="form-group hidden hide">
											<label for="acf-user">User</label>
											<select class="form-control input-sm" id="acf-user" name="fields[ag_repeater_checklist][0][ag_user]">
												<option value="1" selected="" class="ng-binding">newbie_gebruiker</option>
											</select>
										</div>
									</div>
								</div>

								<a href="#" class="list-group-item add-row">
									<span class="plus-check icons icon-plus"></span>
									<p class="uncheck">Voeg nieuw item toe ...</p>
								</a>
						</div>
					</div>
				</div>
			</div>
		</div>
</form>








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

