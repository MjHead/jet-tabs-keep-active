<?php
/**
 * Plugin Name: JetTabs Keep Active
 * Plugin URI:
 * Description: Allow to keep selected item for JetTabs widgets after page reload. Just add CSS class 'keep-active' for the required widget.
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Jet_Tabs_Keep_Active {

	public function __construct() {
		add_action( 'elementor/frontend/after_register_scripts', array( $this, 'assets' ) );
	}

	public function assets() {

		if ( \Elementor\Plugin::instance()->preview->is_preview() ) {
			return;
		}

		wp_add_inline_script( 'elementor-frontend', $this->get_script() );

	}

	public function get_script() {
		ob_start();
		include trailingslashit( dirname( __FILE__ ) ) . 'script.js';
		return ob_get_clean();
	}

}

new Jet_Tabs_Keep_Active();
