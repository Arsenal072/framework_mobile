/*
 * @Author: CGQ 
 * @Date: 2019-09-02 19:51:37 
 * @Last Modified by: CGQ
 * @Last Modified time: 2020-04-29 20:14:48
 */
<!--  -->
<template>
    <div class="feedback-wrapper">

    </div>
</template>

<script>
import PinchZoom from "../../static/pinch-zoom";
export default {
    name: "Feedback",
    components: {},

    data() {
        return {};
    },

    methods: {},
    mounted() {
    }
};
</script>
<style lang='scss'>
.feedback-wrapper {
    text-align: center;
    font-size: 18px;
    margin-top: 80px;
    .pinch-zoom,
    .pinch-zoom img {
        width: 100%;
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        user-drag: none;
    }
    // body,
    // html {
    //     text-align: center;
    //     color: white;
    // }

    // body {
    //     background-color: #333;
    //     font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    // }

    div.page {
        max-width: 100vw;
        text-align: left;
    }

    .pinch-zoom-parent {
        height: 80vh;
        width: 90vw;
    }

    img {
        height: 90vh;
    }

    div.pinch-zoom div.description h1 {
        font-size: 40px;
        margin: 0px;
        margin-bottom: 10px;
    }

    div.pinch-zoom div.description p {
        margin-bottom: 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }
}
</style>