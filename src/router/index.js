import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

Vue.use(Router)
// 关闭loading
NProgress.configure({ showSpinner: false })// NProgress Configuration

const router = new Router({
    mode: 'hash',
    routes: [
                {
                    path: '/',
                    redirect: '/login'
                },
                {
                  path: '/login',
                  name: 'Login',
                  meta: {
                    title: '登录注册',
                    requireAuth: false
                  },
                  component: (resolve)=> require(['../components/Login.vue'], resolve)
                },
                {
                    path: '/main',
                    name: 'Main',
                    meta: {
                        title: '首页',
                        requireAuth: true
                    },
                    component: (resolve)=> require(['../views/Main.vue'], resolve)
                },                
                {
                    path: '*',
                    name: '404',
                    meta: {
                        title: '404',
                        requireAuth: false
                    },
                    component: (resolve)=> require(['../views/NotFound.vue'], resolve)
                }
            ]
})


//路由钩子
router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth){
        // 获取vuex用户登录信息
        NProgress.start()
        next({
            name: 'Login'
        })
    }{
        NProgress.start()
        next()
    }
    document.title = to.meta.title || ''
})

//路由钩子 --- 进入后： 回到顶部
router.afterEach(() => {
    NProgress.done()
    window.scrollTo(0, 0)
})
export default router