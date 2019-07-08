<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <Header :title="address.name || '正在定位中'">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>

        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
      </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <!-- categorysArr -->
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
                </div>
                <span>{{c.title}}</span>
              </a>

            </div>

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <ShopList/>>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import Swiper from 'swiper'
import "swiper/dist/css/swiper.min.css"
import ShopList from '../../components/ShopList/ShopList.vue'



export default {
  name:'Msite',

  computed:{
    ...mapState(['address','categorys']),

    /*
    根据分类的一维数组生成二维数组
    小数组的长度最大是5
    */
    categorysArr(){
      //取出相关的数据
      const bigArr = []
      let smallArr = []
      const {categorys} = this
      //计算产生的结果
      categorys.forEach(c => {
         //将小数组放进大数组
        if (smallArr.length===0) {
          bigArr.push(smallArr)
        }
        //将分类对象放入小数组(小数组长度最大8)
        smallArr.push(c)
        if (smallArr.length===8) {
          smallArr = []
        }
      })
      //返回结果
      return bigArr

      const obj = {}
      const arr = {}
      arr.push(obj)
      arr.push(obj)
      arr.push(obj)
    }
  },

  //创建对象的时机：在列表显示之后
  mounted (){
    this.$store.dispatch("getShops")
    this.$store.dispatch("getCategorys")

    setTimeout(() => {
      var mySwiper = new Swiper ('.swiper-container', {
        //direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如需分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },1000);
  },

  components:{
    ShopList
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';
 .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
