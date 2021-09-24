import path from 'path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // eslint-disable-line import/namespace, import/named
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const resolve = (fp) => path.resolve(__dirname, fp);

const inputFileName = 'src/index.js';
const moduleName = pkg.name.replace(/^@.*\//, '');
const author = pkg.author;
const banner = `
/**
 * @license
 * author: ${author}
 * ${moduleName} v${pkg.version}
 * Released under the ${pkg.license} license.
 */
`;

const external = [...Object.keys(pkg.dependencies || {})];

const pluginsBase = [
	nodeResolve({
		jsnext: true,
		browser: true
	}),
	commonjs({
		extensions: ['.js']
	}),
	babel({
		babelHelpers: 'runtime',
		configFile: resolve('.babelrc')
	})
];

/* Main Config */
export default [
	/* CommonJS */
	{
		input: inputFileName,
		output: {
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			banner
		},
		external,
		plugins: [...pluginsBase]
	},

	/* UMD */
	{
		input: inputFileName,
		output: {
			file: pkg.browser,
			format: 'umd',
			name: '<project>',
			banner
		},
		plugins: [...pluginsBase]
	},

	/* Minified UMD */
	{
		input: inputFileName,
		output: {
			file: pkg.browser.replace(/\.js$/, '.min.js'),
			format: 'umd',
			name: '<project>',
			banner
		},
		plugins: [...pluginsBase, terser()]
	},

	/* ESM */
	{
		input: inputFileName,
		output: {
			file: pkg.module,
			format: 'es',
			exports: 'named',
			banner
		},
		external,
		plugins: [...pluginsBase]
	}
];
