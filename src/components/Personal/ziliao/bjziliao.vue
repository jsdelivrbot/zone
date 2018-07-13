<template>
  <div class="tjshdz" style="overflow:auto;">
    <div class="header">
      <div class="header1">
        <a @click="back" href="javascript:history.back(-1);" class="a1"></a>
        <!--<a @click="back" class="a1"></a>-->
        <span class="forget">编辑资料</span>
        <a class="a2" @click="finished" v-if="isUpload">完成</a>
        <a class="a2" style="width:auto;" v-else>正在上传..</a>
      </div>
    </div>
    <div class="body">
      <div class="list">
        <span class="sp1 lh1">头像：</span>
        <span class="r">
          <!--<input style="opacity:0;position: absolute;width:0.9rem;height:0.9rem;margin-top:0.3rem;display: block;" type="file"  accept="image/*" capture="camera" @change="onchange">-->
          <input style="opacity:0;position: absolute;width:0.9rem;height:0.9rem;margin-top:0.3rem;display: block;" type="file" accept="image/*" @change="onchange">
          <!--<img id="logo" :src="data.face"/>-->
          <!--<img v-if="data.face==0" src="../../images/indexbanner.png" />-->
          <img id="logo" v-if="data.face!=0" :src="data.face"/>
          <img id="logo" v-if="data.face==0" src="../../../images/personLogo.png"/>
          <input type="hidden" name="avatar" ref="avatar"/>
        </span>
      </div>
      <div class="list">
        <span class="sp1">用户名：</span>
        <input class="r" style="pointer-events:none;" v-model="data.uname" type="text" ref="uname"/>
      </div>
      <div class="form">
        <li class="li4">
          <p @click="toggle_sex()">
            <span style="margin-left: 0.2rem;font-size:0.22rem;">性别：</span>
            <input style="pointer-events:none;color:#9f9f9f" type="text" v-model="data.str_sex" ref="sexy">
            <!--<ul class="p-ul">-->
            <!--<li class="p-li2"></li>-->
            <!--</ul>-->
          </p>
        </li>

        <li class="li5">
          <p @click = "setDate">
            <span style="margin-left: 0.2rem;font-size:0.22rem;">出生日期：</span>
            <input type="text" style="pointer-events:none;color:#9f9f9f;" v-model="data.birthday" ref="birthday">
            <!--<ul class="p-ul">-->
            <!--<li class="p-li2"></li>-->
            <!--</ul>-->
          </p>
        </li>
      </div>
      <!--<div class="list">-->
      <!--<span class="sp1">性别：</span>-->
      <!--<input class="r" v-model="data.str_sex" type="text" :sex="data.sex"/>-->
      <!--</div>-->
      <!--<div class="list">-->
      <!--<span class="sp1">出生日期：</span>-->
      <!--<input class="r" v-model="data.birthday" type="text" ref="birthday"/>-->
      <!--</div>-->
      <!--<div class="list">-->
      <!--<span class="sp1">地区</span>-->
      <!--<input class="r" type="text"/>-->
      <!--</div>-->

      <div class="form">
        <li class="li4">
          <p @click="toggle()">
            <span style="margin-left: 0.2rem;font-size:0.22rem;">所在省份：</span>
            <input style="pointer-events:none;color:#9f9f9f" type="text" ref="cap">
            <!--<ul class="p-ul">-->
            <!--<li class="p-li2"></li>-->
            <!--</ul>-->
          </p>
        </li>

        <li class="li5">
          <p @click="toggle2()">
            <span style="margin-left: 0.2rem;font-size:0.22rem;">所在城市：</span>
            <input type="text" style="pointer-events:none;color:#9f9f9f;" ref="city1">
            <!--<ul class="p-ul">-->
            <!--<li class="p-li2"></li>-->
            <!--</ul>-->
          </p>
        </li>

        <!--<li class="li6">-->
        <!--<p @click="toggle4()">-->
        <!--<span style="margin-left: 0.2rem">所在地区：</span>-->
        <!--<input type="text" style="pointer-events:none;color:#9f9f9f;" ref="district1">-->
        <!--<ul class="p-ul">-->
        <!--<li class="p-li2"></li>-->
        <!--</ul>-->
        <!--</p>-->
        <!--</li>-->
      </div>

      <div class="line"></div>
      <div class="list">
        <span class="sp1">个性标签</span>
        <input style="width:70%;" class="r" v-model="data.signature" type="text" placeholder="说点什么吧" ref="signature"/>
      </div>
      <div class="form">
        <li class="li4">
          <p @click="toggle_vip()">
            <span style="margin-left: 0.2rem;font-size:0.22rem;">主页权限：</span>
            <input style="pointer-events:none;color:#9f9f9f" v-model="data.str_space" type="text" ref="space">
            <!--<ul class="p-ul">-->
            <!--<li class="p-li2"></li>-->
            <!--</ul>-->
          </p>
        </li>
      </div>
      <!--<div class="form">-->
        <!--<li class="li4">-->
          <!--<p @click="toggle_paihangbang()">-->
            <!--<span style="margin-left: 0.2rem;font-size:0.22rem;">排行榜权限：</span>-->
            <!--<input style="pointer-events:none;color:#9f9f9f" type="text" ref="rank">-->
          <!--</p>-->
        <!--</li>-->
      <!--</div>-->
      <div class="list mb41">
        <p class="sp2" style="position: relative;">背景图片
          <span style="color: red;float: right;padding-right: 0.2rem;" @click="delbanner">删除</span>
        </p>

        <p class="sp3">
          <!--<input style="opacity:0;position: absolute;width: calc(100% - 0.5rem);height:2.8rem;display: block;" type="file"  accept="image/*" capture="camera" @change="onchange1">-->
          <input style="opacity:0;position: absolute;width: calc(100% - 0.5rem);height:2.8rem;display: block;" type="file"  accept="image/*" @change="onchange1">
          <img id="bk" v-if="data.background" :src="data.background" alt="" ref="bk">
          <img id="bk" v-if="!data.background" src="../../../images/other/bj.png"/>
        </p>
      </div>
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
          <li v-for="(address,index) in addressData" :key="index" @click="load(address,address.area_id);toggle1();load1('',address.area_id)" :data_id="address.area_id">{{address.title}}</li>
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
    <mt-popup v-model="xingbieShow" position="bottom" class="window">
    <!--<div class="window" ref="xingbie">-->
      <div class="window-header">
        <span class="window-forget">性别</span>
        <a class="window-a2" @click="toggle_sex_close()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li @click="toggle_sex_close();load_xingbie('男')">男</li>
        <li @click="toggle_sex_close();load_xingbie('女')">女</li>
      </ul>
    <!--</div>-->
    </mt-popup>
    <mt-popup v-model="quanxianShow" position="bottom" class="window">
    <div class="window" ref="quanxian">
      <div class="window-header">
        <span class="window-forget">主页权限</span>
        <a class="window-a2" @click="toggle_vip_close()"></a>
      </div>
      <p><span>请选择</span></p>
      <ul>
        <li @click="toggle_vip_close();load_quanxian('仅自己')">仅自己</li>
        <li @click="toggle_vip_close();load_quanxian('所有人')">所有人</li>
        <li @click="toggle_vip_close();load_quanxian('仅好友')">仅好友</li>
      </ul>
    </div>
    </mt-popup>
    <!--<div class="window" ref="paihangbang">-->
      <!--<div class="window-header">-->
        <!--<span class="window-forget">排行榜权限</span>-->
        <!--<a class="window-a2" @click="toggle_paihangbang_close()"></a>-->
      <!--</div>-->
      <!--<p><span>请选择</span></p>-->
      <!--<ul>-->
        <!--<li @click="toggle_paihangbang_close();load_paihangbang(1)">允许</li>-->
        <!--<li @click="toggle_paihangbang_close();load_paihangbang(2)">拒绝</li>-->
      <!--</ul>-->
    <!--</div>-->
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
  </div>
</template>
<script>
  import {setCookie,getCookie} from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
  let pid='';
  let did='';
  export default {
    data () {
      return{
        quanxianShow:false,
        xingbieShow:false,
        districtShow:false,
        provinceShow:false,
        cityShow:false,
        isload:false,
        data:{},
        logoPath:'',
        bkPath:'',
        addressData: {},
        cityData: {},
        districtData:{},
        show: true,
        isShow: true,
        tip:'',
        options:'',
        province_id:'',
        city_id:'',
        district_id:'',
        imgBase:'',
        imgBigBase:'',
        dataSex:'',
        spaceVip:'',
        birth_day:'',
        isUpload:true,
        rankVip:''
      }
    },
    mounted(){
      //$('.load').show();
      this.isload = true;
      this.getData();
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

      //是否存在input焦点事件或图层打开事件
      $('input[type!=file]').focus(function(){
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
        this.$router.goBack();
        setCookie("inputkey", '', -1);
        //android.back1();
      },
      //日期选择
      setDate(){

        this.$calendar.show({
          onOk: (date) =>{
            //console.log(date);
            this.$refs.birthday.value = date;
            this.birth_day = date
          }
        });

      },
      getData(){
//      $('.load').show();
        this.$http.get(getOpenUrl() + "/user/myprofile?t="+Math.random(), {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
//          page: start,
//          limit: size
          },
        }).then((res)=>{
          this.isload = false;
          console.log(res.body);
          if (res.status){
            this.data = res.body.data;
            this.$refs.cap.value = res.body.data.str_province;
            this.$refs.city1.value = res.body.data.str_city;
            this.province_id = res.body.data.province;
            this.loadInit(res.body.data.str_province,this.province_id);
            this.load1Init(res.body.data.str_city,this.province_id);
            this.city_id = res.body.data.city;
            if(this.data.face!=0){
              this.data.face = this.data.face + '?t=' + Math.random();
            }
//            if(this.data.isrank == 1){
//              this.$refs.rank.value = '允许';
//              this.rankVip = 1;
//            }else if(this.data.isrank == 0 || this.data.isrank == 2){
//              this.$refs.rank.value = '拒绝';
//              this.rankVip = 2;
//            }
            this.bkPath = res.body.data.bg;
            this.birth_day = res.body.data.birthday;
            this.dataSex = res.body.data.sex;

//            uname:this.$refs.uname.value,
//            sex:this.dataSex,
//            birthday:this.birth_day,
//            province:this.province_id,
//            city:this.city_id,
//            district:this.district_id,
//            signature:this.$refs.signature.value,
//            space:this.spaceVip,
//            background:this.bkPath,
//            face:this.imgBase

            $('.load').hide();
          }
        },function(err){
          this.$router.push({
            path: '/login',
            //query:{gid: res.body.data.gid}
          });
          console.log('请求失败', err);
        });
      },
      onchange(e) {
        setCookie("inputkey", '', -1);
        if (!e) { return; }
        // console.log(e)
        var reader = new FileReader();
        //获取文件
        var file = e['target']['files'][0];
        var imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file['type'])) {
          this.tip = "请选择图片！";
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000);
          return;
        }
        //读取完成
        reader.onload = (e) => {
          //获取图片dom
          //console.log('reader',e)
          $('.load').show();
          this.isUpload = false;
          var img = document.getElementById("logo");
          var img_ava = e.target['result'];
          img.src = img_ava;

//        var $maxWidth = 200,
//            $maxHeight  = 200;
//        var $srcWidth =  img.naturalWidth;
//        var $srcHeight = img.naturalHeight;
//        var $scale = Math.min($maxWidth / $srcWidth, $maxHeight / $srcHeight)
//        if ($scale < 1) {
//          // 缩略图尺寸
//          $srcWidth = parseInt($srcWidth * $scale);
//          $srcHeight = parseInt($srcHeight * $scale);
//        }
//
//
//        var quality = 1;  // 默认图片质量为0.7
//        //生成canvas
//        var canvas = document.createElement('canvas');
//        var ctx = canvas.getContext('2d');
//
//        // 创建属性节点
//        var anw = document.createAttribute("width");
//        anw.nodeValue = $srcWidth;
//        var anh = document.createAttribute("height");
//        anh.nodeValue = $srcHeight;
//        canvas.setAttributeNode(anw);
//        canvas.setAttributeNode(anh);
//        ctx.drawImage(img, 0, 0,$srcWidth,$srcHeight);
//        var baseCode = canvas.toDataURL('image/jpeg');
//        console.log(baseCode);
//        this.imgBase = baseCode;

          let self = this;

          lrz(file, { width: 200}).then(function(rst) {
            //console.log(rst.base64);
            self.imgBase = rst.base64;
            $('.load').hide();
            self.isUpload = true;
            return rst;
          }).always(function() {
            // 清空文件上传控件的值
            e.target.value = null;
          });
          //this.imgBase = img_ava;
          /*this.$http.post("http://openzone.iwsoft.net/Upload",{
            logo: this.imgBase,
            type: 'user',
            category:'images'
          }).then((res)=> {
            var data = res.body.data;
            console.log(res.body);
            this.logoPath = res.body.data.path;
            console.log(this.logoPath);
            if (res.body.status) {
              //this.getData();
            }
          })*/
        };
        reader.readAsDataURL(file);
      },
      onchange1(e) {
        setCookie("inputkey", '', -1);
        $('.load').show();
        this.isUpload = false;
        if (!e) { return; }
        // console.log(e)
        var reader = new FileReader();
        //获取文件
        var file = e['target']['files'][0];
        var imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file['type'])) {
          this.tip = "请选择图片！";
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000);
          return;
        }
        //读取完成
        reader.onload = (e) => {
          //获取图片dom
          //console.log('reader',e);
          var img = document.getElementById("bk");

          var img_ava = e.target['result'];
          img.src = img_ava;

          let self = this;
          lrz(file, {
            width: 350
          }).then(function(rst) {
            //console.log(rst.base64);
            //self.imgBigBase = rst.base64;
            self.$http.post(getOpenUrl() + "/Upload",{
              logo: rst.base64,
              type: 'user',
              category:'images',
            },{
              headers:{"Authorization": "Bearer " + getToken()}
            }).then((res)=> {
              //var data = res.body.data;
              if (res.body.code=='0000') {
                //console.log(res.body);
                self.bkPath = res.body.data.path;
                //console.log(this.bkPath);
                $('.load').hide();
                self.isUpload = true;
              }
            })
            return rst;
          }).always(function() {
            // 清空文件上传控件的值
            e.target.value = null;
          });

          //this.imgBigBase = img_ava;
        };
        reader.readAsDataURL(file);
      },
      //删除背景图片
      delbanner(){
        document.getElementById("bk").src = '';
        this.data.background = this.bkPath = '';
      },
      toggle: function() {
        console.log(123)
        this.provinceShow = true;
        this.isKey = true;
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
//        this.$refs.mark.style.display = "block";
//        this.$refs.window.style.display = "block";
      },
      toggle1: function() {
        this.isKey = false;
        this.provinceShow = false;
        setCookie("inputkey", '', -1);
//        this.$refs.mark.style.display = "none";
//        this.$refs.window.style.display = "none";
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
//        this.$refs.mark.style.display = "block";
//        this.$refs.city.style.display = "block";
      },
      toggle3: function() {
        this.cityShow = false;
        this.isKey = false;
        setCookie("inputkey", '', -1);
//        this.$refs.mark.style.display = "none";
//        this.$refs.city.style.display = "none";
      },
      toggle4: function() {
        this.districtShow = true;
        this.isKey = true;
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
//        this.$refs.mark.style.display = "block";
//        this.$refs.district.style.display = "block";
      },
      toggle5: function() {
        this.districtShow = false;
        this.isKey = false;
        setCookie("inputkey", '', -1);
//        this.$refs.mark.style.display = "none";
//        this.$refs.district.style.display = "none";
      },
      toggle_sex:function(){
        this.xingbieShow = true;
        this.isKey = true;
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
//        this.$refs.mark.style.display = "block";
//        this.$refs.xingbie.style.display = "block";
      },
      toggle_sex_close:function(){
        this.xingbieShow = false;
        this.isKey = false;
        setCookie("inputkey", '', -1);
//        this.$refs.mark.style.display = "none";
//        this.$refs.xingbie.style.display = "none";
      },
      toggle_vip:function(){
        this.quanxianShow = true;
        this.isKey = true;
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
//        this.$refs.mark.style.display = "block";
//        this.$refs.quanxian.style.display = "block";
      },
      toggle_vip_close:function(){
        this.quanxianShow = false;
        this.isKey = false;
        setCookie("inputkey", '', -1);
//        this.$refs.mark.style.display = "none";
//        this.$refs.quanxian.style.display = "none";
      },
      toggle_paihangbang:function(){
        this.isKey = true;
        let expireDays = 1000 * 60 * 60 ;
        setCookie("inputkey", 1, expireDays);
        this.$refs.mark.style.display = "block";
        this.$refs.paihangbang.style.display = "block";
      },
      toggle_paihangbang_close:function(){
        this.isKey = false;
        setCookie("inputkey", '', -1);
        this.$refs.mark.style.display = "none";
        this.$refs.paihangbang.style.display = "none";
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
      loadInit(value,id){
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
            this.$refs.cap.value   = value;
            //this.province_id = id;
          })
      },
      load1Init(value,id) {
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
      load_xingbie(xb){
        this.$refs.sexy.value = xb;
        if(xb=='男'){
          this.dataSex = 1;
        }else if(xb == '女'){
          this.dataSex = 0;
        }
      },
      load_quanxian(vip){
        this.$refs.space.value = vip;
        if(vip=='仅自己'){
          this.spaceVip = 2;
        }else if(vip=='所有人'){
          this.spaceVip = 0;
        }else if(vip=='仅好友'){
          this.spaceVip = 1;
        }
      },
      load_paihangbang(num){
        this.rankVip = num;
        if(num==1){
          this.$refs.rank.value = '允许'
        }else{
          this.$refs.rank.value = '拒绝'
        }
      },
      finished(){
        //$('.load').show();
        let options = {
          uname:this.$refs.uname.value,
          sex:this.dataSex,
          birthday:this.birth_day,
          province:this.province_id,
          city:this.city_id,
          district:this.district_id,
          signature:this.$refs.signature.value,
          space:this.spaceVip,
          background:this.bkPath,
          face:this.imgBase,
          //isrank:this.rankVip
        };
        if(this.$refs.cap.value==''&&this.$refs.city1.value!=''){
          this.tip = '省份不能为空';
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
          $('.load').hide();
        }else if(this.$refs.city1.value==''&&this.$refs.cap.value!=''){
          this.tip = '城市不能为空';
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
          $('.load').hide();
        }else{
          setTimeout(()=>{
            this.isload = true;
            //console.log(options);
            this.$http.post(getOpenUrl() + "/user/editMyprofile",options,{
              headers:{"Authorization": "Bearer " + getToken()}
            })
              .then((res) => {
                this.isload = false;
                console.log(res.body);
                if(res.body.code=='0000'){
                  $('.load').hide();
                  setCookie("inputkey", '', -1);
                  this.$root.eventHub.$emit('refreshed');
                  this.$root.eventHub.$emit('datiSuccess');
                  //this.$root.eventHub.$emit('chartSuccess');
                  this.tip = res.body.data.info;
                  $('.tip').show();
                  setTimeout(()=>{
                    $('.tip').hide();
                    this.$router.push({path: '/personal',
                    });
                  },1000)
                  //android.change1();
                }else{
                  this.tip = res.body.error_description;
                  $('.tip').show();
                  setTimeout(function(){
                    $('.tip').hide();
                  },1000)
                }
                this.onlineData = res.body.data;
              })
          },1000)
        }
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
        this.toggle_sex_close();
        this.toggle_vip_close();
        this.toggle_paihangbang_close();
        next(false)
      }else{
        next()
      }
    },
    activated(){
      //路由缓存 前进后退
      $('.load').hide();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip {
    display: none;
  }

  .header {
    height: 0.7rem;
    position: fixed;
    top: 0;
    box-shadow: 0 0 5px #ebebeb;
    width: 100%;
    background: #fff;
    z-index: 4;
    padding-top: 0.3rem;
  }

  .header1 {
    /*width: 5.92rem;*/
    margin: 0 auto;
    overflow: hidden;
    padding: 0 0.2rem;
  }

  .header .a1 {
    width: 0.18rem;
    height: 0.7rem;
    background: url(../../../images/back.png) no-repeat 0 50%;
    background-size: 0.18rem 0.34rem;
    float: left;
    display: block;
  }

  .header .a2 {
    width: 0.73rem;
    height: 0.7rem;
    float: right;
    display: block;
    color: #008dd3;
    line-height: 0.7rem;
    text-align: center;
    font-size: 0.22rem;
  }

  .forget {
    line-height: 0.7rem;
    font-size: 0.26rem;
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

  .body {
    padding-top: 1.1rem;
    padding-bottom: 0.2rem;
  }

  .list {
    border-bottom: 1px solid #ebebeb;
    padding-left: 0.23rem;
    padding-right: 0.23rem;
    font-size: 0.22rem;
    overflow: hidden;
  }

  .sp1 {
    color: #242424;
    display: block;
    float: left;
    line-height: 0.97rem;
  }

  .sp2 {
    color: #242424;
    display: block;
    height: 0.97rem;
    line-height: 0.97rem;
    width: 100%;
  }

  .sp3 {
    width: 100%;
    height: 2.8rem;
  }

  .sp3 img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.05rem;
  }

  .mb41 {
    margin-bottom: 0.41rem;
    border-bottom: 0;
  }

  .r {
    line-height: 0.97rem;
    float: right;
    padding-right: 0.2rem;
    color: #9F9F9F;
    display: block;
    text-align: right;
    font-size: 0.2rem;
  }

  .r img {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    display: block;
    padding: 0.3rem 0;
    object-fit: cover;
    cursor: pointer;
  }

  .lh1 {
    line-height: 1.57rem;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #9F9F9F;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #9F9F9F;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #9F9F9F;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #9F9F9F;
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

    background: url(../../../images/backright.png) no-repeat 95%;
    background-size:0.12rem 0.24rem;
  }

  .form p {
    border-bottom: 1px solid #ebebeb;
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

  .form input {
    color: #242424;
    font-size: 0.2rem;
    text-align: right;
    float: right;
    line-height: 0.88rem;
    margin-right: 0.6rem;
  }

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
    height: calc(100% - 2rem);
    overflow-y: auto;
  }

  .window ul li {
    line-height: 0.48rem;
    font-size: 0.2rem;
    color: #242424;
  }
</style>
