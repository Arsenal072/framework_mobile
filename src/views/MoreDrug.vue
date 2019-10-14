/*
 * @Author: CGQ 
 * @Date: 2019-10-14 19:56:33 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-14 20:12:55
 */
<!-- 更多药物 -->
<template>
    <div class='drug-list-wrapper'>
        <div v-for="(item, index) in drugList" :key="index" class="drug-item">
            <div class="drug-box">
                <div class="top-title">
                    <span class="title big-title" @click="checkDrugDetail(item.url)">{{item.name}}</span>
                    <a :href="item.url" class="link">查看百科</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},

    data() {
        return {
            drugList: []
        };
    },

    methods: {
        checkDrugDetail(url){
            window.location.href = url
        }
    },
    created() {
        this.drugList = this.$route.query.drugList;
    }
};
</script>
<style lang='scss' scoped>
.drug-list-wrapper {
    padding: 8px;
    .drug-box {
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        font-size: 15px;
        overflow: hidden;
        padding: 10px 0 5px 5px;
        padding-bottom: 5px;
        .iconfont {
            line-height: 70px;
            font-size: 35px;
            color: #3978ff;
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
    }
    .drug-item {
        border-bottom: 2px solid #ddd;
        background-color: #fff;
        border-radius: 10px;
        padding: 8px 0px;
    }
    .link {
        position: static !important;
        font-size: 14px !important;
    }
}
</style>