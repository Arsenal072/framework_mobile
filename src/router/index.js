import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import store from '../store/index'
Vue.use(Router)
// 关闭loading
NProgress.configure({ showSpinner: false })// NProgress Configuration

const router = new Router({
    // mode: 'hash',
    routes: [
                {
                  path: '/login',
                  name: 'login',
                  meta: {
                    title: '登录注册',
                    requireAuth: false
                  },
                  component: () => import('../components/Login.vue')
                },
                {
                    path: '/main',
                    name: 'main',
                    meta: {
                        title: 'U宝',
                        requireAuth: true
                    },
                    component: () => import('../views/Main.vue'),
                    children: [
                        {
                            path: '/guidance',
                            name: 'guidance',
                            meta: {
                                title: '智能导诊',
                                requireAuth: true
                            },
                            component: () => import('../views/Guidance.vue'),
                        }, 
                        {
                            path: '/askingDisease',
                            name: 'askingDisease',
                            meta: {
                                title: '智能问病',
                                requireAuth: true
                            },
                            component: () => import('../views/AskingDisease.vue'),
                        },
                        {
                            path: '/drugInquiry',
                            name: 'drugInquiry',
                            meta: {
                                title: '药物查询',
                                requireAuth: true
                            },
                            component: () => import('../views/DrugInquiry.vue'),
                        }
                    ]
                },  
                {
                    path: '/feedback',
                    name: 'feedback',
                    meta: {
                        title: '意见反馈',
                        requireAuth: true
                    },
                    component: () => import('../views/Feedback.vue'),
                },              
                {
                    path: '*',
                    name: '404',
                    meta: {
                        title: '404',
                        requireAuth: false
                    },
                    component: () => import('../views/NotFound.vue')
                },
                {
                    path: '/',
                    redirect: '/main'
                },
            ]
})

const whiteList = ['/login', '*']

//路由钩子
router.beforeEach((to, from, next) => {
    NProgress.start()
    // if(to.meta.requireAuth==true){
    //     next({
    //         path: '/login'
    //     })
    // }else{
        next()
    // }
    document.title = to.meta.title || ''
})

//路由钩子 --- 进入后： 回到顶部
router.afterEach(() => {
    NProgress.done()
    window.scrollTo(0, 0)
})

export default router

    // // 已登录
    // if(Object.keys(store.getters.userInfo).length){
    //     next()
    // }else{
    //     // 未登录 白名单
    //     if(whiteList.indexOf(to.path)>-1){
    //         next()
    //     }else{
    //         next(`/login?redirect=${to.path}`)
    //     }
    // }