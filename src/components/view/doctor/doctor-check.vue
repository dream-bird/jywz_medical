<template>
  <div class="check-table">
    <div class="actions">
      <a-button class="action" type="primary" @click="onCreate">新建</a-button>
      <a-button class="action" type="danger" @click="onDelete">删除</a-button>
      <a-button class="action" @click="onSave">保存</a-button>
    </div>
    <div class="block" ref="checkdiv" >
      <div class="partMainBottom_3_out"
           v-for="(item,index) in checkArry" :key="item.id" @click="onSelect(index)"
           :class='index==selIndex?"selected":""'>
        <div class="partMainBottomLabel">
          <img class="partMainBottomImg" src="/static/image/名称.png">
          项目名称：
          <select class="partMainBottom_3_1Input" @change="changeItem($event,index)">
            <option value="">请选择</option>
            <option v-for="selItem in item.checkItem"
            >{{selItem.itemname}} ￥{{selItem.price}}
            </option>
          </select>
        </div>
        <div class="partMainBottomLabel">
          <img class="partMainBottomImg" src="/static/image/department.png">
          检查科室：
          <div class="partMainBottom_3_2_1">
            放射科
          </div>
        </div>
        <div class="partMainBottomLabel">
          <img class="partMainBottomImg" src="/static/image/时间.png">
          检查时间： 2019-11-22
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "doctor-check",
    data() {
      return {
        form: this.$form.createForm(this),
        checkdiv:'',
        amount: 0,
        currentTime:'',
        checkArry:[],
        itemArry:[],
        divNum: 0,
        selIndex:0,
        checkItem:[
                {
                  itemname: '胸部正侧位透视',
                  price: 130
                },
                {
                  itemname: 'CT',
                  price: 230
                },
                {
                  itemname: 'B超',
                  price: 330
                },
              ],

      };
    },
    mounted(){
    },
    watch: {
      tableData(newVal) {
        let amount = 0;
        newVal.map(item => {
          amount = amount + item.money;
        });
        this.amount = amount;
      }
    },
    methods: {
      onCreate() {
        this.divNum = this.divNum+1;
        var dto={
          id: this.divNum,
          checkItem: this.checkItem
        }
        this.checkArry.push(dto);
      },
      onSelect(index){
        this.selIndex =index;
      },
      changeItem(event,index){
        var selItem = event.target.value;
        this.checkArry[index].itemname = selItem;
      },
      onDelete() {
        this.checkArry.splice(this.selIndex,1);
      },
      onSave() {
        this.$emit("onSave", this.checkArry);
      }
    }
  };
</script>

<style lang="less" scoped>
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .action {
      margin: 0 5px 15px;
    }
  }

  .amount {
    text-align: right;
    margin: 15px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 21px;
  }
</style>
<style>
  .block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:1000px;
    height:149px;
    background:rgba(240,242,245,1);
    overflow-y: auto;
  }

  .partMainBottom_3_out{
    display: flex;
    flex-direction: column;
    width:263px;
    height:110px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 6px 1px rgba(0,0,0,0.09);
    border-radius:1px;
    margin-top: 21px;
    margin-left: 45px;
  }
  /*项目名称*/
    .partMainBottomLabel{
      display: flex;
      flex-direction: row;
      font-size:11px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:16px;
      margin-top: 14px;
    }

  .partMainBottom_3_1Input{
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.15);
    font-size:10px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,0.25);
    line-height:16px;
  }

  .partMainBottom_3_2_1{
    font-size:11px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
  }

  .partMainBottomImg{
    display: flex;
    justify-content: center;
    margin-left: 9px;
    margin-right: 7px;
  }
  .selected{
    background:rgba(135,182,242,1)
  }
</style>
