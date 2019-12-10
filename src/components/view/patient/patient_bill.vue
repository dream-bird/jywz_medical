<template>
  <div class ="h5-container">
    <PatientHead title="就诊卡"></PatientHead>
    <div id="partOne">
      <img id="partOne_Img" src="../../../assets/image/编组 2.png">
      <div id="partOne_Img_Text1" v-text="patientname"></div>
      <div id="partOne_Img_Text2" v-text="idcardno"></div>
    </div>

    <div id="partTwo"
         v-for="item,index in arrDiagnose" :key="index">
      <div id="partTwo_1" @click="showDetail(item.id,item.department)">
        <div id="partTwo_1_left"></div>
        <div id="partTwo_1_right">
          <div id="ksys">
            <div id="partTwo_1_top1" v-text="'科室：'+ item.recipe.department">
              科室：心内科
            </div>

            <div id="partTwo_1_top2" v-text="'疾病：'+ item.recipe.diagnosecode">
              医生：刘素梅
            </div>
            <img id="partTwo_1_Img" src="../../../assets/image/标签.png">
          </div>

          <img id="partTwo_1_midImg" src="../../../assets/image/向右.png">
          <div id="jesj">
            <div id="partTwo_1_bottom1" v-text="item.totalmoney+'￥'">
              480.00￥
            </div>
            <div id="partTwo_1_bottom2" v-text="item.endtime" >
              2019-09-23
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PatientHead from "./patient-head"
    export default {
        name: "pbill",
      components: {PatientHead},
      data() {
        return {
          Page: [],
          arrDiagnose: [],
          patientname : '',
          checkDTOS:[],
          medicine: [],
          diagnoseDTO: {
            checkDTOS: [],//检查处方
            checkmoney : '',// 检查费 ,
            drugmoney : '',// 药费 ,
            endtime : '',// 结束时间 ,
            id : '',// 诊断编号 ,
            patientage : '',// 患者年龄 ,
            patientidcard : '',// 患者身份证号 ,
            patientname : '',// 患者姓名 ,
            patientsex : '',//患者性别 ,
            recipe: {},//,药品处方
            result : '',//诊断结果 ,
            starttime : '',//开始时间 ,
            state : '',//状态 ,
            totalmoney : ''// 诊断总金额
          },
          patientname:'',
          idcardno:'',
        };
      },

      beforeMount:function () {
        this.showHistory()
      },
      created() {
        this.patientname = this.$route.params.name;
        this.idcardno = this.$route.params.idcardno;
      },
      methods: {
        showHistory(){
          let _self = this;
          _self.$axios.get("/api/v1/diagnose").then(response => {
            _self.Page=response.data;
            _self.arrDiagnose=response.data.content;
            // _self.diagnoseDTO=_self.arrDiagnose[0];
            // _self.patientname = _self.diagnoseDTO.patientname;
          })
            .catch(function(err) {
              if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
                _self.$message.error('获取历史记录失败，失败信息：' + err.response.data.error_description)

              }else{
                  _self.$message.error('获取历史记录失败');
                return false;
              }
            });
        },
        showDetail(id,department){
          this.$router.push({
            name:'PDetail',
            params:{
              id:id,
              department:department,
            }
          })
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
    align-items: center;
    background-size: 100%;
  }

  #partOne{
    text-align: center;
    width:6.85rem;
    height:1.98rem;
    /*白色*/
    background:rgba(255,255,255,1);
  }
  #partOne_Img{
    width:6.07rem;
    height:1.98rem;
    border-radius:0.27rem;
    margin-top: .23rem;
  }
  #partOne_Img_Text1{
    width:1.20rem;
    height:.56rem;
    font-size:.40rem;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(255,255,255,1);
    color: black;
    position: relative;
    top:-1.7rem;
    left:1.25rem;

  }
  #partOne_Img_Text2{
    width:2.90rem;
    height:.42rem;
    font-size:.30rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:.42rem;
    position: relative;
    top:-1.6rem;
    left: 1.25rem;
  }
  #partTwo{
    display: flex;
    flex-direction: column;
    height:auto;
    background:rgba(255,255,255,1);
    margin-top: .52rem;
  }
  #partTwo_1{
    display: flex;
    flex-direction: row;
    width:6.60rem;
    height:1.60rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.02rem .10rem 0rem rgba(153,153,153,0.2);
    border-radius:.08rem;
  }
  #partTwo_1_left{
    width:.17rem;
    height:1.60rem;
    background:rgba(247,181,0,1);
    border-radius:.08rem 0rem 0rem .08rem;
  }
  #partTwo_1_right{
    display: flex;
    flex-direction: column;
    width:6.40rem;
    height:1.60rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem .02rem .10rem 0rem rgba(153,153,153,0.2);
    border-radius:.08rem;
  }
  #partTwo_1_Img{
    width:.53rem;
    height:.46rem;
  }
  #ksys{
    display: flex;
    flex-direction: row;
  }
  #partTwo_1_top1{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-top: .22rem;
  }
  #partTwo_1_top2{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-top: .22rem;
    margin-left: .96rem;
  }
  #partTwo_1_midImg{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 6.20rem;
    width:.16rem;
    height:.27rem;

  }
  #partTwo_1_bottom1{
    font-size:.32rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(255,30,30,1);
    margin-left: .64rem;
    margin-top: .10rem;
  }
  #partTwo_1_bottom2{
    width:1.52rem;
    height:.37rem;
    font-size:.26rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.37rem;
    margin-right: .95rem;
  }
  #jesj{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
