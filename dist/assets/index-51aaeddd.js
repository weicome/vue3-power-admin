import"./index-50631119.js";import"./TableModel.vuevuetypescriptsetuptruenameTableModellang-eb1352c5.js";/* empty css                 */import{b as w}from"./index-8503d2cb.js";import{S as g}from"./SearchModel-2c89adf6.js";import"./useColumn-3a58f8fd.js";import{l as v}from"./usePage-9be628c1.js";import{I as y,P as S,Q as D,R as E}from"./element-plus-3a9b3aba.js";import{d as c,r as V,b as n,D as d,E as x,V as e,u as o,f as R,a5 as k,Z as B,Y as m}from"./vue-bfef4675.js";import"./vue-i18n-81613396.js";import"./pinia-574b3635.js";import"./vue-router-20616233.js";import"./nprogress-c3ec224b.js";import"./mockjs-de833af9.js";import"./axios-dc3e32a0.js";/* empty css                  *//* empty css            */import"./leader-638638be.js";const C={"page-card":""},T=c({name:"StatSummary"}),W=c({...T,setup(q){const t=V({leader_id:""}),u=[{component:y,label:"归属组长",field:"leader_id",clearable:!0,options:v}],l=n(!1),p=n([]),r=()=>{l.value=!0,setTimeout(async()=>{const i=await w({query:t,page:0,size:0});Array.from(i),p.value=Array.from(i),l.value=!1},300)},_=()=>{Object.assign(t,{}),r()};return r(),(i,s)=>{const a=S,b=D,f=E;return d(),x("div",C,[e(o(g),{modelValue:o(t),"onUpdate:modelValue":s[0]||(s[0]=h=>R(t)?t.value=h:null),config:u,"per-line-count":4,onQuery:r,onReset:_},null,8,["modelValue"]),k((d(),B(b,{data:o(p),fixed:"",stripe:"",border:"","w-full":"","mt-4":"",size:"large"},{default:m(()=>[e(a,{prop:"batch",label:"批次",width:"150"}),e(a,{prop:"created_at",label:"添加时间",width:"150"}),e(a,{prop:"leader_id",label:"归属小组"}),e(a,{label:"拨打统计"},{default:m(()=>[e(a,{prop:"a0",label:"等待处理",width:"120"}),e(a,{prop:"a1",label:"已接通",width:"120"}),e(a,{prop:"a2",label:"已同意",width:"120"}),e(a,{prop:"a3",label:"未接通",width:"120"}),e(a,{prop:"a4",label:"拒绝",width:"120"}),e(a,{prop:"a5",label:"直接挂断",width:"120"}),e(a,{prop:"a-1",label:"关机/停机/空号",width:"120"})]),_:1})]),_:1},8,["data"])),[[f,o(l)]])])}}});export{W as default};
