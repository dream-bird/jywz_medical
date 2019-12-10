<template>
  <div class ="h5-container">
    <div id="top">
      <div class="logo">
        <img src="../../../assets/image/logo.png" />
      </div>
      <div id="titleText">
        欢迎使用就诊问诊
      </div>
    </div>

    <div id="userInfo">
      <div>
        <input id="idCardNo" v-model="idCardNO" type="text" placeholder="身份证号码">
      </div>
      <div>
        <input id="passWord" v-model="passWord" type="password"  placeholder="请输入登录密码，注意大小写">
        <img id="passWordImg" src="../../../assets/image/密码不可见.png">
      </div>
    </div>
    <div id="userLoad">
      <div id="loadBtn">
        <div id="loadBtnText" @click="load">登陆</div>
      </div>
    </div>
    <div id="registerHint">
      还没有账号，点击<router-link to="/patient/pregister">注册</router-link>一下
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import store from '../../../router/store'
  import test from "../../../test";
  export default {
    name: "plogin",
    data(){
      return{
        idCardNO: test.patient.idcard ? test.patient.idcard : "",
        passWord: test.patient.password ? test.patient.password : "",
        patientName:'',
      }
    },
    store,
    methods: {
        load() {
          var _self = this;
          var md5password = md5(_self.passWord);
          var username = _self.idCardNO;
            _self.$axios.post("/oauth/token?grant_type=password&client_id=practice&client_secret=neuqsoft2019&username="+username+"&password="+ md5password ).then(response => {
              sessionStorage.access_token = response.data.access_token;
              //alert(sessionStorage.access_token);
              _self.$store.commit('setToken',response.data.access_token);
              _self.$router.push('/patient/phome');
            })
            .catch(function(err) {
              if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
                _self.$message.error('登陆失败，失败信息：' + err.response.data.error_description)
              }else{
                _self.$message.error('登陆失败');
                return false;
              }
            });
        },
    }

  }
</script>

<style scoped>
  .h5-container {
    width: 7.50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
  }

  .logo img{
    width:0.77rem;
    height:0.63rem;
  }
  #top {
    display: flex;
    align-items: center;
    margin-left: 0.32rem;
    margin-top: 1.96rem;
    margin-bottom: 1.33rem;
  }

  #titleText{
    width:4.00rem;
    height:0.70rem;
    font-size:0.50rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(66,77,90,1);
    line-height:0.70rem;
    display: inline-block;
    margin-left: 0.18rem;
  }
  #idCardNo{
    display: flex;
    flex-direction: column;
    border: none;
    width:4.16rem;
    height:0.45rem;
    font-size:0.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(180,190,198,1);
    line-height:0.45rem;
    margin-left: 0.50rem;
    margin-top: 0.50rem;
  }

  #passWord{
    width:4.16rem;
    height:0.45rem;
    font-size:0.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(180,190,198,1);
    line-height:.45rem;
    border: none;
    margin-left: .50rem;
    margin-top: 2.20rem;
  }

  #passWordImg{
    width:.40rem;
    height:.22rem;
    margin-left: .60rem;
  }

  #loadBtn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:6.86rem;
    height:.80rem;
    background:rgba(0,144,255,1);
    border-radius:.38rem;
    margin: 0 auto;
    margin-top: 2.14rem;
  }
  #loadBtnText{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size:.34rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  #registerHint{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.40rem;
    margin: 0 auto;
    margin-top: 1.00rem;
  }
</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
