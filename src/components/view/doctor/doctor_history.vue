<template>
  <div class="page-container">
    <DoctorHead :department="doctorPatientDto.department" :name="doctorPatientDto.doctorName" @exit="onExit"></DoctorHead>
    <div id="partMainTop">
      <div id="partMainTop_1" v-text="personInfo.patientname+ ' ' +personInfo.patientsex+' ' +personInfo.patientage"
      >
      </div>
      <div id="partMainTop_2">
        <input id="partMainTop_2Input" type="text" placeholder="请先扫获取患者授权，查询患者最近三次历史" v-model="twoCode">
        <div id="partMainTop_2Btn1" @click="getPatientTwoCode">扫卡</div>
        <div id="partMainTop_2Btn2" >读卡</div>
      </div>
    </div>
    <div id="partMainTop_0">
      <div id="partMainTop_3"
           v-for="(item,index) in patients" :key="index"
           :class='index==selected?"selected":""'
           @click="son(index)">
        <div id="partMainTop_3_1" v-text="item.patientname">王二小
        </div>
        <div id="partMainTop_3_2">
          心内科丨副主任医师
        </div>
        <div id="partMainTop_3_3" v-text="'就诊时间：'+item.starttime">
          2019-09-19 13：00
        </div>
        <div id="partMainTop_3_4">
          层诊断结果：流行性感冒
        </div>
        <div id="partMainTop_3_5" v-text="'￥' + item.totalmoney ">

        </div>

      </div>
    </div>

    <div class="right">
      <div class="mainbottom">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="开处方" key="1">
            <doctor-recipe2
              ref="recipe"
              :tableData="recipeArry"
            ></doctor-recipe2>
          </a-tab-pane>
          <a-tab-pane tab="开检查" key="2" forceRender>
            <doctor-check2 ref="check" :checkArry="checkArry"></doctor-check2>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <a-button id="back" @click="goBack">返回</a-button>
  </div>
</template>

<script>
  import DoctorHead from "./doctor-head";
  import DoctorRecipe2 from "./doctor-recipe2";
  import DoctorCheck2 from "./doctor-check2";
    export default {
      name: "dhistory",
      components: {
        DoctorHead,
        DoctorRecipe2,
        DoctorCheck2
      },
      data(){
          return{
            doctorPatientDto : {
              count  : '',    //挂号人数 ,
              department  : '',     //所在科室
              doctorName  : '',     //职称(医生才需要填)
              grade  : '',         //职称
              location : '',       // 就诊地点
              registerPatientDtoList: [],//挂号患者详情
            },
            recipeArry:[],
            checkArry:[],
            personInfo: {
              patientname:'',
              patientidcard:'',
              patientsex:'',
              patientage:'',
            },
            twoCode:'',
            patients: [],
          }
      },

      mounted() {
        this.selected=0;
        // this.showHistory();
        // this.son(0);
      },
      methods: {
        son(key){
          this.selected=key;
          this.showHistory();
        },
        onExit()
        {
          sessionStorage.access_token = "";
          this.$router.push('/doctor.html');
        },
        goBack(){
          this.$router.go(-1);//后退一页
        },
        getPatientTwoCode(){
          let _self=this;
          if (!_self.twoCode) {
            _self.$message.info("请输入患者就诊卡二维码");
            return;
          }
          _self.$axios.put("/api/v1/card/"+_self.twoCode).then(response => {
            var state = response.data.state;
            if (state === "lose") {
              this.$warning({
                title: "二维码已失效",
                content: "请重新扫码"
              });
            }
            _self.personInfo.patientage  = response.data.age;
            _self.personInfo.patientidcard = response.data.idcard;
            _self.personInfo.patientname = response.data.name;
            _self.personInfo.patientsex = response.data.sex;
            _self.showHistory();

          })
            .catch(function(err) {
              if (err.response.data.message!==""||err.response.data.message!=='undefind'){
                _self.$message.error('扫码失败，失败信息：' + err.response.data.message)

              }else{
                _self.$message.error('扫码失败');
                return false;
              }
            });
        },
        showHistory(){
          let _self=this;
          if (!_self.twoCode) {
            _self.$message.info("请先扫码");
            return;
          }
          _self.$axios.get("/api/v1/diagnose/recent").then(response => {
            debugger
            _self.patients=response.data;
            _self.recipeArry=[];
            _self.checkArry=[];
            _self.recipeArry=response.data[_self.selected].recipe.medicine;
            _self.checkArry=response.data[_self.selected].checkDTOS;
          })
            .catch(function(err) {
              if (err.response.data.message!==""||err.response.data.message!=='undefind'){
                _self.$message.error('扫码失败，失败信息：' + err.response.data.message)

              }else{
                _self.$message.error('扫码失败');
                return false;
              }
            });
        },
      }
    }
</script>
<style scoped>
  .page-container {
    min-height: 100%;
    background: #f0f2f5;
    flex-direction: column;
  }
  #partMainTop_1{
    width:551px;
    height:23px;
    font-size:17px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:23px;
    margin-left: 443px;
    margin-top: 26px;
  }
  #partMainTop_2{
    width:472px;
    height:28px;
    margin-left: 408px;
    margin-top: 13px;
  }
  #partMainTop_2Input{
    width:472px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
  }
  #partMainTop_2Btn1{
    width:50px;
    height:28px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    margin-left: 500px;
    position: relative;
    top: -29px;
    color: white;
    text-align: center;
    font-size: 14px;
    line-height: 28px;
  }
  #partMainTop_2Btn2{
    width:50px;
    height:28px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    margin-left: 580px;
    position: relative;
    top: -58px;
    color: white;
    text-align: center;
    font-size: 14px;
    line-height: 28px;
  }
  #partMainTop_0{
    width:1000px;
    height:120px;
    border-radius:1px;
    margin-left: 205px;
    margin-top: 20px;
    display: inline-block;
  }

  #partMainTop_3{
    width:263px;
    height:103px;
    color: black;
    /*background:rgba(135,182,242,1);*/
    box-shadow:0px 1px 6px 0px rgba(0,0,0,0.2);
    border-radius:1px;
    display: inline-block;
    margin-left: 50px;
    margin-top: 10px;

  }

  #partMainTop_3_1{
    width:43px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    line-height:20px;
    margin-left: 21px;
    position: relative;
    top: 14px;
  }
  #partMainTop_3_2{
    width:120px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    line-height:16px;
    margin-left: 85px;
    position: relative;
    top: -3px;
  }
  #partMainTop_3_3{
    width:225px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    line-height:16px;
    margin-left: 21px;
    position: relative;
    top: 9px;
  }
  #partMainTop_3_4{
    width:162px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    line-height:20px;
    margin-left: 21px;
    position: relative;
    top: 18px;
  }

  #partMainTop_3_5{
    width:61px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    line-height:20px;
    margin-left: 188px;
    position: relative;
    top: -2px;
  }

  .right {
    width:1000px;
    height:280px;
    background:rgba(255,255,255,1);
    margin-left: 206px;
    margin-top: 10px;
    display: inline-block;
  }

  button {
    border: none;
    background: rgba(24, 144, 255, 1);
    border-radius: 3px;
    font-size: 10px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 16px;
    padding: 5px 10px;
  }


  .mainbottom {
    height: 257px;
    background: rgba(255, 255, 255, 1);
    padding: 0 14px;
  }
#back{
  width: 100px;
  margin-top: 20px;
  margin-left: 1105px;
}

</style>
