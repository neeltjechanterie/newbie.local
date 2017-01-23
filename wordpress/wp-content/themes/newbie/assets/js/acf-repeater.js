jQuery( function( $ ) {

	//----------------------------------------
	// The magic
	//----------------------------------------

	$( document ).on( 'submit', '.editForm', function() {
		var _this  = $( this );
		var url    = _this.attr( 'action' );
		var method = _this.attr( 'method' );
		var data   = _this.serializeArray();
		var btn    = _this.find( 'button[type="submit"]' );
		var modal  = $( '#modalResponse' );

		if ( $( '#ag_wysiwyg_editor' ).length && typeof tinyMCE !== 'undefined' ) {
			data.push( { 
				name: 'fields[ag_wysiwyg_editor]', 
				value: tinyMCE.get( 'ag_wysiwyg_editor' ).getContent() 
			} );
		}

		btn.prop( { 'disabled' : true } );
        console.log(data);


            $.ajax( {
		    url: url,
		    method: method,
		    beforeSend: function ( xhr ) {
		        xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );
		    },
		    data: data,
		    dataType: 'json',
		} )
		.always( function ( data ) {
			btn.removeProp( 'disabled' );
			modal.find( '.modal-body' ).html( '<pre>' + url + method + JSON.stringify( data, null, "\t" ) + '</pre>' );
			modal.modal( 'show' );
		} );

		return false;
	} );


	//----------------------------------------
	// TAB: Content
	//----------------------------------------

	// TYPE: Image
	//----------------------------------------

	var mediaImage;

	$( '#acf-image-thumb' ).click( function() {
		var _this = $( this );

		if ( ! $.isFunction( wp.media ) ) {
			return;
		}

		if ( mediaImage ) {
			mediaImage.open();
			return;
		}

		mediaImage = wp.media( {
			library: {
				type: 'image'
			},
			multiple : false
		} );

		mediaImage.on( 'select', function() {
			var image = mediaImage.state().get( 'selection' ).first().toJSON();
			$( '.media-modal-close' ).trigger( 'click' );
			$( '#acf-image' ).val( image.id );
			_this.find( 'img' ).remove();
			$( '<img src="' + image.url + '" width="171">' ).insertAfter( _this.find( 'span' ) );
		} );

		mediaImage.open();

		return false;
	} );

	// TYPE: File URL
	//----------------------------------------
	
	var mediaFileUrl;
		//$( '#acf-file-url-btn' ).click( function() {

		$( document ).on( 'click', '#acf-file-url-btn', function() {
		var removeBtn = $( '#acf-file-url-remove-btn' );
		
		if ( ! $.isFunction( wp.media ) ) {
			return;
		}

		if ( mediaFileUrl ) {
			mediaFileUrl.open();
			return;
		}

		mediaFileUrl = wp.media( { 
			multiple: false 
		} );

		mediaFileUrl.on( 'select', function() {
			var file = mediaFileUrl.state().get( 'selection' ).first().toJSON();
			$( '.media-modal-close' ).trigger( 'click' );
			$( '#acf-file-url-id' ).val( file.id );
			$( '#acf-file-url' ).val( file.url );
			removeBtn.removeClass( 'hide' );
		} );

		mediaFileUrl.open();

		return false;
	} );

	$( '#acf-file-url-remove-btn' ).click( function() {
		$( this ).addClass( 'hide' );		
		$( '#acf-file-url-id' ).val( '' );
		$( '#acf-file-url' ).val( '' );

		return false;
	} );

	//----------------------------------------
	// TAB: Choice, Relational
	//----------------------------------------

	// TYPE: Checkbox, Relationship, Taxonomy
	//----------------------------------------

    //$( document ).on( 'each', '.check', function() {
	$( '.check' ).each( function() {
		var name = $( this ).attr( 'name' );

		$( '[name="' + name + '"]').change( function() {
			var _this   = $( this );
			var uncheck = _this.hasClass( 'uncheck' );
			var check   = _this.hasClass( 'check' );

			if ( uncheck ) {
				$( '[name="' + name + '[]"]').removeAttr( 'checked' );
				_this.attr( 'checked', 'checked' );
			} else if( check ) {
				$( '[name="' + name + '[]"]').attr( 'checked', 'checked' );
				$( '[name="' + name + '"]').removeAttr( 'checked' );
			}
		} );

		$( '[name="' + name + '[]"]').change( function() {
			if ( $( '[name="' + name + '[]"]:checked').length ) {
				$( '[name="' + name + '"]').removeAttr( 'checked' );
			} else {
				$( '[name="' + name + '"]').attr( 'checked', 'checked' );
			}
		} );
	} );

	//----------------------------------------
	// TAB: jQuery
	//----------------------------------------

	// TYPE: Date Picker
	//----------------------------------------
	// $.fn.datepicker.defaults.format = "yy-mm-dd";
	// $('.datepicker').datepicker({
	// 	format: 'yyyy-mm-dd',
	// 	autoclose: true
	// });
	$(".datepicker").datepicker({
		dateFormat: 'yy-mm-dd'
	});
	$(".date-pick").datepicker('setDate', new Date());

	if ( $.isFunction( $( '.datepicker' ).datepicker ) ) {
		$( '.datepicker' ).datepicker( {
			format: 'yyyy-mm-dd',
			autoclose: true
		} );		
	}

	// TYPE: Color Picker
	//----------------------------------------

	if ( $.isFunction( $( '.color-picker' ).colorpicker ) ) {
		$( '.color-picker' ).colorpicker().on( 'changeColor', function( ev ) {
			$( ev.currentTarget ).css( { 
				'background-color': ev.color.toHex() 
			} );
		} );
	}

	// TYPE: Google Map
	//----------------------------------------

	$( '.google-map' ).each( function() {
		var _this     = $( this );
		var searchFld = _this.find( '.google-map-search' );
		var latFld    = _this.find( '.google-map-lat' );
		var lngFld    = _this.find( '.google-map-lng' );
		var lat       = _this.data( 'lat' );
		var lng       = _this.data( 'lng' );
		var LatLng    = { lat : -22.932917, lng : -43.176016 };
		
		if ( lat && lng ) {
			LatLng = { lat : lat, lng : lng };
		}
		
		var map = new google.maps.Map( _this.find( '.map' )[0], {
			zoom 	  : 15,
			center 	  : new google.maps.LatLng( LatLng.lat, LatLng.lng ),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		} );
		
		var geocoder = new google.maps.Geocoder();
		var autocomplete = new google.maps.places.Autocomplete( searchFld[0] );
		
		autocomplete.map = map;
		autocomplete.bindTo( 'bounds', map );
		
		map.marker = new google.maps.Marker({
			position 	: LatLng,
			draggable	: true,
			raiseOnDrag	: true,
			map			: map
		});

		google.maps.event.addListener(autocomplete, 'place_changed', function( e ) {
			var place   = this.getPlace();

			if ( place.geometry ) {
				var lat     = place.geometry.location.lat();
				var lng     = place.geometry.location.lng();
				var latlng  = new google.maps.LatLng( lat, lng );

				map.marker.setPosition( latlng );
				map.marker.setVisible( true );
				map.marker.setAnimation( google.maps.Animation.DROP );
				map.setCenter( latlng );

				latFld.val( lat );
				lngFld.val( lng );
			}
		} );

		google.maps.event.addListener( map.marker, 'dragend', function() {
			var position = map.marker.getPosition();
			var lat      = position.lat();
			var lng      = position.lng();
			var latlng = new google.maps.LatLng( lat, lng );
			
			map.marker.setAnimation( google.maps.Animation.DROP );
			map.setCenter( latlng );

			geocoder.geocode( { 'latLng' : latlng }, function( results, status ) {
				if( status == google.maps.GeocoderStatus.OK && results.length ) {
					searchFld.val( results[0].formatted_address );
					latFld.val( lat );
					lngFld.val( lng );
				}
			} );
		} );
		
		$( '[href="#cnt-jquery"]' ).on( 'shown.bs.tab', function() {
			var center = map.getCenter();
			google.maps.event.trigger( map, 'resize' );
			map.setCenter( center );
		} );

	} );


	//----------------------------------------
	// TAB: Repeater
	//----------------------------------------

	// TYPE: Repeater
	//----------------------------------------

	var verifyItemsRepeater = function() {
		var removeRow = $( '.remove-row' );
		if ( $( '.item' ).length == 1 ) {
			removeRow.hide();
		} else {
			removeRow.show();
		}
	};

	verifyItemsRepeater();

	//ADD INPUT ROW
	$( document ).on( 'click', '.add-row', function() {
		var clone = $( '.item:last' ).clone();
		clone.find( 'input' ).val( '' );
        clone.find('[type=checkbox]').attr('checked', false).removeAttr('class');

		$( clone ).insertBefore( $( this ) );
		var newIndex = $( '.item' ).length - 1;

		$( '.item:last [name]' ).attr( 'name', function( index, name ) {
			return name.replace( /\d+/g, newIndex );
		} );
        $( '.item:last [id]' ).attr( 'id', function( index, id ) {
            return id.replace( /\d+/g, newIndex );
        } );
        $( '.item:last [for]' ).attr( 'for', function( index, e ) {
            return e.replace( /\d+/g, newIndex );
        } );
		console.log("new row");
		verifyItemsRepeater();
		return false;
	} );

	$( document ).on( 'click', '.remove-row', function() {
		var item = $( '.item' );
		if ( item.length == 1 ) {
			item.find( 'input' ).val( '' );
		} else {
			$( this ).closest( '.item' ).remove();
		}
		verifyItemsRepeater();
		return false;
	} );

	//ADD TABLE INPUT ROW
	$( document ).on( 'click', '.add-table-row', function() {
		var today = moment(new Date()).format("YYYY-MM-DD");
		var clone = $( '.table_item:first' ).clone();
		clone.find( 'input#today' ).val( today );
		clone.find( 'input#today' ).removeAttr('readonly');
		//clone.find( 'input#weight' ).prop("disabled", false);
		clone.find( 'input#weight' ).val( '' );
		clone.find( 'th' ).text( '' );

		$( clone ).insertBefore( $( '.table_item:first' ) );
		var newIndex = $( '.table_item' ).length;

		$( '.table_item:first [name]' ).attr( 'name', function( index, name ) {
			return name.replace( /\d+/g, newIndex );
		} );
		$( '.table_item:first [id]' ).attr( 'id', function( index, id ) {
			return id.replace( /\d+/g, newIndex );
		} );
		$( '.table_item:first [for]' ).attr( 'for', function( index, e ) {
			return e.replace( /\d+/g, newIndex );
		} );
		$( '.table_item:first th' ).append( newIndex );
		$( '.row-table-add-btn' ).hide();
		console.log("new row");
		console.log(today);
		verifyItemsRepeater();
		return false;
	} );




} );

