<template>
  <div>
        <el-card class="box-card" shadow="hover">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div> -->
          <div slot="header" class="clearfix">
            <span>初始化</span>
             <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('getExample')">快速新建样例</el-button>
          </div>
          <div class="">
            <el-form  :model="sys"
                      >
                  <el-form-item label="输入系统资源总数">
                      <el-input v-model="sys.sourceSum"
                              ></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary"
                              @click="$emit('setSouceSum', sys.sourceSum)">提交</el-button>
                  </el-form-item>
              </el-form>
              <el-form
                      :model="sys"
                      >
                  <el-form-item label="添加系统每种资源可用总数">
                      <el-input v-model="sys.availStr"
                              placeholder="请用空格隔开"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary"
                              @click="aAvailSubmit">提交</el-button>
                  </el-form-item>
              </el-form>
          </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>添加进程</span>
          </div>
          <div class="">
            <el-form
                     :model="progress"
                     class="demo-form-inline">
                <el-form-item label="进程最大需求量">
                    <el-input v-model="progress.need"
                              placeholder="请用空格隔开"></el-input>
                </el-form-item>
                <el-form-item label="进程分配到的资源">
                    <el-input v-model="progress.allocate"
                              placeholder="请用空格隔开"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="pSubmit">提交</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-card>
  </div>
</template>

<script>

export default {
  name: 'app',
  props:['originAvailArray', 'availArray', 'sourceSum'],
  data(){
    return {
      progress:{
        need:'',
        allocate:''
      },
      sys:{
        sourceAdd: '',
        progressSum:'',
        availStr:'',
        sourceSum:''
      }
    }
  },
  components: {

  },
  methods:{
    aAvailSubmit(){
      let arr = this.sys.availStr;
      arr = arr.split(' ');
      console.log(arr.length);
      console.log(this.sourceSum);
      if (arr.length !== this.sourceSum) {
          console.log('资源数量必须等于系统设置资源最大值！');
          this.$message.warning('资源数量必须等于系统设置资源最大值！')
          return false;
      }else{
          this.$emit("setOriginAvailArray", arr)
      }
    },
    pSubmit(){
      var pNeedArr = this.progress.need.split(' ')
      var pAllocateArr = this.progress.allocate.split(' ')
      if (pNeedArr.length !== this.sourceSum || pAllocateArr.length !== this.sourceSum) {
          this.$message.error('输入格式错误，请重新输入！')
          return false;
      }
      for (let i = 0; i < this.sourceSum; i++) {
          if (Number(pNeedArr[i]) < Number(pAllocateArr[i])) {
            this.$message.error('进程请求分配的资源大于进程最大需求量！')
            return false;
          }
      }
      for (let i = 0; i < this.sourceSum; i++) {
          if (pNeedArr[i] > this.originAvailArray[i]) {
            this.$message.error('进程最大需求量已经超过系统总资源!')
            return false;
          }
      }
      for (let i = 0; i < this.sourceSum; i++) {
          if (pAllocateArr[i] > this.availArray[i]) {
            this.$message.error('进程需要分配的资源超过当前可用资源!')
              return false;
          }
      }
      console.log(123);
      
      this.$emit('addProgress', pNeedArr, pAllocateArr);
    }
  }
}
</script>

<style>

</style>
