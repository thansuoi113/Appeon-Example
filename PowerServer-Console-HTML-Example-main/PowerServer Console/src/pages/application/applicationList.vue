<template>
  <div class='page-content'>
<!--   <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="4">
        <el-input placeholder="名称"></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
        <el-button>搜索</el-button>
        <el-button @click="showDialog('add')">新增部门</el-button>
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
        <el-table-column prop="applicationname" label="Application Name" sortable></el-table-column>
        <el-table-column prop="cachename" label="Cache Name" sortable></el-table-column>
        <el-table-column prop="sessionTimeout" label="Session Timeout"></el-table-column>
        <el-table-column prop="requestTimeout" label="Request Timeout"></el-table-column>
        <el-table-column prop="transactionTimeout" label="Transaction Timeout"></el-table-column>
       <el-table-column label="Run Mode" prop="runMode">
          <template slot-scope="{row}">
            <el-tag  size="mini" :type="row.runMode === 1 ? 'warning' : 'info'">
              {{row.runMode === 1 ? 'Test' : 'Normal'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operation" width="150px">
          <template slot-scope="{row,$index}">
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteConn(scope)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </tao-table>
    </el-row>

    <el-dialog :title="dialogTitle" :rules="rules" width="700px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form" label-width="210px">
        <el-form-item label="Application name">
          <el-input v-model="form.applicationname" ></el-input>
        </el-form-item>

        <el-form-item label="Cache name">
          <el-input v-model="form.cachename" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="Session Timeout (seconds)">
          <!-- <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.configuration.session.timeout" ></el-input> -->
          <el-input v-model="form.configuration.session.timeout" ></el-input>
        </el-form-item>

        <el-form-item label="Request Timeout (seconds)">
          <el-input v-model="form.configuration.request.timeout" ></el-input>
        </el-form-item>

        <el-form-item label="Transaction Timeout (seconds)">
          <el-input v-model="form.configuration.transaction.timeout" ></el-input>
        </el-form-item>

        <el-form-item label="Run Mode">
            <el-radio-group v-model="form.configuration.runmode">
              <el-radio :label="0">Normal</el-radio>
              <el-radio :label="1">Test</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import { getApplicationList,updateApplication} from '@/api/serverApi'
 import { convertTime } from "@/utils/utils"
  export default {
    data () {
      return{
        dialogTitle:'',
        tableData:[],
        listLoading: true,
        dialogFormVisible: false,
        form: {
          applicationname: '',
          configuration:{
            cloudtransactions:{},
            transaction: {
              timeout:120
            },
            session: {
              timeout:3600
            },
            request: {
              timeout:3600
            },
            runmode: "0"
          }
        },
        rules: {
          applicationname: [{ required: true, message: 'Cache Group is required', trigger: 'blur' }],
          timeout: [{ required: true, message: 'Cache Name is required', trigger: 'blur' }],
        },
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
        getApplicationList({
        }).then(res => {
          if(res.code === 0) {
            let { list} = res.data
            this.tableData =list
            this.listLoading = false
          }
        })
      },
      handleUpdate(row) {
        this.dialogTitle = 'Edit Application'
        this.form.applicationname = row.applicationname;
        this.form.cachename = row.cachename;
        this.form.configuration.transaction.timeout = row.transactionTimeout;
        this.form.configuration.session.timeout = row.sessionTimeout;
        this.form.configuration.request.timeout = row.requestTimeout;
        this.form.configuration.runmode = row.runMode;
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.form)
            updateApplication(tempData).then( res=> {
              if(res.code===0){
                this.dialogFormVisible = false
                this.$notify({
                  title: 'Success',
                  message: 'Update Successfully',
                  type: 'success',
                  duration: 2000
                })
                this.getList();
              }else{
                this.$notify({
                  title: 'Fail',
                  message: 'Update Fail',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      delete(scope) {
        this.$confirm('Are you sure delete?', 'Delete', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'error'
        }).then(() => {
          //this.userList.splice(scope.$index, 1)
        }).catch(err => {console.log(err)})
      },
    }
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
  }
</style>
