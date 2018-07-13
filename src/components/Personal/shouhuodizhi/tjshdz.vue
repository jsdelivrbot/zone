<template>
  <div class="tjshdz">
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <div class="header">
        <div class="header1">
            <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
          <!--<a @click="back" class="a1"></a>-->
            <span v-if="shName" class="forget">{{shName}}</span>
            <span class="forget" v-else>添加收货地址</span>
            <a class="a2" @click="saveAddress">保存</a>
        </div>
    </div>
    <div class="body">
    	<div class="list">
    		<span class="sp1">收货人：</span>
    		<input type="text" ref="name"/>
    	</div>
    	<div class="list">
    		<span class="sp1">手机号码：</span>
    		<input type="text" ref="tel"/>
    	</div>
    	<!--<div class="list">-->
    		<!--<span class="sp1">所在地区：</span>-->
    		<!--<span class="spa">11</span>-->
    		<!--<span class="sp2"></span>-->
    	<!--</div>-->
      <div class="form">

        <li class="li4">
          <p @click="toggle()">
            <span style="margin-left: 0.2rem">所在省份：</span>
            <input style="pointer-events:none;color:#9f9f9f;font-size: 0.22rem;" type="text" ref="cap">
          <ul class="p-ul">
            <!--<li class="p-li1" ref="cap"></li>-->
            <li class="p-li2"></li>
          </ul>
          </p>
        </li>

        <li class="li5">
          <p @click="toggle2()">
            <span style="margin-left: 0.2rem">所在城市：</span>
            <input type="text" style="pointer-events:none;color:#9f9f9f;font-size: 0.22rem;" ref="city1">
          <ul class="p-ul">
            <!--<li class="p-li1" ref="city1" ></li>-->
            <li class="p-li2"></li>
          </ul>
          </p>
        </li>

        <li class="li6">
          <p @click="toggle4()">
            <span style="margin-left: 0.2rem">所在地区：</span>
            <input type="text" style="pointer-events:none;color:#9f9f9f;font-size: 0.22rem;" ref="district1">
          <ul class="p-ul">
            <!--<li class="p-li1" ref="city1" ></li>-->
            <li class="p-li2"></li>
          </ul>
          </p>
        </li>
      </div>

    	<div class="list">
    		<span class="sp1">详细地址：</span>
    		<input type="text" ref="xxAddress"/>
    	</div>
    	<div class="list">
    		<span class="sp1">邮编：</span>
    		<input type="text" ref="zip"/>
    	</div>
    	<div class="line"></div>
    	<div class="list">
    		<span class="sp1">默认地址</span>
        <div class="checkbox" v-if="isTj">
          <input id="example" type="checkbox" onclick="return false;" v-model="check" ref="isCheck">
          <label for="example">Check</label>
        </div>
    		<div class="checkbox" v-else>
			    <input id="example" type="checkbox" v-model="check" @change="checkChange(check)" ref="isCheck">
			    <label for="example">Check</label>
			  </div>
    	</div>
    	<div class="line"></div>
    </div>
    <div class="mark" ref="mark">

    </div>
    <mt-popup v-model="provinceShow" position="bottom" class="window">
    <!--<div class="window" ref="window">-->
      <div class="window-header">
        <span class="window-forget">所在省份</span>
        <a class="window-a2" @click="toggle1()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li v-for="(address,index) in addressData" :key="index" @click="load(address,address.area_id);toggle1();load1('',address.area_id);load2('',address.area_id)" :data_id="address.area_id">{{address.title}}</li>
      </ul>
    <!--</div>-->
    </mt-popup>

    <mt-popup v-model="cityShow" position="bottom" class="window">
    <!--<div class="window" ref="city">-->
      <div class="window-header">
        <span class="window-forget">所在城市</span>
        <a class="window-a2" @click="toggle3()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li v-for="(city,index) in cityData" :key="index" @click="toggle3();load1(city,city.area_id,index);load2('',city.area_id,index)">{{city.title}}</li>
      </ul>
    <!--</div>-->
    </mt-popup>

    <mt-popup v-model="districtShow" position="bottom" class="window">
    <!--<div class="window" ref="district">-->
      <div class="window-header">
        <span class="window-forget">所在地区</span>
        <a class="window-a2" @click="toggle5()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li v-for="(district,index) in districtData" :key="index" @click="toggle5();load2(district,'',index)">{{district.title}}</li>
      </ul>
    <!--</div>-->
    </mt-popup>

    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
  </div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
let pid='';
let did='';
//let address_id='';let consignee='';let mobile='';let province='';let chengshi='';let dizhi='';let is_default='';let zipcode='';
export default {
  data () {
    return{
      districtShow:false,
      cityShow:false,
      provinceShow:false,
      isload:false,
      username:'',
      phone:'',
      email:'',
      addressData: {},
      onlineData:{},
      cityData: {},
      districtData:{},
      show: true,
      isShow: true,
      tip:'',
      options:'',
      province_id:'',
      city_id:'',
      district_id:'',
      shName:'',
      isTj:"",
      check:''
    }
  },
  mounted(){
      this.shName = this.$route.query.name;
      this.$http.get(getOpenUrl() + "/areaData", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params: {

        },
      })
      .then((res) => {

        this.addressData = res.body.data

      })

     this.getInfo();

    //是否存在input焦点事件或图层打开事件
    $('input').focus(function(){
      //获取焦点
      let expireDays = 1000 * 60 * 60 ;
      setCookie("inputkey", 1, expireDays);
    });
    let self = this;
    $(document).bind('click', function(e){
      var target = $(e.target);
      if(target.closest("input").length == 0 && target.closest('.a1').length == 0 && self.iskey){
        setCookie("inputkey", '', -1);
      }
    });
  },
  methods:{
    back(){
      setCookie("inputkey", '', -1);
      //android.back1();
    },
    getInfo(){
      this.$http.get(getOpenUrl() + "/user/addressInfo", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params: {
          address_id:this.$route.query.address_id
        },
      })
        .then((res) => {
          //this.contentData = res.body.data
          if(res.body.status===1){
            this.$refs.name.value = res.body.data.consignee;
            this.$refs.tel.value = res.body.data.mobile;
            this.$refs.cap.value = res.body.data.province;
            this.$refs.city1.value = res.body.data.city;
            this.$refs.district1.value = res.body.data.district;
            this.$refs.xxAddress.value = res.body.data.address;
            this.$refs.isCheck.checked = res.body.data.is_default;
            this.$refs.zip.value = res.body.data.zipcode;
            this.province_id = res.body.data.province_id;
            this.city_id = res.body.data.city_id;
            this.district_id = res.body.data.district_id;
          }else if(this.$route.query.listNum===0){
            this.isTj = true;
            this.check = true;
            this.$refs.isCheck.checked = 1;
          }else{
            this.check = true;
            this.$refs.isCheck.checked = 1;
          }

          this.load1Init(res.body.data.city,res.body.data.province_id);
          this.load2Init(res.body.data.district,res.body.data.city_id);
        })
    },
    checkChange(ck){
      if(ck){
        this.$refs.isCheck.checked = 1;
      }else{
        this.$refs.isCheck.checked = '';
      }
    },
    toggle: function() {
      this.provinceShow = true;
      this.isKey = true;
      let expireDays = 1000 * 60 * 60 ;
      setCookie("inputkey", 1, expireDays);
//      this.$refs.mark.style.display = "block";
//      this.$refs.window.style.display = "block";
    },
    toggle1: function() {
      this.provinceShow = false;
      this.isKey = false;
      setCookie("inputkey", '', -1);
//      this.$refs.mark.style.display = "none";
//      this.$refs.window.style.display = "none";
    },
    toggle2: function() {
      if(this.$refs.cap.value == ''){
        this.tip = '省份不能为空';
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000);

        return;
      }
      this.cityShow = true;
      this.isKey = true;
      let expireDays = 1000 * 60 * 60 ;
      setCookie("inputkey", 1, expireDays);
//      this.$refs.mark.style.display = "block";
//      this.$refs.city.style.display = "block";
    },
    toggle3: function() {
      this.cityShow = false;
      this.isKey = false;
      setCookie("inputkey", '', -1);
//      this.$refs.mark.style.display = "none";
//      this.$refs.city.style.display = "none";
    },
    toggle4: function() {
      if(this.$refs.city1.value == ''){
        this.tip = '城市不能为空';
        $('.tip').show();
        setTimeout(function(){
          $('.tip').hide();
        },1000);

        return;
      }

      this.districtShow = true;
      this.isKey = true;
      let expireDays = 1000 * 60 * 60 ;
      setCookie("inputkey", 1, expireDays);
//      this.$refs.mark.style.display = "block";
//      this.$refs.district.style.display = "block";
    },
    toggle5: function() {
      this.districtShow = false;
      this.isKey = false;
      setCookie("inputkey", '', -1);
//      this.$refs.mark.style.display = "none";
//      this.$refs.district.style.display = "none";
    },
    load(value,id) {
      pid=id;
      this.$http.get(getOpenUrl() + "/areaData", {
        params: {

        },
        headers: {
          "Authorization": "Bearer " + getToken()
        },
      })
        .then((res) => {
          this.addressData = res.body.data

          for(var i = 0; i < this.addressData.length; i++) {
            //this.$refs.cap.innerHTML = value.title;
            this.$refs.cap.value   = value.title;
            this.province_id = id;
            //this.area_id = value.id;
            //this.$refs.cap.value = id;
          }
          //this.options.province = id;
        })


    },
    load1(value,id,index) {
//      if (id = '') {
//        id = pid;
//      }
      did = id;
      this.$http.get(getOpenUrl() + "/cityData?pid=" + pid, {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
      })
        .then((res) => {
          this.cityData = res.body.data;
          for (var i = 0; i < this.cityData.length; i++) {
            if (value.title == undefined) {
              //this.$refs.city1.innerHTML = "";
              this.$refs.city1.value = "";
            } else {
              //this.$refs.city1.innerHTML = value.title;
              this.$refs.city1.value = value.title;
              this.city_id = this.cityData[index].area_id;
            }
          }
        })
    },
    load1Init(value,id) {
//      if (id = '') {
//        id = pid;
//      }
      if(this.$route.query.listNum===0){
        this.isTj = true;
        this.check = true;
        this.$refs.isCheck.checked = 1;
      }else{
        this.check = true;
        this.$refs.isCheck.checked = 1;
      }
      pid = id;
      this.$http.get(getOpenUrl() + "/cityData?pid=" + pid, {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
      })
        .then((res) => {
          this.cityData = res.body.data;
          this.$refs.city1.value = value;
          //this.city_id = this.cityData[index].area_id;
        })
    },
    load2(value,id,index) {
      if (id = '') {
        id = did;
      }
      this.$http.get(getOpenUrl() + "/cityData?pid=" + did, {
        headers: {
          "Authorization": "Bearer " + getToken()
        },

      })
        .then((res) => {
          this.districtData = res.body.data;
          for (var i = 0; i < this.districtData.length; i++) {
            if (value.title == undefined) {
              //this.$refs.city1.innerHTML = "";
              this.$refs.district1.value = "";
            } else {
              //this.$refs.city1.innerHTML = value.title;
              this.$refs.district1.value = value.title;
              this.district_id = this.districtData[index].area_id;
            }
          }
        })
    },
    load2Init(value,id) {
//      if (id = '') {
//        id = pid;
//      }
      if(this.$route.query.listNum===0){
        this.isTj = true;
        this.check = true;
        this.$refs.isCheck.checked = 1;
      }else{
        this.check = true;
        this.$refs.isCheck.checked = 1;
      }
      pid = id;
      this.$http.get(getOpenUrl() + "/cityData?pid=" + pid, {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
      })
        .then((res) => {
          this.districtData = res.body.data;
          this.$refs.district1.value = value;
          //this.city_id = this.cityData[index].area_id;
        })
    },
    saveAddress(){
      let self = this;
      let options = {
        address_id:this.$route.query.address_id,
        consignee:this.$refs.name.value,
        mobile:this.$refs.tel.value,
        province:this.province_id,
        city:this.city_id,
        district:this.district_id,
        address:this.$refs.xxAddress.value,
        is_default:this.$refs.isCheck.checked,
        zipcode:this.$refs.zip.value
      }

//      this.$refs.name.value = consignee;
//      this.$refs.tel.value = mobile;
//      this.$refs.cap.value = province;
//      this.$refs.city1.value = chengshi;
//      this.$refs.xxAddress.value = dizhi;
//      this.$refs.isCheck.value = is_default;
//      this.$refs.zip.value = zipcode;
      clearTimeout(this.fn);
      this.fn = setTimeout( ()=> {
        this.isload = true;
        this.$http.post(getOpenUrl() + "/user/editShopAddress", options, {
          headers: {"Authorization": "Bearer " + getToken()}
        })
          .then((res) => {
            this.isload = false;
            console.log(res.body);
            if (res.body.status == 0) {
              this.tip = res.body.error_description;
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
              }, 1000)
            } else {
              this.tip = res.body.data.info;
              $('.tip').show();
              setTimeout(function () {
                $('.tip').hide();
                setCookie("inputkey", '', -1);
//                self.$router.push({
//                  path: '/glshdz',
//                });
                self.$router.back(-1);
              }, 1000)
            }
            this.$root.eventHub.$emit('tjSuccess');
            this.onlineData = res.body.data;
          })
      },1000)
    }
  },
  beforeRouteLeave (to, from, next) {
    //路由离开时
    var isInputKey = parseInt(getCookie('inputkey'));
    if (isInputKey == 1){
      setCookie("inputkey", '', -1);
      this.toggle1();
      this.toggle3();
      this.toggle5();
      next(false)
    }else{
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip{display: none;}
  .header{height: 0.7rem;position: relative;box-shadow:0 0 5px #ebebeb;padding-top: 0.3rem;}
  .header1{padding: 0 0.2rem;overflow:hidden;}
  .header .a1{width: 0.18rem;height: 0.34rem;background: url(../../../images/back.png) no-repeat;background-size: cover;float:left;display: block;margin-top:0.2rem;}
  .header .a2{width: 0.73rem;height: 0.7rem;float:right;display: block;color:#008dd3;line-height:0.7rem;text-align:center;font-size:0.24rem;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .list{height:0.97rem;line-height:0.97rem;font-size: 0.22rem;border-bottom: 0.01rem solid #ebebeb;padding-left: 0.23rem;display: flex;}
  .sp1{color: #242424;}
  .spa{flex: 1;color: #9f9f9f;}
  .list input{color: #9f9f9f;flex: 1;font-size: 0.22rem;}
  .sp2{float: right;width:0.24rem;height: 0.97rem;display: block;background: url(../../../images/backright.png) no-repeat 0 50%;background-size: 0.12rem 0.24rem;margin-right: 0.32rem;}
  .checkbox{flex: 1;}
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance:none
  }
  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label {
    background-color: #e0e0e0;
    border-radius: 0.2rem;
    cursor: pointer;
    display: inline-block;
    height: 0.4rem;
    position: relative;
    text-indent: -9999px;
    width: 0.84rem;
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    background-color: #fff;
    border-radius: 0.19rem;
    content: " ";
    height: 0.38rem;
    left: 0.02rem;
    position: absolute;
    top: 0.005rem;
    width: 0.4rem;
  }
  input[type="checkbox"]:checked + label {
    background-color: #54c2f0;
  }

  input[type="checkbox"]:checked + label:after {
    left: 0.43rem;
  }
  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label {
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    -webkit-transition: left 0.3s;
    transition: left 0.3s;
  }


  .form {
    overflow: hidden;
  }

  .form-p {
    width: 100%;
    line-height: 0.73rem;
    margin-top: 0.07rem;
    border-bottom: 0.01rem solid #e0e0e0;
    font-size: 0.26rem;
    color: #008dd3;
  }

  .form li {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.24rem;
    float: left;
    display: flex;
  }

  .form p {
    border-bottom: 0.01rem solid #e0e0e0;
    float: left;
    flex: 1;
  }

  .form .div1 {
    width: 0.6rem;
    height: 100%;
    float: left;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .form .span1 {
    width: 0.2rem;
    height: 0.22rem;
    background: url(../../../images/name.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .form .span2 {
    width: 0.16rem;
    height: 0.23rem;
    background: url(../../../images/phone.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .form .span3 {
    width: 0.24rem;
    height: 0.16rem;
    background: url(../../../images/mail.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .form .span4 {
    width: 0.29rem;
    height: 0.26rem;
    background: url(../../../images/china.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .form .span5 {
    width: 0.26rem;
    height: 0.25rem;
    background: url(../../../images/city.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  .form .span6 {
    width: 0.2rem;
    height: 0.22rem;
    background: url(../../../images/test.png) no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }

  /*.form input {*/
  /*height: 0.88rem;*/
  /*width: 4.17rem;*/
  /*color: #242424;*/
  /*text-align: right;*/
  /*float: right;*/
  /*padding-right: 0.23rem;*/
  /*}*/

  .form .p-ul {
    float: right;
    display: flex;
  }

  .form .p-li1 {
    height: 0.88rem;
    float: left;
    flex: 1;
    text-align: center;
  }

  .form .p-li2 {
    height: 0.24rem;
    width: 0.12rem;
    float: left;
    background: url(../../../images/backright.png) no-repeat;
    background-size: cover;
    margin: 0.31rem 0.23rem 0 0.14rem;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(36, 153, 200, 0.3);
    display: none;
    z-index: 5;
  }

  .window {
    width: 100%;
    height: 6rem;
    z-index: 10;
    /*display: none;*/
    position: fixed;
    bottom: 0;
    background: #fff;
  }

  .window-header {
    height: 0.9rem;
    padding-left: 0.38rem;
    padding-right: 0.25rem;
    position: relative;
  }

  .window-a2 {
    width: 0.28rem;
    height: 0.28rem;
    display: block;
    background: url(../../../images/close.png) no-repeat;
    background-size: cover;
    float: right;
    margin-top: 0.34rem;
  }

  .window-forget {
    line-height: 0.88rem;
    font-size: 0.34rem;
    display: block;
    float: left;
    color: #008dd3;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .window p {
    height: 0.86rem;
    border-top: 0.01rem solid #e0e0e0;
    border-bottom: 0.01rem solid #e0e0e0;
  }

  .window p span {
    line-height: 0.84rem;
    width: 0.84rem;
    border-bottom: 0.03rem solid #008dd3;
    color: #008dd3;
    font-size: 0.22rem;
    display: block;
    margin-left: 0.17rem;
    text-align: center;
  }

  .window ul {
    margin-top: 0.16rem;
    margin-left: 0.20rem;
    height: calc(100% - 1rem);
    overflow-y: auto;

  }

  .window ul li {
    line-height: 0.48rem;
    font-size: 0.2rem;
    color: #242424;
  }
</style>
