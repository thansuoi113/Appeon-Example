<template>
  <div class="frame" :style="{paddingLeft, paddingTop}">
    <!-- 左侧菜单 -->
    <menu-left ref="menuLeft" @topBarCollapse="topBarCollapse" />

    <!-- 顶栏、选项卡 -->
    <top-bar :menuOpen="menuOpen" @click="visibleMenu" @personalityShow="personalityShow">
      <work-tab v-if="showWorkTab"/>
    </top-bar>

    <!-- 内容区 -->
    <div class="container">
      <keep-alive v-if="isRouterAlive">
        <router-view :style="{minHeight}"></router-view>
      </keep-alive>
    </div>

    <!-- 个性化 -->
    <personality 
      :show="personalityOpen" 
      @click="personalityShow" 
      @closePersonality="closePersonality"
    />
  </div>
</template>

<script>
  import { menuLeftOpenWidth, menuLeftShrinkWidth } from "@/config/menu"
  import { mapState } from 'vuex'

  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        menuOpen: true,         //菜单是否展开
        isRouterAlive: true,    // KeepAlive
        personalityOpen: false, // 个性化可见性
        showWorkTab: true,      // 显示多标签
      };
    },
    computed: {
      ...mapState({
        setting: state => state.setting.setting
      }),
      paddingLeft() {
        let width = this.menuOpen ? menuLeftOpenWidth : menuLeftShrinkWidth
        this.$store.dispatch('menu/setMenuWidth', width)
        return width
      },
      paddingTop() {
        return this.showWorkTab ? '108px' : '75px'
      },
      minHeight() {
        return `calc(100vh - ${this.showWorkTab ? '120px' : '90px'})`
      }
    },
    watch: {
      'setting.showWorkTab': {
        handler(show) {
          this.showWorkTab = show
        },
        immediate: true
      }
    },
    mounted() {
      this.refreshSaveUserData()
    },
    methods: {
      // Vuex中的数据保存到localStorage，在即将离开当前页面(刷新或关闭)时执行
      refreshSaveUserData() {
        let _self = this
        window.addEventListener('beforeunload', () => {
          _self.$store.dispatch('user/storeStorage')
        })
      },
      // 刷新页面
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      // 菜单展开 | 收缩
      visibleMenu() {
        this.menuOpen = !this.menuOpen
        this.$refs.menuLeft.visibleMenu();
      },
      topBarCollapse(show) {
        this.menuOpen = show
      },
      personalityShow() {
        this.personalityOpen = !this.personalityOpen
      },
      closePersonality() {
        this.personalityOpen = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .frame {
    width: 100%;
    min-height: 100vh;
    padding: 108px 0 15px 0;
    box-sizing: border-box;
    transition: padding .3s ease-in-out;
    background: $default-background;
    overflow: hidden;

    .container {
      width: calc(100% - 30px);
      min-height: 100%;
      margin: auto;
      box-sizing: border-box;

      // 子页面默认style
      >>> .page-content {
        background: #fff;
        padding: 16px;
        position: relative;
        box-sizing: border-box;
        border-radius: 3px;

        >>> .open-head-btn {
          width: 100%;
          height: 15px;
          cursor: pointer;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 999;
          text-align: center;
          font-size: 12px;
          color: #eee;
        }
      }
    }
  }

  @media only screen and (max-width: $device-ipad) { 
    .frame {
      width: 100%;
      padding-left: 0 !important;
      min-height: 100vh;
      overflow-y: scroll;

      .container {
        width: calc(100% - 20px);
      }
    }
  }
</style>
