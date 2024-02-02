<template>
  <div class="container_center">
    <div class="q-pa-md " style="min-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      v-if="!islogin"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="email"
        label="Your Email *"
        lazy-rules
        :rules="[
          (value) => !!value || 'Email name is required',
          (value) =>
            /^\S+@\S+\.\S+$/.test(value) || 'Enter a valid email address',
        ]"
      />
      <q-input
        filled
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (value) => !!value || 'Password is required',
          (value) =>
            value.length >= 6 || 'Password must be at least 6 characters',
        ]"
      />
      <q-input
        filled
        v-model="c_password"
        label="Confirm Password"
        lazy-rules
        :rules="[
          (value) => !!value || 'Confirm Password is required',

          (value) =>
            value.length >= 6 ||
            'Confirm Password must be at least 6 characters',
          (value) => value === password || 'Password and Confirm not match',
        ]"
      />

      <div>
        <q-btn label="Register" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <div @click="openLogin" class="pointer">Click Here for Login</div>
    </q-form>
    <q-form
      @submit="onLogin"
      @reset="onReset"
      class="q-gutter-md"
      v-if="islogin"
    >
      <q-input
        filled
        v-model="email"
        label="Your Email *"
        lazy-rules
        :rules="[
          (value) => !!value || 'Email name is required',
          (value) =>
            /^\S+@\S+\.\S+$/.test(value) || 'Enter a valid email address',
        ]"
      />
      <q-input
        filled
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (value) => !!value || 'Password is required',
          (value) =>
            value.length >= 6 || 'Password must be at least 6 characters',
        ]"
      />
      <div>
        <q-btn label="Login" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <div @click="openRegister" class="pointer">
        Click Here for new register
      </div>
    </q-form>
  </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const c_password = ref(null);
    const { getters } = useStore();
    const age = ref(null);
    const accept = ref(false);
    const islogin = ref(true);
    const openLogin = () => {
      islogin.value = true;
      onReset();
    };
    const openRegister = () => {
      islogin.value = false;
      onReset();
    };
    const getUserList = computed(() => getters["getUserList"]);
    const onReset = () => {
      name.value = null;
      email.value = null;
      password.value = null;
      c_password.value = null;
    };
    return {
      name,
      islogin,
      email,
      password,
      c_password,
      store,
      age,
      accept,
      openLogin,
      openRegister,
      onReset,
      onSubmit() {
        if (accept.value !== true) {
          console.log("dfjkfjdkfjdk");
          const obj = {
            name: name.value,
            email: email.value,
            password: password.value,
            c_password: c_password.value,
          };
          store.dispatch("setUserDetails", obj);
          onReset();
        } else {
          console.log("dfjkfjdkfjdk123232");
        }
      },
      onLogin() {
        if (accept.value !== true) {
          console.log("Login success", getUserList.value);
          const users = getUserList.value;
          if (users.length != 0) {
            users.forEach((element) => {
              if (
                element.email == email.value &&
                element.password == password.value
              ) {
                router.push({ name: "crud" });
                store.dispatch("setUserLogin", true);
              } else {
                alert("Email and Password are incorrect");
              }
            });
          } else {
            alert("Please register ");
          }
        } else {
          console.log("form fail");
        }
      },
    };
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.container_center{
  display: flex;
  justify-content: center;
}
</style>