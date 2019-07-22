import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const config = min => ({
	input: './src/index.ts',
		output: {
			file: min
				? `dist/rxjs-web-animation.umd.min.js`
				: `dist/rxjs-web-animation.umd.js`,
			format: 'umd',
			name: 'rxjs-web-animation',
			sourcemap: true
		},
		plugins: [
			typescript({
				typescript: require('typescript')
			}),
			min && terser()
		]
});

export default [config(false), config(true)];