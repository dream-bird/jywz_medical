<template>
  <div class="recipe">
    <!--<div class="top">-->
      <!--<a-button class="action" type="primary" @click="onCreate">-->
        <!--新建-->
      <!--</a-button>-->
      <!--<a-button class="action" type="danger" @click="onDelete">-->
        <!--删除-->
      <!--</a-button>-->
      <!--<a-button class="action" @click="onSave">-->
        <!--保存-->
      <!--</a-button>-->
    <!--</div>-->
    <a-table
      :columns="tableColumns"
      :dataSource="tableData"
      :pagination="false"
       bordered
      size="small"
      :locale="{ emptyText: '暂无处方' }">
      <!--:rowSelection="{-->
        <!--onChange: onTableSelectedChange-->
      <!--}"-->
    <!--&gt;-->
      <template slot="money" slot-scope="text">
        ￥{{ text }}
      </template>
      <template slot="allmoney" slot-scope="text">
        ￥{{ text }}
      </template>
      <!--<template-->
        <!--v-for="tableColumns in ['medicinename', 'brandname', 'sellpackage',-->
        <!--'dosageform','dosesiz','frequency','medicinecnt','money','allmoney']"-->
        <!--:slot="tableColumns"-->
        <!--slot-scope="text, record, index"-->
      <!--&gt;-->
        <!--<div :key="tableColumns">-->
          <!--<a-input-->
            <!--v-if="record.editable"-->
            <!--style="margin: -5px 0"-->
            <!--:value="text"-->
            <!--@change="e => handleChange(e.target.value, record.key, tableColumns)"-->
          <!--/>-->
          <!--<template v-else-->
          <!--&gt;{{text}}</template-->
          <!--&gt;-->
        <!--</div>-->
      <!--</template>-->
      <!--<template slot="operation" slot-scope="text, record, index">-->
        <!--<div class="editable-row-operations">-->
          <!--<span>-->
          <!--<a @click="() => edit(record.key)">Edit</a>-->
        <!--</span>-->
        <!--</div>-->
      <!--</template>-->
    </a-table>
    <div class="amount">
      合计：<span style="color: red;">￥{{ amount }}</span>
    </div>
  </div>
</template>

<script>
  const tableColumns = [
    {
      title: "药品名称",
      dataIndex: "medicinename",
      scopedSlots: { customRender: "medicinename" },
    },
    {
      title: "品牌",
      dataIndex: "brandname",
      scopedSlots: { customRender: "brandname" },
    },
    {
      title: "出库包装",
      dataIndex: "sellpackage",
      scopedSlots: { customRender: "sellpackage" }
    },
    {
      title: "药品剂型",
      dataIndex: "dosageform",
      scopedSlots: { customRender: "dosageform" }
    },
    {
      title: "剂量/次",
      dataIndex: "dosesiz",
      scopedSlots: { customRender: "dosesiz" }
    },
    {
      title: "使用频次",
      dataIndex: "frequency",
      scopedSlots: { customRender: "frequency" }
    },
    {
      title: "药品数量",
      dataIndex: "medicinecnt",
      scopedSlots: { customRender: "medicinecnt" }
    },
    {
      title: "药品价格",
      dataIndex: "money",
      scopedSlots: { customRender: "money" }
    },
    // {
    //   title: "费用小计",
    //   dataIndex: "allmoney",
    //   scopedSlots: { customRender: "allmoney" }
    // },
    // {
    //   title: "操作",
    //   dataIndex: "operation",
    //   scopedSlots: { customRender: "operation" }
    // }
  ];

  export default {
    name: "doctor-recipe2",
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        tableColumns,
        // tableData: [],
        tableSelectedRowKeys: [],
        form: this.$form.createForm(this),
        amount: 0,
        seenId: '',//就诊id
        patienttwoCode: ''//患者二维码
      };
    },
    watch: {
      tableData(newVal) {
        this.amount =0;
        newVal.map(item => {
          this.amount = this.amount + parseFloat(item.money) ;
        });
        if (this.amount.toString()=="NaN"){
          this.amount=0
        }
      }
    },

    methods: {
      // handleChange(value, key, column) {
      //   const newData = [...this.tableData];
      //   const target = newData.filter(item => key === item.key)[0];
      //   if (target) {
      //     target[column] = value;
      //     this.tableData = newData;
      //   }
      // },

      // onCreate() {
      //   let _self=this;
      //   let size = _self.tableData.length;
      //   if (size!=0){
      //     size+=size
      //   }
      //   _self.tableData.push({
      //     id: size,
      //     key: size,
      //     medicinename: "",
      //     brandname: "",
      //     sellpackage: "",
      //     dosageform: "",
      //     dosesiz: "",
      //     frequency: "",
      //     medicinecnt: "",
      //     money: "",
      //     allmoney: "",
      //     medicinesize: '规格',
      //     remark:'备注',
      //   })
      //   _self.edit(size);
      // },
      // edit(key) {
      //   const newData = [...this.tableData];
      //   const target = newData.filter(item => key === item.key)[0];
      //   if (target) {
      //     target.editable = true;
      //     this.tableData = newData;
      //   }
      // },
      // onTableSelectedChange(tableSelectedRowKeys) {
      //   this.tableSelectedRowKeys = tableSelectedRowKeys;
      // },
      // onDelete() {
      //   this.tableData = this.tableData.filter(item => {
      //     return this.tableSelectedRowKeys.indexOf(item.key) < 0;
      //   });
      //   this.tableSelectedRowKeys = [];
      // },
      // onSave() {
      //   this.$emit("onSave", this.tableData);
      // }
    }
  };
</script>

<style lang="less" scoped>
  .top {
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
    /*color: rgba(255, 91, 91, 1);*/
    color: rgba(0, 0, 0, 0.65);
    line-height: 21px;
  }
</style>
