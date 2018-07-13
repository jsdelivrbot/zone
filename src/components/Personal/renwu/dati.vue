<template>
  <div class="index">
    <!--<my-header title="任务详情"></my-header>-->
    <div class="header">
      <div class="headerall">
        <a href="javascript:history.back(-1);" class="a1"></a>
        <span class="forget">任务详情</span>
      </div>
    </div>
    <div class="cen">
    	<div class="cenall">
        <div v-if="data.fieldtype=='checkbox'">
          <div class="cenallt">
            <dl class="cent" style="height:auto;">
              <!--<dt><img src="../../../images/other/dati.png"/></dt>-->
              <dd>{{data.title}}</dd>
            </dl>
            <ul class="cenb">
              <li>已有<span>{{data.achievers}}</span>人完成了此任务</li>
            </ul>
          </div>
          <div class="cenallb">
            <div class="cenallb-t" style="padding:0.2rem 0;">{{data.name}}</div>
            <div class="cenallb-b">
              {{data.description}}
            </div>
            <div class="nav-r" v-if="checkboxArray.length>0">
              <div v-for="(arr,index) in checkboxArray" :key="index">
                <li class="li4">
                  <label>
                    <input type="checkbox" onclick="return false;">
                    <b :class="{yes:arr.is_xuan==1,no:arr.is_xuan==2}"></b>
                  </label>
                  <span>{{arr[0]}}</span>
                </li>
              </div>
            </div>
            <div class="nav-r" v-else>
              <div v-for="(data,index) in data.setting.optinos" :key="index">
                <li class="li4">
                  <label>
                    <input type="checkbox" v-model="check[index]" @change="checkboxChange(check[index],index)">
                    <b></b>
                  </label>
                  <span>{{data[0]}}</span>
                </li>
              </div>
            </div>
          </div>
          <div class="cenallf" v-if="isTrue">
            <ul v-if="status==2">
              <li>错误：{{successDesc}}</li>
            </ul>
            <ul v-if="status==1">
              <li>正确：{{successDesc}}</li>
            </ul>
          </div>
          <div class="footer">
            <ul v-if="ischeckSubmit">
              <li class="li1" @click="giveUpTasks">退出任务</li>
              <li class="li2" @click="nextTask">下一题</li>
            </ul>
            <ul v-else>
              <li class="li2" style="position: absolute;left: 50%;transform: translateX(-50%);" @click="checkboxTasksSubmit">提交</li>
            </ul>
          </div>
        </div>

        <div v-if="data.fieldtype=='radio'">
          <div class="cenallt">
            <dl class="cent" style="height:auto;">
              <!--<dt><img src="../../../images/other/dati.png"/></dt>-->
              <dd>{{data.title}}</dd>
            </dl>
            <ul class="cenb">
              <li>已有<span>{{data.achievers}}</span>人完成了此任务</li>
            </ul>
          </div>
          <div class="cenallb">
            <div class="cenallb-t" style="padding:0.2rem 0;">{{data.name}}</div>
            <div class="cenallb-b">
              {{data.description}}
            </div>
            <div class="nav-r" v-if="radioArray.length>0">
              <li class="li4" v-for="(arr,index) in radioArray" :key="index">
                <label>
                  <input type="radio" onclick="return false;">
                  <b :class="{yes:arr.is_xuan==1,no:arr.is_xuan==2}"></b>
                </label>
                <span>{{arr[0]}}</span>
              </li>
            </div>
            <div class="nav-r" v-else>
              <li class="li4" v-for="(data,index) in data.setting.optinos" :key="index">
                <label>
                  <input type="radio" name="taskRadio">
                  <b @click="radioSelect(index)"></b>
                </label>
                <span>{{data[0]}}</span>
              </li>
            </div>
          </div>
          <div class="cenallf" v-if="isTrue">
            <ul v-if="status==2">
              <li>错误：{{successDesc}}</li>
            </ul>
            <ul v-if="status==1">
              <li>正确：{{successDesc}}</li>
            </ul>
          </div>
          <div class="footer">
            <ul v-if="isradioSubmit">
              <li class="li1" @click="giveUpTasks">退出任务</li>
              <li class="li2" @click="nextTask">下一题</li>
            </ul>
            <ul v-else>
              <li class="li2" style="position: absolute;left: 50%;transform: translateX(-50%);" @click="radioTasksSubmit">提交</li>
            </ul>
          </div>
        </div>

        <div v-if="data.fieldtype=='textarea'">
          <div class="cenallt">
            <p class="cent">{{data.name}}</p>
            <ul class="cenb">
              <li>已有<span>{{data.achievers}}</span>人完成了此任务</li>
            </ul>
          </div>
          <div class="cenallb">
            <div class="cenallb-t" style="text-align:left;line-height: 0.35rem;color: #fff;font-size: 0.26rem;background: #46c2ff;padding: 0.17rem 0.32rem;">
              {{data.description}}</div>

            <div class="nav-r" style="margin:inherit;width:auto;">
              <textarea :readonly="isRead" ref="jy_answer"></textarea>
            </div>
          </div>
          <div class="cenallf-jy" v-if="data.prize">
            <ul>
              <li>任务奖励：答题完成后获得<span>{{data.bonus}}</span>{{data.prize}}!!</li>
            </ul>
          </div>
          <div class="cenallf-jy" v-if="!data.prize">
            <ul>
              <li>无奖励</li>
            </ul>
          </div>
          <div class="cenallf" v-if="isTrue">
            <ul v-if="status==2">
              <li>错误：{{successDesc}}</li>
            </ul>
            <ul v-if="status==1">
              <li>正确：{{successDesc}}</li>
            </ul>
          </div>
          <div class="footer-jy">
            <ul v-if="isTextAreaSubmit">
              <li class="li1" @click="giveUpTasks">退出任务</li>
              <li class="li2" @click="nextTask">下一题</li>
            </ul>
            <ul v-else>
              <li class="li2" style="position: absolute;left: 50%;transform: translateX(-50%);" @click="jy_submit">提交</li>
            </ul>
          </div>
        </div>

        <div v-if="data.fieldtype=='text'">
          <div class="cenallt">
            <p class="cent" style="text-align: center;">{{data.title}}</p>
            <ul class="cenb">
              <li>已有<span>{{data.achievers}}</span>人完成了此任务</li>
            </ul>
          </div>
          <div class="cenallb">
            <div class="cenallb-t" style="text-align:center;height:auto;color: #fff;font-size: 0.26rem;background: #46c2ff;padding: 0.17rem 0.32rem;">
              {{data.name}}</div>

            <div class="nav-r-text">
              <textarea readonly="readonly">{{data.description}}</textarea>
            </div>

            <div class="nav-r-text">
              <textarea placeholder="在这里写入问题答案" :readonly="isRead" style="border-bottom: none;" ref="text_answer"></textarea>
            </div>
          </div>

          <div class="cenallf" v-if="isTrue">
            <ul v-if="status==2">
              <li>错误：{{successDesc}}</li>
            </ul>
            <ul v-if="status==1">
              <li>正确：{{successDesc}}</li>
            </ul>
          </div>

          <div class="footer-text">
            <ul v-if="istextSubmit">
              <li class="li1" @click="giveUpTasks">退出任务</li>
              <li class="li2" @click="nextTask">下一题</li>
            </ul>
            <ul v-else>
              <li class="li2" style="position: absolute;left: 50%;transform: translateX(-50%);" @click="text_submit">提交</li>
            </ul>
          </div>
        </div>

    	</div>
    </div>
    <pop style="text-align: center" class="tip" :title="tip"></pop>
    <load v-show="isload"></load>
    <div class="load" style="display:none;">
      <div class="load-container load4"><div class="loader"> <i></i></div></div>
    </div>
  </div>
</template>
<script>
  import { setCookie, getCookie } from '../../../assets/js/cookie.js'
  import {getOpenUrl,getToken} from '../../../assets/js/common.js'
  import qs from 'qs'
export default {
  data () {
    return{
      isRead:false,
      status:'',
      radioArray:[],
      checkboxArray:[],
      isTextAreaSubmit:false,
      istextSubmit:false,
      ischeckSubmit:false,
      isradioSubmit:false,
      isload:false,
      data:'',
      tip:'',
      isTrue:false,
      rselect:'',
      check:[],
      cselect:[],
      cselect_join:'',
      successDesc:''
    }
  },
  mounted(){
    //$('.load').show();
    this.getData();
  },
  methods:{
    giveUpTasks(){
      this.$router.push({path: '/myrw',

      });
    },
    getData(){
      this.isload = true;
      this.$http.get(getOpenUrl() + "/Task/doAdvancedTasks", {
        headers: {
          "Authorization": "Bearer " + getToken()
        },
        params:{
          taskuid :this.$route.query.taskuid
        },
      }).then((res)=>{
        this.isload = false;
        if(res.body.status){
          console.log(res.body);
          this.isTextAreaSubmit = false;
          this.istextSubmit = false;
          this.ischeckSubmit = false;
          this.isradioSubmit = false;
          this.data = res.body.data;
          this.isTrue = false;
          this.isRead = false;
          this.radioArray = [];
          this.checkboxArray = [];
          $("input[type='radio']").prop("checked",false);
          $("input[type='checkbox']").prop("checked",false);
          if(this.data.is_dati!==false&&this.data.is_next===false){
//            this.$router.push({path: '/myrw',
//
//            });
            history.back(-1);
            this.$root.eventHub.$emit('datiSuccess');
          }
        }
        $('.load').hide();
      });
    },
    jy_submit(){
      this.$http.post(getOpenUrl() + "/Task/submitTask", {
        taskvarid:this.data.taskvarid,
        taskuid :this.$route.query.taskuid,
        answer:this.$refs.jy_answer.value
      },{
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        if(res.body.status==1){
          this.$root.eventHub.$emit('datiSuccess');
          if(res.body.data.success){
            this.isTextAreaSubmit = true;
            this.isTrue = true;
            this.successDesc = res.body.data.success_desc;
            this.status = res.body.data.status;
            this.isRead = true;
          }else{
            this.getData();
          }
        }else{
          this.tip = res.body.error_description;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
    text_submit(){
      this.$http.post(getOpenUrl() + "/Task/submitTask", {
        taskvarid:this.data.taskvarid,
        taskuid :this.$route.query.taskuid,
        answer:this.$refs.text_answer.value
      },{
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        if(res.body.status==1){
          if(res.body.data.success){
            this.istextSubmit = true;
            this.isTrue = true;
            this.successDesc = res.body.data.success_desc;
            this.status = res.body.data.status;
            this.isRead = true;
          }else{
            this.getData();
          }
        }else{
          this.tip = res.body.error_description;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
    radioSelect(index){
      this.rselect = this.data.setting.optinos[index][1];
    },
    radioTasksSubmit(){
      this.$http.post(getOpenUrl() + "/Task/submitTask", {
        taskvarid:this.data.taskvarid,
        taskuid :this.$route.query.taskuid,
        answer:this.rselect
      },{
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        if(res.body.status==1){
          //this.getData();
          this.isradioSubmit = true;
          this.isTrue = true;
          this.successDesc = res.body.data.success_desc;
          this.status = res.body.data.status;
          this.radioArray = res.body.data.options;
          //$("input[type='radio']").attr("checked","false");
        }else{
          this.tip = res.body.error_description;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
    checkboxChange(ck,index){

    },
    checkboxTasksSubmit(){
      for(var i = 0;i<this.check.length;i++){
        if(this.check[i]){
          this.cselect.push(this.data.setting.optinos[i][1]);
        }
      }
      this.cselect_join = this.cselect.join('')
      console.log(this.cselect_join);
      this.$http.post(getOpenUrl() + "/Task/submitTask", {
        taskvarid:this.data.taskvarid,
        taskuid :this.$route.query.taskuid,
        answer:this.cselect_join
      },{
        headers:{"Authorization": "Bearer " + getToken()}
      }).then((res)=>{
        if(res.body.status==1){
          //this.getData();
          this.ischeckSubmit = true;
          this.isTrue = true;
          this.successDesc = res.body.data.success_desc;
          this.status = res.body.data.status;
          this.checkboxArray = res.body.data.options;
          //$("input[type='checkbox']").attr("checked","false");
        }else{
          this.tip = res.body.error_description;
          $('.tip').show();
          setTimeout(function(){
            $('.tip').hide();
          },1000)
        }
      });
    },
    nextTask(){
      this.getData();
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
  .header{height: 0.7rem;box-shadow:0 0 5px #ebebeb;width: 100%;background: #fff;z-index: 11;margin-bottom: 0.05rem; position:fixed;padding-top: 0.3rem;}
  .headerall{padding: 0 0.2rem;}
  .header a{width: 0.18rem;height: 0.7rem;display: block;background: url(../../../images/back.png) no-repeat 0 50%;background-size: 0.18rem 0.34rem;float:left;}
  .forget{line-height:0.7rem;font-size:0.26rem;display:block;float:left;color: #008dd3;position: absolute;left: 50%;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);}
  .tip{display: none;}
  .header{position: fixed;top: 0;}
  .cen{position: absolute;top: 1.28rem;width: 100%;}
  .cenall{width: 5.86rem;margin: 0 auto;}
  .cent{font-size:0.26rem;color: #242424;height: 0.64rem;margin-top: 0.13rem;line-height: 0.64rem;}
  .cenallt{margin-bottom: 0.23rem;overflow: hidden;}
  .cen dl dt img{width: 0.61rem;height: 1.65rem;margin: 0 auto;display: block;margin-top: 0.32rem;}
  .cen dl dd{font-size: 0.29rem;color: #292929;text-align: center;height: 0.73rem;line-height: 0.73rem;}
  .cenb li{float: left;height: 0.46rem;line-height: 0.46rem;color: #636363;font-size: 0.16rem;}
  .cenb .li2{float: right;}
  .cenallb{border-radius: 0.05rem;box-shadow: 0 0 0.05rem #000;overflow: hidden;}
  .cenallb-t{color: #fff;font-size: 0.26rem;text-align: center;background: #46c2ff;}
  .cenallb-b{width:5.28rem;margin:0 auto;font-size: 0.21rem;color: #242424;line-height: 0.35rem;padding-top: 0.24rem;padding-bottom: 0.28rem;border-bottom: 0.01rem solid #ebebeb;}
  .nav-r {width:4.98rem;margin: 0 auto;overflow: hidden;}
  .nav-r .li4{height:0.6rem;float:left;position: relative;width: 100%;}
  .nav-r .li4 b.yes{background: url(../../../images/other/success.png)no-repeat;background-size:cover;}
  .nav-r .li4 b.no{background: url(../../../images/other/wrong.png)no-repeat;background-size:cover;}
  .nav-r textarea{height: 4.38rem;width: 100%;background: #fafafa;}
  .nav-r-text{padding: 0 0.2rem;}
  .nav-r-text textarea{padding: 0.2rem 0; width: 100%;border-bottom: 1px solid #ccc;}
  .nav-r span{font-size:0.2rem;color: #242424;display: block;float: left;height: 0.6rem;line-height: 0.6rem;margin-left: 0.15rem;}
  label{width: 0.24rem;height: 0.24rem;border-radius:50%;display: block;position:relative;z-index:10;top:50%;transform: translateY(-50%);float: left;}
  input[type="checkbox"] {display: none;position:absolute;}
  input[type="checkbox"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.18rem;height: 0.18rem;border: 1px solid #ccc;cursor: pointer;vertical-align: middle;}
  input[type="checkbox"]:checked+b {background: url(../../../images/other/success.png)no-repeat;background-size:cover;}

  input[type="radio"] {display: none;position:absolute;}
  input[type="radio"]+b {position:absolute;top:0;left:0;display: inline-block;width: 0.18rem;height: 0.18rem;border: 1px solid #ccc;cursor: pointer;vertical-align: middle;}
  input[type="radio"]:checked+b {background: url(../../../images/other/success.png)no-repeat;background-size:cover;}

  .cenallf-jy{height:0.6rem;line-height:0.6rem;overflow: hidden;}
  .cenallf-jy ul{font-size: 0.21rem;color: #008dd3;padding-left: 0.11rem;}
  .cenallf{border-radius: 0.05rem;box-shadow: 0 0 0.05rem #000;overflow: hidden;margin-top: 0.3rem;}
  .cenallf ul{width: 5.2rem;margin: 0 auto;line-height: 0.35rem;font-size: 0.21rem;color: #008dd3;padding: 0.25rem 0;}
  .footer{width: 4.6rem;margin: 0 auto;margin-top: 0.5rem;margin-bottom: 0.5rem;overflow: hidden;}
  .footer li{width: 2.08rem;height: 0.54rem;font-size: 0.22rem;border-radius: 0.27rem;line-height: 0.54rem;text-align: center;float: left;}
  .footer .li1{color: #008DD3;border: 1px solid #008DD3;}
  .footer .li2{color: #fff;border: 1px solid #46c2ff;background: #46c2ff;float: right;}

  .footer-jy{width: 2.08rem;margin: 0 auto;margin-top: 0.13rem;}
  .footer-jy li{width: 2.08rem;height: 0.54rem;font-size: 0.22rem;border-radius: 0.27rem;line-height: 0.54rem;text-align: center;float: left;}
  .footer-jy .li2{color: #fff;border: 1px solid #46c2ff;background: #46c2ff;float: right;}

  .footer-text{width: 4.6rem;margin: 0 auto;margin-top: 0.5rem;margin-bottom: 0.5rem;overflow: hidden;}
  .footer-text .li1{color: #008DD3;border: 1px solid #008DD3;}
  .footer-text li{width: 2.08rem;height: 0.54rem;font-size: 0.22rem;border-radius: 0.27rem;line-height: 0.54rem;text-align: center;float: left;}
  .footer-text .li2{color: #fff;border: 1px solid #46c2ff;background: #46c2ff;float: right;}
</style>
