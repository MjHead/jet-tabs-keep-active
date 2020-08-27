( function( $ ) {

	"use strict";

	var $window = $( window );
	var dataKey = 'jet-tabs-status';

	var getData = function() {
		var data = window.localStorage.getItem( dataKey );

		if ( ! data ) {
			data = [];
		} else {
			data = JSON.parse( data );
		}

		return data;

	};
	var storeStatus = function( id, value, context ) {

		var data    = getData(),
			index   = false,
			newItem = {
				_id: id,
				value: value,
				context: context
			};

		for ( var i = 0; i < data.length; i++ ) {
			if ( data[ i ]._id && data[ i ]._id === id ) {
				index = i;
			}
		}

		// if remove and not found - do nothing
		if ( false === index && false === value ) {
			return;
		}

		if ( false === value ) {
			data.splice( index, 1 );
		} else if ( false === index ) {
			data.push( newItem );
		} else {
			data.splice( index, 1, newItem );
		}

		data = JSON.stringify( data );

		window.localStorage.setItem( dataKey, data );
	};

	$window.load( function() {

		var data = getData();

		console.log( data );

		if ( data && data.length ) {
			for ( var i = 0; i < data.length; i++ ) {

				var itemData = data[ i ],
					$item = $( '.elementor-widget[data-id="' + itemData._id + '"]' );

				if ( ! $item.length ) {
					continue;
				}

				switch ( itemData.context ) {

					case 'switcher':

						if ( 'enable' === itemData.value ) {
							var $target = $( '.jet-switcher', $item ).first(),
								$controlWrapper  = $( '.jet-switcher__control-wrapper', $target ).first(),
								$contentWrapper  = $( '.jet-switcher__content-wrapper', $target ).first(),
								$controlList = $( '> .jet-switcher__control-instance > .jet-switcher__control, > .jet-switcher__control', $controlWrapper ),
								$contentList = $( '> .jet-switcher__content', $contentWrapper ),
								$activeControl = $controlList.eq(1),
								$activeContent = $contentList.eq(1);

							$target.toggleClass( 'jet-switcher--disable jet-switcher--enable' );

							$contentList.removeClass( 'active-content' );
							$activeContent.addClass( 'active-content' );

							$controlList.attr( 'aria-expanded', 'false' );
							$activeControl.attr( 'aria-expanded', 'true' );

							$contentList.attr( 'aria-hidden', 'true' );
							$activeContent.attr( 'aria-hidden', 'false' );

						}

						break;
				}

			}
		}

	} );

	$window.on( 'jet-tabs/switcher/show-case-event/before', function( event, data ) {

		var $container = data.target.closest( '.elementor-widget-jet-switcher' );

		if ( ! $container.length || ! $container.hasClass( 'keep-active' ) ) {
			return;
		}

		if ( data.target.hasClass( 'jet-switcher--enable' ) ) {
			storeStatus( $container.data( 'id' ), 'enable', 'switcher' );
		} else {
			storeStatus( $container.data( 'id' ), false, 'switcher' );
		}

	} );

}( jQuery ) );
