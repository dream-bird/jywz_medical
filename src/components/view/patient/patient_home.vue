<template>
  <div class ="h5-container" v-show="isShow">
    <div id="mainTitle">
      <div id="mainTop">
        <div id="mainText" v-text="'你好，'+PatientName">
        </div>
        <img id="mainImg" src="../../../assets/image/编辑.png">
        <div id="mainClose" @click="goHome">退出</div>
      </div>
      <div id="mainWelcome">欢迎使用就诊问诊</div>
    </div>
    <div id="main">
      <div id="detailText">就诊服务</div>
      <div id="scan" @click="scanCode">
        <div class="scanImg" >
          <img class="scanImgTop" src="../../../assets/image/扫一扫.png">
          <img class="scanAddImg" src="../../../assets/image/加号.png">
        </div>
        <div class="scanStart"  v-text="">
          扫码挂号
        </div>
        <div class="scanHint" >
          您可以通过扫码功能进行快速挂号
        </div>
      </div>

      <div id="card" @click="showMenus">
        <div class="scanImg" >
          <img class="scanImgTop" src="../../../assets/image/就诊卡.png">
          <img class="scanAddImg" src="../../../assets/image/加号.png">
        </div>
        <div class="scanStart" >就诊卡</div>
        <div class="scanHint">
          医生通过您出示的就诊卡二维码，快速了解您
        </div>
      </div>
      <div id="menu" style="display: none"  ref="menus">
        <div id="menu1" class="menuDiv" @click="applyCard" @hover="selecMenus" ref="menu1">
          尚未申领就诊卡</div>
        <div id="menu2" class="menuDiv" @click="getCard" @hover="selecMenus">
          已申领过就诊卡
        </div>
      </div>
      <div id="detail" @click="goBill">
        <div class="scanImg" >
          <img class="scanImgTop" src="../../../assets/image/就诊记录小.png">
          <img class="scanAddImg" src="../../../assets/image/加号.png">
        </div>
        <div class="scanStart" >
          就诊记录
        </div>
        <div class="scanHint">
          历史就诊记录一键查询
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getWithAuth} from "../../../utils/util.http";

  export default {
    name: "phome",
    data() {
      return {
        PatientName: "",
        idCardNo : '',
        isShow: false,
      };
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.getPatientName();
        setTimeout(() =>{
          vm.isShow = true;// 要延迟的代码
        },500);
      })
    },
    mounted() {

    },
    methods: {
        /*获取患者姓名信息*/
      getPatientName(){
        let _self=this;
        _self.$axios.get("/api/v1/login/pname").then(response => {
          _self.PatientName= response.data.name;
          _self.idCardNO = response.data.idcard;
        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('获取人员姓名失败，失败信息：' + err.response.data.error_description)

            }else{
                _self.$message.error('获取人员姓名失败');
              return false;
            }
          });
      },

      goBill(){
        this.$router.push({
          name: "PBill",
          params:{
            name : this.PatientName,
            idcardno : this.idCardNO,
          }
        });
      },

      showMenus(ev){
        var oevent = ev || event;
        this.$refs.menus.style.display = 'block';
        //设置自定义菜单的坐标，达到鼠标右键的地方弹出自定义菜单
        this.$refs.menus.style.left = oevent.clientX + 'px';
        this.$refs.menus.style.top = oevent.clientY + 'px';
      },
      selecMenus() {
        this.$refs.menu1.addClass('menuDiv');
      },
      scanCode() {
        this.$router.push('/patient/scanregister');
      },
      applyCard(){
        this.$router.push('/patient/applycard');
      },
      getCard(){
        this.$router.push('/patient/ecard');
      },
      goBack() {
        this.$router.go(-1);//后退一页
      },
      getHistoryPatient(){

      },
      goHome() {
        this.$router.push('/index.html');
      }
    }
  }
</script>

<style scoped>
  #mainTitle{
    height: 3.32rem;
    display: flex;
    flex-direction: column;
    background:linear-gradient(133deg,rgba(92,167,251,1) 0%,rgba(50,94,242,1) 100%,rgba(50,94,242,1) 100%);
    z-index: 0;
  }
  #mainTop{
    margin-top: .81rem;
    display: flex;
    flex-direction: row;
    /*justify-content: space-between;*/
  }
  #mainText{
    display: flex;
    flex-direction: column;
    margin-left: .32rem;
    font-size:.44rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
  }
  #mainImg{
    width:.19rem;
    height:.19rem;
    margin-top: .20rem;
  }
  #mainClose{
    display: flex;
    flex: 1;
    width: 3rem;
    font-size:.34rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-left: 3rem;
  }

  #mainWelcome{
    font-size:.34rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:.48rem;
    margin-left: .42rem;
    margin-top: .17rem;
  }

  #main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background:rgba(255,255,255,1);
    border-radius:.50rem;
  }
  #detailText{
    display: flex;
    height:.56rem;
    font-size:.40rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    margin-left: .40rem;
    margin-top: .30rem;
  }

  #scan{
    display: flex;
    flex-direction: column;
    align-self: center;
    width:6.57rem;
    height:2.00rem;
    background:rgba(225,105,115,1);
    border-radius:.22rem;
    margin-top: .49rem;
  }

  #card{
    display: flex;
    flex-direction: column;
    align-self: center;
    width:6.57rem;
    height:2.00rem;
    background:rgba(105,157,225,1);
    border-radius:.22rem;
    margin-top: .49rem;
  }

  #detail{
    display: flex;
    flex-direction: column;
    align-self: center;
    width:6.57rem;
    height:2.00rem;
    background:rgba(105,203,225,1);
    border-radius:.22rem;
    margin-top: .49rem;
  }
  .scanImg{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .scanImgTop{
    width:.44rem;
    height:.44rem;
    margin-top: .24rem;
    margin-left: .30rem;
  }

  .scanAddImg{
    width:.23rem;
    height:.23rem;
    margin-top: .23rem;
    margin-right: .23rem;
  }

  .scanStart{
    font-size:.32rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
    margin-left: .30rem;
    margin-top: .27rem;
  }
  .scanHint{
    font-size:.24rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-left: .30rem;
  }


  #cardAddImg img{
    margin-top: .40rem;
    float: right;
    margin-right: .40rem;
  }

  #menu{
    width:2.2rem;
    height:1.5rem;
    border: 0.01rem solid;
    position: absolute;
    font-size:.25rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:black;
    background: white;
    text-align: center;
    border-radius:.25rem;
    left: 3.00rem;
    top: 9.20rem;
  }
  #menu1,#menu2{
    width:2.00rem;
    height:0.6rem;
    border-radius:.15rem;
    border:0.02rem solid rgba(57,131,229,1);
    background:rgba(245,245,245,1);
    margin: .10rem;
    line-height:0.6rem;
  }

  #detailImg img{
    margin-top: .40rem;
    margin-left: .60rem;
  }

  #detailAddImg img{
    margin-top: .40rem;
    float: right;
    margin-right: .40rem;
  }

  .h5-container {
    width: 7.50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
  }

  .menuDiv:hover{
    background-color: burlywood !important;
  }

</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
