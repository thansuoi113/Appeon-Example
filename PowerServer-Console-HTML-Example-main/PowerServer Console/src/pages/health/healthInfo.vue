<template>
  <div class='page-content' v-loading="listLoading">
   <div class="header">
      <h3>Health Status:</h3>
    </div>
    <el-collapse accordion style="margin-top: 20px" >
       <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px">
            <el-col :xs="24" :sm="12" :lg="4">
              <span>Overall Status:
<!--              <el-tooltip content="">
                <i class="el-icon-question"/>
              </el-tooltip> -->
              <template v-if="overallDate.health" >
                <i class="el-icon-success" style="color:green;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              <template v-if="!overallDate.health" >
                <i class="el-icon-warning" style="color:red;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              </span>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
              <span>Readiness Status:
              <template v-if="overallDate.readiness" >
                <i class="el-icon-success" style="color:green;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              <template v-if="!overallDate.readiness" >
                <i class="el-icon-warning" style="color:red;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              </span>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
              <span>Liveness Status:
              <template v-if="overallDate.liveness" >
                <i class="el-icon-success" style="color:green;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              <template v-if="!overallDate.liveness" >
                <i class="el-icon-warning" style="color:red;font-size:25px;margin-left:15px" v-show="true"></i>
              </template>
              </span>
            </el-col>
          </el-row>
    </el-collapse>

    <div class="header" style="margin-top: 20px">
      <h3>Details:</h3>
    </div>

    <el-collapse accordion style="margin-top: 20px" >
      <div v-for="(data,index) in list" :key="index" >

        <el-collapse-item title="" >
          <template slot="title" >
            <!-- <aside> -->
            <el-tag :type="data.Result ? 'info' : 'warning'" >
            {{data.item}}
            </el-tag>
            <!-- </aside> -->
            <i class="el-icon-success" style="color:green;font-size:20px" v-show="data.Result"></i>
            <i class="el-icon-warning" style="color:red;font-size:20px" v-show="!data.Result"></i>
          </template>

            <tao-table
               :data="data.list"
               :showPage="false"
               default-expand-all
               v-loading="listLoading"
               size="mediul">
               <el-table-column prop="subItem" label="Item Name"></el-table-column>
               <el-table-column  label="Status" >
                   <template slot-scope="{row}">
                     <i class="el-icon-success" style="color:green;font-size:20px" v-show="row.Result"></i>
                     <i class="el-icon-warning" style="color:red;font-size:20px" v-show="!row.Result"></i>
                   </template>
               </el-table-column>
               <el-table-column  label="Actual Result(s)" >
                  <template slot-scope="{row}">
                      <ol class="oldict">
                        <li v-for="(acuItem,ainx) in row.Actual" :key="ainx">
                          <span> {{ acuItem }}</span>
                        </li>
                      </ol>
                  </template>
               </el-table-column>
               <el-table-column  label="Suggestion(s)"  >
                 <template slot-scope="{row}">
                    <dt v-for="(sugItem,index) in row.Suggestion" :key="sugItem">
                      <span style="font-weight: 600;"> {{ index }}</span>
                      <br />
                      <ul class="lidict">
                        <li v-for="item in sugItem" :key="item">
                          <span> {{ item }}</span>
                        </li>
                      </ul>
                    </dt>
                </template>
               </el-table-column>
             </tao-table>

        </el-collapse-item>
      </div>
    </el-collapse>


  </div>
</template>

<script>
  import {  getHealth,getHealthTotalInfo,getHealthReadinessStatus,getHealthLivenessStatus,getHealthStatus } from '@/api/serverApi'
  export default {
    data () {
      return{
        list:[],
        overallDate:{},
        listLoading: true,
      };
    },

    created() {
       //this.getList();
     },
     mounted() {
       this.getList()
     },
    methods: {
      dataFormat:function(row,column){
         var date = row[column.property];
         var returnStr="";
         if(date == undefined ||date == 'undefined' || date==null){
             return "";
          }else {
           if(column.property=='Suggestion'){
              if(date != null){
                for(var temSubItem in  date){
                  returnStr = returnStr+temSubItem +"\n"+date[temSubItem]

                }
                return returnStr;
              }
           }
         }

         return date
      },
      getList() {
        this.listLoading = true
        getHealth({
        }).then(res => {
          if(res.code === 0) {
            let { list} = res.data
            this.list = list
            // alert(JSON.stringify(this.list))
            this.listLoading = false
          }
        })

        getHealthStatus({
        }).then(res => {
          if(res.code === 0) {
            if(res.data=='Healthy'){
              this.overallDate.health =true;
             }else{
               this.overallDate.health = false;
             }
          }
        })

        getHealthReadinessStatus({
        }).then(res => {
          if(res.code === 0) {
            if(res.data=='Healthy'){
              this.overallDate.readiness =true;
             }else{
               this.overallDate.readiness = false;
             }
          }
        })

        getHealthLivenessStatus({
        }).then(res => {
          if(res.code === 0) {
            if(res.data=='Healthy'){
              this.overallDate.liveness =true;
             }else{
               this.overallDate.liveness = false;
             }
          }
        })
      },

    }
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
  }

  aside {
        background: #eef1f6;
        padding: 8px 24px;
        margin-bottom: 20px;
        border-radius: 2px;
        display: block;
        line-height: 32px;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: #2c3e50;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        a {
          color: #337ab7;
          cursor: pointer;

          &:hover {
            color: rgb(32, 160, 255);
          }
        }
      }
</style>
