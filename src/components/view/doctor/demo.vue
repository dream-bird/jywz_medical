<template>
  <a-table :columns="columns" :dataSource="tableData" bordered>
    <template
      v-for="col in ['name', 'age', 'address']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else
        >{{text}}</template
        >
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <!--<span v-if="record.editable">-->
          <!--<a @click="() => save(record.key)">Save</a>-->
          <!--<a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">-->
            <!--<a>Cancel</a>-->
          <!--</a-popconfirm>-->
        <!--</span>-->
        <span>
          <a @click="() => edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      scopedSlots: { customRender: 'age' },
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      scopedSlots: { customRender: 'address' },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  // const tableData = [];
  // for (let i = 0; i < 1; i++) {
  //   tableData.push({
  //     key: 0,
  //     name: '',
  //     age: '',
  //     address: '',
  //   });
  // }
  export default {
    name: 'demo',
    data() {
      // this.cacheData = data.map(item => ({ ...item }));
      return {
        tableData: [],
        columns,
      };
    },
    mounted() {
      this.tableData.push({
      key: 0,
      name: '',
      age: '',
      address: '',
    })
    },
    methods: {
      handleChange(value, key, column) {
        const newData = [...this.tableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.tableData = newData;
        }
      },
      edit(key) {
        const newData = [...this.tableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.tableData = newData;
        }
      },
      // save(key) {
      //   const newData = [...this.data];
      //   const target = newData.filter(item => key === item.key)[0];
      //   if (target) {
      //     delete target.editable;
      //     this.data = newData;
      //     this.cacheData = newData.map(item => ({ ...item }));
      //   }
      // },
      // cancel(key) {
      //   const newData = [...this.data];
      //   const target = newData.filter(item => key === item.key)[0];
      //   if (target) {
      //     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      //     delete target.editable;
      //     this.data = newData;
      //   }
      // },
    },
  };
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
