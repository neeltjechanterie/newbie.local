<form action="{{url}}" method="PUT" class="editForm">
	<header class="header" role="banner">
		<div class="header-inner clearfix">
			<p class="logo">
				{{data.currentUser.name}}
			</p>
			<div class="navigation-edit-toggle pull-right">
				<button type="submit"><i class="icons icon-note"></i></button>
			</div>
		</div>
	</header>

	<div class="wrapper">
		<div class="content container  col-xs 12 col-md-6 offset-md-3">
			<h1>Profiel bewerken</h1>
			<label for="acf-due_date">Uitgerekende datum</label>
			<div class="input-group date" data-provide="datepicker">
				<input type="text" class="form-control datepicker group-addon" id="acf-due_date" name="fields[due_date]" value="{{data.currentUser.acf.due_date}}" data-date-format="yyyy-mm-dd">
				<div class="input-group-addon">
					<span class="icon icon-grid"></span>
				</div>
			</div>

			<!--<div class="form-group">
				<label for="acf-weight">Gewicht mama</label>
				<input type="text" id="weight" name="fields[weight]" value="{{data.currentUser.acf.weight}}" class="form-control" id="acf-weight">
			</div>-->
			<br>
			<div class="form-group">
				<!-- true / false -->
				<input type="hidden" name="fields[is_de_baby_geboren]" value="0" />
				<input id="baby" ng-model="data.currentUser.acf.is_de_baby_geboren" type="checkbox" name="fields[is_de_baby_geboren]">
				<!-- name item -->
				<label for="baby" class="baby">
					Is de baby al geboren?
				</label>


				<div class="check-element animate-show-hide" ng-show="data.currentUser.acf.is_de_baby_geboren" >
					<h3>Gefeliciteerd met jouw baby!</h3>
					<p>Vul onderstaande gegevens in om een profiel voor jouw baby aan te maken.</p>
					<label for="acf-weight">Naam baby</label>
					<div class="form-group">
						<input type="text" name="fields[name_child]" value="{{data.currentUser.acf.name_child}}" class="form-control" id="acf-weight">
					</div>


					<label for="acf-birthday_child">Geboortedatum kind</label>
					<div class="form-group input-group date" data-provide="datepicker">
						<input type="text" class="form-control datepicker group-addon" id="acf-birthday_child" name="fields[birthday_child]" value="{{data.currentUser.acf.birthday_child}}" data-date-format="yyyy/mm/dd">
						<div class="input-group-addon">
							<span class="icon icon-grid"></span>
						</div>
					</div>

					<label for="acf-weight">Lengte kind (in cm)</label>
					<div class="form-group">
						<input type="text" name="fields[length_child]" value="{{data.currentUser.acf.length_child}}" class="form-control" id="acf-weight">
					</div>

					<label for="acf-weight">Gewicht kind (in gram)</label>
					<div class="form-group">
						<input type="text" name="fields[weight_child]" value="{{data.currentUser.acf.weight_child}}" class="form-control" id="acf-weight">
					</div>
				</div>
			</div>
			<a href="{{baseUrl}}" class="btn secondary pull-left"><i class="icon icon-arrow-left"></i> Terug</a>
			<button type="submit" class="btn secondary pull-right">Opslaan</button>

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

