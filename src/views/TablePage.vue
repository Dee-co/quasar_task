<template>
  <div class="q-pa-md">
    <div style="display: flex; justify-content: end; align-items: center;">
      <q-btn
        label="Add New Data"
        color="primary"
        class="my-3"
        @click="dialog = true"
      />&nbsp;
      <q-btn label="Logout" color="primary" class="my-3" @click="logoutUser"/>
    </div>
    <q-dialog v-model="dialog">
      <q-card style="width: 500px">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span v-if="!editItem" class="q-ml-sm">Add New Data</span>
          <span v-if="editItem" class="q-ml-sm">Edit Data</span>
        </q-card-section>

        <q-card-section>
          <q-form @submit="addItem" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Name *"
              lazy-rules
              :rules="[(value) => !!value || ' name is required']"
            />
            <q-input
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[
                (value) => !!value || 'Email name is required',
                (value) =>
                    /^\S+@\S+\.\S+$/.test(value) || 'Enter a valid email address',
                ]"
            />
            <q-input
              filled
              v-model="position"
              label="Position *"
              lazy-rules
              :rules="[(value) => !!value || ' position is required']"
            />
            <div>
              <q-btn
                label="Add"
                v-if="!editItem"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Edit"
                v-if="editItem"
                type="submit"
                color="primary"
              />
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup="cancelEnabled"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-markup-table
      :separator="separator"
      flat
      bordered
      style="margin-top: 10px"
    >
      <thead>
        <tr>
          <th class="text-left">NO.</th>
          <th class="text-left">Name</th>
          <th class="text-left">Position</th>
          <th class="text-left">Email</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in table_data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.email }}</td>
          <td>
            <q-btn @click="editUserItem(item)">Edit</q-btn>
            <q-btn @click="deleteItem(item)">Delete</q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
  
  <script>
import { ref,computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

export default {
  setup() {
    const { getters } = useStore();
    const checkauthentication = computed(() => getters["checkauthentication"]);
    const name = ref(null);
    const router = useRouter()
    const email = ref(null);
    const position = ref(null);
    const accept = ref(false);
    const dialog = ref(false);
    const table_data = ref([
      {
        id: 1,
        name: "User1",
        position: "Developer",
        email: "User1@gmail.com",
      },
      {
        id: 2,
        name: "HR",
        position: "HR",
        email: "HR@gmail.com",
      },
      {
        id: 3,
        name: "GM",
        position: "GM",
        email: "gm@gmail.com",
      },
      {
        id: 4,
        name: "SR",
        position: "SR",
        email: "sr@gmail.com",
      },
      {
        id: 5,
        name: "Spoc",
        position: "Spoc",
        email: "Spoc@gmail.com",
      },
    ]);
    const logoutUser = ()=>{
        router.push({name:'home'})
    }
    const addItem = () => {
      if (accept.value !== true) {
       if(!editItem.value){
        const table_length = table_data.value.length;
        const obj = {
          id: table_length,
          name: name.value,
          position: position.value,
          email: email.value,
        };
        table_data.value.push(obj);
        dialog.value = false;
        alert("Item Added Successfully");
       }else{
        let editArray = table_data.value.map(obj => {
            if(obj.id == edited_user_id.value){
                return {...obj,name:name.value,email:email.value,positon:position.value}
            }
            return obj
        })
        dialog.value = false;
        console.log("find all data",editArray)
        alert("Item Edited Successfully");
        table_data.value = editArray;
       }
      }
    };
    const edited_user_id = ref(null);
    const editItem = ref(false);
    const editUserItem = (data) => {
      editItem.value = true;
      edited_user_id.value = data.id;
      name.value = data.name;
      position.value = data.position;
      email.value = data.email;
      dialog.value = true;
    };
    onMounted(()=>{
        if(checkauthentication.value == false){
            router.push({name:'home'})
        }
        console.log("ccxjkjksjk",checkauthentication.value)
    })
    const deleteItem = (data) => {
      console.log(data);
      const deleted_data = table_data.value.filter((obj) => obj.id !== data.id);
      table_data.value = deleted_data;
    };
    return {
      edited_user_id,
      table_data,
      checkauthentication,
      name,
      email,
      router,
      accept,
      logoutUser,
      editUserItem,
      deleteItem,
      position,
      editItem,
      dialog,
      separator: ref("cell"),
      addItem,
      separatorOptions: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
        { label: "Cell", value: "cell" },
        { label: "None", value: "none" },
      ],
    };
  },
};
</script>
  