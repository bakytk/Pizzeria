(function(t){function e(e){for(var r,s,i=e[0],l=e[1],c=e[2],u=0,d=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);p&&p(e);while(d.length)d.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,s=1;s<a.length;s++){var i=a[s];0!==o[i]&&(r=!1)}r&&(n.splice(e--,1),t=l(l.s=a[0]))}return t}var r={},s={app:0},o={app:0},n=[];function i(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-2d0e9761":"17b8447b","chunk-3d03f386":"70be6a77","chunk-45f34bd6":"6f040b3a"}[t]+".js"}function l(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-3d03f386":1,"chunk-45f34bd6":1};s[t]?e.push(s[t]):0!==s[t]&&a[t]&&e.push(s[t]=new Promise((function(e,a){for(var r="css/"+({}[t]||t)+"."+{"chunk-2d0e9761":"31d6cfe0","chunk-3d03f386":"7e01de89","chunk-45f34bd6":"b5b33b47"}[t]+".css",o=l.p+r,n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var c=n[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===r||u===o))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===r||u===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,n=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");n.code="CSS_CHUNK_LOAD_FAILED",n.request=r,delete s[t],p.parentNode.removeChild(p),a(n)},p.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(p)})).then((function(){s[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var n=new Promise((function(e,a){r=o[t]=[e,a]}));e.push(r[2]=n);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(p);var a=o[t];if(0!==a){if(a){var r=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",d.name="ChunkLoadError",d.type=r,d.request=s,a[1](d)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=r,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(a,r,function(e){return t[e]}.bind(null,r));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=u;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"039a":function(t,e,a){"use strict";var r=a("7174"),s=a.n(r);s.a},"19a7":function(t,e,a){"use strict";var r=a("65bf"),s=a.n(r);s.a},"21ab":function(t,e,a){"use strict";var r=a("a070"),s=a.n(r);s.a},"414a":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return s}));const r=t=>{function e(t){return function(e,a){return e[t]>a[t]?1:e[t]<a[t]?-1:0}}var a=t.sort(e("id"));return a},s=(t,e)=>{var a=[];return e.forEach(e=>{var r=e.cat,s=[];t.forEach(t=>{var e=Object.keys(t),a=e[0];if(a===r){var o=Object.keys(t[r]),n=o[0];s.push(t[r][n])}}),a.push(s)}),a}},"45d8":function(t,e,a){"use strict";var r=a("4f04"),s=a.n(r);s.a},"4f04":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e),a.d(e,"bus",(function(){return ht}));var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("navig"),a("router-view"),a("futer")],1)},o=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-navbar",{attrs:{toggleable:"lg",type:"light",variant:"light"}},[a("b-navbar-brand",{staticClass:"headerFont",attrs:{to:"/"}},[t._v("Dolce Vita")]),t.LARGE?a("b-navbar-nav",t._l(t.categories,(function(e){return a("b-nav-item",{key:e.id,attrs:{href:"/#"+e.cat}},[t._v(" "+t._s(e.cat)+" ")])})),1):t._e(),t.LARGE?a("b-navbar-nav",{attrs:{align:"center"}},[a("b-nav-item",{attrs:{href:"/#menu"}},[a("b-button",{attrs:{variant:"danger"}},[t._v(" Просмотр меню")])],1)],1):t._e(),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",[a("img",{attrs:{src:"https://img.icons8.com/bubbles/50/000000/red-shopping-basket.png"}}),a("a",{on:{click:t.showCart}},[t._v(" Корзина ("+t._s(t.cartLen)+") ")]),a("b-modal",{ref:"kart",attrs:{size:"md","hide-footer":""}},[a("cart",{on:{exitmd:t.hideCart}})],1),a("b-modal",{ref:"lid",attrs:{size:"md",title:"Оформление заказа","hide-footer":""}},[a("lead")],1)],1),t.LARGE?a("b-nav-item",[a("b-button",{attrs:{variant:"danger",to:"#menu"}},[t._v("8 (800) 200-30-00")])],1):t._e(),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("b-nav-item-dropdown",{attrs:{text:"Администратор",right:""}},[a("b-dropdown-item",{on:{click:t.showLog}},[t._v("Вход")]),a("b-modal",{ref:"login",attrs:{size:"md",title:"Вход в кабинет","hide-footer":""}},[a("log")],1),a("b-dropdown-item",{on:{click:t.showReg}},[t._v("Регистрация")]),a("b-modal",{ref:"registr",attrs:{size:"md",title:"Регистрация","hide-footer":""}},[a("reg")],1),a("b-dropdown-item",{on:{click:t.showRestore}},[t._v("Восстановление")]),a("b-modal",{ref:"restore",attrs:{size:"md",title:"Восстановление аккаунта","hide-footer":""}},[a("restore")],1)],1)],1)],1)],1)],1)},i=[],l=a("b3b1"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p"),t.showAlert?a("b-alert",{attrs:{show:"",variant:"primary"}},[t._v(" "+t._s(t.alertMsg)+" ")]):t._e(),a("p"),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[a("b-form-group",{attrs:{label:"Ваше имя:",description:"","label-cols-md":"3"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"text"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),a("b-form-group",{attrs:{label:"Телефон:",description:"Вводите 10 последних цифр",required:"","label-cols-md":"3",placeholder:"Обязательное поле"}},[a("vue-tel-input",t._b({staticClass:"form-input",model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}},"vue-tel-input",t.bindProps,!1))],1),a("b-form-group",{attrs:{label:"Адрес доставки:",description:"","label-cols-md":"4",required:""}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"text",placeholder:"Улица (мкр), № дома (до 50 символов)"},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1),a("b-form-select",{staticClass:"form-input",attrs:{options:t.options},model:{value:t.payment,callback:function(e){t.payment=e},expression:"payment"}}),a("div",{staticStyle:{"padding-top":"5%"}},[a("b-row",{attrs:{cols:"1","cols-sm":"4","cols-md":"4","cols-lg":"4"}},[a("b-col",[t._v("К оплате: ")]),a("b-col",[a("b",[t._v(t._s(t.SUBTOTAL))]),t._v(" тенге")])],1)],1),a("br"),a("div",{staticClass:"button"},[a("b-button",{attrs:{type:"submit",variant:"danger",size:"md"}},[t._v(" Отправить заказ ")])],1)],1)],1)},u=[],d=a("2f62"),p={data(){return{showAlert:!1,alertMsg:"",name:"",phone:"",address:"",payment:"",bindProps:{mode:"international",defaultCountry:"KZ",required:!0,enabledCountryCode:!1,onlyCountries:["RU","KZ"],placeholder:"Обязательное поле"},options:[{value:"",text:"Выберите способ оплаты"},{value:"card",text:"Банковская карта"},{value:"cash",text:"Наличными курьеру",disabled:!1}]}},computed:{...Object(d["b"])(["GET_CART","SUBTOTAL"])},methods:{onSubmit(){var t="";if(this.phone.length<10)t="Номер указан не полностью",this.alertMsg=t,this.showAlert=!0;else if(this.address.length>50||this.address.length<5)this.address.length>50?t="Строка адреса - не более 50 символов":this.address.length<5&&(t="Адрес слишком короткий"),this.alertMsg=t,this.showAlert=!0;else{var e={platform:"web"};e["name"]=this.name,e["phone"]=this.phone,e["address"]=this.address,e["payment"]=this.payment,this.$store.dispatch("sendOrder",e)}}}},h=p,m=(a("21ab"),a("2877")),f=Object(m["a"])(h,c,u,!1,null,"ff01ed36",null),b=f.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p"),t.showAlert?a("b-alert",{attrs:{show:"",variant:"primary"}},[t._v(" "+t._s(t.alertMsg)+" ")]):t._e(),a("p"),t.general?a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)},reset:t.onReset}},[a("b-form-group",{attrs:{label:"Ваше имя:",description:"","label-cols-md":"3"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"text"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),a("b-form-group",{attrs:{label:"E-mail:",description:"","label-cols-md":"3"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"email",placeholder:"name@mail.ru",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("b-form-group",{attrs:{label:"Сотовый:",description:"Вводите 10 последних цифр","label-cols-md":"3",placeholder:"Обязательное поле"}},[a("vue-tel-input",t._b({staticClass:"form-input",model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}},"vue-tel-input",t.bindProps,!1))],1),a("b-form-group",{attrs:{label:"Пароль:","label-cols-md":"3",description:"Cлитно: латинские буквы или цифры (6-10 символов)"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"password",placeholder:"Ваш пароль"},model:{value:t.pwd,callback:function(e){t.pwd=e},expression:"pwd"}})],1),a("b-form-group",{attrs:{label:"Подтвердите пароль:","label-cols-md":"3"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"password",placeholder:"Повторите пароль"},model:{value:t.pwd2,callback:function(e){t.pwd2=e},expression:"pwd2"}})],1),a("b-form-group",{attrs:{label:"Название магазина:","label-cols-md":"3",description:"Cлитно: латинские буквы или цифры (5-20 символов)"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"text",placeholder:"Магазин ABC"},model:{value:t.shop,callback:function(e){t.shop=e},expression:"shop"}})],1),a("b-form-select",{staticClass:"form-input",attrs:{options:t.options},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),a("br"),a("br"),a("b-button",{attrs:{type:"submit",variant:"danger"}},[t._v("Отправить")]),a("b-button",{attrs:{type:"reset",variant:"info"}},[t._v("Сбросить")])],1):t._e()],1)},g=[],_={data(){return{showAlert:!1,alertMsg:"",general:!0,name:"",email:"",phone:"",pwd:"",pwd2:"",shop:"",selected:"",bindProps:{mode:"international",defaultCountry:"KZ",required:!0,enabledCountryCode:!1,onlyCountries:["RU","KZ"],placeholder:"Обязательное поле"},options:[{value:"",text:"Выберите категорию магазина"},{value:"flower",text:"Цветочный магазин"},{value:"barber",text:"Салон красоты/Барбершоп",disabled:!0},{value:"food",text:"Доставка еды",disabled:!1},{value:"other",text:"Иное",disabled:!1}]}},computed:{},methods:{onSubmit(){0==this.name.length?(this.alertMsg="Укажите Ваше имя",this.showAlert=!0):0==this.email.length?(this.alertMsg="Email не указан",this.showAlert=!0):this.phone.length<10?(this.alertMsg="Номер указан не корректно, повторите ввод",this.showAlert=!0):0==this.pwd.length||0==this.pwd2.length?(this.alertMsg="Oдно из паролей не указан",this.showAlert=!0):this.pwd!=this.pwd2?(this.alertMsg="Введенные пароли не совпадают",this.showAlert=!0):0==this.shop.length?(this.alertMsg="Название магазина не введено",this.showAlert=!0):this.$axios.post("/register",{name:this.name,email:this.email,phone:this.phone,pwd:this.pwd,shop:this.shop,category:this.selected}).then(t=>{t.data.success&&(this.general=!1),this.alertMsg=t.data.message,this.showAlert=!0})},onReset(){this.name="",this.email="",this.phone="",this.pwd="",this.pwd2="",this.shop="",this.selected="",this.showAlert=!1,this.general=!0,this.alertMsg=""}}},y=_,w=(a("80b5"),Object(m["a"])(y,v,g,!1,null,"b3482f3a",null)),E=w.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-bottom":"10%"}},[a("p"),t.show?a("b-alert",{attrs:{show:"",variant:"primary"}},[t._v(t._s(t.alertMsg))]):t._e(),a("p"),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)},reset:t.onReset}},[a("b-form-group",{attrs:{id:"group-1",label:"E-mail:",description:""}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"email",required:"",placeholder:"name@yandex.com"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),a("b-form-group",{attrs:{id:"group-2",label:"Пароль:","label-for":"input-2"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"password",required:"",placeholder:"Ваш пароль"},model:{value:t.form.pwd,callback:function(e){t.$set(t.form,"pwd",e)},expression:"form.pwd"}})],1),a("b-button",{attrs:{type:"submit",variant:"info"}},[t._v("Отправить")]),a("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Сбросить")])],1)],1)},k=[],x={data(){return{form:{email:"",pwd:""},show:!1,alertMsg:""}},methods:{onSubmit(){this.$axios.post("/login",{email:this.form.email,pwd:this.form.pwd}).then(t=>{1==t.data.success?(this.$cookies.set("bothubco",t.data.token),this.$router.push("/Dashboard"),ht.$emit("exitLogin")):(this.alertMsg=t.data.message,this.show=!0)})},onReset(){this.form.email="",this.form.pwd="",this.show=!1,this.alertMsg=""}}},S=x,T=(a("039a"),Object(m["a"])(S,C,k,!1,null,null,null)),A=T.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-bottom":"10%"}},[t.show?a("b-alert",{attrs:{show:"",variant:"primary"}},[t._v(t._s(t.alertMsg))]):t._e(),t.general?a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)},reset:t.onReset}},[a("p",[t._v(" Для восстановления пароля введите e-mail: ")]),a("b-form-group",{attrs:{description:"ВНИМАНИЕ: ответ сервера может занять 3-5 секунд"}},[a("b-form-input",{staticClass:"form-input",attrs:{type:"email",required:"",placeholder:"name@mail.ru"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("b-button",{attrs:{type:"submit",variant:"info"}},[t._v("Отправить")]),a("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Сбросить")])],1):t._e()],1)},$=[],M={data(){return{email:"",general:!0,show:!1,alertMsg:""}},methods:{onSubmit(){this.$axios.post("/restore",{email:this.email}).then(t=>{t.data.success&&(this.general=!1),this.alertMsg=t.data.message,this.show=!0})},onReset(){this.email="",this.show=!1,this.alertMsg=""}}},L=M,R=(a("19a7"),Object(m["a"])(L,O,$,!1,null,null,null)),j=R.exports,G={data(){return{}},components:{cart:l["a"],lead:b,reg:E,log:A,restore:j},methods:{showCart(){this.$refs["kart"].show()},showReg(){this.$refs["registr"].show()},showLog(){this.$refs["login"].show()},showRestore(){this.$refs["restore"].show()},hideCart(){this.$refs.kart.hide(),this.$refs.lid.show()}},computed:{...Object(d["b"])(["SMALL","LARGE"]),...Object(d["c"])(["categories"]),categories(){return this.$store.state.categories},cartLen(){return this.$store.state.cart.length}},mounted(){ht.$on("exitLead",()=>{this.$refs["lid"].hide();var t=this.$store.state.orderStatus,e=this.$store.state.orderMsg,a=t?"success":"warning";this.$fire({text:e,type:a,confirmButtonColor:"#dc3545"})}),ht.$on("exitLogin",()=>{this.$refs["login"].hide()})}},P=G,D=(a("9ef4"),Object(m["a"])(P,n,i,!1,null,"f1e450b4",null)),I=D.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-navbar",{attrs:{type:"light",variant:"light",tabs:"",justified:""}},[a("div",{staticClass:"futer"},[a("b-nav-text",{staticClass:"justify2"},[a("b",[t._v("Адрес")]),t._v(": Ул. Выставочная, 1, г. Алматы ")]),a("b-nav-text",{staticClass:"justify2"},[a("b",[t._v("Телефон")]),t._v(": 8-800-2003000 ")]),a("b-nav-text",{staticClass:"justify2"},[a("b",[t._v("E-mail")]),t._v(": info@example.com")])],1)])},q=[],z={name:"Futer"},B=z,U=(a("45d8"),Object(m["a"])(B,N,q,!1,null,"40efaef5",null)),H=U.exports,K={name:"App",components:{navig:I,futer:H}},Y=K,Z=Object(m["a"])(Y,s,o,!1,null,null,null),F=Z.exports,Q=a("8c4f");r["default"].use(Q["a"]);const V=[{path:"/",name:"Home",component:()=>a.e("chunk-3d03f386").then(a.bind(null,"bb51"))},{path:"/Dashboard",name:"Dashboard",component:()=>a.e("chunk-2d0e9761").then(a.bind(null,"8e42"))},{path:"/Edit",name:"Edit",component:()=>a.e("chunk-45f34bd6").then(a.bind(null,"1071"))}],J=new Q["a"]({mode:"history",routes:V});var W=J,X=a("bc3a"),tt=a.n(X),et=a("2b27"),at=a.n(et),rt=a("414a");r["default"].use(d["a"]);var st=new d["a"].Store({state:{loggedIn:!1,shop:"",device:"",categories:[],catNames:[],itemNames:[],itemLists:[],user:{},cart:[],cartShow:!1,serverStatus:0,successStatus:!1,serverMsg:"",orderStatus:!1,orderMsg:"",orderQueue:[],orderId:0},getters:{NONEMPTY_CART:t=>()=>t.cart.length>0,GET_CATEGORIES:t=>t.categories,GET_CART:t=>t.cart,SUBTOTAL:t=>{var e=0,a=t.cart;return a.forEach(t=>{e+=t.qty*t.price}),e},SMALL:t=>{var e=t.device;return"SMALL"===e},LARGE:t=>{var e=t.device;return"LARGE"===e},GET_ORDERS:t=>t.orderQueue},mutations:{login(t){t.loggedIn=!0},logout(t){t.loggedIn=!1},SET_SHOP(t,e){t.shop=e},SET_DEVICE(t,e){"mobile"===e||"tablet"===e?t.device="SMALL":"laptop"!==e&&"desktop"!==e||(t.device="LARGE")},TOGGLE_CART_SHOW(t){t.cartShow=!t.cartShow},SET_CATEGORIES(t,e){t.categories=e;var a=[];e.forEach((r,s)=>{var o={},n=r.cat;o["text"]=n,o["value"]=n,a.push(o),s===e.length-1&&(t.catNames=a)})},SET_ITEMLISTS(t,e){t.itemLists=e},SET_ORDER(t,e){t.orderQueue=e},SET_ITEMS(t,e){var a=t.itemLists,r=[];a.forEach(a=>{var s=a[0];s.cat===e&&a.forEach((e,a)=>{r.push(e.title),a===r.length-1&&(t.itemNames=r)})})}},actions:{login(t){t.commit("login")},logout({commit:t}){t("logout")},setDevice(t,e){t.commit("SET_DEVICE",e)},toggleCartShow(t){t.commit("TOGGLE_CART_SHOW")},loadData({commit:t}){r["default"].axios.get("https://test-bot.club/sample",{params:{shopname:"samplepizza"}}).then(t=>t.data).then(e=>{var a=Object(rt["a"])(e[0]),r=Object(rt["b"])(e[1],a);t("SET_CATEGORIES",a),t("SET_ITEMLISTS",r)}).catch(t=>{console.error(t)})},addToCart({commit:t,state:e},a){r["default"].axios.post("https://test-bot.club/cart/add",a).then((function(t){e.successStatus=t.data.success,e.serverMsg=t.data.message,ht.$emit("itemAdded")})).catch((function(t){console.log(t)}))},getCart({commit:t,state:e}){r["default"].axios.post("https://test-bot.club/cart/get").then((function(t){e.cart=t.data})).catch((function(t){console.log(t)}))},increment({commit:t,state:e},a){r["default"].axios.post("https://test-bot.club/cart/incr",{productid:a,dir:"plus"}).then((function(t){e.cart=t.data})).catch((function(t){console.log(t)}))},decrement({commit:t,state:e},a){r["default"].axios.post("https://test-bot.club/cart/incr",{productid:a,dir:"minus"}).then((function(t){e.cart=t.data})).catch((function(t){console.log(t)}))},rm({commit:t,state:e},a){r["default"].axios.post("https://test-bot.club/cart/del",{productid:a}).then((function(t){e.cart=t.data})).catch((function(t){console.log(t)}))},emptyCart({commit:t,state:e}){r["default"].axios.post("https://test-bot.club/cart/empty").then((function(t){e.cart=t.data})).catch((function(t){console.log(t)}))},checkout({commit:t,state:e}){r["default"].axios.post("https://test-bot.club/cart/checkout").then((function(t){})).catch((function(t){console.log(t)}))},sendOrder({commit:t,state:e},a){r["default"].axios.post("https://test-bot.club/order",a).then((function(t){e.orderStatus=t.data.success,e.orderMsg=t.data.message,e.orderStatus&&(e.cart=[])})).then((function(){ht.$emit("exitLead")})).catch((function(t){console.log(t)}))},setOrder({commit:t},e){t("SET_ORDER",e)},setItems({commit:t},e){t("SET_ITEMS",e)}}}),ot=a("660e"),nt=a("683f"),it=a("1dce"),lt=a.n(it),ct=a("f62e"),ut=a("5f5b"),dt=(a("ab8b"),a("2dd8"),a("a7fe")),pt=a.n(dt);r["default"].use(ot["a"],{breakpoints:{mobile:450,tablet:900,laptop:1250,desktop:1/0}});const ht=new r["default"];r["default"].use(nt["a"]),r["default"].use(lt.a),r["default"].use(ct["a"]),r["default"].use(at.a),r["default"].use(ut["a"]),r["default"].config.productionTip=!0,r["default"].use(pt.a,tt.a);const mt={baseURL:"https://test-bot.club",timeout:3e4};r["default"].prototype.$axios=tt.a.create(mt),new r["default"]({router:W,store:st,axios:tt.a,render:function(t){return t(F)}}).$mount("#app")},"5db0":function(t,e,a){},"65bf":function(t,e,a){},7174:function(t,e,a){},"80b5":function(t,e,a){"use strict";var r=a("5db0"),s=a.n(r);s.a},"9ef4":function(t,e,a){"use strict";var r=a("d895"),s=a.n(r);s.a},a070:function(t,e,a){},aa3c:function(t,e,a){"use strict";var r=a("f081"),s=a.n(r);s.a},b3b1:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.NONEMPTY_CART?a("b-table",{ref:"table",attrs:{striped:"",small:"",hover:"",items:t.GET_CART,fields:t.fields,"foot-clone":""},scopedSlots:t._u([{key:"cell(id)",fn:function(e){return[t._v(" "+t._s(e.index+1)+" ")]}},{key:"cell(edit)",fn:function(e){return[a("b-btn",{staticClass:"btn-circle",attrs:{variant:"success",size:"md"},on:{click:function(a){t.incr(e.index)}}},[a("b",[t._v("+")])]),a("b-btn",{staticClass:"btn-circle",attrs:{variant:"warning",size:"md"},on:{click:function(a){t.decr(e.index)}}},[a("b",{staticStyle:{color:"white"}},[t._v("–")])]),a("b-btn",{staticClass:"btn-circle",attrs:{variant:"danger",size:"md"},on:{click:function(a){t.rm(e.index)}}},[a("b",[t._v("X")])])]}},{key:"foot(id)",fn:function(t){return[a("p")]}},{key:"foot(title)",fn:function(t){return[a("p")]}},{key:"foot(cat)",fn:function(t){return[a("p")]}},{key:"foot(qty)",fn:function(e){return[a("b",[t._v("ИТОГО:")])]}},{key:"foot(price)",fn:function(e){return[a("p",[t._v(t._s(t.SUBTOTAL))])]}},{key:"foot(edit)",fn:function(t){return[a("p")]}}],null,!1,1535586939)}):t._e(),t.NONEMPTY_CART?a("div",{staticClass:"button"},[a("b-button",{attrs:{variant:"danger",size:"md"},on:{click:t.toCheckout}},[t._v(" Оформить заказ ")]),a("b-button",{attrs:{variant:"info",size:"md"},on:{click:t.emptyCart}},[t._v(" Очистить корзину ")])],1):t._e()],1)},s=[],o=a("2f62"),n=(a("414a"),a("56d7")),i={name:"shoppingCart",data(){return{cost:0,fields:[{key:"id",label:"№"},{key:"title",label:"Товар"},{key:"cat",label:"Катег"},{key:"qty",label:"Кол."},{key:"price",label:"Цена (ед.)"},{key:"edit",label:"Редакт."}]}},computed:{...Object(o["b"])(["GET_CART","SUBTOTAL","SMALL","NONEMPTY_CART"])},created(){this.$store.dispatch("getCart")},mounted(){n["bus"].$on("cartUpdated",()=>{})},methods:{incr(t){var e=this.$store.getters.GET_CART,a=e[t];this.$store.dispatch("increment",a.productid)},decr(t){var e=this.$store.getters.GET_CART,a=e[t];this.$store.dispatch("decrement",a.productid)},rm(t){var e=this.$store.getters.GET_CART,a=e[t];this.$store.dispatch("rm",a.productid)},emptyCart(){this.$store.dispatch("emptyCart")},toCheckout(){this.$emit("exitmd"),this.$store.dispatch("checkout")}}},l=i,c=(a("aa3c"),a("2877")),u=Object(c["a"])(l,r,s,!1,null,"1587401a",null);e["a"]=u.exports},d895:function(t,e,a){},f081:function(t,e,a){}});
//# sourceMappingURL=app.f5c990bc.js.map