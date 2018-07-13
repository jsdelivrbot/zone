 <template>
	<div class="mytz">
		<!--<my-header title="申请vip"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">申请vip</span>
      </div>
    </div>
	    <div class="body">
    			<ul class="body-list">
	    			<li class="li2">姓名：</li>
	    			<input type="text" name="" id="" value="" ref="name"/>
	    		</ul>
    			<ul class="body-list" @click="toggle6()">
	    			<li class="li2">公司：</li>
            <input style="pointer-events:none;color:#9f9f9f" type="text" ref="company">
	    			<li class="li3"></li>
	    		</ul>
	    		<ul class="body-list">
	    			<li class="li2">职位：</li>
	    			<input type="text" name="" id="" value="" ref="position"/>
	    		</ul>
	    		<ul class="body-list">
	    			<li class="li2">手机号：</li>
	    			<input type="text" name="" id="" value="" ref="mobile"/>
	    		</ul>
	    		<!--<ul class="body-list">-->
	    			<!--<li class="li2">地区：</li>-->
            <!--<input type="text" name="" id="" value="" />-->
	    		<!--</ul>-->
        <div class="form">

          <li class="li4">
            <p @click="toggle()">
              <span style="margin-left: 0.2rem">所在省份：</span>
              <input style="pointer-events:none;color:#9f9f9f" type="text" ref="cap">
            <ul class="p-ul">
              <!--<li class="p-li1" ref="cap"></li>-->
              <li class="p-li2"></li>
            </ul>
            </p>
          </li>

          <li class="li5">
            <p @click="toggle2()">
              <span style="margin-left: 0.2rem">所在城市：</span>
              <input type="text" style="pointer-events:none;color:#9f9f9f;" ref="city1">
            <ul class="p-ul">
              <!--<li class="p-li1" ref="city1" ></li>-->
              <li class="p-li2"></li>
            </ul>
            </p>
          </li>

          <li class="li6">
            <p @click="toggle4()">
              <span style="margin-left: 0.2rem">所在地区：</span>
              <input type="text" style="pointer-events:none;color:#9f9f9f;" ref="district1">
            <ul class="p-ul">
              <!--<li class="p-li1" ref="city1" ></li>-->
              <li class="p-li2"></li>
            </ul>
            </p>
          </li>
        </div>
        <div class="btn" @click="saveAddress">完成</div>
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

    <mt-popup v-model="companyListShow" position="bottom" class="window">
    <!--<div class="window" ref="companyList">-->
      <div class="window-header">
        <span class="window-forget">所在公司</span>
        <a class="window-a2" @click="toggle7()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li v-for="(com,index) in companyData" :key="index" @click="toggle7();load3(com,com.user_group_id,index)">{{com.title}}</li>
      </ul>
    <!--</div>-->
    </mt-popup>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
	</div>

</template>
<script>
    import qs from 'qs'
    import { setCookie, getCookie } from '../../../assets/js/cookie.js'
    import {getOpenUrl,getToken} from '../../../assets/js/common.js'
    let pid='';
    let did='';
    export default {
        data () {
             return {
               provinceShow:false,
               cityShow:false,
               districtShow:false,
               companyListShow:false,
               isload:false,
               addressData: {},
               cityData: {},
               districtData:{},
               companyData:{},
               show: true,
               isShow: true,
               tip:'',
               options:'',
               province_id:'',
               city_id:'',
               district_id:'',
               user_group_id:''
             };
         },
         mounted(){
           this.$http.get(getOpenUrl() + "/areaData", {
             params: {

             },
             headers: {
               "Authorization": "Bearer " + getToken()
             },
           })
             .then((res) => {

               this.addressData = res.body.data

             })

           this.$http.get(getOpenUrl() + "/user/mobCompany", {
             headers: {
               "Authorization": "Bearer " + getToken()
             },
             params: {
               uid:this.$route.query.uid
             },
           })
             .then((res) => {

               this.companyData = res.body.data.company;

             })

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
         methods: {
           toggle: function() {
             this.provinceShow = true;
             this.isKey = true;
             let expireDays = 1000 * 60 * 60 ;
             setCookie("inputkey", 1, expireDays);
//             this.$refs.mark.style.display = "block";
//             this.$refs.window.style.display = "block";
           },
           toggle1: function() {
             this.provinceShow = false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
//             this.$refs.mark.style.display = "none";
//             this.$refs.window.style.display = "none";
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
//             this.$refs.mark.style.display = "block";
//             this.$refs.city.style.display = "block";
           },
           toggle3: function() {
             this.cityShow = false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
//             this.$refs.mark.style.display = "none";
//             this.$refs.city.style.display = "none";
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
//             this.$refs.mark.style.display = "block";
//             this.$refs.district.style.display = "block";
           },
           toggle5: function() {
             this.districtShow = false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
//             this.$refs.mark.style.display = "none";
//             this.$refs.district.style.display = "none";
           },
           toggle6: function() {
             this.companyListShow = true;
             this.isKey = true;
             let expireDays = 1000 * 60 * 60 ;
             setCookie("inputkey", 1, expireDays);
//             this.$refs.mark.style.display = "block";
//             this.$refs.companyList.style.display = "block";
           },
           toggle7:function(){
             this.companyListShow = false;
             this.isKey = false;
             setCookie("inputkey", '', -1);
//             this.$refs.mark.style.display = "none";
//             this.$refs.companyList.style.display = "none";
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
           load3(value,id,index) {
             this.$refs.company.value = value.title;
             this.user_group_id = id;
           },
           saveAddress(){
             let options = {
               party_id:this.$route.query.uid,
               name:this.$refs.name.value,
               mobile:this.$refs.mobile.value,
               province:this.province_id,
               city:this.city_id,
               district:this.district_id,
               user_group_id:this.user_group_id,
               position:this.$refs.position.value,
             }

             console.log(options);
             clearTimeout(this.fn);
             this.fn = setTimeout( ()=> {
               this.isload = true;
               this.$http.post(getOpenUrl() + "/user/applyVip", options, {
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
                     this.$router.push({
                       path: '/myyq',
                       //query:{gid: res.body.data.gid}
                     });
                     this.$root.eventHub.$emit('yqSuccess');
                   }
                   //this.onlineData = res.body.data;
                 })
             },500)
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
          this.toggle7();
          next(false)
        }else{
          next()
        }
      }
    }
</script>
<style scoped>
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .header{position: fixed;top: 0;}
  .body{padding-top: 1.18rem;}
  .body-list{border-bottom: 0.01rem solid #ebebeb;overflow: hidden;padding-left: 0.2rem;}
  .body-list li{float: left;height: 0.87rem;line-height: 0.87rem;font-size: 0.24rem;color: #242424;}
  .body-list .li1{width:0.28rem;background: url(../../../images/wurao.png)no-repeat 0 50%;background-size: 0.28rem 0.26rem;margin-left: 0.2rem;margin-right: 0.12rem;}
  .body-list .li3{width:0.12rem;background: url(../../../images/backright.png)no-repeat 0 50%;background-size: 0.12rem 0.24rem;margin-right: 0.26rem;float: right;}
  .body-list input{color: rgb(159, 159, 159);display: block;padding: 0.3rem 0;float: left;}
  .btn{width: 2.38rem;height: 0.62rem;border-radius: 0.31rem;background: #54C2F0;color: #fff;text-align: center;line-height: 0.62rem;font-size: 0.24rem;position:absolute;left: 50%;transform: translateX(-50%);margin-top: 0.7rem;}
  .tip{display: none;}

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
    z-index: 999;
  }

  .window {
    width: 100%;
    height: 6rem;
    z-index: 999;
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
