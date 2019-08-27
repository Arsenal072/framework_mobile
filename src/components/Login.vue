/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:28:05 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-08-27 14:35:44
 */
<!-- 登录页 -->
<template>
    <div class="login-wrapper">
        <h2>登录页</h2>
        <div class="login-box">
            <p>
                <span>手机号：</span>
                
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    components: {},

    data() {
        return {};
    },

    methods: {}
};
</script>
<style lang='scss'>
.login-wrapper {
    .login-box {
        display: flex;
        flex-direction: column;
        width: 80%;
    }
}
</style>