<template>
	<div class="index" style="overflow-y: scroll;">

		<div class="top">
			<div class="header">
				<div class="headerall">
					<a href="javascript:history.back(-1);" @click="back" class="a1q"></a>
          <!--<a @click="back" class="a1q"></a>-->
					<span class="forget">我的积分</span>
				</div>

		    </div>
			<div class="top1">
				<div class="top2">
					<p class="sp1">{{data.jifen}}</p>
					<p class="sp2">当前积分</p>
				</div>
			</div>
		</div>
    <div class="page-loadmore backtop" style="position:relative;top:5.1rem;bottom:0;overflow:scroll;font-size: 0.2rem;height: calc(100% - 5.1rem);">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">

      <div class="body">
        <p class="p1">收支明细</p>
          <div class="body-f" v-for="(data,index) in items" :key="index">
            <ul>
              <li class="li1">{{data.des}}
                <!--（订单号：<span>541515151515</span>）-->
              </li>
              <li class="li2">{{data.ctime}}</li>
            </ul>
            <p class="p">{{data.detail}}</p>
          </div>
        <!--<div class="loading-layer">-->
          <!--<span class="spinner-holder"><img src="../../../images/loading.gif" /></span>-->
          <!--<div class="no-data-text" style="color: rgb(170, 170, 170);">没有更多数据</div>-->
        <!--</div>-->
        <div class="loading-layer" v-show="loadingshow" style="color: rgb(170, 170, 170);">没有更多数据</div>
      </div>

      </mt-loadmore>
    </div>
		<!--<my-footer></my-footer>-->
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
    <backtop></backtop>
    <load v-show="isload"></load>
	</div>
</template>
<script>
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
  var top = ''
var status = 1, start = 1, size = 15, loading = false, end = false;
export default {
  data () {
    return{
      isload:false,
      data:'',
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
    this.bottom = size //默认加载15条数据
    loading = end = false;
    var self      = this;
    //$('.load').show();
    this.isload = true;

    this.getData(this.type, this.start, this.bottom);

    this.$root.eventHub.$on('jfSuccess',()=>{
      this.items = [];
      this.getData(this.type, this.start, this.bottom);
    })

//    this.scroll_ = function(){
//      if(loading || end) return;
//      if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//        $('.loading-layer span').addClass('active');
//        loading = true;
//        //start += size;
//        start += 1;
//        self.getData(status, start, size);
//      }
//    };
    //window.addEventListener("scroll",this.scroll_);

    //this.tabScroll();

    $('.index').scroll(function(){
      if ($('.index').scrollTop() > ($('.top').height() - $('.header').height())){
        $('.header').addClass('on')
      }else{
        $('.header').removeClass('on')
      }
    })

  },
  methods:{
    back(){
      this.$router.goBack();
      //android.back1();
    },
//    tabScroll(){
//      window.addEventListener("scroll",this.toScroll);
//    },
//    toScroll(){
//      if(loading || end) return;
//      if($(document).height() - $(window).height() - $(window).scrollTop() < 80){
//        $('.loading-layer span').addClass('active');
//        loading = true;
//        //start += size;
//        start += 1;
//        this.getData(status, start, size);
//      }
//    },
    loadTop() { // 刷新数据的操作
      top=this.scroll;
      var self = this;
      setTimeout(()=> {
        this.start=1;
        this.$http.get(getOpenUrl() + '/user/scoreMingx', {
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
            $.each(data.list, function(key, val){
              self.items.push(val);
            });
          }else{
            self.allLoaded = true;
            self.loadingshow=true;
          }
          loading = false;
          $('.load').hide();
          $('.first').show();
          self.$refs.loadmore.onTopLoaded();
          $('div[type="'+this.type+'"]').addClass('isload').show();
        },function(err) {
          this.$router.push({
            path: '/login',
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

      this.$http.get(getOpenUrl() + '/user/scoreMingx', {
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
          $.each(data.list, function(key, val){
            self.items.push(val);
          });
          if (res.body.count < size){
            //end = true;
          }
        }else{
//          end = true;
//          self.noData = "没有更多数据"
//          $('.loading-layer div').addClass('active');
          //self.allLoaded = true;
          self.loadingshow=true;
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
  ._v-container{position: inherit;margin-top: 0 !important;}
  .header.on{background-color: #fff;}
  .header.on .forget{color:#008dd3}
  .header.on .a1q{background: url(../../../images/back.png) no-repeat;background-size: cover;}

  .index{height: 100%;}
  .header{height: 0.7rem;width: 100%;z-index: 1;position: fixed;top: 0.3rem;}
  .headerall{padding-left: 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/backw.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #fff;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}

  .top{width: 100%;height: 5.1rem;background: url(../../../images/rwbk.png) no-repeat;background-size: cover;position:fixed;}
  .top1{width: 3rem;height: 3rem;border: 1px solid #fff;border-radius:50%;position: absolute;top:1.2rem;left: 50%;transform: translateX(-50%);}
  .top2{width: 2.4rem;height: 2.4rem;border: 0.08rem solid #54efd2;border-radius:50%;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}

  .top2{text-align: center;color: #fff;}
  .top2 .sp1{font-size: 0.46rem;margin-top: 0.8rem;}
  .top2 .sp2{font-size: 0.24rem;}

  .body .p1{height: 0.67rem;border-bottom: 1px solid #ebebeb;padding-left: 0.2rem;line-height: 0.67rem;font-size: 0.22rem;color: #292929;font-weight: bold;}
  .body-f{margin-left: 0.2rem;margin-right: 0.2rem;border-bottom: 1px solid #ebebeb;overflow: hidden;padding: 0.23rem 0;}
  .body-f ul{float: left;}
  .body-f .li1{font-size: 0.22rem;line-height: 0.41rem;color: #242424;}
  .body-f .li1 span{font-size: 0.2rem;color: #008dd3;}
  .body-f .li2{font-size: 0.2rem;color: #afafaf;line-height: 0.32rem;}
  .body-f .p{float: right;color: #afafaf;line-height: 0.73rem;color: #4abced;font-size: 0.2rem;}
</style>
