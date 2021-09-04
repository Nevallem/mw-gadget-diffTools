/**
 * Ferramentas para diffs (Reversão e avisos)
 *
 * Em páginas de comparação de 2 edições, inclui atalhos de reverter e avisar o usuário.
 * @source [[:en:Wikipedia:WikiProject_User_scripts/Scripts/Revert_tools]]
 * @see [[WP:Scripts/Reversão e avisos]]
 * @see [[MediaWiki:Gadget-diffTools.js/buttonsList.js]]
 * @update 04/sep/2021
 * @author [[w:en:User:Lorian]]
 * @author Helder (https://github.com/he7d3r)
 * @author [[w:pt:User:!Silent]]
 */
/* jshint laxbreak: true */
/* global mw, $ */

( function () {
'use strict';

var df,
	api = new mw.Api();

function DiffTools() {
	/**
	 * User to be reverted ()
	 * @property {string} revertUser
	 */
	this.revertUser = ( $( '#mw-diff-ntitle2' ).find( 'a' ).first().html() || $( '#mw-revision-name' ).find( '.mw-userlink' ).html() ).replace( /<\/?bdi>/g, '' );

	/**
	 * Name of current page
	 * @property {string } pageName
	 */
	this.pageName = mw.config.get( 'wgPageName' ).replace( /_/g, ' ' );

	/**
	 * List of buttons
	 * @property {object}
	 */
	this.buttons = {};
}

/**
 * Reverts an edit
 *
 * @param {string} page
 * @param {string|number} oldid
 * @param {string} summary
*/
DiffTools.prototype.revert = function ( page, oldid, summary ) {
	mw.notify( $.parseHTML( df.message( 'df-getPageHistory', mw.util.getUrl( page ), page.replace( /_/g, ' ' ) ) ) );

	$.getJSON( mw.util.wikiScript( 'api' ), {
		'format': 'json',
		'action': 'query',
		'titles': page,
		'prop': 'revisions',
		'rvprop': 'user|content|ids',
		'rvstartid': oldid,
		'rvlimit': 1,
		'indexpageids': true
	} ).done( function ( data ) {
		var rev;

		if ( data.error !== undefined ) {
			mw.notify( df.message( 'df-error-API', data.error.code, data.error.info ) );
		} else if ( data.query && data.query.pages && data.query.pageids ) {
			rev = data.query.pages[ data.query.pageids[ 0 ] ];

			if ( rev.missing === '' ) {
				mw.notify( $( df.message( 'df-error-pageNotExist', mw.util.getUrl( page ), page ) ) );
			} else {
				rev = rev.revisions[ 0 ];

				df.editPage(
					page,
					rev[ '*' ],
					summary.replace( /\$1/g, rev.user )
						.replace( /\$2/g, df.revertUser )
						.replace( /\$3/g, rev.revid )
				);

				$( '.patrollink a' ).first().click();
			}
		} else {
			mw.notify( df.message( 'df-error-unknown' ) );
		}
	} ).fail( function () {
		mw.notify( df.message( 'df-error-ajaxFail-1' ) );
	} );
};

/**
 * Reverts an edit with a commentary
*/
DiffTools.prototype.revertWithComment = function () {
	var $commentary,
		buttons = {},
		initialRemaining = 492 - df.message( 'df-edit-summaryPrefix', df.revertUser ).length,
		remainingControl = function( e ) {
			if ( $.inArray( e.code, [ 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'NumpadDecimal' ] ) === -1
				&& !e.ctrlKey
				&& initialRemaining - $( this ).val().length <= 0
			) {
				e.preventDefault();
			}

			if ( $commentary.val().length > initialRemaining ) {
				$commentary.val( $commentary.val().substr( 0, initialRemaining ) );
			}

			$( '#df-dialog-remainingChar' ).text( df.message( 'df-dialog-remainingChar', initialRemaining - $( this ).val().length ) );
		};

	buttons[ df.message( 'df-OK' ) ] = function() {
		if ( $commentary.val() === '' ) {
			$commentary.addClass( 'df-fillField' );
			return;
		}

		df.revert(
			df.pageName,
			mw.util.getParamValue( 'oldid', $( '#mw-diff-otitle1' ).find( 'a' ).first().attr( 'href' ) ),
			df.message( 'df-edit-summaryPrefix', df.revertUser ) + ' (' + $commentary.val() + '),'
		);

		$( this ).dialog( 'close' );
	};

	buttons[ df.message( 'df-cancel' ) ] = function() {
		$( this ).dialog( 'close' );
	};

	df.dialog( {
		content:
			'<label>'
				+ df.message( 'df-dialog-commentary' ) + '<br />'
				+ '<textarea id="df-dialog-commentary" />'
			+ '</label>'
			+ '<div id="df-dialog-remainingChar">' + df.message( 'df-dialog-remainingChar', initialRemaining ) + '</div>',
		buttons: buttons
	} );

	$commentary = $( '#df-dialog-commentary' );
	$commentary.keydown( remainingControl );
	$commentary.keyup( remainingControl );
};

/**
 * Edits a page
 *
 * @param {string} page
 * @param {string} text
 * @param {string} summary
 * @param {string} [section]
*/
DiffTools.prototype.editPage = function ( page, text, summary, section ) {
	mw.notify( df.message( 'df-edit-preparing', page.replace( /_/g, ' ' ) ) );

	var data = {
		format: 'json',
		action: 'edit',
		minor: true,
		watchlist: 'nochange',
		title: page,
		text: text,
		summary: summary,
		tags: 'diff-tools',
		token: mw.user.tokens.get( 'csrfToken' ),
		done: {
			success: function ( data ) {
				mw.notify(
					$( df.message(
						'df-edit-success',
						page.replace( /_/g, ' ' ),
						mw.util.getUrl( page, {
							diff: data.newrevid
						} ),
						mw.util.getUrl( page )
					) )
				);
			},
			apiError: function () {
				mw.notify( df.message( 'df-error-requestFail' ) );
			}
		}
	};

	if ( section === 'new' ) {
		data.appendtext = '\n\n' + text;
		data.text = '';
	}

	api.editPage( data ).fail( function () {
		mw.notify( df.message( 'df-error-ajaxFail-2' ) );
	} );
};

/**
 * @object df Instance of DiffTools
 */
df = new DiffTools();

/**
 * Messages
 * @see [[mw:ResourceLoader/Default_modules#mediaWiki.message]]
 * @return {string}
 */
df.message = function ( /*name[, $1[, $2[, ... $N ]]]*/ ) {
	return mw.message.apply( this, arguments ).plain();
};

/**
 * Creates a dialog
 * @param {jQuery.dialog} info Dialog info
 * @return {jQuery}
 */
df.dialog = function ( info ) {
	var $dfDialog = $( '<div class="df-dialog" class="ui-widget"></div>' ).append( info.content );

	if ( !info.modal ) {
		info.modal = true;
	}

	if ( !info.buttons ) {
		info.buttons = {
			'OK': function () {
				$( this ).dialog( 'close' );
			}
		};
	}

	$.extend( info, {
		title: df.message( 'df-diffTools' ),
		height: 'auto',
		width: 'auto',
		open: function () {
			$( '.ui-dialog-titlebar-close' ).hide();
		},
		close: function () {
			$dfDialog.dialog( 'destroy' ).remove();
		}
	} );

	return $dfDialog.dialog( info );
};

/**
 * Sets the links (buttons)
 *
 * @param {string} text
 * @param {string} data
 * @param {string} action
 * @return {jQuery}
*/
df.setLink = function ( text, data, action ) {
	var $link = $( '<a href="#" title="' + data.desc + '">' + text + '</a>' );

	if ( typeof data.url === 'string' ) {
		$link.attr( 'href', data.url );
	} else {
		$link.click( function ( event ) {
			event.preventDefault(); // avoid jumping to the top (href=#)

			if ( typeof data.url === 'function' ) {
				data.url();
			} else if ( action === 'revert') {
				df.revert(
					mw.config.get( 'wgPageName' ),
					mw.util.getParamValue(
						'oldid',
						$( '#mw-diff-otitle1' ).find( 'a' ).first().attr( 'href' )
					),
					data.sum
				);
			} else {
				// edit user talk
				df.editPage(
					mw.config.get( 'wgFormattedNamespaces' )[ 3 ] + ':' + df.revertUser,
					'{' + '{subst:' + data.subst + '}} ~~' + '~~',
					data.sum, // = section title
					'new'
				);
			}
		} );
	}

	return $link;
};

/**
 * Inserts additional tools on diff pages
 */
df.run = function () {
	var $liSection, $ulSubSections, $ulItems, $liSubSection,
		$ulSections = $( '<ul></ul>' );

	$.each( df.buttons, function ( section, list ) {
		$liSection = $( '<li class="diff-tools-section"></li>' );
		$ulSubSections = $( '<ul></ul>' );

		$.each( list, function ( subsection, sublist ) {
			$ulItems = $( '<ul></ul>' );
			$liSubSection = $( '<li class="diff-tools-subsection"></li>' );

			if ( subsection === 'description' ) {
				$liSection.prepend( sublist || '' );
			} else {
				$.each( sublist, function ( text, data ) {
					$ulItems.append(
						$( '<li></li>' ).append( df.setLink( text, data, section ) )
					);
				} );

				$liSubSection.append( $ulItems );
				$ulSubSections.append( $liSubSection );
			}
		} );

		$liSection.append( $ulSubSections );
		$ulSections.append( $liSection );
	} );

	$( '#contentSub' ).prepend(
		$( '<span id="diff-tools"></span>' ).append( $ulSections )
	);
};

window.diffTools = new DiffTools();

$.getScript( '//pt.wikipedia.org/w/index.php?title=MediaWiki:Gadget-diffTools.js/buttonsList.js&action=raw&ctype=text/javascript'  ).done( function () {
	df.buttons = window.diffTools.buttons;

	// Executes the script when page is ready
	$( df.run );
} );

}() );
