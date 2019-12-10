<template>
  <div class="page-container">
    <machine-head></machine-head>
    <div id="doctorInfo">
      <div class="doctorBorder" v-for="(item,index) in doctorInfoList"
        :key="index">
        <div class="doctors">
            <img class="doctorphoto" src="@/assets/image/u38.png">
          <div id="doctor">
            <div class="doctorName" v-text ="item.name"></div>
            <div class="doctorDep" v-text="item.department"></div>
            <div class="doctorPro" v-text="item.grade"></div>
          </div>
          <div class="doctorBri">擅长：冠心病、冠状动脉造影</div>
          <div class="doctorBtn" @click="selectOneDoctor(item)">
            <div class="doctorBtnText">挂号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MachineHead from "./machine-head";
    export default {
      components: {MachineHead},
      name: "doctors",
        data() {
          return{
            doctorInfoList: [],
          };
        },
        mounted() {
          this.showDoctors()
        },

        methods: {
          showDoctors() {
            var _self = this;
            _self.$axios.get('/api/v1/doctor/').then(response => {
              _self.doctorInfoList = response.data;
            })
              .catch(function(err) {
                _self.$message.error('获取挂号医生信息失败，失败信息：' + err.response.data.error_description)
              });
          },
          //通过路由属性中的name来确定匹配的路由，通过params来传递参数
          selectOneDoctor: function (item) {
            this.$router.push({
              name: 'Register',
              params: {
                id: item.id,
              }
            });
          }
        }
    }
</script>

<style scoped>
  #doctorInfo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 50px 100px;
  }
  .doctors{
    display: flex;
    flex-direction: column;
    width:301px;
    height:204px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 1px rgba(0,0,0,0.09);
    border-radius:2px;
    margin-bottom: 50px;
  }
  .doctorphoto{
    width:82px;
    height:82px;
    margin-left: 25px;
    margin-top: -25px;
  }
  .doctorName{
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size:20px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:33px;
    margin-left: 30px;
  }

  #doctor{
    display: flex;
  }
  .doctorDep{
    display: flex;
    align-items: center;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-left: 30px;
  }
  .doctorPro{
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-left: 30px;
  }
  .doctorBri{
    display: flex;
    justify-content: center;
    width:296px;
    height:82px;
    font-size:15px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-top: 14px;

  }
  .doctorBtn{
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
  }
  .doctorBtnText{
    width:143px;
    height:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:3px;
    background:rgba(24,144,255,1);
    font-size:13px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;

  }
  .page-container {
    flex-direction: column;
    min-height: 100%;
    background: #f6f7fb;
  }
</style>
