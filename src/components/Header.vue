/*
 * @Author: CGQ 
 * @Date: 2019-09-02 14:07:51 
 * @Last Modified by: CGQ
 * @Last Modified time: 2019-10-10 10:47:04
 */
<!--  -->
<template>
    <div class="header-wrapper">
        <div class="top-box">
            <img src="../assets/images/u_baby.png" alt="">
            <div class="select-box">
                <van-cell is-link @click="showPopup">
                    <div class="left-box">
                        <span>切换</span>
                        <span class="iconfont icon-icon-qihuan"></span>
                        <div class="right-box">
                            <span class="select-gender">{{genderAndAge.gender}}</span>
                            <span class="line">|</span>
                            <span class="select-age">{{genderAndAge.age}}</span>
                        </div>

                    </div>
                </van-cell>
                <van-popup v-model="showPicker" position="bottom" :style="{ height: '45%' }" @close="showPicker = false">
                    <van-picker show-toolbar default="標題" :columns="columns" @change="onChange" @cancel="showPicker = false" @confirm="showPicker = false" />
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script>
import { Popup, Picker, Cell } from "vant";
import { getAgeArr } from "../lib/enums";
const ageArr = getAgeArr();
const ages = {
    男: ageArr,
    女: ageArr
};
export default {
    name: "Header",
    components: {
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Cell.name]: Cell
    },
    props: {
        genderAndAge: {
            type: Object,
            default: ()=>{}
        }
    },
    data() {
        return {
            columns: [
                {
                    values: Object.keys(ages),
                    className: "column1"
                },
                {
                    values: ages["男"],
                    className: "column2",
                    defaultIndex: 0
                }
            ],
            showPicker: false
        };
    },

    methods: {
        showPopup() {
            this.showPicker = true;
        },
        onChange(picker, values) {
            this.genderAndAge.gender = values[0];
            this.genderAndAge.age = values[1];
            this.$emit('selectChange',this.genderAndAge)
        },
        onConfirm(value, index) {
            this.showPicker = false;
        }
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
    z-index: 100;
    touch-action: none;
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
            right: 0px;
            // top: 60px;
            top: 50px;
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
                padding: 0 5px;
                margin-left: 8px;
                .select-gender {
                    padding-left: 5px;
                }
                .select-age {
                    padding-right: 5px;
                }
                .line {
                    padding: 0 5px;
                }
                // .weui-cell {
                //     padding: 0px 5px;
                //     display: inline-block;
                // }
                // .weui-cell_access .weui-cell__ft:after {
                //     display: none;
                // }
                // .vux-cell-box:not(:first-child):before {
                //     border-top: none;
                // }
                // .vux-cell-box {
                //     display: inline-block;
                // }
                // .vux-cell-value {
                //     color: #fff;
                // }
            }
            .van-icon-arrow:before {
                display: none;
                color: #fff;
            }
            .van-cell {
                background-color: #3978ff;
                .van-cell__value--alone {
                    color: #fff;
                }
            }
            .van-cell:not(:last-child)::after {
                border: none;
            }
            .van-picker__confirm {
                color: #3978ff;
            }
            .van-picker__cancel {
                color: #3978ff;
            }
        }
    }
}
</style>