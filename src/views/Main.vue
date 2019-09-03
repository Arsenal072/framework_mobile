/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:43:22 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-03 16:24:34
 */
<!-- 主页 -->
<template>
    <div class="main-wrapper">
        <Header></Header>
        <Nav @nav="nav" :navList="navList"></Nav>
        <input-box @send='send' class="input-box"></input-box>
        <router-view class="nav-model"></router-view>
        <div class="bubble-box">
            <div v-for="(item, index) in arr" :key="index">
                <div v-if="item.type=='U'" class="left-box">
                    <span :class="['iconfont',`${item.icon}`]"></span>
                    <div class="left-bubble">
                        <span class="bubble-text">{{item.content.text}}</span>
                        <div v-if="item.content.linkList&&item.content.linkList.length">
                            <div class="link-list" v-for="(i, j) in item.content.linkList" :key="j">
                                <span @click="learnMore(i)">{{i}}</span>
                            </div>
                        </div>
                        <div v-if="item.content.diseaseInfo&&Object.keys(item.content.diseaseInfo).length">
                            <h3>{{item.content.diseaseInfo.title}}</h3>
                            <span>概述</span>
                            <p>{{item.content.diseaseInfo.detail}}</p>
                            <span>病因描述</span>
                            <p>{{item.content.diseaseInfo.cause}}</p>
                        </div>
                        <div v-if="item.content.medicineInfo&&Object.keys(item.content.medicineInfo).length">
                            <h3>{{item.content.medicineInfo.title}}</h3>
                            <span>药物名称</span>
                            <p>{{item.content.medicineInfo.detail}}</p>
                            <span>剂量</span>
                            <p>{{item.content.medicineInfo.cause}}</p>
                        </div>
                        <div v-if="item.content.departmentList&&item.content.departmentList.length">
                            <span>小U推荐您挂如下科室的号~</span>
                            <div v-for="k in item.content.departmentList" :key="k">
                                <span>{{k}}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else class="right-box">
                    <div class="right-bubble">{{item.content}}</div>
                    <span :class="['iconfont',`${item.icon}`]"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Nav from "../components/Nav";
import { autoResponse } from "../lib/autoResponse";

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
            arr: [],
            navItem: {}
        };
    },

    methods: {
        // 头部导航
        nav(item) {
            this.navItem = item;
            this.arr = [];
            this.$router.push(item.path);
            this._response(item, "");
        },
        // 发送
        send(inputText) {
            if (inputText != "") {
                this.arr.push({
                    type: "C",
                    icon: "icon-tubiao_guke",
                    content: inputText
                });
                this._response("", inputText);
            }
        },
        _response(item, inputText) {
            let obj = autoResponse(item, inputText);
            this.arr.push({
                type: "U",
                icon: "icon-customer",
                content: obj
            });
        },
        // 点击聊天，跳转
        learnMore(i) {
            console.log("i", i);
        }
    },
    created() {
        this.nav(this.navList[0]);
    }
};
</script>
<style lang='scss'>
.main-wrapper {
    width: 100%;
    .nav-model {
        margin-top: 180px;
    }
    .bubble-box {
        padding-bottom: 70px;
        z-index: 5;
        .left-box {
            margin-bottom: 20px;
            display: flex;
            align-items: flex-end;
            .iconfont {
                padding-left: 5px;
                font-size: 30px;
                color: #3978ff;
                line-height: 30px;
                font-weight: bold;
            }
            .left-bubble {
                display: inline-block;
                position: relative;
                left: 5px;
                width: 73%;
                background: #fff;
                color: #3978ff;
                border: 1px solid #3978ff;
                font-size: 16px;
                padding: 8px;
                -moz-border-radius: 12px;
                -webkit-border-radius: 12px;
                border-radius: 12px;
                .bubble-text {
                    color: #333;
                }
            }
        }
        .right-box {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-bottom: 30px;
            .right-bubble {
                display: inline-block;
                max-width: 74%;
                background: #3978ff;
                color: #fff;
                font-size: 16px;
                padding: 8px;
                -moz-border-radius: 12px;
                -webkit-border-radius: 12px;
                border-radius: 12px;
            }
            .iconfont {
                padding-right: 5px;
                padding-left: 5px;
                font-size: 30px;
                color: #3978ff;
                line-height: 30px;
                font-weight: bold;
            }
        }
    }
    .input-box {
        z-index: 10;
        background-color: #eee;
    }
}
</style>