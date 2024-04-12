<template>
  <div>
    <a-button type="primary" @click="open = true">Create New Baby</a-button>
    <hr />
    <a-modal v-model:open="open" title="Create Baby Form" @ok="handleOk">
      <a-form
        :model="newBabyFormState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- <a-form-item label="Instant delivery">
          <a-switch v-model:checked="newBabyFormState.delivery" />
        </a-form-item> -->
        <!-- <a-form-item label="Activity type">
          <a-checkbox-group v-model:value="newBabyFormState.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item> -->

        <a-form-item
          label="Birth Time"
          name="birthAt"
          :rules="[{ required: true, message: 'Please input Birth Time!' }]"
        >
          <a-date-picker
            v-model:value="newBabyFormState.birthAt"
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
          <a-input-number v-model:value="newBabyFormState.weight" />
        </a-form-item>

        <a-form-item
          label="Gender"
          :rules="[{ required: true, message: 'Please input Gender!' }]"
        >
          <a-radio-group v-model:value="newBabyFormState.gender">
            <a-radio value="male">Male</a-radio>
            <a-radio value="female">Female</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Baby name">
          <a-input v-model:value="newBabyFormState.name" />
        </a-form-item>

        <a-form-item label="Parent">
          <a-input v-model:value="newBabyFormState.parent" />
        </a-form-item>
        <!-- <a-form-item label="Activity form">
          <a-textarea v-model:value="newBabyFormState.desc" />
        </a-form-item> -->
        <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px">Cancel</a-button>
        </a-form-item> -->
      </a-form>
    </a-modal>

    <!-- The table -->
    <a-table :dataSource="babyList" :columns="columns" />
  </div>
</template>



<script setup>
import { toRaw } from "vue";

// const onSubmit = () => {
//   console.log('submit!', toRaw(formState));
// };
const labelCol = {
  style: {
    width: "150px",
  },
};
const wrapperCol = {
  span: 14,
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
      newBabyFormState: {
        ...defaultBabyForm,
      },
      open: false,
      babyList: [],
      columns: [
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
    async handleOk() {
      try {
        await request.post("/api/baby", toRaw(this.newBabyFormState));

        this.newBabyFormState = {
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
