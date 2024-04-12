<template>
  <div>
    <a-button type="primary" @click="open = true">Create New Baby</a-button>
    <hr />
    <a-modal v-model:open="open" title="Create Baby Form" @ok="handleOk">
      <a-form
        :model="babyFormState"
        :label-col="labelCol"
      >
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
    <a-table :dataSource="babyList" :columns="columns" />
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
import dayjs from 'dayjs';
import request from "axios";

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
  data() {
    return {
      babyFormState: {
        ...defaultBabyForm,
      },
      open: false,
      babyList: [],
      columns: [
        {
          title: 'Actions',
          key: "actions",
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
    this.fetchBabyList()
  },
  methods: {
    async fetchBabyList(){
      this.babyList = (await request.get("/api/baby")).data;
    },
    async fetchBaby(id){
      this.babyFormState = (await request.get("/api/baby/" + id)).data;
    },
    async handleOk() {
      try {
        await request.post("/api/baby", toRaw(this.babyFormState));

        this.babyFormState = {
          ...defaultBabyForm
        }

        await this.fetchBabyList()
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
