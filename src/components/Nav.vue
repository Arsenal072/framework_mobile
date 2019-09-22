/*
 * @Author: CGQ 
 * @Date: 2019-09-02 18:47:08 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-22 16:19:07
 */
<!--  -->
<template>
    <div class="nav-wrapper">
        <div class="nav-box" v-for="(item, index) in navList" :key="index" @click="to(item)">
            <!-- <div :class="selectItem==index?'select':''"> -->
                <span :class="['iconfont', `${item.icon}`]"></span>
                <p>{{item.type}}</p>
            <!-- </div> -->
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
    display: flex;
    justify-content: space-around;
    background-color: #eee;
    z-index: 10;
    .nav-box {
        font-size: 16px;
        text-align: center;
        .iconfont {
            font-size: 24px;
            color: #3978ff;
        }
    }
    .select {
        background-color: orange;
    }
}
</style>