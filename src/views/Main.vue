/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:43:22 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-14 21:03:02
 */
<!-- 主页 -->
<template>
    <div class="main-wrapper">
        <Header @selectChange="ageChange" :genderAndAge="genderAndAge"></Header>
        <Nav @nav="nav" :navList="navList"></Nav>
        <router-view class="nav-model"></router-view>
        <input-box @send='send' class="input-box"></input-box>
        <div class="bubble-box" v-chat-scroll="{always: false, smooth: true}">
            <div v-for="(item, index) in arr" :key="index">
                <div v-if="item.source&&item.source=='U'" class="left-box">
                    <!-- <span :class="['iconfont',`${item.icon}`]"></span> -->
                    <div class="left-bubble">
                        <span class="bubble-text" v-if='item.content&&item.content.text'>{{item.content.text}}</span>
                        <div v-if="item.recommendList&&item.recommendList.length" class="recommend-box">
                            <p v-for="(i, ind) in item.recommendList" :key="ind" class="recommend-item" @click="send(i.name)">{{i.name}}</p>
                            <p @click="nextPatch" class="next-patch">下一批</p>
                        </div>
                        <div v-if="item.diagnoseResult||item.diseaseList||item.drugList">
                            <div v-if="item.type==1">
                                <div class="top-box">
                                    <span>小U为你找到以下疾病</span>
                                    <span class="learn-more" v-if="item.diseaseList.length>3" @click="checkMoreDisease(item.diseaseList)">更多 ></span>
                                </div>
                                <div v-for="(i, ind) in item.diseaseList" :key="ind" @click="checkDetail(i)" :class="ind!=item.diseaseList.length-1?'disease-item':''" v-if="ind<3">
                                    <div class="disease-box">
                                        <div>
                                            <span class="iconfont icon-bingli"></span>
                                        </div>
                                        <div class="top-title">
                                            <span class="title big-title">{{i.name}}</span>
                                            <a :href="i.url" class="link">查看百科</a>
                                            <span class="desc">{{i.desc}}</span>
                                        </div>
                                    </div>
                                    <div class="item-bottom" v-if="i.cureDepartments.length&&ind<3">
                                        <span class="department-title">推荐科室:</span>
                                        <div class="department">
                                            <span v-for="(j, inde) in i.cureDepartments" :key="inde">{{j}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.type==2" class="drugList-box">
                                <div class="top-box">
                                    <span>小U为你找到以下药物</span>
                                    <span class="learn-more" @click="checkMoreDrug(item.drugList)" v-if="item.drugList.length>3">更多 ></span>
                                </div>
                                <div v-for="(i,ind) in item.drugList" :key="ind" v-if="ind<5" @click="checkDetail(i)" class="disease-item">
                                    <div class="disease-box">
                                        <!-- <div>
                                            <span class="iconfont icon-bingli"></span>
                                        </div> -->
                                        <div class="top-title">
                                            <span class="title big-title" @click="checkDrugDetail(i.url)">{{i.name}}</span>
                                            <a :href="i.url" class="link">查看百科</a>
                                            <!-- <span class="desc">{{i.desc}}</span> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.type==3" class="symptom-box">
                                <div class="top-box">
                                    <span>诊断结果</span>
                                </div>
                                <div class="detail-info">
                                    <span>{{item.diagnoseResult}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else>

                        </div>
                    </div>
                </div>
                <div v-else class="right-box">
                    <div class="right-bubble">{{item.content}}</div>
                    <!-- <span :class="['iconfont',`${item.icon}`]"></span> -->
                </div>
            </div>
        </div>
        <van-action-sheet v-model="show" title="您是否有以下伴随症状" :overlay="true" round class="action-sheet">
            <div class="symptom-item-box">
                <span v-for="(item,index) in symptomObj.symptomList" :key="index" :class="['symptom-item',isSelect==index?'selectSymptom':'']" @click="selectSymptom(symptomObj,item,index)" v-if="index<pageSize">{{item}}</span>
            </div>
            <div class="page-box" @click="nextPage">
                <span>以上都没有</span>
            </div>
        </van-action-sheet>

    </div>
</template>

<script>
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Nav from "../components/Nav";
import { autoResponse } from "../lib/autoResponse";
import {
    inquiry,
    querySymptomByPage,
    questionDiseaseBySymptoms,
    recommendQuestion,
    recommendDisease,
    recommendDrug
} from "../service/index";
import { Button, ActionSheet } from "vant";

export default {
    name: "Main",
    components: {
        Header,
        InputBox,
        Nav,
        [Button.name]: Button,
        [ActionSheet.name]: ActionSheet
    },
    data() {
        return {
            navList: [
                {
                    icon: "icon-zhineng",
                    type: "智能导诊",
                    path: "/guidance",
                    id: 0
                },
                {
                    icon: "icon-duihua",
                    type: "智能问病",
                    path: "/askingDisease",
                    id: 1
                },
                {
                    icon: "icon-yao",
                    type: "药物查询",
                    path: "drugInquiry",
                    id: 2
                },
                {
                    icon: "icon-fankui",
                    type: "意见反馈",
                    path: "/feedback",
                    id: 3
                }
            ],
            arr: [],
            navItem: {},
            age: 24,
            gender: "男",
            pageCount: 1,
            symptomId: "",
            inputText: "",
            offsetTop: 30,
            genderAndAge: {
                age: 24,
                gender: "男"
            },
            isSelect: -1,
            pageNum: 1,
            pageSize: 6,
            show: false,
            symptomObj: {}
        };
    },

    methods: {
        // 年龄性别变更
        ageChange(params) {
            this.age = params.age;
            this.gender = params.gender;
        },
        // 头部导航
        nav(item) {
            this.navItem = item;
            if (item.type != "意见反馈") {
                // this.$router.push(item.path);
                this._response(item, "");
            } else {
                window.location.href =
                    "http://res.zwjk.com/h5-test/open-application-front/prod/#/feedbackTypes?type=1&router=feedbackTypes&hospitalId=08adfbab-06f6-48df-9d3c-ed76e81bcb01&wechatConfigToken=f78c6ace-9942-4051-9d90-0c9ccab9f754&projectid=4933a927-fae0-4a77-8ead-dadf678af195&applicationId=3a385635-a88a-41a3-9ef7-a1254d1bg564";
            }
        },
        // 输入文本发送
        send(inputText) {
            this.inputText = inputText;
            if (inputText != "") {
                this.arr.push({
                    type: "C",
                    icon: "icon-tubiao_guke",
                    content: inputText
                });
                this.getHeight();
                this._getInquryType(inputText);
            }
        },
        // 自动应答
        _response(item, inputText) {
            let obj = autoResponse(item, inputText);
            this._queryRecommend(item.id).then(res => {
                this.arr.push({
                    source: "U",
                    icon: "icon-customer",
                    content: obj,
                    recommendList: res.data.data
                });
                this.getHeight();
            });
        },
        // 获取推荐
        _queryRecommend(id) {
            return new Promise((resolve, reject) => {
                if (id == 0) {
                    recommendQuestion().then(res => {
                        resolve(res);
                    });
                } else if (id == 1) {
                    recommendDisease().then(res => {
                        resolve(res);
                    });
                } else if (id == 2) {
                    recommendDrug().then(res => {
                        resolve(res);
                    });
                }
            });
        },
        // 下一批
        nextPatch() {
            this._queryRecommend(this.navItem.id).then(res => {
                let obj = autoResponse(this.navItem, '');
                this.arr[this.arr.length-1] = {
                    source: "U",
                    icon: "icon-customer",
                    content: obj,
                    recommendList: res.data.data
                }
                // this.arr.push({
                //     source: "U",
                //     icon: "icon-customer",
                //     content: obj,
                //     recommendList: res.data.data
                // });
                this.getHeight();
            });
        },
        // 问诊类型
        _getInquryType(inputValue) {
            let params = {
                inputText: inputValue,
                wechatConfigToken: 1
                // localStorage.getItem("wechatConfigToken")?localStorage.getItem("wechatConfigToken"):1
            };
            inquiry(params).then(res => {
                if (res.data.type == 3) {
                    this.show = true;
                    this.symptomObj = res.data;
                    this.$set(
                        this.symptomObj,
                        "symptomList",
                        this.symptomObj.selectSymptomList
                    );
                }
                this.arr.push(
                    Object.assign(res.data, {
                        source: "U"
                        // icon: "icon-customer"
                    })
                );
                localStorage.setItem("arr", JSON.stringify(this.arr));
                this.getHeight();
            });
        },
        // 查看更多疾病
        checkMoreDisease(diseaseList) {
            this.$router.push({
                path: "/moreDisease",
                query: {
                    diseaseList: diseaseList
                }
            });
        },
        // 查看疾病詳情
        checkDetail(item) {
            this.$router.push({
                path: "/diseaseDetail",
                query: {
                    diseaseObj: item
                }
            });
        },
        // 查看更多药物
        checkMoreDrug(drugList) {
            this.$router.push({
                path: "/moreDrug",
                query: {
                    drugList: drugList
                }
            });
        },
        // 查看药物详情
        checkDrugDetail(url) {
            window.location.href = url;
        },
        // 选择症状
        selectSymptom(symptomObj, item, index) {
            this.isSelect = index;
            this.symptomObj.currentSymptom.push(item);
            let params = {
                symptomNames: this.symptomObj.currentSymptom
            };
            questionDiseaseBySymptoms(params).then(res => {
                if (res.data.end) {
                    this.show = false;
                    this.arr.push(
                        Object.assign({
                            source: "U",
                            diseaseList: res.data.diseaseNodes,
                            type: 1,
                            diagnoseResult: "11"
                        })
                    );
                    localStorage.setItem("arr", JSON.stringify(this.arr));
                } else {
                    this.$set(
                        this.symptomObj,
                        "symptomList",
                        res.data.selectSymptomList
                    );
                }
            });
        },
        nextPage() {
            this.pageNum = this.pageNum + 1;
            let params = {
                uuid: this.symptomObj.uuid,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            querySymptomByPage(params).then(res => {
                this.symptomObj = res.data;
                this.$set(
                    this.symptomObj,
                    "symptomList",
                    this.symptomObj.symptomNames
                );
            });
        },
        // 获取高度
        getHeight() {
            let arr = document.getElementsByClassName("left-bubble");
            if (arr.length > 0) {
                let height = arr[arr.length - 1].offsetTop;
                this.offsetTop = this.offsetTop + height;
                let top = this.offsetTop ? this.offsetTop : height;
                window.scrollTo({
                    top: top - height,
                    behavior: "smooth"
                });
            }
        }
    },
    created() {
        this.nav(this.navList[0]);
        if (!localStorage.getItem("wechatConfigToken")) {
            localStorage.setItem(
                "wechatConfigToken",
                this.$route.query.wechatConfigToken
            );
        }
        if (
            localStorage.getItem("arr") &&
            Object.keys(localStorage.getItem("arr")).length
        ) {
            this.arr = JSON.parse(localStorage.getItem("arr"));
            this.getHeight();
        }
    }
};
</script>
<style lang='scss'>
.main-wrapper {
    width: 100%;
    .nav-model {
        padding-top: 180px;
    }
    .bubble-box {
        margin-bottom: 100px;
        z-index: 5;
        .left-box {
            margin-bottom: 15px;
            margin-left: 20px;
            display: flex;
            align-items: flex-end;
            .iconfont {
                padding-left: 5px;
                font-size: 35px;
                color: #3978ff;
                line-height: 30px;
                font-weight: bold;
            }
            .left-bubble {
                display: inline-block;
                position: relative;
                width: 94%;
                background: #fff;
                color: #333;
                font-size: 16px;
                -moz-border-radius: 12px;
                -webkit-border-radius: 12px;
                border-radius: 12px;
                // &::after {
                //     content: "";
                //     border: 8px solid #ffffff00;
                //     border-right: 8px solid #fff;
                //     position: absolute;
                //     top: 20px;
                //     left: -16px;
                // }
                .bubble-text {
                    display: block;
                    padding: 8px;
                    color: #333;
                }
                .recommend-box {
                    padding: 0 0 8px 8px;
                    .recommend-item {
                        color: #3978ff;
                        text-decoration: underline;
                    }
                    .next-patch{
                        text-align: right;
                        padding-right: 20px;
                        color: #3978ff;

                    }
                }

                .top-box {
                    padding: 8px;
                    border-radius: 12px 12px 0 0;
                    background-color: #3978ff;
                    color: #fff;
                    .learn-more {
                        float: right;
                        padding-right: 10px;
                        color: #fff;
                    }
                }
                .disease-box {
                    display: flex;
                    justify-content: space-between;
                    border-radius: 5px;
                    font-size: 15px;
                    overflow: hidden;
                    margin: 10px 0 0 0;
                    padding-bottom: 5px;
                    .iconfont {
                        line-height: 70px;
                    }
                    .top-title {
                        position: relative;
                        margin-left: 10px;
                        .big-title {
                            font-size: 16px;
                            display: inline;
                        }
                        .link {
                            position: absolute;
                            color: #3978ff;
                            text-decoration: underline;
                            padding-left: 10px;
                            font-size: 10px;
                            top: 5px;
                        }
                    }
                    .title {
                        font-size: 15px;
                        font-weight: bold;
                        text-align: center;
                    }
                    .desc {
                        display: inline-block;
                        height: 50px;
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
                .disease-item {
                    border-bottom: 2px solid #ddd;
                }
                .disease-item:nth-child(4) {
                    border-bottom: none;
                }
                .item-bottom {
                    margin-left: 10px;
                    .department-title {
                        font-weight: bold;
                    }
                    .department {
                        display: inline-block;
                        margin-bottom: 10px;
                        span {
                            padding-right: 10px;
                        }
                    }
                }
                .symptom-box {
                    .detail-info {
                        padding: 8px;
                        p {
                            font-weight: bold;
                            padding: 5px 0px 0 0;
                        }
                    }
                }
                .drugList-box {
                    .disease-box {
                        display: inline-block;
                        padding: 8px 0px;
                    }
                    .disease-item:nth-child(4) {
                        border-bottom: 2px solid #ddd;
                    }
                    .disease-item:nth-child(6) {
                        border-bottom: none;
                    }
                    .link {
                        position: static !important;
                        font-size: 14px !important;
                    }
                }
            }
        }
        .right-box {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-bottom: 15px;
            margin-right: 20px;
            position: relative;
            .right-bubble {
                display: inline-block;
                max-width: 90%;
                background: #3978ff;
                color: #fff;
                font-size: 16px;
                padding: 8px;
                -moz-border-radius: 12px;
                -webkit-border-radius: 12px;
                border-radius: 12px;
                &::after {
                    content: "";
                    border: 8px solid #ffffff00;
                    border-left: 8px solid #3978ff;
                    position: absolute;
                    top: 15px;
                    right: -16px;
                }
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
        background-color: #fff;
    }
    .action-sheet {
        padding-bottom: 10px;
        .symptom-item-box {
            display: flex;
            padding: 0 10px;
            padding-top: 10px;
            flex-wrap: wrap;
            justify-content: space-between;
            .symptom-item {
                display: inline-block;
                border: 1px solid #3978ff;
                border-radius: 5px;
                padding: 3px 8px;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .selectSymptom {
                background-color: #3978ff;
                color: #fff;
            }
        }
        .page-box {
            text-align: right;
            color: #3978ff;
            text-decoration: underline;
            font-size: 14px;
            padding: 5px 10px 10px 0px;
        }
        // .van-action-sheet__close {
        //     display: none;
        // }
    }
}
</style>

