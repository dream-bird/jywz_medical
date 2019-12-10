<template>
  <div class="page-container">
    <div id="partLeft">
      <img id="partLeftImg" src="../../../assets/image/yszy.png">
    </div>
    <div id="partRight">
      <div id="partRight1">
        欢迎登录就诊问诊
      </div>
      <div id="partRight2">
        用户名
      </div>
      <div id="partRight3">
        <input class="partRightInput"  type="text" v-model="SysUserRegDTO.idcard" placeholder="请输入用户名">
      </div>
      <div id="partRight4">
        密码
      </div>
      <div id="partRight5">
        <input class="partRightInput" type="password" v-model="SysUserRegDTO.password" placeholder="请输入密码">
      </div>
      <a-button id="partRight6" @click="login" type="primary">登录</a-button>
      <div id="register">
          还没有账号，点击<router-link to="/doctor/dregister">注册</router-link>一下
      </div>
    </div>

  </div>
</template>

<script>
  import md5 from 'js-md5'
  import {post} from "../../../utils/util.http";
    export default {
        name: "plogin",
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
            roles: '',           //角色：1: patient，2：docter
          },
          username: test.doctor.idcard ? test.doctor.idcard : "",
          password: test.doctor.password ? test.doctor.password : ""
        }
      },
      methods: {
          login: function () {
              let _self = this;
              var md5password = md5(_self.SysUserRegDTO.password);
              var username = _self.SysUserRegDTO.idcard;
              alert(username + _self.SysUserRegDTO.password);
              const config = {
                  url: "oauth/token",
                  params: {
                      grant_type: "password",
                      client_id: "practice",
                      client_secret: "neuqsoft2019",
                      username: username,
                      password: md5(_self.SysUserRegDTO.password.trim()).toUpperCase()
                  }
              };
              post(config)
                  .then(res => {
                      //debug.log("登录成功", res);
                      //session.update(res);
                      alert("恭喜你，登录成功！", res);
                      sessionStorage.access_token = res.access_token;
                      _self.$router.push({path: "/doctor/dhome"});
                  })
                  .catch(err => {
                      //alert("请校验登录信息后，重新登录！");
                      if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
                        _self.$message.error('登陆失败，失败信息：' + err.response.data.error_description)
                            return false;
                      }else{
                        _self.$message.info('登陆失败');
                        return false;
                      }
                  });
              // this.$axios.post("oauth/token?grant_type=password&client_id=practice&client_secret=neuqsoft2019&username="+username+"&password="+ md5password).then(response => {
              //     sessionStorage.access_token = response.data.access_token;
              //   this.$router.push('/doctor/dhome')
              //   })
              //     .catch(function(err) {
              //       if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              //         _self.$message.error('登陆失败，失败信息：' + err.response.data.error_description)
              //             return false;
              //       }else{
              //         _self.$message.info('登陆失败');
              //         return false;
              //       }
              //     });
          },
      }
    }
</script>

<style scoped>
  .page-container{
    min-height: 100%;
    background:rgba(135,182,242,1);
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  #partLeft{
    display: flex;
    justify-content: center;
    align-items: center;
    width:499px;
    height:615px;
    background:linear-gradient(147deg,rgba(255,255,255,1) 0%,rgba(199,226,254,1) 100%,rgba(200,227,254,1) 100%);
    border-radius:13px 0px 0px 13px;
    margin-left: 163px;
  }
  #partLeftImg{
    display: flex;
    align-self: center;
    width:455px;
    height:359px;
  }
  #partRight{
    display: flex;
    flex-direction: column;
    width:499px;
    height:615px;
    background:rgba(255,255,255,1);
  }
  #partRight1{
    width:233px;
    height:40px;
    font-size:28px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:40px;
    margin-top: 81px;
    margin-left: 75px;
  }
  #partRight2{
    width:61px;
    height:28px;
    font-size:20px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
    margin-top: 40px;
    margin-left: 75px;
  }
  #partRight3{
    width:88px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
    margin-top: 20px;
    margin-left: 75px;
  }

  #partRight4{
    width:61px;
    height:28px;
    font-size:20px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
    margin-top: 40px;
    margin-left: 75px;

  }
  #partRight5{
    width:88px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
    margin-top: 20px;
    margin-left: 75px;
  }

  #partRight6{
    width: 300px;
    height: 38px;
    margin-top: 75px;
    margin-left: 75px;
    box-shadow: 0 3px 18px 0 #0090ff;
  }

  .partRightInput{
    border: none;
    border-bottom: 1px solid;
  }
  #register{
    display: flex;
    justify-content: center;
    width: 300px;
    height: 50px;
    margin-top: 40px;
    margin-left: 140px;

  }

  #partRight6 :hover{
    cursor: default;
  }
</style>
