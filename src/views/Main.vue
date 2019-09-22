/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:43:22 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-22 19:29:51
 */
<!-- 主页 -->
<template>
    <div class="main-wrapper">
        <Header @selectChange="ageChange"></Header>
        <Nav @nav="nav" :navList="navList"></Nav>
        <input-box @send='send' class="input-box"></input-box>
        <router-view class="nav-model"></router-view>
        <div class="bubble-box">
            <div v-for="(item, index) in arr" :key="index">
                <div v-if="item.source=='U'" class="left-box">
                    <span :class="['iconfont',`${item.icon}`]"></span>
                    <div class="left-bubble">
                        <span class="bubble-text" v-if='item.content&&item.content.text'>{{item.content.text}}</span>

                        <div v-if="item.type==1">
                            <div v-if="item.description=='diseaseList'">
                                <span class="bubble-text">{{item.tip}}</span>
                                <div v-for="(i ,j) in item.result" :key="j">
                                    <p @click="_getDiseaseDetail(i.id)" class="min-title">{{i.name}}</p>
                                </div>
                            </div>
                            <div v-else>
                                <p class="bubble-title">{{item.name}}</p>
                                <p class="min-title">概述</p>
                                <p v-html="item.introduction"></p>
                                <p class="min-title">病因描述</p>
                                <p>{{item.reasonDescription}}</p>
                                <p class="min-title">症状描述</p>
                                <p>{{item.symptomDescription}}</p>
                                <p class="recommendedDepartment">小U推荐您去
                                    <span class="min-title">{{item.className}}</span>
                                    挂号
                                </p>
                            </div>
                        </div>
                        <div v-if="item.type==2">
                            <div v-if="item.description=='medicineList'">
                                <span class="bubble-text">{{item.tip}}</span>
                                <div v-for="(i ,j) in item.result" :key="j">
                                    <p @click="_getMedicineDetail(i.id)" class="min-title">{{i.name}}</p>
                                </div>
                            </div>
                            <div v-if="item.description=='medicineDetail'">
                                <p class="bubble-title">{{item.showName}}</p>
                                <p class="min-title">药物名称：<span class="medicine-name">{{item.commonName}}</span></p>
                                <p class="min-title">剂量</p>
                                <p v-html="item.dosage"></p>
                                <p class="min-title">用法</p>
                                <p>{{item.indication}}</p>
                            </div>
                        </div>
                        <div v-if="item.type!=1&&item.type!=2">
                            <p class="bubble-text">{{item.tip}}</p>
                            <div v-if="item.description=='bodyList'">
                                <div v-for="(i,j) in item.bodyList" :key="j" class="body-item">
                                    <span @click="_getSymptomList(i.id)" class="min-title">{{i.name}}</span>
                                    <span v-if="j==item.bodyList.length&&item.pageCount!=pageCount" class="min-title" @click="nextPage(pageCount+1)">下一页</span>
                                    <!-- <p @click="_getSymptomList(i.id)" class="min-title">{{i.name}}</p> -->
                                </div>
                            </div>
                            <div v-if="item.description=='SymptomList'">
                                <div v-for="(i,j) in item.arr" :key="j">
                                    <span @click="_getCompanySymptom(i.id)" class="min-title">{{i.symptom}}</span>
                                </div>
                            </div>
                            <div v-if="item.description=='acompanySymptom'">
                                <div v-for="(i,j) in item.arr" :key="j">
                                    <span @click="_getDisease(i.id)" class="min-title">{{i.content}}</span>
                                </div>
                            </div>
                            <div v-if="item.description=='diseaseList'">
                                <div v-for="(i,j) in item.list" :key="j">
                                    <span class="min-title">{{i.name}}</span>
                                </div>
                                <p class="recommendedDepartment">小U推荐您去
                                    <span class="min-title">{{item.className}}</span>
                                    挂号
                                </p>
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
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Nav from "../components/Nav";
import { autoResponse } from "../lib/autoResponse";
import {
    queryCheckBodyList,
    querySymptomList,
    queryQuestionOptionList,
    queryType,
    queryDiseaseDetail,
    queryDisease,
    queryMedicineList,
    queryMedicineDetail
} from "../service/index";
export default {
    name: "Main",
    components: { Header, InputBox, Nav },

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
            inputText: ""
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
                // this.arr = [];
                this.$router.push(item.path);
                this._response(item, "");
            } else {
                this.$router.push("/feedback");
            }
        },
        // 发送
        send(inputText) {
            this.inputText = inputText;
            if (inputText != "") {
                this.arr.push({
                    type: "C",
                    icon: "icon-tubiao_guke",
                    content: inputText
                });
                this._getQueryType(inputText);
                // this._response("", inputText);
                // let ele = document.getElementsByClassName("bubble-box");
                // ele.scrollTop = ele.scrollHeight;
            }
        },
        // 自动应答
        _response(item, inputText) {
            let obj = autoResponse(item, inputText);
            this.arr.push({
                source: "U",
                icon: "icon-customer",
                content: obj
            });
        },
        // 点击聊天，跳转
        learnMore(i) {
            // this._response("", i);
            this.$router.push(i.path);
        },
        // 询问类型
        _getQueryType(inputText) {
            queryType({ inputContent: inputText }).then(res => {
                if (res.data.type == 1) {
                    this.arr.push(
                        Object.assign(res.data, {
                            source: "U",
                            icon: "icon-customer",
                            tip: "您是否查找以下疾病？",
                            description: "diseaseList"
                        })
                    );
                } else if (res.data.type == 2) {
                    this._getMedicineList().then(res => {
                        this.arr.push(
                            Object.assign(res.data, {
                                source: "U",
                                icon: "icon-customer",
                                tip: "您是否查找以下药物？",
                                description: "medicineList"
                            })
                        );
                    });
                }
                // else if (res.data.type == 3) {
                //     this.arr.push(
                //         Object.assign(rea.data, {
                //             source: "U",
                //             icon: "icon-customer",
                //             tip: "您是否患有以下症状？"
                //         })
                //     );}
                else {
                    this._getBodyList(this.pageCount).then(res => {
                        this.arr.push(
                            Object.assign(res.data, {
                                source: "U",
                                icon: "icon-customer",
                                tip: "您身体哪个部位不舒服?",
                                description: "bodyList"
                            })
                        );
                    });
                }
            });
        },
        _getDiseaseDetail(diseaseId) {
            queryDiseaseDetail({ diseaseId: diseaseId }).then(res => {
                this.arr.push(
                    Object.assign(res.data, {
                        source: "U",
                        icon: "icon-customer",
                        description: "diseaseDetail",
                        type: 1
                    })
                );
            });
        },
        _getBodyList(pageCount) {
            let params = {
                pageNum: pageCount,
                pageSize: 20
            };
            return new Promise((resolve, reject) => {
                queryCheckBodyList(params).then(res => {
                    resolve(res);
                });
            });
        },
        nextPage(pageCount) {
            this._getBodyList(pageCount).then(res => {
                this.arr.push(
                    Object.assign(res.data, {
                        source: "U",
                        icon: "icon-customer",
                        tip: "您身体哪个部位不舒服?",
                        description: "bodyList"
                    })
                );
            });
        },
        _getSymptomList(id) {
            let params = {
                pageNum: this.pageCount,
                pageSize: 10,
                age: this.age,
                gender: this.gender == "男" ? "M" : "F",
                bodyId: id
            };
            querySymptomList(params).then(res => {
                let arr = res.data.bodySymptomList.filter(item => {
                    return item.haveQuestion == 1;
                });
                this.arr.push(
                    Object.assign(
                        { arr },
                        {
                            source: "U",
                            icon: "icon-customer",
                            tip: "您是否患有以下症状？",
                            description: "SymptomList"
                        }
                    )
                );
            });
        },
        _getCompanySymptom(id) {
            this.symptomId = id;
            let params = {
                pageNum: this.pageCount,
                pageSize: 10,
                gender: this.gender == "男" ? "M" : "F",
                symptomId: id
            };
            queryQuestionOptionList(params).then(res => {
                let arr = [];
                res.data.list &&
                    res.data.list.forEach(item => {
                        item.list1 &&
                            item.list1.forEach(i => {
                                arr.push(i);
                            });
                    });
                this.arr.push(
                    Object.assign(
                        { arr },
                        {
                            source: "U",
                            icon: "icon-customer",
                            tip: "您是否伴随以下症状？",
                            description: "acompanySymptom"
                        }
                    )
                );
            });
        },
        // 获取疾病列表
        _getDisease(id) {
            let params = {
                age: this.age,
                gender: this.gender == "男" ? "M" : "F",
                symptomId: this.symptomId,
                optionId: id
            };
            queryDisease(params).then(res => {
                this.arr.push(
                    Object.assign(res.data, {
                        source: "U",
                        icon: "icon-customer",
                        tip: "您可能患有以下疾病",
                        description: "diseaseList"
                    })
                );
            });
        },
        // 问药
        _getMedicineList() {
            let params = {
                medicine: this.inputText
            };
            return new Promise((resolve, reject) => {
                queryMedicineList(params).then(res => {
                    resolve(res);
                });
            });
        },
        // 药物详情
        _getMedicineDetail(id) {
            let params = {
                medicineId: id
            };
            queryMedicineDetail(params).then(res => {
                this.arr.push(
                    Object.assign(res.data, {
                        source: "U",
                        icon: "icon-customer",
                        description: "medicineDetail",
                        type: 2
                    })
                );
            });
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
                color: #333;
                border: 1px solid #3978ff;
                font-size: 16px;
                padding: 8px;
                -moz-border-radius: 12px;
                -webkit-border-radius: 12px;
                border-radius: 12px;
                .bubble-text {
                    color: #333;
                }
                .body-item {
                    display: inline-block;
                    border: 1px solid #3978ff;
                    border-radius: 3px;
                    padding: 0 10px;
                    margin: 5px 5px;
                }
                .bubble-title {
                    font-weight: bold;
                    text-align: center;
                    color: #333;
                }
                .min-title {
                    color: #3978ff;
                    margin-top: 10px;
                    :first-child {
                        margin-top: 0px;
                    }
                }
                .medicine-name{
                    color: #333;
                }
                .recommendedDepartment {
                    padding-top: 10px;
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