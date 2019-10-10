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

# error  in ./node_modules/_vux@2.9.4@vux/src/components/v-chart/mixin.js
# vux2必须配合vux-loader使用, 在build/webpack.base.conf.js里参照如下代码进行配置：
const vuxLoader = require('vux-loader')
const webpackConfig = module.exports 

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})

# loader安装
cnpm install stylus-loader css-loader style-loader less-loader sass-loader --save-dev
cnpm install sass-loader --save
cnpm install node-sass --save
cnpm install less --save

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
# 1、页面权限，登录=》获取该用户权限列表=》根据权限列表生成能够访问的菜单=》点击菜单，进入页面
# 2、接口权限，到未登录页，拦截去登录页，登录后去目标页
# axios请求封装 请求前拦截，请求后拦截
# vuex
# 工具函数 utils.js filter
# 全局函数toast、全局组件、全局过滤器
# icon引入 全局样式变量 
在main.js中引入import './assets/icon/iconfont.css'，这样子就可以在vue项目中使用你下载的svg图标

在vue中可以写<span class="iconfont icon-right"></span>就可以正常显示iconfont图标，修改的时候只需要修改icon-right这个class就可以了，这个class名称可以在font class中看到

#vant引入
npm i vant -S
#自动按需引入组件 (推荐)
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
npm i babel-plugin-import -D
// 在.babelrc 中添加配置
{
  "plugins": ["transform-vue-jsx", "transform-runtime",
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
组件中引入
import { Swipe,SwipeItem,Button } from "vant"
    export default {
      components:{
         [Button.name]:Button,
         [Swipe.name]:Swipe,
         [SwipeItem.name]:SwipeItem
      },
        data () {
            return {
            }
        },
        methods: {}
    }
