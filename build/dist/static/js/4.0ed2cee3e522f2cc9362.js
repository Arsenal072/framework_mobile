webpackJsonp([4],{"NF/T":function(t,e){},Oe51:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"disease-list-wrapper"},t._l(t.diseaseList,function(e,i){return s("div",{key:i,staticClass:"disease-item",on:{click:function(s){return t.checkDetail(e)}}},[s("div",{staticClass:"disease-box"},[t._m(0,!0),t._v(" "),s("div",{staticClass:"top-title"},[s("span",{staticClass:"title big-title"},[t._v(t._s(e.name))]),t._v(" "),s("a",{staticClass:"link",attrs:{href:e.url}},[t._v("查看百科")]),t._v(" "),s("span",{staticClass:"desc"},[t._v(t._s(e.desc))])])]),t._v(" "),e.cureDepartments&&e.cureDepartments.length?s("div",{staticClass:"item-bottom"},[s("span",{staticClass:"department-title"},[t._v("推荐科室:")]),t._v(" "),s("div",{staticClass:"department"},t._l(e.cureDepartments,function(e,i){return s("span",{key:i},[t._v(t._s(e))])}),0)]):t._e()])}),0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{staticClass:"iconfont icon-bingli"})])}]};var a=s("C7Lr")({name:"moreDisease",components:{},data:function(){return{diseaseList:[]}},methods:{checkDetail:function(t){this.$router.push({path:"/diseaseDetail",query:{diseaseObj:t}})}},created:function(){this.diseaseList=this.$route.query.diseaseList}},i,!1,function(t){s("NF/T")},"data-v-ed5da0e8",null);e.default=a.exports}});
//# sourceMappingURL=4.0ed2cee3e522f2cc9362.js.map