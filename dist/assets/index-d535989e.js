import"./index-50631119.js";/* empty css               *//* empty css                          */import{u as v,a as P,b as j}from"./useColumn-3a58f8fd.js";import{_ as q}from"./TableModel.vuevuetypescriptsetuptruenameTableModellang-eb1352c5.js";import{l as B,t as F}from"./usePage-9be628c1.js";import{S as I}from"./SearchModel-2c89adf6.js";import{a as L}from"./index-8503d2cb.js";import{M as O,N as Q,B as W,L as Y}from"./element-plus-3a9b3aba.js";import{d as R,b as r,r as h,D as S,E as D,V as c,u as t,f as y,Y as d,F as Z,a0 as E,W as w,ah as A,Z as G,a1 as H}from"./vue-bfef4675.js";import"./vue-i18n-81613396.js";import"./pinia-574b3635.js";import"./vue-router-20616233.js";import"./nprogress-c3ec224b.js";import"./mockjs-de833af9.js";import"./axios-dc3e32a0.js";/* empty css                  *//* empty css            *//* empty css                 */import"./leader-638638be.js";const{ElInput:J,ElSelect:k}=P(),K=[{label:"等待处理",value:0},{label:"已接通",value:1},{label:"已同意",value:2},{label:"未接通(通话中/语音助手/在忙稍后回电)",value:3},{label:"拒绝",value:4},{label:"直接挂断",value:5},{label:"关机/停机/空号",value:-1}],X=[{component:k,label:"归属组长",field:"leader_id",clearable:!0,options:B},{component:k,label:"数据状态",field:"status",clearable:!0,options:K},{component:J,label:"组员手机号",field:"phone",placeholder:"请输入"}],ee=[{fixed:!0,prop:"id",label:"编号",width:"70",align:"center"},{prop:"leader_id",label:"归属组长",slot:({row:l})=>{var m;return[v(((m=B.find(s=>s.value===l.leader_id))==null?void 0:m.label)||"")]}},{prop:"type",label:"组员类型",slot:({row:l})=>[v(l!=null&&l.type?"回访组":"电销组")]},{prop:"username",label:"电销员"},{prop:"phone",label:"手机号"},{prop:"status",label:"是否启用",slot:({row:l})=>[v(l!=null&&l.status?"正常":"禁用")]},{prop:"created_at",label:"添加时间"}],te={"page-card":""},ae={class:"dialog-footer"},le=R({name:"StatReport"}),De=R({...le,setup(l){const m=r(),s=h({leader_id:"",status:"",phone:""}),i=r(!1),f=r(!1),x=r([...ee,{label:"操作",width:"120",slot:({row:a})=>[j("拨打统计",()=>{z(a)},{type:"success"})]}]),u=r({tatile:"统计",count:"0"}),C=h({}),z=async a=>{u.value={tatile:"统计",count:"0"};const e=await F({id:a.id});Object.assign(C,e),u.value.tatile="电销员《".concat(a.username,"》拨打统计");const g=e==null?void 0:e.reduce((b,_)=>b+_.value,0);u.value.count="总拨打统计《".concat(g,"》"),i.value=!0},V=r([]),n=h({page:1,size:10,total:0});function M(){Object.assign(s,{}),p()}function $(a){n.page=a,p()}function N(a){n.size=a,p()}function p(){f.value=!0,setTimeout(async()=>{const{data:a,meta:e}=await L({query:s,...n});n.page=e.pagination.current_page,n.size=e.pagination.per_page,n.total=e.pagination.count,f.value=!1,V.value=a},300)}return p(),(a,e)=>{const g=O,b=Q,_=W,T=Y;return S(),D("div",te,[c(t(I),{modelValue:t(s),"onUpdate:modelValue":e[0]||(e[0]=o=>y(s)?s.value=o:null),config:t(X),"per-line-count":4,onQuery:p,onReset:M},null,8,["modelValue","config"]),c(t(q),{ref_key:"tableModelRef",ref:m,pagination:t(n),"onUpdate:pagination":e[1]||(e[1]=o=>y(n)?n.value=o:null),loading:t(f),columns:t(x),data:t(V),"row-key":"id",onPageChange:$,onSizeChange:N},null,8,["pagination","loading","columns","data"]),c(T,{modelValue:t(i),"onUpdate:modelValue":e[3]||(e[3]=o=>y(i)?i.value=o:null),width:560,title:t(u).tatile,"show-close":!1,"close-on-click-modal":!1,onClosed:e[4]||(e[4]=o=>i.value=!1)},{footer:d(()=>[Z("span",ae,[c(_,{onClick:e[2]||(e[2]=o=>i.value=!1)},{default:d(()=>[E("确定")]),_:1})])]),default:d(()=>[c(b,{title:t(u).count,column:1,border:""},{default:d(()=>[(S(!0),D(w,null,A(t(C),(o,U)=>(S(),G(g,{key:U,label:o.label,"label-align":"center",align:"center",width:"150px"},{default:d(()=>[E(H(o.value),1)]),_:2},1032,["label"]))),128))]),_:1},8,["title"])]),_:1},8,["modelValue","title"])])}}});export{De as default};
