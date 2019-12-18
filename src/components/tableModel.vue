<template>
  <div class="">
    <el-table :data="tableModelData"
    :row-class-name="tableRowClassName"
              style="width: 100%">
        <el-table-column prop="index"
                         fixed
                         label="进程 \ 资源">
        </el-table-column>
        <el-table-column label="Max">
            <el-table-column v-for="(item,idx) in sourceArray" :key="item" :prop="'maxArray.'+idx"
                             :label="item"
                             min-width="50px">
            </el-table-column>
        </el-table-column>
        <el-table-column label="Allocation">
            <el-table-column v-for="(item,idx) in sourceArray" :key="item" :prop="'allocationArray.'+idx"
                             :label="item"
                             min-width="50px">
            </el-table-column>
        </el-table-column>
        <el-table-column label="Need">
            <el-table-column v-for="(item,idx) in sourceArray" :key="item" :prop="'needArray.'+idx"
                             :label="item"
                             min-width="50px">
            </el-table-column>
        </el-table-column>
        <el-table-column label="Available">
            <el-table-column v-for="(item,idx) in sourceArray" :key="item" :prop="'availableArray.'+idx"
                             :label="item"
                             min-width="50px">
            </el-table-column>
        </el-table-column>
        <el-table-column prop="statusArray"
                         label="状态">
        </el-table-column>
    </el-table>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>查看当前状态是否安全</span>
      </div>
      <div class="">
            <el-button type="primary"
                       @click="$emit('isSafe', 1)">查询一个</el-button>
            <el-button type="primary"
                       @click="$emit('isSafe', 2)">查询全部</el-button>           
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>进程资源分配</span>
      </div>
      <div class="">
        <el-form :inline="true"
                 :model="progress"
                 >
            <el-form-item label="进程">
                <el-select v-model="progress.progressId"
                           placeholder="请选择"
                           >
                    <el-option v-for="i in progressSum"
                               :key="i-1"
                               :label="`P${i-1}`"
                               :value="i-1">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分配的数量">
                <el-input v-model="progress.proSourceNum"
                          placeholder="请用空格隔开"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="actionSubmit">提交</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary"
                           @click="aReset">重置状态</el-button>
            </el-form-item> -->
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default{
    props:['tableModelData', 'sourceArray','progressSum', 'statusArray'],
    data(){
      return {
        progress:{
          progressId:'',
          proSourceNum:''
        }
      }
    },
    mounted(){
      console.log(this.tableModelData);
    },
    methods:{
      actionSubmit(){
        var proId = this.progress.progressId
        var proSourceArr = this.progress.proSourceNum.split(' ')
        if (this.proId === '') {
            this.$message.error('请选择进程！')
            return false;
        }
        if(proSourceArr.length !== this.sourceArray.length){
          this.$message.error('进程资源分配数量有误！')
          return false;
        }
        
        if (this.statusArray[proId] === 'true') {
            this.$message.error('不能对已经完成的进程做发起资源请求的操作！')
            return false;
        }
        this.$emit('actionSubmit',[proId, ...proSourceArr])
      },
      tableRowClassName({row}) {
        if (row.statusArray == 'true') {
          return 'true';
        }
        return '';
      }
    }
  }
</script>

<style >

        .cell {
            text-align: center;
        }
        .el-table tr th {
            /* border-right: 1px solid rgb(230, 235, 245) !important; */
        }
        .el-table__body-wrapper {
            /* overflow: hidden; */
        }
        .el-table .true {
            background-color: hsl(135, 88%, 46%);
        }


</style>
