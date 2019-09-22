/*
 * @Author: CGQ 
 * @Date: 2019-08-26 19:28:05 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-22 14:06:07
 */
<!-- 登录页 -->
<template>
    <div class="login-wrapper">
        <div class="login-box">
            <h2>用户登录</h2>
            <group gutter="0">
                <x-input placeholder="请输入手机号码" v-model="tel" type="tel">
                    <span slot="label" class="iconfont icon-shouji"> </span>
                </x-input>
                <x-input title="密码" placeholder="请输入6-16位密码" v-model="password" type="password">
                    <span slot="label" class="iconfont icon-suo"> </span>
                </x-input>
                <span class="registered text-style" @click="registered">用户注册</span>
                <span class="forgetPsw text-style" @click="forgetPsw">忘记密码</span>
            </group>
            <x-button type="primary" @click.native="login">登 陆</x-button>
        </div>

    </div>
</template>

<script>
import { Group, XInput, XButton } from "vux";
import { mapGetters } from "vuex";
export default {
    name: "Login",
    components: { Group, XInput, XButton },

    data() {
        return {
            tel: "",
            password: ""
        };
    },
    computed: {
        ...mapGetters("user", ["isLogined"])
    },
    methods: {
        // 去注册
        registered() {
            console.log("isLogined", this.isLogined);
        },
        // 去登陆
        login() {
            this.$router.push({ path: "/main" });
            // let userInfo = {
            //     tel: this.tel,
            //     password: this.password
            // };
            // this.$store
            //     .dispatch("user/queryUserInfo", userInfo)
            //     .then(() => {
            //         this.$router.push({ path: "/main" });
            //     })
            //     .catch(error => {
            //         alert(error);
            //     });
        },
        //忘记密码
        forgetPsw() {}
    }
};
</script>
<style lang='scss'>
.login-wrapper {
    height: 100%;
    background-color: #eee;
    .login-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        margin-top: 150px;
        padding: 20px;
        background-color: #666;
        h2 {
            margin-bottom: 30px;
            color: #fff;
        }
        .icon-shouji {
            font-size: 20px;
        }
        .iconfont {
            padding-right: 10px;
            color: orange;
        }
        .weui-btn_primary {
            margin-top: 30px;
            background-color: #3978ff;
        }

        .registered {
            float: left;
        }
        .forgetPsw {
            float: right;
        }
        .text-style {
            font-size: 14px;
            color: #3978ff;
            padding: 10px 20px;
        }
    }
}
</style>