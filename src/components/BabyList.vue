<template>
  <div>
    <a-button type="primary" @click="open = true">Create New Baby</a-button>
    <a-button type="default" @click="migrateModalOpen = true">Upload Migrate File</a-button>
    <hr />
    <a-modal v-model:open="open" :title="formTitle" @ok="handleOk">
      <a-form :model="babyFormState" :label-col="labelCol">
        <a-form-item
          label="Birth Time"
          name="birthAt"
          :rules="[{ required: true, message: 'Please input Birth Time!' }]"
        >
          <a-date-picker
            v-model:value="babyFormState.birthAt"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item
          label="Weight"
          :rules="[{ required: true, message: 'Please input Weight!' }]"
        >
          <a-input-number v-model:value="babyFormState.weight" />
        </a-form-item>

        <a-form-item
          label="Gender"
          :rules="[{ required: true, message: 'Please input Gender!' }]"
        >
          <a-radio-group v-model:value="babyFormState.gender">
            <a-radio value="male">Male</a-radio>
            <a-radio value="female">Female</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Baby name">
          <a-input v-model:value="babyFormState.name" />
        </a-form-item>

        <a-form-item label="Parent">
          <a-input v-model:value="babyFormState.parent" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- The table -->
    <a-table :dataSource="babyList" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <EditFilled @click="editBaby(record)" />
          <a-divider type="vertical" />
          <DeleteFilled @click="showConfirmDeleteModal(record._id)"/>
        </template>
      </template>
    </a-table>
  </div>
</template>



<script setup>
import { toRaw } from "vue";
const labelCol = {
  style: {
    width: "150px",
  },
};
</script>

<script>
import dayjs from "dayjs"
import request from "axios"
import { EditFilled, DeleteFilled } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue';

var defaultBabyForm = {
  birthAt: dayjs(),
  name: "",
  gender: "",
  weight: 0,
  parent: "",
};

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    DeleteFilled,
    EditFilled
  },
  data() {
    return {
      babyFormState: {
        ...defaultBabyForm,
      },
      open: false,
      babyList: [],
      columns: [
        {
          title: "Actions",
          key: "action",
        },
        {
          title: "ID",
          dataIndex: "_id",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Birth Time",
          dataIndex: "birthAt",
          key: "birthAt",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "Parent",
          dataIndex: "parent",
          key: "parent",
        },
        {
          title: "Weight",
          dataIndex: "weight",
          key: "weight",
        },
      ],
    };
  },
  async mounted() {
    this.fetchBabyList();
  },
  computed: {
    formTitle () {
      if(this.babyFormState.update === true) {
          return `Update Baby ${this.babyFormState._id} Form`
      }
      return 'Create Baby Form'
    },
  },
  methods: {
    showConfirmDeleteModal(id) {
      var self = this
      Modal.confirm({
        title: 'Deletion Confirmation',
        content: `Are you sure you want to delete ${id} ?`,
        async onOk() {
          await self.deleteBaby(id)
          await self.fetchBabyList()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    async editBaby(record) {
      this.fetchBaby(record._id)
      this.open = true;
    },
    async fetchBabyList() {
      this.babyList = (await request.get("/api/baby")).data;
    },
    async deleteBaby(id) {
      await request.delete("/api/baby/" + id)
    },
    async fetchBaby(id) {
      const res = (await request.get("/api/baby/" + id)).data
      // console.log(res)
      // console.log(this.babyFormState)
      // this.babyFormState = {
      //   name: 'yolo'
      // }

      this.babyFormState = Object.assign({}, res, {
        birthAt: dayjs(res.birthAt),
        update: true,
      })
    },
    async handleOk() {
      try {
        var form = toRaw(this.babyFormState)

        if (form.update === true) {
          await request.put("/api/baby/" + form._id, toRaw(this.babyFormState));
        } else {
          await request.post("/api/baby", toRaw(this.babyFormState));
        }

        this.babyFormState = {
          ...defaultBabyForm,
        }

        await this.fetchBabyList();
        this.open = false;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert(error);
        }
      }
    },
  },
};
</script>
