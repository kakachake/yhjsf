<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-12-16 10:50:33
 * @LastEditors  : kakachake
 * @LastEditTime : 2019-12-18 10:48:59
 -->
<template>
  <div >
    <el-card>
      <div slot="header" class="clearfix">
        <span>安全检查记录</span>
      </div>
      <div id="msgContent">
        <div v-for="(msg,idx) in msgArray" :key="idx" class="">
          <span class="msgId">{{idx+ ":"}}</span>
          <p v-html="msg"></p>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
  export default{
    props:['msgArray'],
    data(){
      return {

      }
    },
    watch:{
      msgArray(){
          console.log('运行');
          this.scrollToBottom();
      }
    },
    methods:{
      scrollToBottom(){
            this.$nextTick(function() {
                let div = document.getElementById('msgContent');
                console.log(div.scrollHeight);
                console.log(div.scrollTop);
                div.scrollTop = div.scrollHeight;
                console.log(div.scrollTop);
              })
        }
    }
  }
</script>
<style media="screen">
  #msgContent{
    height: 800px;
    overflow-y: scroll;
  }
  .msgId{
    background: #fa3838
  }
  p{
    display: inline;
  }
</style>
