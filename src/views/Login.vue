<template>
  <form class="p-3 d-flex justify-content-center">
    <b-col sm="5">
      <h2 class="text-center">Login</h2>
      <div class="form-group">
        <label for="email_field">Username</label>
        <input
          type="email"
          class="form-control"
          id="username"
          name="username"
          v-model="input.username"
          placeholder="Enter username"
        />
      </div>
      <div class="form-group">
        <label for="password_field">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          v-model="input.password"
          placeholder="Password"
        />
        <b-alert v-show="loginError" show variant="danger" class="mt-3">Incorrect username or password!</b-alert>
      </div>
      <div class="mx-auto">
        <input
          type="button"
          v-on:click="login()"
          id="main_button"
          class="btn btn-primary mx-auto"
          value="Log in"
        />
      </div>
    </b-col>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginError: false,
      input: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      axios.post("http://localhost:3000/login", this.input)
      .then(() => {
          this.$router.push("/");
      })
      .catch(
          this.loginError = true
      );
    }
  }
};
</script>
