(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e9761"],{"8e42":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("br"),e._m(0),r("br"),r("b-row",[r("b-col",{attrs:{cols:"10"}},[r("b-button",{staticClass:"btn-right",attrs:{variant:"info",size:"lg",align:"right"},on:{click:function(t){return t.preventDefault(),e.edit(t)}}},[e._v(" Редактировать ассортимент ")])],1),r("b-col",{attrs:{cols:"2"}},[r("b-button",{staticClass:"btn-right",attrs:{variant:"danger",size:"lg",align:"left"},on:{click:function(t){return t.preventDefault(),e.exit(t)}}},[e._v(" Выйти ")])],1)],1),r("p"),r("p"),r("dashTab")],1)},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center",attrs:{size:"XL"}},[r("b",{staticClass:"text-danger"},[e._v("СТАТУСЫ ЗАКАЗОВ")])])}],l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-table",{attrs:{striped:"",hover:"",items:e.GET_ORDERS,fields:e.fields},scopedSlots:e._u([{key:"cell(id)",fn:function(t){return[e._v(" "+e._s(t.index+1)+" ")]}},{key:"cell(order)",fn:function(t){return[r("b-btn",{attrs:{variant:"danger",size:"md"},on:{click:t.toggleDetails}},[r("b",[e._v(" "+e._s(t.detailsShowing?"Скрыть":"Просмотр")+" ")])])]}},{key:"row-details",fn:function(t){return[r("b-table",{attrs:{items:e.get_order_id(t.index),fields:e.orderFields},scopedSlots:e._u([{key:"cell(id)",fn:function(t){return[e._v(" "+e._s(t.index+1)+" ")]}}],null,!0)})]}}])})},i=[],n=r("2f62"),o=(r("56d7"),{data(){return{fields:[{key:"id",label:"№"},{key:"phone",label:"Телефон"},{key:"order",label:"Заказ",_showDetails:!0},{key:"platform",label:"Платформа"},{key:"time",label:"Время"},{key:"name",label:"Имя"},{key:"address",label:"Адрес"},{key:"payment",label:"Способ оплаты"}],orderFields:[{key:"id",label:"№"},{key:"title",label:"Товар"},{key:"cat",label:"Катег"},{key:"price",label:"Цена (ед.)"},{key:"qty",label:"Кол."}]}},computed:{...Object(n["b"])(["GET_ORDERS"])},methods:{get_order_id(e){var t=this.$store.state.orderQueue,r=t[e];return r.cart}}}),d=o,c=r("2877"),u=Object(c["a"])(d,l,i,!1,null,"aa3faeb2",null),b=u.exports,h={data(){return{items:[],fields:[],shop:""}},components:{dashTab:b},methods:{exit(){this.$router.push("/")},edit(){this.$router.push("/Edit")}},created(){this.$axios.get("/dash",{headers:{Authorization:this.$cookies.get("bothubco")}}).then(e=>{var t=e.data.payload,r=Object.keys(t[0]["user"]),a=[];t.forEach((e,s)=>{var l={};r.forEach(t=>{var r=e["user"][t];l[t]=r});var i=new Date(e.timestamp).toLocaleString("ru-KZ");l["time"]=i,l["cart"]=e.cart,a.push(l),s==t.length-1&&this.$store.dispatch("setOrder",a)})})}},f=h,p=Object(c["a"])(f,a,s,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0e9761.17b8447b.js.map