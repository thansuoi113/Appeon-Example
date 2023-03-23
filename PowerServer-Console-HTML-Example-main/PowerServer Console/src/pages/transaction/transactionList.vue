<template>
  <div class='page-content'>
<!--  <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="4">
        <el-input placeholder="Name"></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
        <el-button>Search</el-button>
      </el-col>
    </el-row> -->

    <el-row style="margin-top: 15px">
      <tao-table
        :data="tableData"
        :showPage="false"
        default-expand-all
        v-loading="listLoading"
        size="mediul"
      >
        <el-table-column prop="transactionid" label="Transaction ID">
          <template slot-scope="{row}">
            <el-link type="primary" @click="viewSql(row.transactionid)">{{row.transactionid}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="sessionid" label="Session ID"></el-table-column>
        <el-table-column prop="application" label="Application Name" sortable></el-table-column>
        <el-table-column prop="cachename" label="Cache Name"></el-table-column>
        <el-table-column prop="duration" label="Duration (s)"></el-table-column>
        <el-table-column prop="begintime" label="Begin Time" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="lastvisittime" label="Last Visit Time" :formatter="dateFormat"></el-table-column>
        <el-table-column label="Status" prop="status">
          <template slot-scope="{row}">
             <el-tag :type="row.status | statusFilter">
               {{row.status}}
             </el-tag>
           </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operation" width="150px">
          <template slot-scope="{row,$index}">
            <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="rollback(row.sessionid,row.transactionid)">
              Rollback
            </el-button>
          </template>
        </el-table-column>
      </tao-table>
    </el-row>

    <el-dialog :title="dialogTitle"  width="60%" :visible.sync="dialogFormVisible">
      <tao-table
        :data="sqltableData"
        :showPage="false"
        default-expand-all
        v-loading="listSqlLoading"
        size="mediul"
      >
        <el-table-column prop="sessionid" label="Session ID"></el-table-column>
        <el-table-column prop="ModelName" label="Model Name" sortable></el-table-column>
        <el-table-column prop="SqlStatement" label="SqlStatement"></el-table-column>
        <el-table-column prop="TransactionId" label="Transaction ID"></el-table-column>
        <el-table-column prop="OperationType" label="OperationType" ></el-table-column>
        <el-table-column prop="StartTime" label="Start Time" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="duration" label="Duration (s)"></el-table-column>
      </tao-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {  getTransactionList,getRequestSql,rollbackTransaction} from '@/api/serverApi'
   import { convertTime } from "@/utils/utils"
  export default {
    filters:{
      statusFilter(status){
        const statusMap={
          Actived:'success',
          Created:'info'
        }
        return statusMap[status]
      }
    },
    data () {
      return{
        tableData:[],
        sqltableData:[],
        listLoading: true,
        listSqlLoading:false,
        dialogFormVisible:false,
        dialogTitle:'',
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
         if(date === undefined || date===null){
             return ''
          };
         return convertTime(date)
      },
      getList() {
        this.listLoading = true
        getTransactionList({
        }).then(res => {
          if(res.code === 0) {
            let { list} = res.data
            this.tableData = list
            this.listLoading = false
          }
        })
      },
      viewSql(transactionid){
        this.dialogTitle = 'View Sql'
        this.listSqlLoading = true;
        this.dialogFormVisible=true;
        getRequestSql(transactionid).then(res => {
          if(res.code === 0) {
            // alert(JSON.stringify(res.data.list.length))
            let { list} = res.data
            this.sqltableData = list
            this.listSqlLoading = false
          }
        })
      },
      rollback(sessionId,transactionId){
        this.$confirm('Are you sure rollback the transaction?', 'Rollback', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'error'
        }).then(() => {
          rollbackTransaction(sessionId,transactionId).then(res => {
            if(res.code === 0) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Rollback Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList();
            }else{
              this.$notify({
                title: 'Fail',
                message: 'Rollback Fail',
                type: 'fail',
                duration: 2000
              })
            }
          })
        }).catch(err => {
          console.log(err);
        })
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
