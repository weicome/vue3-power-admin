import{_ as N,u as W,c as X,a as Y,T as Z}from"./index-c92e64dd.js";/* empty css                 */import{d as k,b as n,z as G,w as H,D as P,E as L,F as a,$ as B,u,T,a5 as J,a6 as Q,a1 as M,a0 as F,ax as q,ay as A,c as ee,Z as oe,Y as V,V as c,f as j,r as U,ai as te}from"./vue-bfef4675.js";import{y as ae,z as se,A as le,B as ne,C as re,D as ie}from"./element-plus-bdb0d49b.js";import{b as ue}from"./vue-router-1f08ac7c.js";import{u as de}from"./vue-i18n-81613396.js";import"./pinia-574b3635.js";import"./nprogress-c3ec224b.js";import"./mockjs-de833af9.js";import"./axios-dc3e32a0.js";const ce="/assets/loginbanner-45ab4b86.svg",me=i=>(q("data-v-591ea9d2"),i=i(),A(),i),fe={"w-320px":""},pe={rounded:"","overflow-hidden":"","text-0":"",relative:""},ve=me(()=>a("div",{"i-app-double-arrow":""},null,-1)),_e=[ve],ge=k({name:"VerificationCode"}),he=k({...ge,props:{mode:{default:"base"}},emits:["change"],setup(i,{emit:f}){const b=i,p=n(),_=n(),x=n(!1),r=n(),w=n(0),m=n(0),g=n(!1),I=n([0,0]),S=n(8),l=n(!1),s=n(!1),$=n(!1),y=n(40),h=n(8);G(()=>{z()});function z(){const o=p.value.getContext("2d"),e=_.value.getContext("2d",{willReadFrequently:!0}),t=new Image;t.setAttribute("crossOrigin","anonymous"),t.onload=()=>{m.value=0,l.value=!1,s.value=!1,$.value=!1,R();const[d,D]=I.value;_.value.width=320,e.clearRect(0,0,320,150),C(e,d,D),e.clip(),e.drawImage(t,0,0);const O=e.getImageData(d,D-h.value,y.value+h.value,y.value+h.value);_.value.width=y.value+h.value,e.putImageData(O,0,D-h.value),C(e,0,D),e.shadowColor="#000",e.shadowBlur=6,e.strokeStyle="#52525B",e.stroke(),o.drawImage(t,0,0),C(o,d,D),o.fillStyle="#fff",o.fill(),g.value=!1},t.src="https://picsum.photos/320/150",H(g,d=>{if(d){if(l.value&&b.mode==="modal")return;t.src="https://picsum.photos/320/150?id=".concat(Date.now())}})}function C(o,e,t){const d=y.value;o.beginPath(),o.moveTo(e,t),o.arc(e+d/2,t,h.value,Math.PI,2*Math.PI),o.lineTo(e+d,t),o.arc(e+d,t+d/2,h.value,-Math.PI/2,Math.PI/2),o.lineTo(e+d,t+d),o.lineTo(e,t+d),o.arc(e,t+d/2,h.value,Math.PI/2,Math.PI*1.5,!0),o.closePath()}function R(){const o=(e,t)=>Math.floor(Math.random()*(t-e)+e);I.value=[o(80,250),o(40,100)]}function v(o){x.value=!0,m.value=0,w.value=o.offsetX}function K(o){if(x.value){const e=r.value.getBoundingClientRect().left,t=o.x-e-w.value;m.value=t<=0?0:t>=280?280:t}}function E(o){if(o){const e=Math.abs(m.value-I.value[0])<=S.value;l.value=e,s.value=!0,f("change",l.value),g.value=!0}else s.value||(m.value=0);x.value=!1}return(o,e)=>(P(),L("div",fe,[a("div",pe,[a("canvas",{ref_key:"image",ref:p,width:"320",height:"150"},null,512),a("canvas",{ref_key:"overlay",ref:_,absolute:"","z-2":"",width:"320",height:"150",style:B({left:"".concat(u(m),"px")})},null,4),a("div",{absolute:"","z-3":"","top-1":"","right-1":"",text:"20px zinc-2 hover:primary","cursor-pointer":"",onClick:e[0]||(e[0]=t=>{$.value=!0,g.value=!0})},[a("div",{"i-ep-refresh":"",class:T({"animate-spin":u($)})},null,2)]),J(a("div",{absolute:"","z-5":"","bottom-0":"","left-0":"","right-0":"","h-0":"","overflow-hidden":"",class:T(["open",{succeed:u(l)}])},M(u(l)?"验证通过！":"验证失败，请重试！"),3),[[Q,u(s)]])]),a("div",{ref_key:"scrollView",ref:r,"h-50px":"","bg-slate-3":"",rounded:"","mt-12px":"",relative:"",flex:"center","text-zinc":"","select-none":""},[a("div",{absolute:"","w-50px":"","h-50px":"",bg:"stone-1 hover:stone-2 active:blue","shadow-card-dark":"","cursor-pointer":"","rounded-sm":"",text:"primary active:main",flex:"center","text-20px":"",style:B({left:"".concat(u(m),"px")}),onMousedown:v,onMousemove:K,onMouseleave:e[1]||(e[1]=t=>E(!1)),onMouseup:e[2]||(e[2]=t=>E(!0))},_e,36),a("div",{absolute:"","left-0":"","h-50px":"","bg-sky":"","opacity-60":"",style:B({width:"".concat(u(m),"px")})},null,4),F(" 拖动滑块完成拼图 ")],512)]))}});const we=N(he,[["__scopeId","data-v-591ea9d2"]]),ye=k({name:"VerifyDialog"}),be=k({...ye,props:{modelValue:{type:Boolean}},emits:["update:modelValue","change"],setup(i,{emit:f}){const b=i,p=ee({set:r=>{f("update:modelValue",r)},get:()=>b.modelValue}),_=n(!1);function x(r){_.value=!r,setTimeout(()=>{f("change",r),_.value=!1},500)}return(r,w)=>{const m=ae;return P(),oe(m,{modelValue:u(p),"onUpdate:modelValue":w[0]||(w[0]=g=>j(p)?p.value=g:null),class:T(["verify--dialog",[u(_)?"animate-shake-x animate-duration-0.5s":""]]),width:"360","close-on-press-escape":!1,"show-close":!1,"destroy-on-close":""},{default:V(()=>[c(we,{mode:"modal",onChange:x})]),_:1},8,["modelValue","class"])}}});async function xe(i){const f=W();try{return[!0,await f.login(i)]}catch(b){return[!1]}}const $e=i=>(q("data-v-680cf070"),i=i(),A(),i),Ve={w:"21rem",bg:"#ffffff90","dark:bg":"#22222290",px:"8",py:"6","rounded-xl":"","shadow-xl":""},ke={text:"3xl brand-gradient center",font:"bold mono",m:"t-lg b-0","select-none":""},Ie={m:"t-12 mt-11",flex:"~ col"},Me={w:"360px",flex:"center",justify:"between"},Ce={text:"sm primary",cursor:"pointer"},De={class:"divider"},Pe=$e(()=>a("div",{flex:"center",text:"1.3rem placeholder"},[a("div",{"i-ri-github-fill":"",class:"link"}),a("div",{"i-ri-wechat-fill":"",class:"link"}),a("div",{"i-ri-twitter-fill":"",class:"link"}),a("div",{"i-ri-google-fill":"",class:"link",text:"1.2rem!"})],-1)),Se=k({name:"LoginForm"}),ze=k({...Se,setup(i){const{t:f}=de(),b=ue(),p=n(!1),{$notify:_,$message:x}=Y(),r=U({account:"",password:"",rememberMe:!1}),w=n(),m=U({account:[{required:!0,message:f("home.usernameRule"),trigger:"blur"}],password:[{required:!0,message:f("home.passwordRule"),trigger:"blur"}]}),g=n(!1);async function I(l){l&&await l.validate(async s=>{if(!s)return!1;g.value=!0;const[$]=await xe(r);g.value=!1,$?p.value=!0:x.error("账户名不存在或密码错误！")})}function S(l){l&&(x.success({message:"登录成功"}),b.push("/home"),_({title:"Welcome",message:f("home.welcome"),type:"success"}))}return(l,s)=>{const $=se,y=le,h=ne,z=re,C=ie,R=be;return P(),L("div",Ve,[a("h1",ke,M(u(X).APP.title),1),a("div",Ie,[c(C,{ref_key:"loginFormRef",ref:w,model:r,rules:m},{default:V(()=>[c(y,{prop:"account"},{default:V(()=>[c($,{modelValue:r.account,"onUpdate:modelValue":s[0]||(s[0]=v=>r.account=v),size:"large",placeholder:"".concat(l.$t("home.account")," admin")},null,8,["modelValue","placeholder"])]),_:1}),c(y,{prop:"password",style:{marginTop:"38px"}},{default:V(()=>[c($,{modelValue:r.password,"onUpdate:modelValue":s[1]||(s[1]=v=>r.password=v),type:"password",size:"large",placeholder:"".concat(l.$t("home.password")," 123456"),"show-password":"",onKeyup:s[2]||(s[2]=te(v=>I(u(w)),["enter"]))},null,8,["modelValue","placeholder"])]),_:1}),c(y,null,{default:V(()=>[a("div",Me,[c(h,{modelValue:r.rememberMe,"onUpdate:modelValue":s[3]||(s[3]=v=>r.rememberMe=v)},{default:V(()=>[F(M(l.$t("home.remember")),1)]),_:1},8,["modelValue"]),a("span",Ce,M(l.$t("home.forgot")),1)])]),_:1}),c(y,{style:{marginTop:"36px"}},{default:V(()=>[c(z,{"auto-insert-space":"",w:"full",size:"large",type:"primary",loading:u(g),class:"login-btn",onClick:s[4]||(s[4]=v=>I(u(w)))},{default:V(()=>[F(M(l.$t("home.login")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])]),a("div",De,[a("div",null,M(l.$t("home.moreLoginType")),1)]),Pe,c(R,{modelValue:u(p),"onUpdate:modelValue":s[5]||(s[5]=v=>j(p)?p.value=v:null),onChange:S},null,8,["modelValue"])])}}});const Re=N(ze,[["__scopeId","data-v-680cf070"]]),Be={relative:"",w:"screen",h:"screen",flex:"center",justify:"around",overflow:"hidden",bg:"gradient-light dark:gradient-dark"},Te=a("img",{src:ce,w:"lg"},null,-1),Fe={fixed:"",top:"3%",right:"2%",text:"xl"},Le=k({name:"Login"}),Ye=k({...Le,setup(i){return(f,b)=>(P(),L("div",Be,[Te,a("div",Fe,[c(u(Z))]),c(Re)]))}});export{Ye as default};
