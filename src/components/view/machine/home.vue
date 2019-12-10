<template>
  <div class="page-container">
    <div id="top">
      <div id="bigSquare"></div>
      <div id="smalSquare"></div>
      <div id="titleText">
        河北东软就诊问诊挂号自助机
      </div>
    </div>

    <div id="register" @click="showAllDoctors">
      <div id="registerGb">
        <div id="book">
          <img id="imgBook" src="../../../assets/image/挂号-Book.png">
        </div>
        <div id="preRegister">预约挂号</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home",
        methods: {
          showAllDoctors() {
            this.$router.push('/machine/doctors');
          },
        }
    }
</script>

<style scoped>
  .page-container {
    min-height: 100%;
    background: linear-gradient(180deg,rgba(38,135,238,1) 0%,rgba(70,176,248,1) 54%,rgba(85,200,254,1) 100%);
  }
  #top {
    width:100%;
    height:51px;
    position:absolute;
    margin-top: 64px;
    text-align: center;
    display: inline-block;
  }

  #bigSquare {
    width: 32px;
    height: 32px;
    background: #93E2D3;
    transform: rotate(45deg);
    display: inline-block;
  }
  #smalSquare {
    width: 22px;
    height: 22px;
    background: #5DD1BB;
    transform: rotate(45deg);
    display: inline-block;
    margin-bottom: 4px;
    margin-left: -17px;
  }
  #titleText{
    width:454px;
    height:48px;
    font-size:34px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:48px;
    display: inline-block;
  }
  #register{
    display: inline-block;
    margin: 180px 977px 100px 113px;
  }
  #registerGb{
    width:264px;
    height:371px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(26,95,133,1);
    border-radius:5px;
    text-align: center;
    display: inline-block;
  }
  #imgBook{
    width:139px;
    height:131px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(26,95,133,1);
    border-radius:5px;
    margin-top: 84px;
  }

  #preRegister{
    width:120px;
    height:41px;
    font-size:29px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:41px;
    margin: auto;
    margin-top: 40px;
  }
</style>
