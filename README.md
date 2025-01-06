# SemiAnalysis Die Yield Calculator WordPress block

WordPress Gutenberg block for embedding the SemiAnalysis Die Yield Calculator React application into posts and pages.

## Licensing
The SemiAnalysis Die Yield Calculator is 'source available', in that the code is made available here for you to view, submit issues and pull requests, and run locally on your own machine for personal (non-commercial) use, but SemiAnalysis maintains full ownership of the code, implementation, and assets. 

## Development

This repository is intended to be installed as a plugin in a WordPress environment. It should be cloned inside the `wp-content/plugins` and enabled using the Plugins panel in WP Admin.

Install dependencies using `npm install`.

This plugin was scaffolded using the [WordPress Create Block tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/). The following commands are therefore available:

```
$ npm start
Starts the build for development.

$ npm run build
Builds the code for production.

$ npm run format
Formats files.

$ npm run lint:css
Lints CSS files.

$ npm run lint:js
Lints JavaScript files.

$ npm run plugin-zip
Creates a zip file for a WordPress plugin.

$ npm run packages-update
Updates WordPress packages to the latest version.
```
For a list of all available commands, see the [WordPress documentation](https://github.com/WordPress/gutenberg/tree/HEAD/packages/scripts#available-scripts).

## Deployment

To deploy the calculator to the SemiAnalysis website, we must export and upload the plugin as a ZIP file.

1. First, bump the plugin version. This will ensure that the cache key for assets, such as JS and CSS files, is updated. To do this, update the version number in `die-yield-calculator.php` according to semantic version. You should also update the version number in `package.json` and `src/block.json` for consistency.
2. Export the plugin as a ZIP using the command `npm run plugin-zip`
3. In the WordPress Admin for the SemiAnalysis site, navigate to 'Plugins' -> 'Add New Plugin', then click 'Upload Plugin'. Upload the ZIP file you just exported and upload it. If the site already has an older version of the plugin installed, it will prompt you to replace it.
