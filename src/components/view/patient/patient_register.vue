<template>
  <div class ="h5-container">
    <div id="registerTitle">
      <div id="registerClose" @click="goBack">
        <img style="width: 23px" src="../../../assets/image/返回2.png">
        返回
      </div>
      <div id="registerText">注册</div>
    </div>
    <div id="register">
      <div class="userInfo" >
        姓名
        <input id="name" type="text" autofocus v-model="SysUserRegDTO.name" placeholder="请填写本人真实姓名" required>
      </div>
      <div  class="userInfo">
        身份证号<input id="idCardNO" type="text" v-model="SysUserRegDTO.idcard" placeholder="请填写身份证号码" required>
      </div>
      <div class="userInfo">
        手机号<input id="phone"   type="tel" v-model="SysUserRegDTO.mobile" placeholder="请填写手机号" required>
      </div>
      <div class="userInfo">
        设置密码<input id="passWord"  type="password" v-model="SysUserRegDTO.password" placeholder="请输入密码" required>
      </div>
      <div class="userInfo">
        验证码<input id="checkCode"   type="text" placeholder="请输入验证码" >
        <!--<span id="getCode">获取验证码</span>-->
      </div>
      <div class="userInfo">
        设置密码<input id="rePassWord" type="password" v-model="SysUserRegDTO.repassword" placeholder="请输入密码" required>
      </div>
      <div id="sure">
        <input type="button" id="confirm" value="确认" @click="save" >
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
    export default {
        name: "pregister",
        data() {
          return {
            SysUserRegDTO : {
              certificate : '',    //医生资格证号(医生才需要填)一般15位
              department : '',     //所在科室(医生才需要填) ,
              grade : '',          //职称(医生才需要填)
              idcard : '',         //身份证号(18位) ,
              location : '',       // 就诊地点(医生才需要填) ,
              mobile : '',         // 手机号
              name : '',           //姓名
              password : '',       //密码
              repassword : '',       //密码
              roles: '1',           //角色：1: patient，2：docter
            },
          }
        },
      methods:{
        save(){
          var _self = this;
          if (_self.SysUserRegDTO.password !== _self.SysUserRegDTO.repassword) {
            _self.$message.warn('密码不一致', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
            return false;
          };
          if (_self.SysUserRegDTO.name!==""&&
            _self.SysUserRegDTO.idcard!==""&&
            _self.SysUserRegDTO.mobile!==""&&
            _self.SysUserRegDTO.password!==""&&
            _self.SysUserRegDTO.repassword!=="") {
            _self.SysUserRegDTO.password=md5(_self.SysUserRegDTO.password);
            _self.SysUserRegDTO.repassword=md5(_self.SysUserRegDTO.repassword);
            _self.$axios.put('/api/v1/register/user',_self.SysUserRegDTO).then(response => {
              _self.$message.success('注册成功！')
              _self.$router.push('/patient.html');
            })
              .catch(function(err) {
                if (err.response.data.message!==""||err.response.data.message!=='undefind'){
                  _self.$message.error('注册失败，失败信息：' + err.response.data.message)
                }else{
                  _self.$message.error('注册失败');
                  return false;
                }
              });
          }
        },
        goBack()
        {
          this.$router.go(-1);//后退一页
        },
      }
    }
</script>

<style scoped>
  #registerTitle{
    display: flex;
    align-items: center;
    background:rgba(255,255,255,1);
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
  }

  #registerClose{
    display: flex;
    align-items: center;
    flex: 1;
    margin-top: 0.61rem;
    margin-left: 0.31rem;
    font-size:0.34rem;
    height:0.45rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,144,255,1);
  }

  #registerText{
    display: flex;
    flex: 2;
    margin-top: .61rem;
    font-size:.34rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-left: .40rem;
  }
  .userInfo{
    display: flex;
    flex-direction: row;
    background:rgba(255,255,255,1);
    font-size:.34rem;
    margin-top: .42rem;
    margin-left: .32rem;
  }
  #name{
    display: flex;
    align-items: center;
    border: none;
    margin-left: 1rem;
  }
  #idCardNO{
    display: flex;
    align-items: center;
    border: none;
    margin-left: .30rem;
  }
  #phone{
    display: flex;
    align-items: center;
    border: none;
    margin-left: .65rem;
  }

  #passWord{
    display: flex;
    align-items: center;
    border: none;
    margin-left: .35rem;
  }
  #checkCode{
    display: flex;
    align-items: center;
    border: none;
    margin-left: .65rem;
  }
  #rePassWord{
    display: flex;
    align-items: center;
    border: none;
    margin-left: .35rem;
  }
  #sure{
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    margin-top: 4.59rem;
    font-size:.36rem;
  }
  #confirm{
    width:5.00rem;
    height:.50rem;
    background:rgba(0,144,255,1);
    border-radius:0.05rem;
  }
  /*#confirmHint{*/
    /*width:653px;*/
    /*height:123px;*/
    /*font-size:47px;*/
    /*font-family:PingFangSC-Regular,PingFangSC;*/
    /*font-weight:400;*/
    /*color:rgba(255,255,255,1);*/
    /*margin: 0 auto ;*/
    /*line-height:123px;*/
  /*}*/
  #getCode{
    /*width:222px;*/
    /*height:63px;*/
    /*font-size:34px;*/
    /*font-family:PingFangSC-Regular,PingFangSC;*/
    /*font-weight:400;*/
    /*color:rgba(0,144,255,1);*/
    /*line-height:63px;*/
    /*margin-left: 40px;*/
  }

  input:-webkit-autofill {
    font-size:.50rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(204,204,204,1);
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
