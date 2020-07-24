/*
* @Author: CGQ
* @Date: 2019-09-02 19:49:32
* @Last Modified by: CGQQ
* @Last Modified time: 2020-07-24 20:40:144
*/
<!--  -->
<template>
  <div>
    测试
  </div>
</template>

<script>
  export default {
    name: "AskingDisease",
    components: {},

    data() {
      return {};
    },

    methods: {
      // 防抖
      debounce(fn, delay) {
        let timer = null
        return function () {
          if (timer) {
            clearTimeout(timer)
            timer = setTimeout(fn, delay)
          } else {
            timer = setTimeout(fn, delay)
          }
        }
      },
      // 节流
      throttle(fn, delay) {
        let timer = null
        return function () {
          let context = this
          let args = arguments
          if (!timer) {
            timer = setTimeout(function () {
              fn.apply(context, args)
              timer = null
            }, delay)
          }
        }
      },
      // 扁平化
      flatten(arr) {
        let res = []
        arr.forEach(item => {
          if (Array.isArray(item)) {
            res = res.concat(flatten(item))
          } else {
            res.push(item)
          }
        })
        return res
      },

      fn() {
        //去重方法1:两层循环
        Array.prototype.unique = function () {
          let newArr = []
          let isRepeat = false
          for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
              if (this[i] == this[j]) {
                isRepeat = true
                break
              }
            }
            if (!isRepeat) {
              newArr.push(this[i])
            }
          }
          return newArr
        }
        // 去重方法2：indexOf
        Array.prototype.unique = function () {
          let newArr = []
          this.forEach(item => {
            if (newArr.indexOf(item) == -1) {
              newArr.push(item)
            }
          })
          return newArr
        }
        // 去重方法3：includes
        Array.prototype.unique = function () {
          let newArr = []
          this.forEach(item => {
            if (!newArr.includes(item)) {
              newArr.push(item)
            }
          })
          return newArr
        }
        // 去重方法4：sort
        Array.prototype.unique = function () {
          let newArr = this.sort()
          for (let i = 0; i < this.length; i++) {
            if (this[i] !== this[i + 1]) {
              newArr.push(this[i])
            }
          }
          return newArr
        }
      }
    },
    created() {

      //   var arr = [1, 2, 3, 4, 5];
      //   Array.prototype.duplicator = function () {
      //     var len = this.length;
      //     for (var i = 0; i < len; i++) {
      //       this.push(this[i]);
      //     }
      //   }
      //   console.log('333', arr.duplicator())
      let arr = [1,5,2,2,7,5,6,9,7]
      Array.prototype.unique = function () {
        let newArr = this.sort()
        for (let i = 0; i < this.length; i++) {
          if (this[i] !== this[i + 1]) {
            newArr.push(this[i])
          }
        }
        return newArr
      }
      console.log(arr.unique())
    }
  };

</script>
<style lang='scss' scoped>
  .viewerimg {
    width: 100%;
    height: auto;
  }

</style>
