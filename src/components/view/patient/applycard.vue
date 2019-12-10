<template>
  <div class ="h5-container">
    <PatientHead></PatientHead>
    <div id="applyImgTop">
      <img id="applyImgTop1" src="../../../assets/image/快速申领电子就诊卡.png">
      <img id="applyImgTop2" src="../../../assets/image/applycard2.png">
      <!--<img id="applyImgTop3" src="../../../assets/image/编组.png">-->
    </div>
    <div id="applyHint">
      先扫码 再就诊
    </div>
    <!--<div id="applySuccess" v-show="show" >-->
    <!--医疗卡申领成功-->
    <!--<div id="applyBtn" @click="goCard">确定</div>-->
    <!--</div>-->
    <div id="applyHint2">
      <div id="applyHint2_1" >
        使用说明：就医、拿药一卡通，请在就诊前向医生出示您的二维码
      </div>

    </div>

    <div id="applyHint3">
      <input id="applyHint3_1_1" type="radio" checked>
      <div id="applyHint3_1" >
        同意
      </div>
      <div id="applyHint3_2" >
        《用户就医协议》
      </div>
    </div>
    <div id="apply">
      <div id="apply_1" >

      </div>

      <div id="apply_2" @click="applyEcard" >
        立即领取
      </div>
    </div>

  </div>
</template>

<script>
  import PatientHead from "./patient-head"
  export default {
    name: "applycard",
    components: {
      PatientHead
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
        /*申领就诊卡*/
      applyEcard(){
        var _self = this;
        _self.$axios.post("/api/v1/ecard").then(response => {
          if (response.data.code==="0"){
            _self.$message.success('医疗卡申领成功！')
            this.$router.push('/patient/phome');
          }
        })
          .catch(function(err) {
            if (err.response.data.message!==""||err.response.data.message!=='undefind'){
              _self.$message.error('医疗卡申领失败，失败信息：' + err.response.data.message)
            }else{
              _self.$message.error('医疗卡申领失败');
              return false;
            }
          });
      }
    }
  }
</script>

<style>
  .ant-message {
    font-size: .4rem;
  }
</style>
<style scoped>
  #applyImgTop{
    width:7.50rem;
    height:4.76rem;
    background:linear-gradient(180deg,rgba(5,181,255,1) 0%,rgba(2,176,254,1) 100%);
    text-align: center;
  }
  #applyImgTop1{
    width:6.50rem;
    height:.90rem;
    display: inline-block;
    margin-top: .80rem;
  }
  #applyImgTop2{
    width:6.85rem;
    height:3.63rem;
  }
  #applyHint{
    width:2.67rem;
    height:.56rem;
    font-size:.40rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(25,65,98,1);
    line-height:.73rem;
    margin: 0 auto;
    margin-top: 1.00rem;
  }
  #applyHint2{
    width:7.50rem;
    height:1.54rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem .03rem .13rem 0rem rgba(153,153,153,0.2);
    border-radius:.10rem;
    margin: 0 auto;
    margin-top: .60rem;
  }
  #applyHint2_1{
    width:5.76rem;
    height:.66rem;
    font-size:.24rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.33rem;
    position: relative;
    margin: .34rem .64rem;
  }

  #applyHint3_1{
    width:.56rem;
    height:.40rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(66,66,66,1);
    line-height:.52rem;
    margin-top: .72rem;
    margin-left: .12rem;
    display: inline-block;
  }
  #applyHint3_2{
    width:2.24rem;
    height:.40rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(16,142,233,1);
    line-height:.40rem;
    display: inline-block;
  }
  #applyHint3_1_1{
    width:.36rem;
    height:.36rem;
    margin-left: .38rem;
  }
  #apply_1{
    width:6.86rem;
    height:.80rem;
    background:rgba(0,144,255,1);
    box-shadow:0rem .03rem .05rem 0rem rgba(58,118,165,1);
    border-radius:.10rem;
    margin: 0 auto;
    margin-top: .72rem;

  }
  #apply_2{
    width:1.31rem;
    height:.45rem;
    font-size:.32rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:.59rem;
    position: relative;
    margin: 0 auto;
    top: -.72rem;
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
