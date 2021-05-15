/**
 * Ferramentas para diffs (Reversão e avisos)
 *
 * Em páginas de comparação de 2 edições, inclui atalhos de reverter e avisar o usuário.
 * @source [[:en:Wikipedia:WikiProject_User_scripts/Scripts/Revert_tools]]
 * @see [[WP:Scripts/Reversão e avisos]]
 * @see [[MediaWiki:Gadget-diffTools.js/buttonsList.js]]
 * @see [[MediaWiki:Gadget-diffTools.js/core.js]]
 * @author [[w:en:User:Lorian]]
 * @author Helder (https://github.com/he7d3r)
 * @author [[w:pt:User:!Silent]]
 */
/* jshint laxbreak: true */
/* global mediaWiki */

( function () {
'use strict';

if ( mw.config.get( 'wgNamespaceNumber' ) !== -1 && !!( mw.util.getParamValue( 'diff' ) || mw.util.getParamValue( 'oldid' ) ) ) {
	mw.loader.load( 'ext.gadget.diffToolsCore' );
}

}() );