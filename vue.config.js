// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseUrl = process.env.NODE_ENV === 'production' ? '/newmail-api/order/' : ''

function resolve(dir) {
    return path.join(__dirname, './', dir)
}
// 压缩js
const compress = new CompressionWebpackPlugin({
    filename: info => {
        return `${info.path}.gz${info.query}`
    },
    algorithm: 'gzip',
    threshold: 10240,
    test: new RegExp(
        '\\.(' + ['js'].join('|') +
        ')$'
    ),
    minRatio: 0.8,
    deleteOriginalAssets: false
})
module.exports = {
    assetsDir: 'assets',
    productionSourceMap: false,
    publicPath: './',
    lintOnSave: 'warning', // 是否开启编译时是否不符合eslint提示
    devServer: {
        host: '0.0.0.0', // 解决在局域网下无法访问
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/admin': {
                target: 'http://192.168.0.215:9527',
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': ''
                }
            },
            '/beosin': {
                target: 'https://trace.beosin.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/beosin': ''
                }
            }
        },
        before(app, server) {
            app.get(/.*.(js) | .*.*.(js)$/, (req, res, next) => {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');
                next();
            })
        }
    },
    // 压缩代码
    configureWebpack: {
        plugins: [compress]
    },
    // 配置
    chainWebpack: (config) => {
        // 修复HMR
        // config.resolve.symlinks(true);
        // 配置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('router', resolve('src/router'))
            .set('utils', resolve('src/utils'))
            .set('static', resolve('src/static'))
            .set('store', resolve('src/store'))
            .set('views', resolve('src/views'))
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        // config.optimization.splitChunks({
        //   chunks: 'all'
        // })
        if (process.env.NODE_ENV === 'production') {
            // 用cdn方式引入
            config.externals({
                'vue': 'Vue',
                // 'vuex': 'Vuex',
                // 'vue-router': 'VueRouter',
                // 'axios': 'axios'
            })
        }
        const fontsRule = config.module.rule('fonts');
        fontsRule.uses.clear()
        fontsRule.test(/\.(eot|ttf|TTF|woff|woff2?)$/)
        fontsRule.use('file-loader')
            .loader('url-loader')
            .options({
                fallback: {
                    loader: 'file-loader',
                    options: 'fonts/[name].[hash:8].[ext]'
                }
            })
        config.module
            .rule('svg')
            .exclude.add(resolve('src/components/common-components/svg-icon/icon'))
            .end()
        config.module
            .rule('icon')
            .test(/\.svg$/)
            .include.add(resolve('src/components/common-components/svg-icon/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
            .end()
    },
    // 引入全局变量
    css: {
        extract: true,
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                additionalData: `
               @import "@/assets/style/variable.scss";
               @import "@/assets/style/mixin.scss";
               @import "@/assets/style/common.scss";
               @import "@/assets/style/transition.scss";
              `
            }
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    }
}