<template>
  <div class="submenu">
    <div v-for="item in list" :key="item.id">
      <el-submenu v-if="isNotEmpty(item.children)" :index="item.path || item.title">
        <template slot="title">
          <i class="iconfont" v-if="item.icon">{{item.icon}}</i>
          <span>{{switchLanguage(item.title, item.title_en)}}</span>
        </template>
        <submenu :list="item.children" :isMobile="isMobile" @close="closeMenu"/>
      </el-submenu>

      <el-menu-item v-if="!isNotEmpty(item.children) && !item.noMenu"
        :index="item.path || item.title"
        @click="goPage(item)" >
        <template slot="title">
          <i class="iconfont" v-if="item.icon" style="margin-left:5px">{{item.icon}}</i>
          <span style="margin-left:10px">{{switchLanguage(item.title, item.title_en)}}</span>
        </template>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
  import  { switchLanguage } from '@/utils/lang'
  export default {
    name: "Submenu",
    props: {
      list: Array,
      isMobile: Boolean
    },
    methods: {
      switchLanguage(cn, en) {
        return switchLanguage(cn, en)
      },
      goPage(item) {
        let { path, params } = item
        let { path: currentPath } = this.$route
        let isNewSite = path.indexOf('http') !== -1 ? true : false

        // 打开新窗口
        if(isNewSite) {
          window.open(item.path, "_blank")
          return
        }

        this.closeMenu()

        if(currentPath !== path) { 
          this.$router.push({path, params})
        }
      },
      closeMenu() {
        if(this.isMobile) {
          this.$emit('close')
        }
      },
      isNotEmpty(children) {
        return children && children.length > 0
      }
    }
  };
</script>
