import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components'
import Important from '@/components/Index/home.vue'
import Saoma from '@/components/Index/saoma.vue'
import Login from '@/components/Login'
import Forget from '@/components/Forget'
import Forget1 from '@/components/Forget/forget1.vue'
import Register from '@/components/Register'
import Register1 from '@/components/Register/register1.vue'
import Chart from '@/components/Chart'
//服务
import Service from '@/components/Service'
import Details from '@/components/Service/details.vue'
import Online from '@/components/Service/online.vue'
//圈子
import Circle from '@/components/Circle'
import MyCircle from '@/components/Circle/mycircle.vue'
import LiveCircle from '@/components/Circle/liveCircle.vue'
import Fujin from '@/components/Circle/fujin.vue'
import ListCircle from '@/components/Circle/listcircle.vue'
import Boss from '@/components/Circle/boss.vue'
//帖子
import More from '@/components/Content/morehf.vue'
import Report from '@/components/Content/report.vue'
import Vote from '@/components/Content/vote.vue'
import Attend from '@/components/Content/attend.vue'
import Enter from '@/components/Content/enter.vue'
//设置
import Setting from '@/components/Setting'
import Apply from '@/components/Setting/apply.vue'
import Jiben from '@/components/Setting/child/jiben.vue'
import Qx from '@/components/Setting/child/quanxian.vue'
import Gl from '@/components/Setting/child/guanli.vue'
import Gg from '@/components/Setting/child/gonggao.vue'
import Tz from '@/components/Setting/child/tiezi.vue'
import Join from '@/components/Setting/child/join.vue'
import Permission from '@/components/Setting/child/permission.vue'
import Listdetail from '@/components/Listdetail'
import People from '@/components/Listdetail/people.vue'
//发帖
import Message from '@/components/Message'
import Poll from '@/components/Message/poll.vue'
import Activity from '@/components/Message/activity.vue'
//答疑
import Query from '@/components/Query'
import ZjQuery from '@/components/Query/zjindex.vue'
import Classify from '@/components/Query/classify.vue'
import Submit from '@/components/Query/submit.vue'
import Subed from '@/components/Query/subed.vue'
import Appraise from '@/components/Query/appraise.vue'
import ZjDetails from '@/components/Query/details.vue'
//新闻
import News from '@/components/News'
import Circular from '@/components/News/circular.vue'
import Notice from '@/components/News/notice.vue'
import Exit from '@/components/News/exit.vue'
import Friend from '@/components/News/friend.vue'
import Find from '@/components/Find'
import Info from '@/components/Info'
import Info1 from '@/components/Info/info1.vue'
import Reply from '@/components/Info/reply.vue'
// 礼品商城
import Shopping from '@/components/Shopping'
import Gift from '@/components/Shopping/gift.vue'
import Order from '@/components/Shopping/order.vue'
import Delivery from '@/components/Shopping/delivery.vue'
import Finished from '@/components/Shopping/finished.vue'
//个人中心
import Personal from '@/components/Personal'
import Myqz from '@/components/Personal/quanzi/myqz.vue'
import Fenlei from '@/components/Personal/quanzi/fenlei.vue'
import Qzname from '@/components/Personal/quanzi/qzname.vue'
import Qzjieshao from '@/components/Personal/quanzi/qzjieshao.vue'
import Myrw from '@/components/Personal/renwu/myrw.vue'
import Dati from '@/components/Personal/renwu/dati.vue'
import Jianyi from '@/components/Personal/renwu/jianyi.vue'
import Rwjianyi from '@/components/Personal/renwu/rwjianyi.vue'
import Datiall from '@/components/Personal/renwu/datiall.vue'
import Jilu from '@/components/Personal/renwu/jilu.vue'
import Qiandao from '@/components/Personal/renwu/qiandao.vue'
import Shoucang from '@/components/Personal/shoucang/shoucang.vue'
import Mydd from '@/components/Personal/dingdan/mydd.vue'
import Ddxq from '@/components/Personal/dingdan/ddxq.vue'
import Mytz from '@/components/Personal/tiezi/mytz.vue'
import Glshdz from '@/components/Personal/shouhuodizhi/glshdz.vue'
import Tjshdz from '@/components/Personal/shouhuodizhi/tjshdz.vue'
import Myzl from '@/components/Personal/ziliao/myziliao.vue'
import Bjzl from '@/components/Personal/ziliao/bjziliao.vue'
import Yhrz from '@/components/Personal/yonghurenzheng/yhrz.vue'
import Yxrz from '@/components/Personal/yonghurenzheng/yxrz.vue'
import Zhaq from '@/components/Personal/zhanghuanquan/zhaq.vue'
import Myjf from '@/components/Personal/jifen/myjf.vue'
import Yq from '@/components/Personal/yaoqing/yq.vue'
import Myyq from '@/components/Personal/yaoqing/myyq.vue'
import Sqvip from '@/components/Personal/yaoqing/sqvip.vue'
import Zj from '@/components/Personal/zuji/zj.vue'
import Mysz from '@/components/Personal/shezhi/mysz.vue'
import Wurao from '@/components/Personal/shezhi/wurao.vue'
import Telyz from '@/components/Personal/shezhi/telyz.vue'
import Newtelyz from '@/components/Personal/shezhi/newtelyz.vue'
import Gx from '@/components/Personal/shezhi/gx.vue'
import Myhy from '@/components/Personal/haoyou/myhy.vue'
import Yfriend from '@/components/Personal/haoyou/yesfriend.vue'
import Searchfriend from '@/components/Personal/haoyou/searchfriend.vue'
import Fenzu from '@/components/Personal/haoyou/fenzu.vue'
import Move from '@/components/Personal/haoyou/move.vue'
import Sixin from '@/components/Personal/haoyou/sixin.vue'
import Vip from '@/components/Personal/vipzhuanqu/vip.vue'
import Svip from '@/components/Personal/svipzhuanqu/svip.vue'
import test from '@/components/test'


Router.prototype.goBack = function () {
  this.isBack = true;
};


Vue.use(Router);


export default new Router({
//	mode:'history',
  routes: [
    {
      path: '/',
      component: Index,
      //meta: {keepAlive:true}
    },
    {
      path: '/test',
      component: test,
      //meta: {keepAlive:true}
    },
    {
      path: '/home',
      component: Important,
      meta: {keepAlive:true}
    },
    {
      path: '/saoma',
      component: Saoma,
      //meta: {keepAlive:true}
    },
    {
      path: '/login',
      component: Login,
      meta: {keepAlive:true}
    },
    {
      path: '/forget',
      component: Forget,
      meta: {keepAlive:true}
    },
    {
      path: '/forget1',
      component: Forget1,
      meta: {keepAlive:true}
    },
    {
      path: '/register',
      component: Register,
      meta: {keepAlive:true}
    },
    {
      path: '/register1',
      component: Register1,
      meta: {keepAlive:true}
    },
    {
      path: '/chart',
      component: Chart,
      meta: {keepAlive:true}
    },
    {
      path: '/service',
      component: Service,
      meta: {keepAlive:true}
    },
    {
      path: '/details',
      component: Details,
      //meta: {keepAlive:true}
    },
    {
      path: '/online',
      component: Online,
      //    meta: {keepAlive:true}
    },
    {
      path: '/circle',
      component: Circle,
      meta: {keepAlive:true}
    },
    {
      path: '/mycircle',
      component: MyCircle,
      meta: {keepAlive:true}
    },
    {
      path: '/livecircle',
      component: LiveCircle,
      //meta: {keepAlive:true}
    },
    {
      path: '/fujin',
      component: Fujin,
      //meta: {keepAlive:true}
    },
    {
      path: '/listcircle',
      component: ListCircle,
//    mode: 'history',
//      meta: {keepAlive:true}
    },
    {
      path: '/more',
      component: More,
//    meta: {keepAlive:true}
    },
    {
      path: '/report',
      component: Report,
      //    meta: {keepAlive:true}
    },
    {
      path: '/vote',
      component: Vote,
//      meta: {keepAlive:true}
    },
    {
      path: '/join',
      component: Join,
      //    meta: {keepAlive:true}
    },
    {
      path: '/permission',
      component: Permission,
      //    meta: {keepAlive:true}
    },
    {
      path: '/setting',
      component: Setting,
      //    meta: {keepAlive:true}
    },
    {
      path: '/jiben',
      component: Jiben,
      //    meta: {keepAlive:true}
    },
    {
      path: '/quanxian',
      component:Qx,
      //    meta: {keepAlive:true}
    },
    {
      path: '/guanli',
      component: Gl,
      //    meta: {keepAlive:true}
    },
    {
      path: '/gonggao',
      component: Gg,
      //    meta: {keepAlive:true}
    },
    {
      path: '/tiezi',
      component: Tz,
      //    meta: {keepAlive:true}
    },
    {
      path: '/apply',
      component: Apply,
      //    meta: {keepAlive:true}
    },
    {
      path: '/message',
      component: Message,
      //    meta: {keepAlive:true}
    },
    {
      path: '/poll',
      component: Poll,
      //    meta: {keepAlive:true}
    },
    {
      path: '/activity',
      component: Activity,
      //    meta: {keepAlive:true}
    },
    {
      path: '/listdetail',
      component: Listdetail,
      //    meta: {keepAlive:true}
    },
    {
      path: '/boss',
      component: Boss,
      //    meta: {keepAlive:true}
    },
    {
      path: '/people',
      component: People,
      //meta: {keepAlive:true}
    },
    {
      path: '/attend',
      component: Attend,
      //    meta: {keepAlive:true}
    },
    {
      path: '/enter',
      component: Enter,
      //    meta: {keepAlive:true}
    },
    {
      path: '/query',
      component: Query,
      //meta: {keepAlive:true}
    },
    {
      path: '/zjquery',
      component: ZjQuery,
      //meta: {keepAlive:true}
    },
    {
      path: '/news',
      component: News,
      meta: {keepAlive:true}
    },
    {
      path: '/circular',
      component: Circular,
      //meta: {keepAlive:true}
    },
    {
      path: '/notice',
      component: Notice,
      //meta: {keepAlive:true}
    },
    {
      path: '/exit',
      component: Exit,
      //    meta: {keepAlive:true}
    },
    {
      path: '/friend',
      component: Friend,
      //    meta: {keepAlive:true}
    },
    {
      path: '/find',
      component: Find,
      meta: {keepAlive:true}
    },
    {
      path: '/info',
      component: Info,
      meta: {keepAlive:true}
    },
    {
      path: '/info1',
      component: Info1,
      //meta: {keepAlive:true}
    },
    {
      path: '/reply',
      component: Reply,
      meta: {keepAlive:true}
    },
    {
      path: '/shopping',
      component: Shopping,
      meta: {keepAlive:true}
    },
    {
      path: '/gift',
      component: Gift,
      //    meta: {keepAlive:true}
    },
    {
      path: '/order',
      component: Order,
      //    meta: {keepAlive:true}
    },
    {
      path: '/delivery',
      component: Delivery,
      //    meta: {keepAlive:true}
    },
    {
      path: '/finished',
      component: Finished,
      //    meta: {keepAlive:true}
    },
    {
      path: '/classify',
      component: Classify,
      //    meta: {keepAlive:true}
    },
    {
      path: '/submit',
      component: Submit,
      //    meta: {keepAlive:true}
    },
    {
      path: '/subed',
      component: Subed,
      //    meta: {keepAlive:true}
    },
    {
	  	path: '/zjdetail',
      component: ZjDetails,
      //    meta: {keepAlive:true}
		},
    {
      path: '/appraise',
      component: Appraise,
      //    meta: {keepAlive:true}
    },
    //个人中心
    {
      path: '/personal',
      component: Personal,
      meta: {keepAlive:true}
    },
    {
    	path: '/myqz',
      component: Myqz,
      meta: {keepAlive:true}
    },
    {
    	path: '/fenlei',
      component: Fenlei,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/qzname',
      component: Qzname,
      //meta: {keepAlive:true}
    },
    {
    	path: '/qzjieshao',
      component: Qzjieshao,
      meta: {keepAlive:true}
    },
    {
    	path: '/myrw',
      component: Myrw,
      meta: {keepAlive:true}
    },
    {
    	path: '/dati',
      component: Dati,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/jianyi',
      component: Jianyi,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/rwjianyi',
      component: Rwjianyi,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/datiall',
      component: Datiall,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/jilu',
      component: Jilu,
      meta: {keepAlive:true}
    },
    {
    	path: '/qiandao',
      component: Qiandao,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/shoucang',
      component: Shoucang,
      meta: {keepAlive:true}
    },
    {
    	path: '/mydd',
      component: Mydd,
      meta: {keepAlive:true}
    },
    {
    	path: '/ddxq',
      component: Ddxq,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/mytz',
      component: Mytz,
            meta: {keepAlive:true}
    },
    {
    	path: '/glshdz',
      component: Glshdz,
      meta: {keepAlive:true}
    },
    {
    	path: '/tjshdz',
      component: Tjshdz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/myzl',
      component: Myzl,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/bjzl',
      component: Bjzl,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/yhrz',
      component: Yhrz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/yxrz',
      component: Yxrz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/zhaq',
      component: Zhaq,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/myjf',
      component: Myjf,
      meta: {keepAlive:true}
    },
    {
    	path: '/myyq',
      component: Myyq,
      meta: {keepAlive:true}
    },
    {
    	path: '/yq',
      component: Yq,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/sqvip',
      component: Sqvip,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/zuji',
      component: Zj,
      meta: {keepAlive:true}
    },
    {
    	path: '/mysz',
      component: Mysz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/wurao',
      component: Wurao,
//    //    meta: {keepAlive:true}
    },
    {
    	path: '/telyz',
      component: Telyz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/newtelyz',
      component: Newtelyz,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/gx',
      component: Gx,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/myhy',
      component: Myhy,
      meta: {keepAlive:true}
    },
    {
    	path: '/yesfriend',
      component: Yfriend,
      //meta: {keepAlive:true}
    },
    {
    	path: '/searchfriend',
      component: Searchfriend,
      meta: {keepAlive:true}
    },
    {
    	path: '/fenzu',
      component: Fenzu,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/move',
      component: Move,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/sixin',
      component: Sixin,
      //    meta: {keepAlive:true}
    },
    {
    	path: '/vip',
      component: Vip,
      meta: {keepAlive:true}
    },
    {
      path: '/svip',
      component: Svip,
      meta: {keepAlive:true}
    }
  ]
})
