<?php
/**
 * Plugin Name:       Die Yield Calculator
 * Description:       Gutenberg block for embedding the SemiAnalysis die yield calculator React application in posts and pages.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.4
 * Author:            SemiAnalysis
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       die-yield-calculator-wp
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_die_yield_calculator_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_die_yield_calculator_block_init' );
