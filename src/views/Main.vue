/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:43:22 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-02 20:59:22
 */
<!-- 主页 -->
<template>
    <div class="main-wrapper">
        <Header></Header>
        <Nav @nav="nav" :navList="navList"></Nav>
        <input-box @send='send'></input-box>
        <router-view class="nav-model"></router-view>
        <div v-for="(item, index) in arr" :key="index" class="bubble-box">
            <div class="left-bubble" v-if="item.type=='U'">{{item.content}}</div>
            <div class="right-bubble" v-else>{{item.content}}</div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Nav from "../components/Nav";
export default {
    name: "Main",
    components: { Header, InputBox, Nav },

    data() {
        return {
            navList: [
                {
                    icon: "icon-zhineng",
                    type: "智能导诊",
                    path: "/guidance"
                },
                {
                    icon: "icon-duihua",
                    type: "智能问病",
                    path: "/askingDisease"
                },
                {
                    icon: "icon-yao",
                    type: "药物查询",
                    path: "drugInquiry"
                },
                {
                    icon: "icon-fankui",
                    type: "意见反馈",
                    path: "/feedback"
                }
            ],
            arr: []
        };
    },

    methods: {
        // 头部导航
        nav(path) {
            this.$router.push(path);
        },
        // 发送
        send(inputText) {
            if (inputText != "") {
                this.arr.push({
                    type: 'C',
                    content: inputText
                })
            }
        }
    },
    created() {
        this.arr.push({
            type: 'U',
            content: "Hi! 我时小U，可以给您提供智能导诊服务哦~"
        });
    }
};
</script>
<style lang='scss'>
.main-wrapper {
    width: 100%;
    .nav-model {
        margin-top: 180px;
    }
    .left-bubble{
        padding-bottom: 20px;
    }
    .right-bubble{
        clear: both;
        float: right;
        padding-bottom: 30px;
    }
    .bubble:after {
        content: "";
        position: absolute;
        right: 100%;
        top: 200px;
        width: 16px;
        height: 16px;
        border-width: 0;
        border-style: solid;
        border-color: transparent;
        border-bottom-width: 10px;
        border-bottom-color: currentColor;
        border-radius: 0 0 0 32px;
        color: #3978ff;
    }
}
</style>