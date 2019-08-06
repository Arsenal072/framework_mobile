# framework_mobile
移动端框架搭建
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 新建webpack项目
vue init webpack framework_mobile
vue install
# UI框架 vux安装 
cnpm install vux --save
# loader安装
cnpm install stylus-loader css-loader style-loader less-loader sass-loader --save-dev
cnpm install sass-loader --save
cnpm install node-sass --save
cnpm install less
# error  in ./node_modules/_vux@2.9.4@vux/src/components/v-chart/mixin.js
# vux2必须配合vux-loader使用, 在build/webpack.base.conf.js里参照如下代码进行配置：
const vuxLoader = require('vux-loader')
const webpackConfig = module.exports 

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
# flexible布局配置
# 1、cnpm install px2rem-loader  lib-flexible --save
# 2、在main.js中引入lib-flexible  
import 'lib-flexible/flexible.js'
# 3、在build下的 utils.js中，找到generateLoaders 方法，添加以下代码
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
    remUnit: 37.5
    }
}
 
function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader, px2remLoader]
    if (loader) {
        loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
        })
    })
}
webpack 
根据项目场景router，自动生成路由
axios请求封装 请求前拦截，请求后拦截
vuex