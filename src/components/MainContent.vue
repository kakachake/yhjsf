<template>
  <div>
    <el-row>
      <el-col :span="7">
          <inputModel
            @setSouceSum="setSouceSum"
            :originAvailArray="originAvailArray"
            :availArray="availArray"
            @addProgress="addProgress"
            @getExample="getExample"
            @setOriginAvailArray="setOriginAvailArray"
            :sourceSum="sourceSum"></inputModel>
      </el-col>
      <el-col :span="10">
          <tableModel
            :tableModelData="tableModelData"
            @isSafe="isSafe"
            @actionSubmit="actionSubmit"
            :progressSum="progressSum"
            :statusArray="statusArray"
            :sourceArray="sourceArray"></tableModel>
      </el-col>
      <el-col :span="7">
          <msgModel
            :msgArray="msgArray"></msgModel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import inputModel from './inputModel'
import tableModel from './tableModel'
import msgModel from './msgModel'
import { isSafe, allocate, allSafe } from '../utils/util'
export default {
  components: {
    inputModel,
    tableModel,
    msgModel
  },
  data(){
    return {
      originAvailArray:[],
      progressSum: 0,
      maxArray: [
      ],
      allocateArray: [
      ],
      statusArray: [
      ],
      sourceSum:0,
      msgArray:[],
      example:{
        originAvailArray:[17, 5, 20],
        progressSum: 5,
        maxArray: [
            [5, 5, 9],
            [5, 3, 6],
            [4, 0, 11],
            [4, 2, 5],
            [4, 2, 4]
        ],
        allocateArray: [
            [2, 1, 2],
            [4, 0, 2],
            [4, 0, 5],
            [2, 0, 4],
            [3, 1, 4]
        ],
        statusArray: [
            'false','false','false','false','false'
        ],
        sourceSum:3
      }
    }
  },
  computed:{
    tableModelData(){
      var arr = [];
      for(var i = 0; i < this.progressSum; i++){
        arr.push({
          index: "P"+i,
          maxArray: this.maxArray[i],
          allocationArray: this.allocateArray[i],
          needArray: this.needArray[i],
          availableArray:this.availArray,
          statusArray:this.statusArray[i]
        })
      }
      console.log(arr);
      return arr;
    },
    sourceArray(){
        var arr = []
        for (var i = 0; i < this.sourceSum; i++) {
                console.log(String.fromCharCode((65 + i)));
                arr.push(String.fromCharCode((65 + i)));
        }
        return arr;
    },
    availArray(){
        var arr = [];
        for(var i = 0; i < this.originAvailArray.length; i++){
            arr[i] = JSON.parse(JSON.stringify(this.originAvailArray[i]))
            for(var j = 0; j < this.allocateArray.length; j++){
              // console.log(this.allocateArray[j]);
                arr[i] -= this.allocateArray[j][i] || 0;
            }
        }
        // console.log(arr);
        
        return arr;
    },
    needArray(){
        var arr = [];
        for(var i = 0; i < this.progressSum; i++){
            console.log(this.maxArray[i]);
            arr[i] = JSON.parse(JSON.stringify(this.maxArray[i]))
            for(var j = 0; j < this.sourceSum; j++){
                if(this.statusArray[i] == 'true'){
                  arr[i][j] = 0;
                }else{
                  arr[i][j] -= this.allocateArray[i][j] || 0
                }
                // console.log(this.allocateArray[i][j]);
            }
        }
        return arr;
    }
  },
  methods:{
    getExample(){
      this.progressSum = this.example.progressSum
      this.sourceSum = this.example.sourceSum
      this.originAvailArray = JSON.parse(JSON.stringify(this.example.originAvailArray));
      this.maxArray = JSON.parse(JSON.stringify(this.example.maxArray));
      this.allocateArray = JSON.parse(JSON.stringify(this.example.allocateArray));
      this.statusArray = JSON.parse(JSON.stringify(this.example.statusArray));
      this.$message.success('样例设置成功！')
    },
    addProgress(pMaxNeedArr,pAllocateArr){
      // console.log(x,y);
      pMaxNeedArr = pMaxNeedArr.map((x)=>{
        return Number(x)
      })
      pAllocateArr = pAllocateArr.map((x)=>{
        return Number(x)
      })
      let progressNeed = pMaxNeedArr.map((x, i) => {
          return x - pAllocateArr[i];
      });
      
      if(progressNeed.every((x)=>{
        return x == 0;
      })){
        this.statusArray.push('true')
        this.maxArray.push(pMaxNeedArr)
        this.allocateArray.push(new Array(this.sourceSum).fill(0));
        console.log(this.maxArray);
        this.$message.success('添加进程成功')
        this.msgArray.push(
            `【添加进程】：添加新的进程${this.progressSum}成功。`
        );
        return true;
      }else{
        this.statusArray.push('false');
        // 更新可利用资源向量
        // this.availArray = this.availArray.map((x, i) => {
        //     return x - progressAllocate[i];
        // });
        // 更新最大需求矩阵
        this.maxArray.push(pMaxNeedArr);
        // 更新分配矩阵
        
        this.allocateArray.push(pAllocateArr);
        this.$message.success('添加进程成功')
        this.msgArray.push(
            `【添加进程】：添加新的进程${this.progressSum}成功。`
        );
      }
      this.progressSum++;
    },
    setSouceSum(i){
      this.sourceSum = Number(i);
    },
    setOriginAvailArray(arr){
        console.log(arr);
        this.originAvailArray = arr.map((item)=>{
            return Number(item)
        });
        this.$message.success('设置成功！');
    },
    isSafe(id){
      if(id == 1){
        var res = isSafe.call(this)
        if(res!==false){
          this.$message.success('当前状态安全！')
        }else{
          this.$message.success('当前状态不安全！')
        }
      }else{
        allSafe.call(this);
      }
    },
    actionSubmit(data){
      console.log('提交');
      var pId = data[0]
      var pArray = data.slice(1, this.sourceSum+1).map((x)=>{
        return Number(x)
      })
      var res = allocate.call(this, pId, pArray)
      if(res.result === false){
        this.$message.error(res.msg)
        return false;
      }else{
        var safeRes = isSafe.call(this);
        console.log(safeRes);
        
        if(safeRes === false){
          for(var i = 0; i < this.sourceSum; i++){
              this.allocateArray[pId][i] -= pArray[i];
          }
          this.allocateArray = this.allocateArray.slice();
          this.$message.error('因分配使得系统进入不安全状态，因此分配失败');
          this.msgArray.push(
              `【响应进程资源请求】：响应进程${pId}发起的资源分配请求失败，因为此时系统处于不安全状态，
            `
          );
        }else {
            this.$message.success('分配成功！')
            this.maxArray = this.maxArray.slice();
            this.allocateArray = this.allocateArray.slice();
            this.statusArray = this.statusArray.slice();
            this.msgArray.push(
                `【响应进程资源请求】：响应进程${pId}发起的资源分配请求成功，此时系统安全序列为${safeRes}，。`
            );
        }
      }
    }
  }
}
</script>

<style>

</style>
