System.register(["./leader-legacy-37715eb1.js","./index-legacy-928b4066.js","./vue-legacy-913ca2a6.js"],(function(e,l){"use strict";var a,t,p,o,r,d,i;return{setters:[e=>{a=e.f,t=e.m,p=e.c,o=e.h,r=e.e},e=>{d=e._},e=>{i=e.r}],execute:function(){e("a",d(a,[["__scopeId","data-v-e644968e"]]));const{ElInput:l,ElSelect:s}=r(),c=e("l",i([{label:"内部数据",value:0}])),b=e("g",i([{label:"电销组",value:0},{label:"回访组",value:1}]));t().then((e=>{e.data.forEach((e=>c.push({label:e.username,value:e.id})))}));var n=e("S",(e=>(e.ADD="新增",e.UPDATE="编辑",e.IP="IP白名单",e.STAT="拨打统计",e.BATCH="批量添加",e))(n||{}));e("c",[{component:s,label:"归属组长",field:"leader_id",clearable:!0,options:c},{component:s,label:"组员类型",field:"type",clearable:!0,options:b},{component:l,label:"组员手机号",field:"name",placeholder:"请输入"}]),e("s",[{fixed:!0,type:"selection",width:"55"},{fixed:!0,prop:"id",label:"编号",width:"70",align:"center"},{prop:"leader_id",label:"归属组长",width:"120"},{prop:"type",label:"组员类型",width:"90",slot:({row:e})=>[p(e?.type?"回访组":"电销组")]},{prop:"username",label:"账号",width:"120"},{prop:"phone",label:"手机号",width:"120"},{prop:"email",label:"邮箱",width:"120"},{prop:"status",label:"是否启用",width:"90",slot:({row:e})=>[o("IP白名单",((l,a)=>{e.status=!e.status}),{value:e.status})]},{prop:"callback",label:"数据复播",width:"90",slot:({row:e})=>[o("IP白名单",((l,a)=>{e.callback=!e.callback}),{value:e.callback})]},{prop:"created_at",label:"添加时间",width:"180"},{prop:"lasted_at",label:"上次登录时间",width:"120"},{prop:"lasted_ip",label:"上次登录IP",width:"120"}])}}}));
