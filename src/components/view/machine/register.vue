<template>
  <div class="page-container" v-show="isShow">
    <MachineHead></MachineHead>
    <div class="doctorBorder">
      <div class="doctors">
        <div class="doctor-1" >
          <img class="doctorphoto" src="@/assets/image/医生头像.png">
          <span class="doctorName" v-text="doctorInfoObj.name"></span>
          <span class="doctorPro" v-text="doctorInfoObj.grade"></span>
        </div>
        <div class="doctorDep" v-text="'号别：'+doctorInfoObj.department" ></div>
        <div class="doctorAddress" v-text="'就医地点：' +doctorInfoObj.location" ></div>
        <div class="waitPersonCnt" v-text="'候诊人数：' +doctorInfoObj.count" ></div>
      </div>
      <div class="right">
        <div class="codeImg">
          <Qrcode :value="doctorCode" style="width: 400px"></Qrcode>
        </div>
        <div class="codeNum" v-text="'医生：'+doctorCode"></div>
        <div class="codeHint">提示：请使用手机APP扫码医生二维码挂号</div>
      </div>
    </div>
  </div>
</template>

<script>
    import MachineHead from "./machine-head";
    import Qrcode from "vue-qrcode";
    export default {
        name: "register",
        components:{MachineHead,Qrcode},
      beforeRouteEnter: function (to, from, next) {
        next(vm => {
          vm.id = to.params.id;
          vm.showDoctoryInfo();
            setTimeout(() =>{
              vm.isShow = true;// 要延迟的代码
              },1000);
        })
      },

        data() {
          return{
            isShow: false,
            doctorInfo: [],
            doctorInfoObj: {
              id: '',
              name: '',
              mobile: '',
              roles: '',
              certificate: '',
              grade: '',
              department: '',
              location: '',
            },
            doctorCode: '',
            registerNum: '0',
            id: '',
          }
        },

      methods:{
        showDoctoryInfo(){
          let _self = this;
          if (_self._self.id==null||_self._self.id ==""||_self._self.id=="undefined"){
            _self.$message.warn("获取医生ID错误，请重新选择医生！")
            _self.goBack();
          }
          if (_self.id)
          _self.$axios.get('/api/v1/doctor/' + _self.id).then(response => {
            _self.doctorInfoObj =response.data;
            if (_self.doctorInfoObj.count===null||_self.doctorInfoObj.count===""||_self.doctorInfoObj.count==="undefined"){
              _self.doctorInfoObj.count="0"
            }
            if (_self.doctorInfoObj.id !==""&&_self.doctorInfoObj.id!=="undefined"){
              _self.showDoctorTwoCode();
            }
            const timer = setTimeout(() => {
              _self.showDoctoryInfo();
              clearTimeout(timer);
            }, 2000);
          })
            .catch(function(err) {
              _self.$message.error('获取挂号信息失败，失败信息：' + err.response.data.message);
            });
        },
        showDoctorTwoCode: function () {
          var _self = this;
          _self.$axios.post('/api/v1/register/' + _self.id).then(response => {
            _self.doctorCode =  response.data.registerCode;
          })
            .catch(function(err) {
              _self.$message.error('获取挂号信息失败，失败信息：' + err.response.data.message)
            });
        },

        goBack: function () {
          this.$router.go(-1) ;//后退一页
        },

        goHome: function () {
          this.$router.push('/machine.html') ;
        },
      },
    }
</script>



<style scoped>
  .page-container {
    flex-direction: column;
    min-height: 100%;
    background: #f6f7fb;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .doctorBorder{
    display: flex;
    flex-direction: row;
    width:974px;
    height:460px;
    justify-content: space-between;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 9px 0px rgba(0,0,0,0.2);
    border-radius:20px;
    margin: 55px auto;
  }
  .doctor-1{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 50px 40px;
    margin-bottom: 20px;
  }
  .doctors{
    display: flex;
    flex-direction: column;
    padding: 10px 0;

  }
  .doctorphoto{
    display: flex;
    align-items: center;
    width:85px;
    height:85px;
  }
  .doctorName{
    font-size:31px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:43px;
  }
  .doctorPro{
    padding: 0 35px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:34px;
  }
  .doctorDep{
    padding: 20px 140px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:34px;
  }

  .doctorAddress{
    padding: 20px 100px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:34px;
  }

  .waitPersonCnt{
    padding: 20px 140px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:34px;
  }
  .codeImg{
    width:430px;
    height:350px;
    margin-left: 30px;
  }
  .codeNum{
    font-size:24px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:34px;
  }
  .codeHint{
    font-size:20px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,144,255,1);
    line-height:28px;
  }
  .page-container {
    flex-direction: column;
    min-height: 100%;
    background: #f6f7fb;
  }
</style>
