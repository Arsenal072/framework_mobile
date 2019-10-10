/*
 * @Author: CGQ 
 * @Date: 2019-09-02 16:10:47 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-10 10:57:13
 */
<!--  -->
<template>
    <div class="input-box-wrapper">
        <div class="left-box" @click="yuyin">
            <div class="inner-box">
                <span class="iconfont icon-yuyin"></span>
            </div>
        </div>
        <div class="center-input-box">
            <x-input placeholder="请输入症状/疾病/药品" :show-clear="false" v-model="inputText"></x-input>
            <!-- <x-textarea placeholder="请输入症状/疾病/药品" :autosize="true" :rows="1" :max="30" :show-counter="false" v-model="inputText"></x-textarea> -->
        </div>
        <div :class="['right-box',inputText?'hasInput':'']" @click="send">
            <span>发 送</span>
            <!-- <span class="iconfont icon-fasong"></span> -->
        </div>
    </div>
</template>

<script>
import { XInput, XTextarea } from "vux";
import { toast } from '../lib/utils'
export default {
    name: "InputBox",
    components: { XInput, XTextarea },

    data() {
        return {
            inputText: ""
        };
    },

    methods: {
        yuyin(){
            toast('语音输入功能正在开发中，敬请期待！')
        },
        send() {
            this.$emit("send", this.inputText);
            this.inputText = "";
        }
    }
};
</script>
<style lang='scss'>
.input-box-wrapper {
    position: fixed;
    display: flex;
    align-items: flex-end;
    bottom: 0px;
    width: 100%;
    padding: 15px 10px 15px 10px;
    border-top: 1px solid #eee;
    .left-box {
        // width: 40px;
        // height: 40px;
        // line-height: 40px;
        // border-radius: 40px;
        // background-color: #3978ff;
        // opacity: 0.5;
        text-align: center;
        color: #fff;
        .inner-box {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 30px;
            background-color: #3978ff;
        }
    }
    .center-input-box {
        width: 270px;
        width: 255px;
        margin: 0 10px;
        border-radius: 10px;
        line-height: 30px;
        font-size: 16px;
        border: 1px solid #3978ff;
        color: #666;
        .weui-cell {
            width: 100%;
            display: inline-block;
            padding: 0px;
            padding-left: 6px;
        }
        .weui-input{
            width: 95%;
            padding: 7px 0px;
            
        }
        // .vux-x-textarea {
        //     .weui-textarea {
        //         width: 95%;
        //         // border-bottom: 1px solid #3978ff;
        //     }
        // }
        // textarea {
        //     padding-top: 4px;
        //     background-color: none;
        //     height: 30px !important;
        // }
    }
    .right-box {
        font-size: 14px;
        height: 36px;
        line-height: 38px;
        padding: 0 8px;
        border: 1px solid #3978ff;
        color: #3978ff;
        border-radius: 10px;
        // .iconfont {
        //     font-size: 22px;
        //     color: #3978ff;
        // }
    }
    .hasInput{
        background-color: #3978ff;
        color: #fff;
    }
}
</style>