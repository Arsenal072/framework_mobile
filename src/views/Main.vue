/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:43:22 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-24 11:22:14
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
                                <span class="bubble-text bold">{{item.tip}}</span>
                                <div v-for="(i ,j) in item.result" :key="j">
                                    <p @click="_getDiseaseDetail(i.id)" class="min-title">{{i.name}}</p>
                                </div>
                            </div>
                            <div v-else>
                                <p class="bubble-title">{{item.name}}</p>
                                <p class="min-title bold">概述</p>
                                <p v-html="item.introduction"></p>
                                <p class="min-title bold">病因描述</p>
                                <p>{{item.reasonDescription}}</p>
                                <p class="min-title bold">症状描述</p>
                                <p>{{item.symptomDescription}}</p>
                                <p class="min-title bold">推荐科室</p>
                                <div v-if="item.deptId">
                                    <p class="recommendedDepartment">小U推荐您去本院
                                        <span class="min-title">{{item.className}}</span>
                                        挂号
                                    </p>
                                    <div class="dept">
                                        <span>{{item.className}}</span>
                                        <span class="blue">挂号 ></span>
                                    </div>
                                </div>
                                <p class="recommendedDepartment" v-if="!item.deptId">小U推荐您去
                                    <span class="min-title">{{item.className}}</span>
                                    挂号，但本院没有开设这个科室
                                </p>
                                <p v-if="item.deptId" class="min-title bold">推荐医生</p>
                                <div v-if="item.deptId&&item.respArr.length" class="dorctor-list">
                                    <div v-for="(i,j) in item.respArr" :key="j" class="doctor-item">
                                        <div>
                                            <img :src="i.photo" alt="">
                                        </div>
                                        <div>
                                            <span>{{i.name}}</span>
                                            <span>{{i.position}}</span>
                                        </div>
                                        <div class="blue">
                                            挂号 >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.type==2">
                            <div v-if="item.description=='medicineList'">
                                <span class="bubble-text bold">{{item.tip}}</span>
                                <div v-for="(i ,j) in item.arr" :key="j">
                                    <p @click="_getMedicineDetail(i.id)" class="min-title">{{i.name}}</p>
                                </div>
                            </div>
                            <div v-if="item.description=='medicineDetail'">
                                <p class="bubble-title">{{item.showName}}</p>
                                <p class="min-title bold">药物名称：<span class="medicine-name">{{item.commonName}}</span></p>
                                <p class="min-title bold">剂量</p>
                                <p v-html="item.dosage"></p>
                                <p class="min-title bold">用法</p>
                                <p>{{item.indication}}</p>
                            </div>
                        </div>
                        <div v-if="item.type!=1&&item.type!=2">
                            <div v-if="item.type==3">
                                <p class="bubble-text bold">{{item.tip}}</p>
                                <div v-if="item.description=='bodyList'">
                                    <div v-for="(i,j) in item.bodyList" :key="j" class="body-item">
                                        <span @click="_getSymptomList(i.id)" class="min-title">{{i.name}}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.description=='SymptomList'">
                                <p class="bubble-text bold">{{item.tip}}</p>
                                <div v-for="(i,j) in item.arr" :key="j">
                                    <span @click="_getCompanySymptom(i.id)" class="min-title">{{i.symptom}}</span>
                                </div>
                            </div>
                            <div v-if="item.description=='acompanySymptom'">
                                <p class="bubble-text bold">{{item.tip}}</p>
                                <div v-for="(i,j) in item.arr" :key="j">
                                    <span @click="_getDisease(i.id)" class="min-title">{{i.content}}</span>
                                </div>
                            </div>
                            <div v-if="item.description=='diseaseList'">
                                <p class="bubble-text bold">{{item.tip}}</p>
                                <div v-for="(i,j) in item.list" :key="j">
                                    <span class="min-title">{{i.name}}</span>
                                </div>
                                <p class="min-title bold">推荐科室</p>
                                <div v-if="item.deptId">
                                    <p class="recommendedDepartment">小U推荐您去本院
                                        <span class="min-title">{{item.className}}</span>
                                        挂号
                                    </p>
                                    <p class="dept">
                                        <span>{{item.className}}</span>
                                        <span class="blue">挂号 ></span>
                                    </p>
                                </div>
                                <p class="recommendedDepartment" v-if="!item.deptId">小U推荐您去
                                    <span class="min-title">{{item.className}}</span>
                                    挂号，但本院没有开设这个科室
                                </p>
                                <p v-if="item.deptId" class="min-title bold">推荐医生</p>
                                <div v-if="item.deptId&&item.respArr.length" class="dorctor-list">
                                    <div v-for="(i,j) in item.respArr" :key="j" class="doctor-item">
                                        <div>
                                            <img :src="i.photo" alt="">
                                        </div>
                                        <div>
                                            <span>{{i.name}}</span>
                                            <span>{{i.position}}</span>
                                        </div>
                                        <div class="blue">
                                            挂号 >
                                        </div>
                                    </div>
                                </div>
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
    queryMedicineDetail,
    queryDeptName,
    queryDoctorList
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
            inputText: "",
            offsetTop: 0,
            wechatConfigToken: "795ce1e2-c86a-48cf-8e0b-6155dba93b40"
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
                // this.$router.push(item.path);
                this._response(item, "");
            } else {
                window.location.href =
                    "http://res.zwjk.com/h5-test/open-application-front/prod/#/feedbackTypes?type=1&router=feedbackTypes&hospitalId=08adfbab-06f6-48df-9d3c-ed76e81bcb01&wechatConfigToken=f78c6ace-9942-4051-9d90-0c9ccab9f754&projectid=4933a927-fae0-4a77-8ead-dadf678af195&applicationId=3a385635-a88a-41a3-9ef7-a1254d1bg564";
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
                this.getHeight();
                this._getQueryType(inputText);
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
            this.getHeight();
        },
        // 询问类型
        _getQueryType(inputText) {
            let params = {
                inputContent: inputText,
                age: this.age,
                gender: this.gender == "男" ? "M" : "F"
            };
            queryType(params).then(res => {
                if (res.data.type == 1) {
                    this.arr.push(
                        Object.assign(res.data, {
                            source: "U",
                            icon: "icon-customer",
                            tip: "您是否查找以下疾病？",
                            description: "diseaseList"
                        })
                    );
                    this.getHeight();
                } else if (res.data.type == 2) {
                    this._getMedicineList().then(res => {
                        let arr = res.data.result.filter((item,index)=>{
                            return index<20
                        })
                        this.arr.push(
                            Object.assign({ arr }, {
                                source: "U",
                                icon: "icon-customer",
                                tip: "您是否查找以下药物？",
                                description: "medicineList",
                                type: 2
                            })
                        );
                        this.getHeight();
                    });
                } else if(res.data.type == 3) {
                    this._getBodyList().then(res => {
                        this.arr.push(
                            Object.assign(res.data, {
                                source: "U",
                                icon: "icon-customer",
                                tip: "您身体哪个部位不舒服?",
                                description: "bodyList",
                                type: 3
                            })
                        );
                        this.getHeight();
                    });
                }else if (res.data.type == 4) {
                    let arr = res.data.result.bodySymptomList.filter(item => {
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
                    this.getHeight();
                } 
            });
        },
        // 疾病详情
        _getDiseaseDetail(diseaseId) {
            queryDiseaseDetail({ diseaseId: diseaseId }).then(res => {
                // 获取T对应科室
                queryDeptName({
                    deptName: res.data.className,
                    wechatConfigToken: this.wechatConfigToken
                }).then(response => {
                    if (Object.keys(response.data).length) {
                        res.data.className = response.data.name;
                        this.$set(res.data, "deptId", response.data.id);
                        // 获取医生列表
                        queryDoctorList({
                            deptId: response.data.id,
                            wechatConfigToken: this.wechatConfigToken
                        }).then(resp => {
                            let respArr = resp.data;
                            this.arr.push(
                                Object.assign(
                                    res.data,
                                    { respArr },
                                    {
                                        source: "U",
                                        icon: "icon-customer",
                                        description: "diseaseDetail",
                                        type: 1
                                    }
                                )
                            );
                            this.getHeight();
                        });
                    } else {
                        this.arr.push(
                            Object.assign(res.data, {
                                source: "U",
                                icon: "icon-customer",
                                description: "diseaseDetail",
                                type: 1
                            })
                        );
                        this.getHeight();
                    }
                });
            });
        },
        // 身体部位
        _getBodyList() {
            let params = {
                pageNum: 1,
                pageSize: 20
            };
            return new Promise((resolve, reject) => {
                queryCheckBodyList(params).then(res => {
                    resolve(res);
                });
            });
        },
        // 症状列表
        _getSymptomList(id) {
            let params = {
                pageNum: 1,
                pageSize: 50,
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
                this.getHeight();
            });
        },
        // 伴随症状
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
                this.getHeight();
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
                queryDeptName({
                    deptName: res.data.className,
                    wechatConfigToken: this.wechatConfigToken
                }).then(response => {
                    if (Object.keys(response.data).length) {
                        res.data.className = response.data.name;
                        this.$set(res.data, "deptId", response.data.id);
                        // 获取医生列表
                        queryDoctorList({
                            deptId: response.data.id,
                            wechatConfigToken: this.wechatConfigToken
                        }).then(resp => {
                            let respArr = resp.data;
                            this.arr.push(
                                Object.assign(
                                    res.data,
                                    { respArr },
                                    {
                                        source: "U",
                                        icon: "icon-customer",
                                        tip: "您可能患有以下疾病",
                                        description: "diseaseList"
                                    }
                                )
                            );
                            this.getHeight();
                        });
                    } else {
                        this.arr.push(
                            Object.assign(res.data, {
                                source: "U",
                                icon: "icon-customer",
                                tip: "您可能患有以下疾病",
                                description: "diseaseList"
                            })
                        );
                        this.getHeight();
                    }
                });
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
                this.getHeight();
            });
        },
        // 获取高度
        getHeight() {
            let arr = document.getElementsByClassName("left-bubble");
            let height = arr[arr.length - 1].offsetTop;
            this.offsetTop = this.offsetTop + height;
            let top = this.offsetTop ? this.offsetTop : height;
            window.scrollTo({
                top: top - height,
                behavior: "smooth"
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
                border: 1px solid #333;
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
                .bold {
                    color: #333;
                    font-weight: bold;
                }
                .blue {
                    color: #3978ff;
                }
                .dept {
                    border: 1px solid #333;
                    margin-top: 10px;
                    padding: 10px 20px 10px;
                    border-radius: 5px;
                    .blue {
                        float: right;
                    }
                }
                .medicine-name {
                    color: #333;
                }
                .recommendedDepartment {
                    padding-top: 10px;
                }
                .doctor-item {
                    display: flex;
                    justify-content: space-around;
                    border: 1px solid #333;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    align-items: center;
                    img {
                        padding-top: 5px;
                        width: 40px;
                    }
                    &:first-child {
                        margin-top: 10px;
                    }
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
        background-color: #fff;
    }
}
</style>