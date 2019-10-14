/*
 * @Author: CGQ 
 * @Date: 2019-10-10 17:09:30 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-14 17:59:16
 */
<!-- 疾病详情 -->
<template>
    <div class="disease-detail-wrapper">
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <div class="img a">
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="img b">
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="img c">
                </div>
            </van-swipe-item>
        </van-swipe>
        <!-- <h2 class="center">疾病详情</h2> -->
        <div v-if="diseaseObj.desc">
            <h3 class="title">疾病介绍</h3>
            <span :class="isShow?'':'content'">{{diseaseObj.desc}}</span>
            <div class="show-all" @click="showDiseaseDetail">{{isShow?'收 起':'显示全部'}}</div>
        </div>
        <dir v-if="diseaseObj.cause">
            <h3 class="title">病因</h3>
            <span :class="isShowCauseDetail?'':'content'">{{diseaseObj.cause}}</span>
            <div class="show-all" @click="showCauseDetail">{{isShowCauseDetail?'收 起':'显示全部'}}</div>
        </dir>
        <div>

        </div>
        <h3 class="title">治疗常识</h3>
        <div v-if="diseaseObj.easyGet">
            <h4 class="inner-title">易感人群</h4>
            <span>{{diseaseObj.easyGet}}</span>
        </div>
        <div v-if="diseaseObj.cureWays&&diseaseObj.cureWays.length">
            <h4 class="inner-title">治疗方式</h4>
            <span v-for="item in diseaseObj.cureWays" :key="item" class="item">{{item}}</span>
        </div>
        <div v-if="diseaseObj.cureDepartments&&diseaseObj.cureDepartments.length">
            <h4 class="inner-title">就诊科室</h4>
            <span v-for="item in diseaseObj.cureDepartments" :key="item" class="item">{{item}}</span>
        </div>
        <div v-if="diseaseObj.curedProb">
            <h4 class="inner-title">治愈率</h4>
            <span>{{diseaseObj.curedProb}}</span>
        </div>
        <div v-if="diseaseObj.cureLastTime">
            <h4 class="inner-title">治愈周期</h4>
            <span>{{diseaseObj.cureLastTime}}</span>
        </div>
        <div v-if="diseaseObj.prevent">
            <h4>疾病预防</h4>
            <span :class="isShowPreventDetail?'':'content'">{{diseaseObj.prevent}}</span>
            <div class="show-all" @click="showPreventDetail">{{isShowPreventDetail?'收 起':'显示全部'}}</div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
    name: "DiseaseDetail",
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },

    data() {
        return {
            diseaseObj: {},
            isShow: false,
            isShowCauseDetail: false,
            isShowPreventDetail: false
        };
    },

    methods: {
        showDiseaseDetail() {
            this.isShow = !this.isShow;
        },
        showCauseDetail() {
            this.isShowCauseDetail = !this.isShowCauseDetail;
        },
        showPreventDetail() {
            this.isShowPreventDetail = !this.isShowPreventDetail;
        }
    },
    created() {
        this.diseaseObj = this.$route.query.diseaseObj;
    }
};
</script>
<style lang='scss'>
.disease-detail-wrapper {
    background-color: #fff;
    font-size: 14px;
    padding: 20px 14px;
    .center {
        text-align: center;
    }
    .inner-title {
        display: inline-block;
        padding-right: 15px;
    }
    .item {
        padding-right: 15px;
    }
    .show-all {
        width: 100%;
        background-color: #3978ff;
        color: #fff;
        border-radius: 5px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
    }
    .content {
        height: 110px;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
    }

    .a {
        background: url("../assets/images/7bdc331f85f54ed5a337091a26286394.png")
            no-repeat;
    }
    .b {
        background: url("../assets/images/view.jpg") no-repeat;
    }
    .c {
        background: url("../assets/images/timg.jpg") no-repeat;
    }
    .img {
        margin-bottom: 10px;
        width: 100%;
        height: 200px;
        background-size: cover;
        -moz-background-size: cover;
    }
}
</style>