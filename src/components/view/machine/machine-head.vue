<template>
  <div class="page-container">
    <div id="doctorTitle">
      <div id="doctorClose" @click="goBack">
        <img style="width: 11px" src="@/assets/image/machine_back.png">
        返回
      </div>
      <div id="doctorText">医生列表</div>
      <div id="doctorHome" @click="goHome">
        <img id="doctorHomeImg" src="@/assets/image/machine_home.png">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "machine-head",
        methods:  {
          goBack()
          {
            this.$router.go(-1);//后退一页
          },

          goHome()
          {
            this.$router.push('/machine.html');
          }
      }
    }
</script>

<style scoped>
  .page-container {
    flex-direction: column;
    min-height: 100%;
    background: #f6f7fb;
  }
  #doctorTitle{
    width:100%;
    height:82px;
    background:linear-gradient(270deg,rgba(38,135,238,1) 0%,rgba(70,176,248,1) 54%,rgba(85,200,254,1) 100%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #doctorClose{
    display: flex;
    align-items: center;
    font-size:26px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:37px;
    padding: 0 34px;
  }
  #doctorHome{
    display: flex;
    align-items: center;
  }
  #doctorHomeImg{
    width: 40px;
    height: 31px;
    margin-right: 25px;
    margin-top: 5px;
  }
  #doctorText{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size:26px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
  }
</style>
