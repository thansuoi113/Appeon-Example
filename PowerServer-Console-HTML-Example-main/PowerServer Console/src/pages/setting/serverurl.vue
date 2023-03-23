<template>
  <div class='page-content'>
    <div class="header">
      <h3>API Server URL</h3>
    </div>

    <el-form label-width="95px" style="margin-top: 20px">

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="API Host：">
            <el-input v-model="powerserver.url" placehode=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-button type="primary"  style="width: 90px" @click="update">
            Update
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      var localServerAPIUrl = localStorage.getItem("serverapi");
      // alert(localServerAPIUrl);
      if(localServerAPIUrl==null|localServerAPIUrl=='undefined'){
        localServerAPIUrl = this.baseconfig.baseUrl
      }
      // alert(localServerAPIUrl);
      return {
        powerserver: {
          url: localServerAPIUrl
        }
      };
    },
    methods: {
      update() {
        this.baseconfig.setBaseUrl(this.powerserver.url);
        //存储本地
        localStorage.setItem("serverapi",this.powerserver.url)
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      }
    },
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;

    .header {
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;

      h3 {
        font-size: 17px;
        font-weight: 500;
      }
    }

    /deep/ .el-form {
      .el-form-item {
        max-width: 700px;
      }
    }
  }
</style>
