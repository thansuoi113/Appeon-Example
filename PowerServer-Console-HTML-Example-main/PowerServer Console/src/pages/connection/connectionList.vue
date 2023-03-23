<template>
  <div class='page-content'>
    <el-row :gutter="20">
  <!--    <el-col :xs="24" :sm="12" :lg="4">
        <el-input placeholder="Name"></el-input>
      </el-col> -->
      <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
        <!-- <el-button>Search</el-button> -->
        <el-button @click="handleCreate()" type="primary">Add</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px">

        <tao-table
          :data="tableData"
          :showPage="false"
          default-expand-all
          v-loading="listLoading"
          size="mediul"
          row-key="id"
        >
           <el-table-column label="Cache Group" prop="cachegroup"/>
           <!-- <template  v-for="item in row.items"> -->
               <el-table-column label="Cache Name" prop="cachename">
               </el-table-column>
              <el-table-column label="Connection Type" prop="connectiontype">
               <template slot-scope="{row}">
                    {{row.connectiontype| databaseTypeFilter}}
                </template>
               </el-table-column>
               <el-table-column label="Host" prop="host"/>
               <el-table-column label="Port" prop="port"/>
               <el-table-column label="Database" prop="database"/>
               <el-table-column label="Connection Timeout" prop="connectiontimeout"/>
               <el-table-column label="Command Timeout" prop="commandtimeout"/>
               <el-table-column fixed="right" label="Operation" width="150px">
                 <template slot-scope="{row,$index}">
                   <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)">
                     Edit
                   </el-button>
                   <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteConn(row)">
                     Delete
                   </el-button>
                 </template>
               </el-table-column>

      	</tao-table>
    </el-row>

    <el-dialog :title="dialogTitle" :rules="rules" width="900px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form" label-width="220px">
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Cache Group" prop="cachegroup">
              <el-input v-model="form.cachegroup"  :disabled="this.dialogStatus=='create'?false:true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Cache Name" prop="cachename">
              <el-input v-model="form.cachename" :disabled="this.dialogStatus=='create'?false:true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Host" >
              <el-input v-model="form.configuration.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Port">
              <el-input v-model="form.configuration.port"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Database">
              <el-input v-model="form.configuration.database"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="User Id">
              <el-input v-model="form.configuration.userid"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="11">
            <el-form-item label="Password">
              <el-input type="password" v-model="form.configuration.password"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Command Timeout (seconds)">
              <el-input v-model="form.configuration.commandtimeout"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Connection Timeout (seconds)">
              <el-input v-model="form.configuration.connectiontimeout"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Min Connection Pool Size">
              <el-input v-model="form.configuration.minpoolsize"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Max Connection Pool Size">
              <el-input v-model="form.configuration.maxpoolsize"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Connection Lifetime (seconds)">
              <el-input v-model="form.configuration.connectionlifetime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Other Options">
              <el-input v-model="form.configuration.otheroptions"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="Enable Connection Pooling">
              <el-radio-group v-model="form.configuration.enablepooling">
                <el-radio :label="true"></el-radio>
                <el-radio :label="false"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Enable Dynamic Connection">
              <el-radio-group v-model="form.configuration.dynamicconnection">
                <el-radio :label="true"></el-radio>
                <el-radio :label="false"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getConnectionList,updateConnection,addConnection} from '@/api/serverApi'

const DatabaseTypeMap=
[
          {key: '0',dispaly_name:'SQL Server'},
          {key: '1',dispaly_name:'Sqlite'},
          {key: '2',dispaly_name:'Oracle'},
          {key: '3',dispaly_name:'MySql'},
          {key: '4',dispaly_name:'DB2'},
          {key: '5',dispaly_name:'PostgreSql'},
          {key: '6',dispaly_name:'Odbc'},
          {key: '7',dispaly_name:'Informix'}
]

const getDatabaseName=DatabaseTypeMap.reduce((acc,cur)=>{
    acc[cur.key]=cur.dispaly_name
     return acc
   },{})
var oldPwd="";
export default {
  filters:{
    databaseTypeFilter(type){
      return getDatabaseName[type]
    }
  },
  data () {
    return{
      dialogTitle:'',
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        cachegroup: '',
        cachename:'',
        configuration:{
          connectiontype: 0,
          host: null,
          port: null,
          odbcname: "",
          odbcdriver: "",
          userid: "",
          password: "",
          database: "",
          enablepooling: false,
          minpoolsize: 0,
          maxpoolsize: 0,
          connectionlifetime: 300,
          connectiontimeout: 300,
          commandtimeout: 30,
          otheroptions: "",
          securityoptions: "",
          dynamicconnection: false
        }
      },
      rules: {
        cachegroup: [{ required: true, message: 'Cache Group is required', trigger: 'blur' }],
        cachename: [{ required: true, message: 'Cache Name is required', trigger: 'blur' }]
      },
      tableData:[],
      listLoading: true,
    }
  },
  created() {
     //this.getList();
   },
   mounted() {
     this.getList()
   },
  methods: {
    resetTemp() {
      this.form = {
        cachegroup: '',
        cachename:'',
        configuration:{
          connectiontype: 0,
          host: null,
          port: null,
          odbcname: "",
          odbcdriver: "",
          userid: "",
          password: "",
          database: "",
          enablepooling: false,
          minpoolsize: 0,
          maxpoolsize: 0,
          connectionlifetime: 300,
          connectiontimeout: 300,
          commandtimeout: 30,
          otheroptions: "",
          securityoptions: "",
          dynamicconnection: false
        }
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create'
      this.dialogTitle = 'Add Connection'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addConnection(this.form).then(res => {
            if(res.code===0){
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            }else{
              this.$notify({
                title: 'Fail',
                message: 'Update Fail,'+res.data.errormessage,
                type: 'fail',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.dialogTitle = 'Edit Connection'
      this.form.configuration = Object.assign({}, row) // copy obj
      this.form.cachegroup = row.cachegroup;
      this.form.cachename = row.cachename;
      oldPwd = row.password;
      //this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(oldPwd==this.form.configuration.password) delete this.form.configuration.password;
          // alert(JSON.stringify(this.form))
          const tempData = Object.assign({}, this.form)
          updateConnection(tempData).then( res=> {
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
    deleteConn(row) {
      this.$confirm('Are you sure delete?', 'Delete', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        delConnection(row).then( res=> {
          if(res.code===0){
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList();
          }else{
            this.$notify({
              title: 'Fail',
              message: 'Delete Fail',
              type: 'fail',
              duration: 2000
            })
          }

        })
      }).catch(err => {console.log(err)})
    },
    getList() {
      this.listLoading = true
      getConnectionList({
      }).then(res => {
        if(res.code === 0) {
          let { list} = res.data

          this.tableData =list
          this.listLoading = false
        }
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
