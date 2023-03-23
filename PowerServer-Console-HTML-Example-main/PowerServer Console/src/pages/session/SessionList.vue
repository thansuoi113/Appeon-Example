<template>
  <div class='page-content'>
<!--  <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="4">
        <el-input placeholder="Application Name"></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
        <el-button>Search</el-button>
      </el-col>
    </el-row> -->

    <el-row style="margin-top: 15px">
      <!-- <tao-table :data="list" :page="page"  @changePage="getList" ref="table"> -->
     <tao-table
        :data="list"
        :showPage="false"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        v-loading="listLoading"
        size="mediul">
        <el-table-column prop="sessionid" label="Session ID"></el-table-column>
        <el-table-column prop="application" label="Application Name" sortable></el-table-column>
        <el-table-column prop="ipaddress" label="Client IP Address"></el-table-column>
        <el-table-column prop="serveripaddress" label="Server IP Address"></el-table-column>
        <el-table-column prop="duration" label="Duration (s)"></el-table-column>
        <el-table-column prop="createtime" label="Create Time" :formatter="dateFormat"  ></el-table-column>
        <el-table-column prop="lastvisittime" label="Last Visit Time" :formatter="dateFormat"></el-table-column>
        <el-table-column label="Status" prop="sessionstate">
         <template slot-scope="{row}">
            <el-tag :type="row.sessionstate | statusFilter">
              {{row.sessionstate}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operation" width="150px">
          <template slot-scope="{row,$index}">
            <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="killSession(row.sessionid)">
              Kill Session
            </el-button>
          </template>
        </el-table-column>
      </tao-table>
    </el-row>

  </div>
</template>

<script>
  import {  getSessionList,killSessionById } from '@/api/serverApi'
  import { convertTime } from "@/utils/utils.js"
  export default {
    filters:{
      statusFilter(status){
        const statusMap={
          Actived:'success',
          Created:'info',
          Destory:'danger',
          test:'warning'
        }
        return statusMap[status]
      }
    },
    data () {
      return{
        list:[],
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
      dateFormat:function(row,column){
         var date = row[column.property];
         if(date === undefined){
             return ''
          } ;
         return convertTime(date)
      },
      getList() {
        this.listLoading = true
        getSessionList({
        }).then(res => {
          if(res.code === 0) {
            let { list} = res.data
            this.list = list
            this.listLoading = false
          }
        })
      },
      killSession(id){
        this.$confirm('Are you sure kill the session?', 'Delete', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'error'
        }).then(() => {
          killSessionById(id).then(res => {
            if(res.code === 0) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Kill Session Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList();
            }else{
              this.$notify({
                title: 'Fail',
                message: 'Kill Session Fail',
                type: 'fail',
                duration: 2000
              })
            }
          })
        }).catch(err => {console.log(err)})
      }

    }
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
  }
</style>
