<template>
  <div class="page-container">
    <div class="loading" v-if="loading">
      <a-spin size="large" tip="等待患者授权..." />
    </div>
    <a-drawer
      title="扫描患者就诊卡二维码"
      :width="300"
      placement="right"
      :closable="false"
      @close="doctorScanPatientCardQRCodeAreaVisible = false"
      :visible="doctorScanPatientCardQRCodeAreaVisible">
      <input
        class="patient-card-qrcode-input"
        type="text"
        placeholder="请输入患者就诊卡二维码"
        v-model="patientCardQRCode"
      />
      <br /><br />
      <button
        class="patient-card-qrcode-button"
        @click="onConfirmScanPatientCardQRCode">
        确认扫码
      </button>
    </a-drawer>
    <DoctorHead :department="doctorPatientDto.department" :name="doctorPatientDto.doctorName" @exit="onExit"></DoctorHead>
    <div id="main">
      <div id="partMainLeft">
        <div id="partMainLeft_1">问诊人员列表</div>
        <div id="partMainLeft_2">
          当前挂号人数 &nbsp;&nbsp;人
        </div>
        <div id="partMainLeft_2_1" v-text="doctorPatientDto.count">
          X
        </div>
        <div id="leftRowLine"></div>
        <div id="partMainLeft_3">
          <input id="partMainLeft_3Input" type="text" placeholder="请输入患者名称">
          <div id="partMainLeft_3Btn" @click="searchPatient" >搜索</div>
        </div>
        <div
          class="partMainLeft_4"
          v-for="(item,index) in doctorPatientDto.registerPatientDtoList" :key="index"
          :class='index==selected?"selected":""'
          @click="son(index)">
          <div class="partMainLeft_4_1" v-text ="item.pname">王二小</div>
          <div class="partMainLeft_4_2" v-text ="item.queueNum">MZ00001</div>
          <div class="partMainLeft_4_3" v-text ="item.sex + ' ' + item.age">男 34岁</div>
          <div class="partMainLeft_4_4" v-text ="'挂号时间：' + item.startTime">挂号时间：2019-09-23 14:00</div>
        </div>


        <div id="partMainLeft_5" @click="getHistoryPatient">
          <div id="partMainLeft_5Btn"  >历史就诊人员</div>
        </div>
      </div>

      <div class="right">
        <div class="top">
          <div class="header">
            <div class="title">患者信息</div>
            <div class="info" v-if="selectRegisterPatientDto">
              {{ selectRegisterPatientDto.pname }}
              <!--{{ selectRegisterPatientDto.queueNum }}-->
              {{ selectRegisterPatientDto.sex }}
              {{ selectRegisterPatientDto.age }}
            </div>
            <a-button id="PatientHis" @click="getPatientHis">历史记录</a-button>
          </div>
          <div class="divider"></div>
          <div class="diagnose">
            <div class="diagnose-info">
              <div class="title">诊断信息</div>
              <a-textarea
                placeholder="请输入诊断信息"
                :rows="6"
                v-model="diagnoseInfo"
              />
            </div>
            <div class="diagnose-result">
              <div class="title">诊断结果</div>
              <a-textarea
                placeholder="请输入诊断结果"
                :rows="6"
                v-model="diagnoseResult"
              />
            </div>
          </div>
          <div class="btns">
            <button style="margin-right: 15px;" @click="postDiagnoseInfo">
              保存诊断
            </button>
            <button @click="postDiagnoseResult">结束诊断</button>
          </div>
        </div>
        <div class="mainbottom">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="开处方" key="1">
              <doctor-recipe
                ref="recipe"
                @onSave="doRecipe"
              ></doctor-recipe>
            </a-tab-pane>
            <a-tab-pane tab="开检查" key="2" forceRender>
              <doctor-check ref="check" @onSave="doCheck"></doctor-check>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DoctorHead from "./doctor-head";
  import DoctorRecipe from "./doctor-recipe";
  import DoctorCheck from "./doctor-check";

  export default {
    name: "dhome",
    components: {
      DoctorHead,
      DoctorRecipe,
      DoctorCheck
    },
    data() {
      return {
        loading: false,
        doctorScanPatientCardQRCodeAreaVisible: false,
        doctorPatientDto : {
          count  : '',    //挂号人数 ,
          department  : '',     //所在科室
          doctorName  : '',     //职称(医生才需要填)
          grade  : '',         //职称
          location : '',       // 就诊地点
          registerPatientDtoList: [],//挂号患者详情
        },
        selectRegisterPatientDto: {
          age: '',//年龄 ,
          pname: '',//患者姓名 ,
          queueNum: '',//排队号 ,
          sex: '',//性别 ,
          startTime: '',//挂号时间
          idcard: '',//身份证号
        },
        diagnoseInfo: "",
        diagnoseResult: "",
        selected: -1,
        selectIndex:0,
        registerPatientDtoListHistory: [],
        RegisterPatientDto: {
          age: '',//年龄 ,
          pname: '',//患者姓名 ,
          queueNum: '',//排队号 ,
          sex: '',//性别 ,
          startTime: '',//挂号时间
        },
        patientCardQRCode:'',//患者二维码
        diagnoseId:'',//就诊id
        recipeDTO: {
          aka130 : '' ,// 医疗类别 ,
          department:'',// 科室 ,
          diagnosecode: '',// 诊断代码 ,
          medicine: [] ,//药品明细 ,
          patientAge :'',// 患者年龄 ,
          patientIdcard :'',// 患者身份证号 ,
          patientName :'',// 患者姓名 ,
          patientSex:''// 患者性别
        },
        recipeMedicineDTO: {
          brandname :'',// 品牌 ,
          dosageform  :'',//药品剂型 ,
          dosesiz  :'',// 单次使用剂量 ,
          frequency  :'',// 使用频次 ,
          id  :'',//
          medicinecnt  :'',// 药品数量 ,
          medicinename  :'',// 药品名称 ,
          medicinesize  :'',// 药品规格 ,
          money  :'',// 药品价格 ,
          remark  :'',// 备注信息 ,
          sellpackage  :'',// 出库包装
        },
        checkDTO:{
          aka130  :'',//医疗类别 ,
          department  :'',//科室 ,
          description  :'',//检查事项 ,
          diagnosecode  :'',// 诊断代码 ,
          id  :'',//
          money :'',//
          patientage :'',//  患者年龄 ,
          patientidcard :'',// 患者身份证号 ,
          patientname :'',//  患者姓名 ,
          patientsex :'',//  患者性别 ,
          result :'',//  检查结果
        },
      };
    },
    mounted() {
      if (sessionStorage.access_token!=""){
        this.getDoctorAndPatients();
        // setInterval(() => {
        //   this.getDoctorAndPatients();
        // }, 10000);
      }
    },
    methods: {
      onExit() {
        sessionStorage.access_token="";
        this.$router.push('/doctor.html');
      },
      // 重置状态
      resetPageState() {
        this.doctorScanPatientCardQRCodeAreaVisible = false;
        this.patientCardQRCode = "";
        this.patientCardQRCodeState = "";
        this.currentPatient = undefined;
        this.diagnoseId = "";
        this.diagnoseState = "";
        this.diagnoseInfo = "";
        this.diagnoseResult = "";
      },
      son(key){
        this.selected=key;
        this.selectRegisterPatientDto = this.doctorPatientDto.registerPatientDtoList[key];
        if (
          this.patientCardQRCodeState === "scaned" ||
          this.patientCardQRCodeState === "authed"
        ) {
          return;
        }
        this.doctorScanPatientCardQRCodeAreaVisible = true;
      },

      getDoctorAndPatients() {
        let _self=this;
        debugger
        _self.$axios.get('/api/v1/login/info').then(response => {
          //请求成功函数内容
          _self.doctorPatientDto = response.data;
          // if (_self.doctorPatientDto.registerPatientDtoList!=null&&_self.doctorPatientDto.registerPatientDtoList.length >0){
          //   // _self.son(0);
          // }
        })
          .catch(function(err) {
            if (err.response.data.message!==""||err.response.data.message!=='undefind'){
              _self.$message.error('获取医生和患者信息失败，失败信息：' + err.response.data.message)
            }else{
              _self.$message.error('获取医生和患者信息失败');
              return false;
            }
          });
      },
      // 医生扫患者就诊卡二维码
      onScanPatientCardQRCode() {
        if (
          this.patientCardQRCodeState === "scaned" ||
          this.patientCardQRCodeState === "authed"
        ) {
          return;
        }
        this.doctorScanPatientCardQRCodeAreaVisible = true;
      },
        /*医生扫码获取查看权限*/
      onConfirmScanPatientCardQRCode() {
        let _self=this;
        if (!_self.patientCardQRCode) {
          _self.$message.info("请输入患者就诊卡二维码");
          return;
        }
        _self.$axios.put("/api/v1/card/"+_self.patientCardQRCode).then(response => {
          // _self.$message.success('扫码成功！');
          var state = response.data.state;
          if (state === "lose") {
            this.$warning({
              title: "二维码已失效",
              content: "请重新扫码",
              onOk() {
                _self.patientCardQRCode = "";
                _self.patientCardQRCodeState = "lose";
              }
            });
          } else if (state === "wating") {
            _self.patientCardQRCodeState = "wating";
          } else if (state === "scaned" || !state) {
            _self.patientCardQRCodeState = "scaned";
            _self.loading = true;
            // 轮训，重复获取患者就诊卡二维码状态
            const timer = setTimeout(() => {
              this.onConfirmScanPatientCardQRCode();
              clearTimeout(timer);
            }, 2000);
          } else if (state === "authed") {
            _self.patientCardQRCodeState = "authed";
            _self.doctorScanPatientCardQRCodeAreaVisible = false;
            _self.currentPatient = response;
            _self.onStarNewDiagnose();
            _self.loading = false;
          }
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
      // 开始诊断
      onStarNewDiagnose() {
        var _self = this;
        if (_self.patientCardQRCode==null||_self.patientCardQRCode==""||_self.patientCardQRCode=='undefined'){
          _self.$message.warn('请先读取患者二维码！')
          return
        }
        sessionStorage.setItem('patientCardQRCode',_self.patientCardQRCode);
        _self.$axios.post("/api/v1/diagnose")
          .then(response => {
          _self.diagnoseId=response.data.id;
          _self.diagnoseState = response.state;
        })
          .catch(function(err) {
            if (err.response.data.message!==""||err.response.data.message!=='undefind'){
              _self.$message.error('开始诊断发生错误，错误原因：' + err.response.data.message)

            }else{
              _self.$message.error('开始诊断发生错误');
              return false;
            }
          });
      },

      // 保存诊断
      postDiagnoseInfo() {
        let _self=this;
        if (!_self.diagnoseInfo) {
          _self.$message.info("请输入诊断信息");
          return;
        }
        let dto={
          result:_self.diagnoseResult,
        };
        _self.$axios.post("/api/v1/diagnose/" + _self.diagnoseId +  "/result",dto).then(response => {
          _self.$message.success("诊断信息保存成功")
        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('诊断信息保存失败，失败信息：' + err.response.data.error_description)

            }else{
              _self.$message.error('诊断信息保存失败');
              return false;
            }
          });
      },

      // 开处方
      doRecipe(val) {
        let _self=this;
        _self.recipeMedicineDTO = val;
        _self.recipeDTO.medicine= val;
        _self.recipeDTO.aka130='11';
        _self.recipeDTO.department= _self.doctorPatientDto.department;
        _self.recipeDTO.diagnosecode= '感冒';
        _self.recipeDTO.patientAge= _self.currentPatient.data.age
        _self.recipeDTO.patientName= _self.currentPatient.data.name;
        _self.recipeDTO.patientSex= _self.currentPatient.data.sex;
        _self.recipeDTO.patientIdcard= _self.currentPatient.data.idcard;
        _self.$axios.post("/api/v1/diagnose/" + _self.diagnoseId + '/recipe',_self.recipeDTO).then(response => {
          if (response.data.code == 0) {
            _self.$message.success('处方保存成功');
          }
        })
          .catch(function(err) {
            if (err.response.data.message!==""||err.response.data.message!=='undefind'){
              _self.$message.error('处方保存失败，失败信息：' + err.response.data.message)

            }else{
              _self.$message.error('处方保存失败');
              return false;
            }
          });
      },
      // 开检查
      doCheck(val) {
        let _self=this;
        var checkArray=[];
        for(var i=0; i<val.length; i++){
          var checkDTO={};
          var item = val[i].itemname;
          var itemArry = item.split(" ￥");
          var price = val[i].checkItem.price;
          checkDTO.aka130 ="11"
          checkDTO.department =_self.doctorPatientDto.department;
          checkDTO.description = itemArry[0].trim() //检查事项 ,
          checkDTO.diagnosecode  ="感冒";
          checkDTO.id = "100"+i ;
          checkDTO.money =itemArry[1].trim();
          checkDTO.patientAge = _self.currentPatient.data.age;
          checkDTO.patientIdcard   =_self.currentPatient.data.idcard;;
          checkDTO.patientName   =_self.currentPatient.data.name;;
          checkDTO.patientSex    =_self.currentPatient.data.sex;;
          checkDTO.result = "未见异常";
          checkArray.push(checkDTO)
        }

        _self.$axios.post("/api/v1/diagnose/" + _self.diagnoseId + '/check',checkArray).then(response => {
          if (response.data.code == 0) {
            _self.$message.success('检查保存成功');
          }
        })
          .catch(function(err) {
            if (err.response.data.message!==""||err.response.data.message!=='undefind'){
              _self.$message.error('检查保存失败，失败信息：' + err.response.data.message)

            }else{
              _self.$message.error('检查保存失败');
              return false;
            }
          });
      },
      searchPatient(){

      },
      getHistoryPatient(){

      },
        /*查看历史记录*/
      getPatientHis(){
        this.$router.push('/doctor/dhistory');
      },
      // 结束诊断
      postDiagnoseResult() {
        let _self=this;
        if (!_self.diagnoseResult) {
          _self.$message.info("请输入诊断结果");
          return;
        }
        _self.$axios.post("/api/v1/diagnose/" + _self.diagnoseId).then(response => {
          _self.$message.success("诊断结束")
          _self.resetPageState()
          _self.$refs.recipe.tableData=[]
          _self.$refs.check.checkArry=[]
          _self.getDoctorAndPatients();

        })
          .catch(function(err) {
            if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
              _self.$message.error('诊断结束失败，失败信息：' + err.response.data.error_description)

            }else{
              _self.$message.error('诊断结束失败');
              return false;
            }
          });
      },
    },

    filters: {
      handleDate(val) {
        if (val)
          return `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(
            6,
            8
          )} ${val.substring(8, 10)}:${val.substring(10, 12)}`;
        return "";
      }
    }
  };
</script>

<style lang="less" scoped>
  .page-container {
    min-height: 100%;
    background: #f0f2f5;
    flex-direction: column;
  }

  #main{
    display: flex;
    flex-direction: row;
    /*justify-content: space-between;*/
  }

  #partMainLeft{
    width:342px;
    height:550px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 7px 0px rgba(153,153,153,0.2);
    border-radius:3px;
    margin-top: 18px;
    margin-left: 11px;
  }
  #partMainRightTop{
    width:1000px;
    height:240px;
    background:rgba(255,255,255,1);
    /*display: inline-block;*/
    position: absolute;
    /*top:-544px;*/
    /*left: 360px;*/
    top:83px;
    left: 360px;

  }
  #partMainRightBottom{
    width:1000px;
    height:300px;
    background:rgba(255,255,255,1);
    position: absolute;
    top:330px;
    left: 360px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  #partMainLeft_1{
    width:100px;
    height:20px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin-left: 15px;
    position: relative;
    top: 10px;
  }
  #partMainLeft_2{
    width:120px;
    height:26px;
    font-size:11px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top: -6px;
    left : 200px;
  }
  #partMainLeft_2_1{
    width:20px;
    height:20px;
    font-size:16px;
    color: red;
    position: relative;
    top: -31px;
    left : 272px;
  }
  #partMainLeft_3Input{
    width:220px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
    margin-top: 18px;
    margin-left: 28px;
  }
  #partMainLeft_3Btn{
    width:60px;
    height:28px;
    background-color:rgba(24,144,255,1);
    border-radius:0px 3px 3px 0px;
    color: white;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    margin-top: -28px;
    margin-left: 248px;
  }
  .personBorder{
    width:263px;
    height:103px;
    /*background:rgba(135,182,242,1);*/
    margin-left: 16px;
    margin-top: 33px;
  }
  .partMainLeft_4{
    width:263px;
    height:103px;
    background: rgba(255,255,255,1);
    box-shadow:0px 1px 6px 0px rgba(0,0,0,0.2);
    border-radius:1px;
    margin-left: 28px;
    margin-top: 33px;
  }

  .partMainLeft_4_1{
    width:43px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin-left: 28px;
    position: relative;
    top: 14px;
  }

  .partMainLeft_4_2{
    width:62px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin-left: 100px;
    position: relative;
    top: -6px;
  }

  .partMainLeft_4_3{
    width:55px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin-left: 28px;
    position: relative;
  }

  .partMainLeft_4_4{
    width:255px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin-left: 28px;
    margin-top: 4px;
    /*position: relative;*/
  }

  #partMainLeft_5Btn{
    width:275px;
    height:31px;
    background:rgba(0,144,255,1);
    border-radius:3px;
    text-align: center;
    color: white;
    position: relative;
    top: 60px;
    left:28px;
    font-size: 14px;
    line-height:31px;

  }
  div :hover{
    cursor: default;
  }
  div input,textarea:hover{
    cursor: text;
  }
  #partMainRightTop_1{
    width:80px;
    height:20px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:20px;
    position: relative;
    top: 10px;
    margin-left: 17px;
  }

  #partMainRightTop_2{
    width:500px;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top: -6px;
    margin-left: 117px;
  }

  #partMainRightTop_2_1{
    width:500px;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top: -21px;
    margin-left: 180px;
  }

  #partMainRightTop_2_2{
    width:500px;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top: -37px;
    margin-left: 230px;
  }

  #partMainRightTop_2_3{
    width:500px;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top: -52px;
    margin-left: 260px;
  }
  partMainRightTop_3{
    width:153px;
    height:23px;
  }
  #partMainRightTop_3Btn{
    width:153px;
    height:23px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
    text-align: center;
    position: relative;
    top: -70px;
    margin-left: 717px;
    font-size: 14px;
  }
  #partMainRightTop_4{
    width:80px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:16px;
    margin-left: 25px;
    margin-top: -20px;
  }
  #partMainRightTop_4Input{
    width:336px;
    height:112px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.15);
    margin-left: 60px;
    margin-top: -15px;
  }

  #partMainRightTop_5{
    width:80px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:16px;
    margin-left: 520px;
    margin-top: -18px;
  }
  #partMainRightTop_5Input{
    width:336px;
    height:112px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.15);
    margin-left: 60px;
    margin-top: -15px;
  }
  #partMainRightTop_8{
    width:80px;
    height:23px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
    position: relative;
    left: 620px;
    top: 120px;
    text-align: center;
    font-size: 14px;
    line-height: 23px;
  }
  #partMainRightTop_6{
    width:80px;
    height:23px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
    position: relative;
    left: 720px;
    top: 96px;
    text-align: center;
    font-size: 14px;
    line-height: 23px;
  }

  #partMainRightTop_7{
    width:80px;
    height:23px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
    line-height: 23px;
    position: relative;
    left: 820px;
    top: 75px;
    text-align: center;
    font-size: 14px;
  }

  #tab{
    width: 100%;
    margin:30px 20px;
    position:relative;
  }

  #partMainBottom_1{
    width: 200px;
    margin-top: -50px;
  }
  ul li{
    /*float:left;*/
    margin-left: 40px;
    position:relative;
    top: -60px;
  }
  ul li a{
    color: rgba(24,144,255,1);
  }
  #div1{
  }

  #partMainRightBottom1_2{
    width:63px;
    height:23px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
    margin-left: 740px;
    position: relative;
    top :-27px;
  }

  #partMainRightBottom1_3{
    width:63px;
    height:23px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
    margin-left: 825px;
    position: relative;
    top :-50px;
  }
  .tab_1{
    width:40px;
    height:16px;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(24,144,255,1);
    line-height:16px;
    margin-top: 20px;
  }
  .selected{
    background:rgba(135,182,242,1)
  }
  .hide{
    display: none;
  }
  ul li{
    float:left;
    margin-left: 40px;
    margin-top: 16px;
  }
  ul li a{
    color: rgba(24,144,255,1);
  }
  #partMainRightBottom1_1{
    width:58px;
    height:23px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
    margin-left: 660px;
    margin-top: 20px;
    text-align: center;
    position: relative;
    top: 15px;
  }
  #partMainRightBottom1_2{
    width:63px;
    height:23px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
    margin-left: 740px;
    position: relative;
    text-align: center;
    top: -8px;
  }

  #partMainRightBottom1_3{
    width:63px;
    height:23px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(217,217,217,1);
    margin-left: 825px;
    position: relative;
    text-align: center;
    top: -33px;
  }
  .tab_1{
    width:50px;
    height:16px;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(24,144,255,1);
    line-height:16px;
  }
  .tab_1_1{
    width:45px;
    height:1px;
    background:rgba(24,144,255,1);
    margin-top: 8px;
  }
  #partMainBottom_2{
    width:900px;
    height:auto;
    position: relative;
    /*left:1px;*/
    top:-40px;
    border: 1px solid black;
    z-index: 0;
  }
  #partMainBottom_3{
    width:1000px;
    height:250px;
    /*position: relative;*/
    display: inline-block;
    /*background:rgba(255,255,255,1);*/
    /*box-shadow:0px 1px 6px 1px rgba(0,0,0,0.09);*/
    /*border-radius:1px;*/
    /*position: relative;*/
    margin-top: -40px;
    /*background: #c2c2c2;*/
  }
  .partMainBottom_3_out{
    width:263px;
    height:101px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 6px 1px rgba(0,0,0,0.09);
    border-radius:1px;
    display: inline-block;
    margin-left: 20px;
    margin-top: 10px;
  }
  #partMainBottomBtn{
    width:60px;
    height:28px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    margin-left: 1089px;
    margin-top: 14px;
  }
  .partMainBottom_3_1{
    width:92px;
    height:16px;
    /*display: inline-block;*/
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    /*display: inline-block;*/
    line-height:16px;
    position: relative;
    top:10px;
    left:15px;
  }

  .partMainBottom_3_1Input{
    width:155px;
    height:18px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.15);
    font-size:10px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,0.25);
    line-height:16px;
    position: relative;
    top:-16px;
    left: 77px;
  }
  .partMainBottom_3_2{
    width:90px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top:27px;
  }
  .partMainBottom_3_1Img{
    width:12px;
    height:12px;
    /*background:rgba(24,144,255,1);*/
    position: relative;
    top:3px;

  }

  .partMainBottom_3_2Img{
    width:13px;
    height:12px;
    display: inline-block;
    margin-left: 9px;
    margin-top: 0px;
    /*background:rgba(77,203,115,1);*/
  }
  .partMainBottom_3_2_1{
    width:60px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
    margin-left: 90px;
    margin-top: -15px;
  }
  .partMainBottom_3_3{
    width:100px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
    position: relative;
    top:40px;
  }
  .partMainBottom_3_3Img{
    width:12px;
    height:12px;
    display: inline-block;
    margin-left: 9px;
  }
  .partMainBottom_3_3_1{
    width:80px;
    height:16px;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
    margin-left: 90px;
    margin-top: -15px;
  }

  .right {
    margin-top: 18px;
    margin-left: 21px;
    flex-grow: 1;
    width: 925px;
    height: 273px;
    background: rgba(255, 255, 255, 1);
    .top {
      height: 273px;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 20px;

      .header {
        height: 41px;
        display: flex;
        align-items: center;
        padding: 0 14px;

        .title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }

        .info {
          font-size: 11px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          margin-left: 20px;
        }
      }

      .divider {
        height: 1px;
        background: rgba(216, 216, 216, 1);
      }

      .diagnose {
        padding-top: 34px;
        /*padding-left: 25px;*/
        /*padding-right: 25px;*/
        display: flex;
        justify-content: space-between;

        .diagnose-info,
        .diagnose-result {
          width: 50%;
          height: 100%;
          margin: 0 50px 0 25px;
          display: flex;

          .title {
            flex-shrink: 0;
            margin-right: 25px;
          }
        }
      }

      .btns {
        margin-top: 20px;
        margin-right: 50px;
        display: flex;
        justify-content: flex-end;

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
      }
    }

    .mainbottom {
      height: 257px;
      background: rgba(255, 255, 255, 1);
      padding: 0 14px;
    }
  }
  #PatientHis{
    display: flex;
    margin-left: 600px;
    background:rgba(24,144,255,1);
    border-radius:3px;
    color: white;
  }
</style>
