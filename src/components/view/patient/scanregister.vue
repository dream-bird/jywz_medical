<template>
  <div class ="h5-container">
    <div id="codeTitle">
      <div id="codeClose" @click="goBack">
        <img  src="../../../assets/image/返回.png">
      </div>
      <div id="codeText">扫码登陆</div>
    </div>

    <div id="code">
      <div id="scanCode">
        <img id="scanCodeImg" src="../../../assets/image/扫描二维码.png">
      </div>
      <div id="scanHint">
        将二维码/条码放入框内，即可自动扫描
      </div>
      <div id="inputCodeText">
        手工输入医生二维码
      </div>
      <div id="inputCodeDiv">
        <input id="inputCode" v-model="twocode" type="text" placeholder="请输入医生二维码">
        <img id="inputCodeImg" src="../../../assets/image/搜索.png" @click="getRegister">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "scanregister",

    data(){
      return{
        twocode:''//医生二维码
      }
    },

    methods: {
      getRegister(){
        var _self = this;
        _self.$axios.get("/api/v1/register/"+ _self.twocode).then(response => {
          _self.$message.success('挂号成功！')
          _self.$router.push('/patient/phome')
        })
            .catch(function (err) {
              if (err.response.data.message !== "" || err.response.data.message !== 'undefind') {
                _self.$message.warn('挂号失败，失败信息：' + err.response.data.message)
              } else {
                _self.$message.error('挂号失败');
                return false;
              }
            });
      },

      scanCode() {
        this.$router.push('/patient/scanregister');
      },

      goBack() {
        this.$router.go(-1);//后退一页
      },

      goHome() {
        this.$router.push('/index.html');
      }
    }
  }
</script>

<style>
  .ant-message {
    font-size: .28rem;
  }
</style>

<style scoped>
  #codeTitle{
    display: flex;
    flex-direction: row;
    align-items: center;
    height:2.00rem;
    font-size:.34rem;
    background:rgba(91,91,91,1);
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);

  }

  #codeClose img{
    width:.40rem;
    height:.40rem;
    margin-left: .30rem;
  }
  #codeText{
    font-size:.40rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:white;
    margin-left: 2.00rem;
  }
  #code{
    display: flex;
    flex-direction: column;
    align-items: center;
    height:14.72rem;
    background: #4a4a4a;
  }
  #scanCodeImg{
    width:4.50rem;
    height:4.50rem;
    margin-top: 1.00rem;
  }
  #scanHint{
    height:.65rem;
    font-size:.34rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 1.00rem;
  }
  #inputCodeText{
    width:3.24rem;
    height:.50rem;
    font-size:.36rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 1.20rem;
  }
  #inputCodeDiv{
    text-align: center;
    height:.91rem;
  }
  input::-webkit-input-placeholder { /* WebKit browsers */
    width:2.93rem;
    height:.91rem;
    font-size:.34rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.34rem;
    position: relative;
    left: .20rem;
  }
  #inputCode{
    width:5.82rem;
    height:.70rem;
    background:rgba(91,91,91,1);
    border-radius:.14rem;
    margin-top: .10rem;
    color:white;
    font-size: .40rem;
    margin-left: .15rem;
  }
  #inputCodeImg{
    width:.71rem;
    height:.70rem;
    background:rgba(24,149,249,1);
    border-radius:0rem .14rem .14rem 0rem;
    display: inline-block;
    position: relative;
    top: -.1rem;
    left: -.1rem;
    background: black;
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
