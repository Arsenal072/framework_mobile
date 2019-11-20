/*
 * @Author: CGQ 
 * @Date: 2019-11-08 13:51:26 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-11-08 15:18:45
 */
<!-- 测试scroll-better -->
<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content">
            <!-- :list="discList" -->
            <div>
                <span class="tip-content">未检测到在中办理过就诊卡，请选择绑定鬼地方个的刚发的多个个很过分很反感很反感法规和法国恢复规划发</span>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li v-for="(item,index) in discList" class="item" :key="index">
                        <div class="icon">
                            <img :src="item.imgurl" width="80" height="80">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "../components/Scroll";

export default {
    name: "recommend",
    data() {
        return {
            discList: [
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                },
                {
                    imgurl:
                        "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1118760046,961270476&fm=85&s=D8203F77EED14FE31089BCC30300E0A1",
                    creator: {
                        name: "ColdPlay"
                    },
                    dissname: "许巍"
                }
            ]
        };
    },
    created() {},
    methods: {},
    components: {
        Scroll
    }
};
</script>
<style lang='scss' scoped>
.top-tip {
    margin-bottom: 100px;
}
.item {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
    border: 1px solid #3978ff;
    display: flex;
    justify-content: space-around;
}
</style>