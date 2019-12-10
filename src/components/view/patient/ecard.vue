<template>
  <div class ="h5-container">
    <PatientHead></PatientHead>
    <div id="applyImgTop">
      <img id="applyImgTop1" src="../../../assets/image/编组.png">
      <div>
        <img id="applyImgTop2" @click="showTwoCode" src="../../../assets/image/twocode.png">
      </div>
    </div>
    <div id="applyHint">
      使用说明：就诊前请点击卡面上的二维码并出示给医生
    </div>
  </div>
</template>

<script>
  import PatientHead from "./patient-head"
  export default {
    name: "ecard",
    components: {PatientHead},
    data() {
      return {
      }
    },
    methods: {
      showTwoCode() {
        this.$router.push('/patient/twocode');
      },

    }
  }
</script>

<style scoped>
  #applyImgTop{
    width:7.50rem;
    height:4.74rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
  #applyImgTop1{
    width:6.07rem;
    height:3.05rem;
    display: flex;
    background:linear-gradient(90deg,rgba(114,173,251,1) 0%,rgba(76,128,244,1) 100%);
    border-radius:.27rem;
  }
  #applyImgTop2{
    width:.77rem;
    height:.77rem;
    background:rgba(255,255,255,1);
    margin-left: -1.20rem;
  }
  #applyHint{
    display: flex;
    align-self: center;
    width:5.76rem;
    height:.33rem;
    font-size:.24rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,30,30,1);
    line-height:.33rem;
  }
  .h5-container {
    width: 7.50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
  }
</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
