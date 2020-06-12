/*
* @Author: CGQ
* @Date: 2019-09-02 19:48:08
 * @Last Modified by: CGQQ
 * @Last Modified time: 2020-06-12 17:57:388
*/
<!--  -->
<template>
  <div class='test-lazy-img'>
    <div class="outer-box" v-for='(item,index) in imgArr' :key='index'>
      <img :src="item.src" class='img'>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Guidance",
    components: {},

    data() {
      return {
        imgArr: []
      };
    },
    // 监听scroll事件
    // 计算滚动条的位置，哪些图片在范围内
    // 真实图片替换
    // 节流
    methods: {
      // 节流
      throttle(fun, delay) {
        let timer = null
        return function () {
            var context = this;
            var args = arguments;
          if (!timer) {
            setTimeout(() => {
              fun.apply(context, args)
              timer = null
            }, delay)
          }
        }
      },
      handle() {
        let arr = document.getElementsByClassName('img')
        let clientHeight = document.documentElement.clientHeight
        let scrollTop = document.documentElement.scrollTop
        Array.from(arr).forEach((item, index) => {
          let offsetTop = item.offsetTop
          if (offsetTop >= clientHeight + scrollTop) {
            this.imgArr[index].src = 'http://mui.ucmed.cn/images/logo/logo1.png'
          }
        })
      }
    },
    mounted() {
      window.addEventListener('scroll', this.throttle(this.handle, 2000))
      for (let i = 0; i < 20; i++) {
        this.imgArr.push({
          src: require('../assets/images/img-loading.jpg')
        })
      }
      // setTimeout(()=>{
      //     this.imgArr.forEach(item=>{
      //         item.src = require('../assets/images/IMG_3012.jpg')
      //     })
      // },3000)
    }
  };

</script>
<style lang='scss'>
  .test-lazy-img {
    .outer-box {
      display: flex;
      display: inline-block;

      .img {
        width: 150px;
        margin-right: 8px;
      }
    }
  }

</style>
