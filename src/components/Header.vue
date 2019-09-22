/*
 * @Author: CGQ 
 * @Date: 2019-09-02 14:07:51 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-09-22 16:44:55
 */
<!--  -->
<template>
    <div class="header-wrapper">
        <div class="top-box">
            <img src="../assets/images/u_baby.png" alt="">
            <div class="select-box">
                <div class="left-box">
                    <span>切换</span>
                    <span class="iconfont icon-icon-qihuan"></span>
                </div>
                <div class="right-box">
                    <popup-picker :data="genderOptions" v-model="gender" @on-change="selectChange"></popup-picker>
                    <span>|</span>
                    <popup-picker :data="ageOptions" v-model="age"  @on-change="selectChange"></popup-picker>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupRadio, PopupPicker } from "vux"
export default {
    name: "Header",
    components: { PopupRadio, PopupPicker },

    data() {
        return {
            genderOptions: [["男", "女"]],
            gender: ["男"],
            ageOptions: [[]],
            age: ["22"]
        };
    },

    methods: {
        getAgeOptions() {
            let ageOptions = [];
            for (let i = 1; i <= 100; i++) {
                ageOptions.push(`${i}`);
            }
            this.ageOptions = [ageOptions]
        },
        selectChange(){
            let params = {
                age: this.age[0],
                gender: this.gender[0]
            }
            this.$emit('selectChange',params)
        }
    },
    created() {
        this.getAgeOptions();
    }
};
</script>
<style lang='scss'>
.header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background-color: #3978ff;
    z-index: 10;
    .top-box {
        position: relative;
        img {
            position: absolute;
            top: 23px;
            left: 30px;
            width: 60px;
        }
        .select-box {
            position: absolute;
            right: 20px;
            top: 60px;
            color: #fff;
            font-size: 16px;
            .left-box {
                display: inline-block;
            }
            .right-box {
                display: inline-block;
                height: 25px;
                line-height: 25px;
                border-radius: 25px;
                border: 1px solid #fff;
                padding: 0 5px ;
                margin-left: 8px;
                .select-gender{
                    padding-left: 5px;
                }
                .weui-cell{
                    padding: 0px 5px;
                    display: inline-block;
                }
                .weui-cell_access .weui-cell__ft:after{
                    display: none;
                }
                .vux-cell-box:not(:first-child):before{
                    border-top: none;
                }
                .vux-cell-box{
                    display: inline-block;
                }
                .vux-cell-value {
                    color: #fff;
                }
            }
        }
    }
}
</style>