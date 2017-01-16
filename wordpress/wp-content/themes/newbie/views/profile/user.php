<form action="{{url}}" method="PUT" class="editForm">
	<header class="header" role="banner">
		<div class="header-inner clearfix">
			<p class="logo">
				{{data.currentUser.name}}
			</p>
			<div class="pull-right col-xs-2 col-lg-1"> <button type="submit" class="btn"><i class="icon icon-pencil"></i></button> </div>

		</div>
	</header>

	<div class="wrapper">
		<div class="content container">

			<label for="acf-weight">Uitgerekende datum</label>
			<div class="input-group date" data-provide="datepicker">
				<input type="text" class="form-control datepicker" name="fields[due_date]" value="{{data.currentUser.acf.due_date}}" data-date-format="yyyy-mm-dd">
				<div class="input-group-addon">
					<span class="glyphicon glyphicon-th"></span>
				</div>
			</div>

			<div class="form-group">
				<label for="acf-weight">Gewicht mama</label>
				<input type="text" name="fields[weight]" value="{{data.currentUser.acf.weight}}" class="form-control" id="acf-weight">
			</div>
			<div ng-repeat="item in data.currentUser.acf.weight_statistics">
				<div class="item">

					<label for="fields[weight_statistics][{{$index}}][weight_date]">Current date</label>
					<div class="input-group date" data-provide="datepicker">
						<input type="text" class="form-control datepicker" name="fields[weight_statistics][{{$index}}][weight_date]" value="{{item.weight_date}}" data-date-format="yyyy-mm-dd">
						<div class="input-group-addon">
							<span class="glyphicon glyphicon-th"></span>
						</div>
					</div>

					<div class="form-group">
						<label for="fields[weight_statistics][{{$index}}][weight_number]">Current weight</label>
						<input type="text" name="fields[weight_statistics][{{$index}}][weight_number]" value="{{item.weight_number}}" class="form-control">
					</div>

				</div>

			</div>
			<a href="#" class="btn">
				<span class="plus-check icons icon-plus"> </span> Voeg nieuw item toe ...
			</a>
			<div class="form-group">
				<!-- true / false -->
				<input type="hidden" name="fields[is_de_baby_geboren]" value="0" />
				<input id="baby" ng-model="data.currentUser.acf.is_de_baby_geboren" type="checkbox" name="fields[is_de_baby_geboren]">
				<!-- name item -->
				<label for="baby">
					Is de baby al geboren?
				</label>


				<div class="check-element animate-show-hide" ng-show="data.currentUser.acf.is_de_baby_geboren" >
					<div class="form-group">
						<label for="acf-weight">Naam kind</label>
						<input type="text" name="fields[name_child]" value="{{data.currentUser.acf.name_child}}" class="form-control" id="acf-weight">
					</div>


					<label for="acf-weight">Geboortedatum kind</label>
					<div class="input-group date" data-provide="datepicker">
						<input type="text" class="form-control datepicker" name="fields[birthday_child]" value="{{data.currentUser.acf.birthday_child}}" data-date-format="yyyy/mm/dd">
						<div class="input-group-addon">
							<span class="glyphicon glyphicon-th"></span>
						</div>
					</div>

					<div class="form-group">
						<label for="acf-weight">Lengte kind</label>
						<input type="text" name="fields[length_child]" value="{{data.currentUser.acf.length_child}}" class="form-control" id="acf-weight">
					</div>

					<div class="form-group">
						<label for="acf-weight">Gewicht kind</label>
						<input type="text" name="fields[weight_child]" value="{{data.currentUser.acf.weight_child}}" class="form-control" id="acf-weight">
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

