<template>
  <div class="task console">
    <console-card/>

<!--    <div class="row row1">
      <histogram/>
      <plan-progress/>
    </div>

    <div class="row row2">
      <line-chart/>
      <round-progress/>
      <pie-chart/>
    </div> -->

    <div >

      <el-divider />
      <el-row :gutter="10" class="el-row-inline">
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log" height="100px">
            <div slot="header" class="clearfix">
              <span><h2>License Info</h2></span>
            </div>
            <div class="body">
              <p>
                <i><b>License Key：</b></i><span class="des">{{licenseData.licensekey}}</span>
              </p>
              <p>
                <b>Product Edition：</b><span class="des">{{licenseData.productedition}}</span>
              </p>
              <p>
                <b>Session Number：</b><span class="des">{{licenseData.sessionnumber}}</span>
              </p>
              <p>
                <b>Start Time：</b><span class="des" >{{licenseData.starttime}}</span>
              </p>
              <p>
                <b>Expire Time：</b><span class="des">{{licenseData.expiretime}}</span>
              </p>
              <p>
                <b>Support Start Time：</b><span class="des">{{licenseData.supportstarttime}}</span>
              </p>
              <p>
                <b>Support Expire Time：</b><span class="des" :formatter="dateFormat">{{licenseData.supportexpiretime}}</span>
              </p>
              <p>
                <b>Is Enable：</b><span class="des">{{licenseData.isusable}}</span>
              </p>
            </div>
          </el-card>
<!--          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <span><h2>Instance Info</h2></span>
            </div>
            <div class="body">
              <p>
                <i><b>Instance Key：</b></i><span class="des">{{instanceData.instancekey}}</span>
              </p>
              <p>
                <b>Instance Name：</b><span class="des">{{instanceData.instancename}}</span>
              </p>
              <p>
                <b>PowerServer Version：</b><span class="des">{{instanceData.powerserverversion}}</span>
              </p>
              <p>
                <b>PowerServer Release Date：</b><span class="des" >{{instanceData.powerserverreleasedate}}</span>
              </p>
            </div>
          </el-card> -->
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log" height="100%">
            <div slot="header" class="clearfix">
              <span><h2>Instance Info</h2></span>
            </div>
            <div class="body">
              <p>
                <i><b>Instance Key：</b></i><span class="des">{{instanceData.instancekey}}</span>
              </p>
              <p>
                <b>Instance Name：</b><span class="des">{{instanceData.instancename}}</span>
              </p>
              <p>
                <b>PowerServer Version：</b><span class="des">{{instanceData.powerserverversion}}</span>
              </p>
              <p>
                <b>PowerServer Release Date：</b><span class="des" >{{instanceData.powerserverreleasedate}}</span>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>


      </div>
  </div>
</template>

<script>
  import ConsoleCard from "@/components/Views/Dashboard/ConsoleCard"
  import { getLicenseInfo,getInstanceInfo} from '@/api/serverApi'
  import { convertTime} from "@/utils/utils.js"
  export default {
    data () {
      return{
        licenseData:{},
        instanceData:{}
      };
    },
    components: {
      ConsoleCard,
      // Histogram,
      // PlanProgress,
      // LineChart,
      // RoundProgress,
      // PieChart
    },


     mounted() {
       this.getLicenseData(),
       this.getInstanceData()
     },
    methods: {
      getLicenseData() {
        getLicenseInfo({
        }).then(res => {
          if(res.code === 0) {
            this.licenseData = res.data
            this.licenseData.starttime = convertTime(this.licenseData.starttime)
            this.licenseData.expiretime = convertTime(this.licenseData.expiretime)
            this.licenseData.supportstarttime = convertTime(this.licenseData.supportstarttime)
            this.licenseData.supportexpiretime = convertTime(this.licenseData.supportexpiretime)
          }
        })
      },
      getInstanceData() {
        getInstanceInfo({
        }).then(res => {
          if(res.code === 0) {
            this.instanceData = res.data
            this.instanceData.powerserverreleasedate = convertTime(this.instanceData.powerserverreleasedate)
          }
        })
      },
      dateFormat(date){
        return convertTime(date);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .console {
    height: 100%;

    &::-webkit-scrollbar {
      width: 0px !important;
    }

    >>> .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
      padding: 10px 0;
      border-bottom: 1px solid #F0F0F0;
      position: relative;
      z-index: 999;

      .line-title {
        padding: 0 13px;
        display: flex;
        align-items: center;

        i {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 50%;
          color: #1890FF;
          background-color: rgb(230, 247, 255);
          font-size: 15px;
        }

        span {
          color: #555;
          font-size: 15px;
          margin-left: 10px;
        }
      }
    }

    .row {
      display: flex;
      margin-top: 15px;
      background: transparent !important;

      > div {
        margin-right: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 3px;
        transition: box-shadow .3s;

        &:last-of-type {
          margin-right: 0 !important;
        }
      }
    }

    .row1, .row2 {
      height: 380px;
    }
    .update-log {
      ol {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 40px;
        height:100%;
      }
    }
    .el-row-inline{
      display:flex;
      flex-warp:warp;
    }
    .el-card{
      min-width:100%;
      height:100%;
    }
  }

  @media only screen and (max-width: $device-notebook)  {
    .console {
      .row1{
        height: 350px;
      }

      .row2 {
        height: 300px;
      }
    }
  }

  @media only screen and (max-width: $device-ipad) {
    .console {

      .row {
        display: block;
        height: auto !important;

        > div {
          height: 370px;
        }
      }

      .row1 {
        margin-top: 0;
      }
    }
  }
</style>
