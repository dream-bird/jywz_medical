<template>
  <div class="page-container">
    <div id="partMain">
      <h1 id="partMain1">欢迎注册</h1>
      <div id="partMainUserClass0">
        用户名
        <input class="partMain2" type="text" autofocus v-model="SysUserRegDTO.name" placeholder="请输入用户名" required="required">
      </div>

      <div class="partMainUserClass">
        身份证号码
        <input class="partMain2" type="text"  v-model="SysUserRegDTO.idcard" placeholder="请输入身份证号码" required>
      </div>

      <div class="partMainUserClass">
        设置密码
        <input class="partMain2" type="password"  v-model="SysUserRegDTO.password" placeholder="请输入密码" required>
      </div>

      <div class="partMainUserClass" >
        短信验证码
        <input class="partMain2" type="text" placeholder="请输入验证码">
      </div>
      <div class="partMainUserClass">
        职业资格证编号
        <input class="partMain2" type="text"  v-model="SysUserRegDTO.certificate" placeholder="请输入编号" required>
        <div id="partMain2_1">请补全医生信息</div>
      </div>
      <div class="partMainUserClass">
        级别
        <select id="partMain3"  v-model="SysUserRegDTO.grade" required>
          <option>主治医师</option>
          <option>副主治医师</option>
          <option>主任医师</option>
        </select>
      </div>
      <div class="partMainUserClass">
        科室名称
        <input class="partMain2" type="text"  v-model="SysUserRegDTO.department" placeholder="请输入科室名称" required>
      </div>
      <div class="partMainUserClass">
        问诊地点
        <input class="partMain2" type="text" autofocus v-model="SysUserRegDTO.location" placeholder="请输入问诊地点" required>
      </div>
      <div id="partMain4">
        <a-button id="partMain4_Button" @click="register" type="primary">确定</a-button>
        <div id="partMain4_1" @click="goBack">
          返回
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
    export default {
        name: "dregister",
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
        }
      },
      methods: {
        register(){
          debugger
          let _self = this;
            if (_self.SysUserRegDTO.certificate!==""&&
              _self.SysUserRegDTO.department!==""&&
              _self.SysUserRegDTO.grade!==""&&
              _self.SysUserRegDTO.idcard!==""&&
              _self.SysUserRegDTO.location!==""&&
              _self.SysUserRegDTO.name!==""&&
              _self.SysUserRegDTO.password!==""
              ){
              _self.SysUserRegDTO.password=md5(_self.SysUserRegDTO.password);
              _self.SysUserRegDTO.roles = '2';
              _self.$axios.put("/api/v1/register/user",_self.SysUserRegDTO).then(response => {
              if (response.data.code==="0"){
                _self.$message.success("注册成功！");
                _self.$router.push('/doctor.html');
              }
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

        goBack() {
          this.$router.push('/doctor.html');
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

  #partMain{
    width:1068px;
    height:650px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 13px 0px rgba(21,24,113,1);
    border-radius:13px;
    margin-left: 180px;
    margin-top: 4px;
  }
  #partMain1{
    width:117px;
    height:35px;
    font-size:28px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:40px;
    position: relative;
    top:10px;
    left: 319px;
  }
  .partMainUserClass{
    width:161px;
    height:28px;
    font-size:20px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
    position: relative;
    margin-top:30px;
    margin-left: 319px;

  }
  #partMainUserClass0{
    width:161px;
    height:28px;
    font-size:20px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
    position: relative;
    margin-left: 319px;
  }
  .partMain2{
    width:250px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
    border: none;
    border-bottom: 1px solid;
  }
  #partMain2_1{
    width:102px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,91,91,1);
    line-height:20px;
    margin-top: -25px;
    margin-left: 280px;
  }
  #partMain3{
    width:250px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
  }
  #partMain4{
    width: 208px;
    height: 97px;
    margin-left: 312px;
    margin-top: 45px;
  }
  #partMain4_1{
    width:166px;
    height:51px;
    border-radius:3px;
    border:1px solid rgba(0,144,255,1);
    margin-left: 200px;
    margin-top: -93px;
    text-align: center;
    color:rgba(0,144,255,1);
    line-height: 51px;
    position: relative;
    top: 43px;
  }
  #partMain4 :hover{
    cursor: default;
  }
  #partMain4_Button{
    width:166px;
    height:51px;
    border-radius:3px;
    border:1px solid rgba(0,144,255,1);
    text-align: center;
    color:rgba(0,144,255,1);
    line-height: 51px;
    position: relative;
    color: white;
    box-shadow: 0 3px 18px 0 #0090ff;
  }
</style>
