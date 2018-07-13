<template>
	<div class="index backtop" style="overflow-y: scroll;">

		<div class="top">
			<div class="header">
				<div class="headerall">
					<a href="javascript:history.back(-1);" @click="back"></a>
          <!--<a @click="back" class="a1q"></a>-->
					<span class="forget">我的邀请</span>
				</div>

		    </div>
			<div class="top1">
				<div class="top2">
					<p class="sp1">{{score}}</p>
					<p class="sp2">当前积分</p>
				</div>
				<div class="top3">
					<ul class="ul1">
						<li>已邀请</li>
						<li>{{data.peo_num}}<span>人</span></li>
					</ul>
					<ul class="ul2">
						<li>已申请vip</li>
						<li>{{data.apply_num}}<span>人</span></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="line"></div>
    <div class="page-loadmore" style="position:relative;top:3.96rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 3.96rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

		<div class="body">
			<p class="p1">已邀请的好友</p>
      <div v-for="(data,index) in items" :key="index">
        <ul class="ul1" >
          <li class="ml">{{data.uname}}</li>
          <router-link :to="{path:'/sqvip',query:{uid:data.uid}}" v-if="data.is_pass==0">
            <li class="li1 f18">申请vip</li>
          </router-link>
          <li class="li2 f18" v-if="data.is_pass==1">审核中</li>
          <li class="li2 f18" v-if="data.is_pass==2">已申请</li>
          <li class="li2 f18" v-if="data.is_pass==3">已拒绝</li>
        </ul>
      </div>
      <!--<div class="loading-layer">-->
        <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
        <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
      <!--</div>-->
      <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
			<!--<ul class="ul1">-->
				<!--<li class="ml">关之琳</li>-->
				<!--<li class="li2 f18">vip</li>-->
			<!--</ul>-->
		</div>

      </mt-loadmore>
    </div>
		<a href="#/yq"><div class="an"><img src="../../../images/tzbt.png"/></div></a>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
	</div>
</template>
<script>
import {setCookie,getCookie} from '../../../assets/js/cookie.js'
import {getOpenUrl,getToken} from '../../../assets/js/common.js'
import qs from 'qs'
var top = ''
var status = 1, start = 1, size = 10, loading = false, end = false;
export default {
  data () {
    return{
      isload:false,
      data:'',
      score:'',
      noData: '',
      items: [],
      allLoaded: false,
      scrollMode:"auto",
      topStatus: '',
      st:{},
      loadingshow:false,
    }
  },
  mounted(){
    this.type   = status;
    this.start  = start = 1;
    this.bottom = size //默认加载10条数据
    loading = end = false;
    var self      = this;
    //$('.load').show();
    this.isload = true;

    this.$root.eventHub.$on('datiSuccess',()=>{
      this.items = [];
      this.getData(this.type, this.start, this.bottom);
      this.getScore();
    })

    this.getData(this.type, this.start, this.bottom);
    this.getScore();

     //this.tabScroll();

    $('.index').scroll(function(){
      if ($('.index').scrollTop() > ($('.top').height() - $('.header').height())){
        $('.header').addClass('on')
      }else{
        $('.header').removeClass('on')
      }
    })

    //$('.body').css('min-height', $(window).height() - $('.top').outerHeight() - $('div.header').outerHeight());
  },
  methods:{
      back(){
        this.$router.goBack();
        //android.back1();
      },
//	   tabScroll(){
//         window.addEventListener("scroll",this.toScroll);
//      },
//     toScroll(){
//        if(loading || end) return;
//		if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//        $('.loading-layer span').addClass('active');
//        loading = true;
//        start += size;
//        this.getData(status, start, size);
//      }
//     },
    loadTop() { // 刷新数据的操作
      top=this.scroll;
      var self = this;
      setTimeout(()=> {
        this.start=1;
        this.$http.get(getOpenUrl() + '/user/myInvite', {
          headers: {
            "Authorization": "Bearer " + getToken()
          },
          params:{
            page: start,
            limit: size
          },
        }).then((res)=>{
          var data = res.body.data;
          this.data = res.body.data;
          console.log(res.body);
          if (res.body.count > 0){
            self.items.splice(0, self.items.length);
            self.allLoaded = false;
            self.loadingshow=false;
            self.$refs.loadmore.onTopLoaded();
            $.each(data.invite_data, function(key, val){
              self.items.push(val);
            });
          }else{
            self.allLoaded = true;
            self.loadingshow=true;
          }
          loading = false;
          $('.load').hide();
          $('.first').show();
          $('div[type="'+this.type+'"]').addClass('isload').show();
        },function(err) {
          this.$router.push({
            path: '/login',
            //query:{gid: res.body.data.gid}
          });
          console.log('请求失败', err);
        });
      }, 2000);
    },
    loadBottom() { // 加载更多数据的操作
      //this.allLoaded = true;// 若数据已全部获取完毕
      top=this.scroll;
      var self = this;
      self.start+=1;
      setTimeout(function() {
        self.getData(self.type, self.start,size);
        if(self.st.status==0){
          self.allLoaded = true;
          self.loadingshow=true;
        }
        self.$refs.loadmore.onBottomLoaded();
      }, 2000);

    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status){
      this.bottomStatus = status;
    },
    getData(type, start, size){
      top=0
      this.$store.commit('HOMESTOPF',top)
      $(".backtop").animate({"scrollTop":this.scroll},0)

//            console.log(type, status)
      if (status !== type && !loading){
        this.items = [];
        end        = false;
        loading    = false;
      }
      status = type;
      var self   = this;

      this.$http.get(getOpenUrl() + '/user/myInvite', {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          page: start,
          limit: size
        },
      }).then((res)=>{
        this.isload = false;
        $('.loading-layer span').removeClass('active');
        $('.loading-layer div').removeClass('active');

        $('.backtop').scroll(()=> {
          this.scroll=$('.backtop').scrollTop();
        })

        var data = res.body.data;
        this.data = res.body.data;
        console.log(res.body);
        if (res.body.count > 0){
          $.each(data.invite_data, function(key, val){
            self.items.push(val);
          });
          if (res.body.count < size){
            //end = true;
          }
        }else{
          end = true;
          self.noData = "没有更多数据"
          self.loadingshow=true;
          $('.loading-layer div').addClass('active');
        }
//              console.log(self.items)
        loading = false;
        $('.load').hide();
        $('.first').show();
        $('div[type="'+type+'"]').addClass('isload').show();
      },function(err) {
        this.$router.push({
          path: '/login',
          //query:{gid: res.body.data.gid}
        });
        console.log('请求失败', err);

      });
    },
    getScore(){
      this.$http.get(getOpenUrl() + "/user/scoreExp", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          type:'score'
        },
      }).then((res)=>{
        if(res.body.status){
          console.log(res.body);
          this.score = res.body.data.score;
        }
      });
    }
  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.toScroll);
  },
  activated(){
    //路由缓存 前进后退
    $('.load').hide();
    $(".backtop").animate({"scrollTop":this.scroll},0)
  },
  beforeRouteLeave(to,from,next){
    top=this.scroll
    this.$store.commit('HOMESTOPF',top)
    next();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .header.on .forget{color:#008dd3}
  .header.on .a1q{background: url(../../../images/back.png) no-repeat;background-size: cover;}

  .index{height: 100%;}
  .header{height: 0.7rem;width: 100%;z-index: 1;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{position:fixed;width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/backw.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #fff;position: fixed;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .top{width: 100%;height: 3.96rem;background: url(../../../images/rwbk.png) no-repeat;background-size: cover;position: fixed;}
  .top1{height: 1.72rem;}

  .top2{text-align: center;color: #fff;border-top: 1px solid #75cefa;border-bottom: 1px solid #75cefa;height: 100%;}
  .top2 .sp1{font-size: 0.26rem;line-height: 0.49rem;margin-top: 0.41rem;}
  .top2 .sp2{font-size: 0.2rem;line-height: 0.43rem;}
  .top3{width: 6.01rem;margin: 0 auto;box-sizing: border-box;overflow: hidden;margin-top: 0.2rem;}
  .top3 ul{position:relative;float: left;font-size: 0.2rem;color: #fff;text-align: center;width: 50%;}
  .top3 .ul1:after{content:"";position:absolute;right:0;top:0;height:100%;width:1px;background:#7cd3fe;}


  .body .p1{height: 0.67rem;border-bottom: 1px solid #ebebeb;padding-left: 0.7rem;line-height: 0.67rem;font-size: 0.22rem;color: #292929;background: url(../../../images/other/yq.png) no-repeat 0.2rem 50%;background-size: 0.33rem 0.33rem;}

  .ml{margin-left: 0.2rem;}
  .body .ul1{position: relative;float: left;width: 100%;border-bottom:1px solid #ebebeb;}
  .body .ul1 li{float: left;font-size: 0.22rem;color: #292929;line-height: 0.88rem;height: 0.88rem;}
  .body .ul1 .li1{background: #f55974;height: 0.4rem;width:1.08rem;line-height: 0.4rem;margin-top: 0.24rem;float: right;margin-right: 0.2rem;text-align: center;border-radius: 0.05rem;}
  .body .ul1 .li2{background: #bdbdbd;height: 0.4rem;width:1.08rem;line-height: 0.4rem;margin-top: 0.24rem;float: right;margin-right: 0.2rem;text-align: center;border-radius: 0.05rem;}
  .body .ul1 .f18{z-index:99999;position:absolute;right:0;font-size: 0.2rem;color: #fff;}

  .an{width: 1.42rem;height: 1.52rem;display: block;position: absolute;bottom: 0;right: 0;}
  .an img{width: 1.42rem;height: 1.52rem;display: block;}

</style>
