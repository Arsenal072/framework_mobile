/*
 * @Author: CGQ 
 * @Date: 2019-08-05 11:52:55 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-08-05 21:21:54
 */
<!-- 登录页 -->
<template>
    <div>
        <hello></hello>
        <button-tab>
            <button-tab-item>hahha</button-tab-item>
            <button-tab-item selected>就是解决实际</button-tab-item>
            <button-tab-item>开始就很尴尬</button-tab-item>
        </button-tab>
        <tabbar>
            <tabbar-item>
                <img slot="icon" src="../assets/images/icon_nav_button.png">
                <span slot="label">Wechat</span>
            </tabbar-item>
            <tabbar-item show-dot>
                <img slot="icon" src="../assets/images/icon_nav_cell.png">
                <span slot="label">Message</span>
            </tabbar-item>
            <tabbar-item selected link="/component/demo">
                <img slot="icon" src="../assets/images/icon_nav_article.png">
                <span slot="label">Explore</span>
            </tabbar-item>
            <tabbar-item badge="2">
                <img slot="icon" src="../assets/images/icon_nav_cell.png">
                <span slot="label">News</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Tabbar, TabbarItem } from "vux";
import Hello from "../components/Hello";
export default {
    name: "Login",
    components: {
        ButtonTab,
        ButtonTabItem,
        Hello,
        Tabbar, TabbarItem
    }
};
</script>
<style lang='scss' scoped>
.weui-tabbar{
    position: fixed;
}
</style>