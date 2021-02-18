

module.exports = {
    mode: "development",
    devtool:
        process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
    entry: {
        '1-simple-duration': './demos/1-simple-duration/index.ts',
        '2-simple-spring': './demos/2-simple-spring/index.ts',
    },
    output: {
        filename: '[name]/all.js',
        publicPath: '/demos/',
        path: __dirname + '/demos/',
    },
    devServer: {
        contentBase: './demos',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /build|lib|bower_components|node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'babel-loader',
                }, {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    }
                }]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};