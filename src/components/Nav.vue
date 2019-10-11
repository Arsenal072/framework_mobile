/*
 * @Author: CGQ 
 * @Date: 2019-09-02 18:47:08 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-11 18:21:19
 */
<!--  -->
<template>
    <div class="nav-wrapper">
        <div :class="['nav-box',selectItem==index?'select':'']" v-for="(item, index) in navList" :key="index" @click="to(item)">
                <span :class="['iconfont', `${item.icon}`, selectItem==index?'selectIcon':'']"></span>
                <p>{{item.type}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Nav",
    components: {},
    props: {
        navList: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
            selectItem: 0
        };
    },

    methods: {
        to(item) {
            this.selectItem = item.id;
            this.$emit("nav", item);
        }
    }
};
</script>
<style lang='scss'>
.nav-wrapper {
    width: 100%;
    position: fixed;
    top: 100px;
    background-color: #fff;
    z-index: 10;
    .nav-box {
        display: inline-block;
        width: 25%;
        font-size: 16px;
        text-align: center;
        .iconfont {
            font-size: 24px;
            color: #3978ff;
        }
    }
    .select {
        // background-color: #3978ff;
        // color: #fff;
    }
    .selectIcon{
        // color: #fff!important;
    }
}
</style>