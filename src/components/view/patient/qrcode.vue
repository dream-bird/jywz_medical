<template>
  <div class ="h5-container">
    <PatientHead></PatientHead>
    <div id="applyImgTop">
      <img id="applyImgTop1" src="../../../assets/image/健康.png">
      <div id="neusoftCard">
        河北东软电子就诊卡
      </div>
    </div>
    <div id="twocodeDiv">
      <div class="twocodeImg">
        <Qrcode :value="QRCodeNum" style="width: 400px"></Qrcode>
      </div>
      <div id="QRCodeNum" v-text="QRCodeNum"></div>
      <div id="twocodeHint">
        <img id="twocodeNew" src="../../../assets/image/refresh.png">
        每分钟自动更新，点击手动
        <div id="refresh" @click="applyQRCode">刷新</div>
      </div>

      <div id="grant" @click="grantPermit">
        授权
      </div>
    </div>
  </div>
</template>

<script>
  import PatientHead from "./patient-head"
  import Qrcode from "vue-qrcode";
  export default {
    name: "twocode",
    components: {PatientHead,Qrcode},
    data(){
      return{
        QRCodeNum:"",
      }
    },
    mounted: function() {
      var _self = this;
      _self.applyQRCode()
    },
    methods:{
        /*获取就诊卡二维码*/
      applyQRCode(){
        this.$axios.post("/api/v1/card").then(response => {
            // _self.$message.error('申领二维码！');
          this.getQRCode()
        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('申领二维码失败，失败信息：' + err.response.data.error_description)
            }else{
              _self.$message.error('申领二维码失败');
              return false;
            }
          });
      },

      getQRCode(){
        var _self=this;
        _self.$axios.get("/api/v1/card").then(response => {
          _self.QRCodeNum=response.data.code;
        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('获取二维码失败，失败信息：' + err.response.data.error_description)
            }else{
              _self.$message.error('获取二维码失败');
              return false;
            }
          });
        // const timer = setTimeout(() => {
        //   _self.getQRCode();
        //   clearTimeout(timer);
        // }, 60000);
      },
      /*授权医生查看信息*/
      grantPermit(){
        let _self=this;
        _self.$axios.post("/api/v1/card/"+this.QRCodeNum).then(response => {
          _self.$message.success('授权成功！');
        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('授权失败，失败信息：' + err.response.data.error_description)
            }else{
              _self.$message.error('授权失败');
              return false;
            }
          });
      },
    }
  }
</script>

<style scoped>
  #applyImgTop{
    width:7.50rem;
    height:1.62rem;
    background:rgba(16,142,233,1);
    text-align: center;
    margin-top: -.02rem;
  }
  #applyImgTop1{
    width:6.68rem;
    height:.98rem;
    background:linear-gradient(90deg,rgba(114,173,251,1) 0%,rgba(76,128,244,1) 100%);
    margin-top: .64rem;
    z-index: -1;
    margin-left: .28rem;
  }
  #neusoftCard{
    width:3.60rem;
    height:.56rem;
    font-size:.40rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:.73rem;
    position: relative;
    margin: 0 auto;
    top: -1.00rem;
  }
  #twocodeDiv{
    display: flex;
    align-items: center;
    flex-direction: column;
    width:6.40rem;
    height:7.50rem;
    background:rgba(255,255,255,1);
    border-radius:.04rem;
    left:23rem;
    z-index: 0;

  }
  #QRCodeNum{
    display: flex;
    align-items: center;
    width:3.84rem;
    height:.45rem;
    font-size:.32rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(25,65,98,1);
    line-height:.59rem;
    margin-top: .24rem;
    z-index: 1;

  }
  #twocodeHint{
    display: flex;
    align-items: center;
    flex-direction: row;
    width:4.00rem;
    height:.33rem;
    font-size:.24rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(197,197,197,1);
    line-height:.43rem;
    margin-top: .22rem;
  }
  #refresh{
    width:.62rem;
    height:.43rem;
    font-size:.31rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(197,197,197,1);
    line-height:.43rem;
    color: #138CDD;
    display: inline-block;
  }

  #grant{
    width:1.50rem;
    height:.5rem;
    font-size:.3rem;
    line-height: .5rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    position: relative;
    background-color: #c2c2c2;
    text-align: center;

    margin-top: 1rem;
    border-radius:.2rem 0.2rem 0.2rem .2rem;
  }

  #twocodeNew{
    width:.31rem;
    height:.35rem;
  }

  .h5-container {
    width: 7.50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background:rgba(16,142,233,1);
    background-size: 100%;
    z-index: -1;
  }

</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
