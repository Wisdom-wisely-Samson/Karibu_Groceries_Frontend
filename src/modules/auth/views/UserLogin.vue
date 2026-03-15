<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";



const router = useRouter();
const loginStore = useAuthStore();

const username = ref("");
const password = ref("");

const login = async () => {
  const role = await loginStore.login({
    username: username.value,
    password: password.value,
  });

  if (role === "Manager") {
    console.log("Redirecting to manager dashboard...");
    router.push("/manager");
   
  }
  if (role === "SalesAgent") {
    router.push("/agent");
    console.log("Redirecting to agent dashboard...");
  }
  if (role === "Director") {
    router.push("/director");
    console.log("Redirecting to director dashboard...");
  }

  console.log(`Logged in as ${role}`);
};

</script>

<template>
  <div class="form-container">
    <h2>Login</h2>
    
    <div class="form-group">
    <input
      v-model="username"
      placeholder="Username"
      class="input"
    />
    </div>

     <div class="form-group">
     

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
    />
     </div>
    <button
      @click="login"
      class="btn btn-primary"
    >
      Login
    </button>
  </div>
</template>
<style scoped>
</style>
 