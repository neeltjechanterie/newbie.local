<form action="{{url}}" method="PUT" class="editForm">
	<header class="header" role="banner">
		<div class="header-inner clearfix">
			<p class="logo">
				{{data.currentUser.id}} - {{data.currentUser.name}} {{data.currentUser.email}}
			</p>
			<div class="pull-right col-xs-2 col-lg-1"> <button type="submit" class="btn"><i class="icon icon-pencil"></i></button> </div>


		</div>
	</header>

	<div class="wrapper">
		<div class="content container">

			<div class="form-group">
				<label for="acf-file-url">File URL</label>
				<input type="hidden" name="fields[profile_picture]" id="acf-file-url-id" value="{{data.currentUser.acf.profile_picture}}">
				<div class="input-group">
					<input type="text" class="form-control" id="acf-file-url" value="{{data.currentUser.acf.profile_picture}}" readonly>
					<span class="input-group-btn">
										<button type="button" class="btn btn-danger<?php //if( ! $file_id ): ?> hide<?php// endif; ?>" id="acf-file-url-remove-btn">&times;</button>
										<button type="button" class="btn btn-primary" id="acf-file-url-btn">Select file</button>
									</span>
				</div>
			</div>

			<button type="file" ngf-select="uploadFiles($file, $invalidFiles)"
					accept="image/*" ngf-max-height="1000" ngf-max-size="1MB">
				Select File</button>
			<br><br>
			File:
			<div >{{f.name}} {{errFile.name}} {{errFile.$error}} {{errFile.$errorParam}}
				<span class="progress" ng-show="f.progress >= 0">
          <div style="width:{{f.progress}}%"
			   ng-bind="f.progress + '%'"></div>
      </span>
			</div>
			{{errorMsg}}


			<div class="form-group">
				<label for="acf-weight">Text</label>
				<input type="text" name="fields[weight]" value="{{data.currentUser.acf.weight}}" class="form-control" id="acf-weight">
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

