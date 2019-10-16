/*
 * @Author: CGQ 
 * @Date: 2019-10-14 17:50:31 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-16 16:45:10
 */
<!-- 更多疾病 -->
<template>
    <div class='disease-list-wrapper'>
        <div v-for="(item, index) in diseaseList" :key="index" @click="checkDetail(item)" class="disease-item">
            <div class="disease-box">
                <div>
                    <span class="iconfont icon-bingli"></span>
                </div>
                <div class="top-title">
                    <span class="title big-title">{{item.name}}</span>
                    <span @click.stop="checkDrugDetail(item.url)" class="link">查看百科</span>
                    <span class="desc">{{item.desc}}</span>
                </div>
            </div>
            <div class="item-bottom" v-if="item.cureDepartments&&item.cureDepartments.length">
                <span class="department-title">推荐科室:</span>
                <div class="department">
                    <span v-for="(j, ind) in item.cureDepartments" :key="ind">{{j}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "moreDisease",
    components: {},

    data() {
        return {
            diseaseList: []
        };
    },

    methods: {
        checkDetail(item) {
            localStorage.setItem("diseaseDetail", JSON.stringify(item));
            this.$router.push({
                name: "diseaseDetail",
                query: {
                    diseaseObj: item
                }
            });
        },
        // 查看药物详情
        checkDrugDetail(url) {
            window.location.href = url;
        }
    },
    created() {
        if (localStorage.getItem("diseaseList")) {
            this.diseaseList = JSON.parse(localStorage.getItem("diseaseList"));
        } else {
            this.diseaseList = this.$route.query.diseaseList;
            localStorage.setItem(
                "diseaseList",
                JSON.stringify(this.diseaseList)
            );
        }
    }
};
</script>
<style lang='scss' scoped>
.disease-list-wrapper {
    padding: 8px;
    .disease-box {
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
        background-color: #fff;
        border-radius: 10px;
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
}
</style>