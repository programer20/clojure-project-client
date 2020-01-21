<template>
  <form class="p-3 d-flex justify-content-center">
    <b-col sm="5">
      <h2 class="text-center">Registration</h2>
      <div class="form-group">
        <label for="first_name_field" class="mt-3">First name</label>
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
        />
        <label for="last_name_field" class="mt-3">Last name</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          placeholder="Enter last name"
        />
        <label for="email_field" class="mt-3">Mail</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Enter mail"
        />
        <label for="username_field" class="mt-3">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          name="username"
          placeholder="Enter username"
        />
        <label for="password_field" class="mt-3">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Enter password"
        />
        <label for="confirm_password_field" class="mt-3">Confirm password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="confirm_password"
          name="confirm_password"
          placeholder="Enter password"
        />
        <b-alert
          v-show="confirmError"
          show
          variant="danger"
          class="mt-3"
        >Password and confirm password do not match!</b-alert>
        <b-alert
          v-show="requiredFieldsError"
          show
          variant="danger"
          class="mt-3"
        >All fields are required!</b-alert>
        <b-alert
          v-show="usernameExistsError"
          show
          variant="danger"
          class="mt-3"
        >Username already exists in our database!</b-alert>
      </div>
      <div class="mx-auto">
        <input
          type="button"
          id="main_button"
          class="btn btn-primary mx-auto"
          value="Register"
          v-on:click="register"
        />
      </div>
    </b-col>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "registration",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      confirmError: false,
      requiredFieldsError: false,
      usernameExistsError: false
    };
  },
  methods: {
    register() {
      this.requiredFieldsError = false;
      this.confirmError = false;
      this.usernameExistsError = false;
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.username ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.requiredFieldsError = true;
      } else if (this.password !== this.confirmPassword) {
        this.confirmError = true;
      } else {
        axios
          .post("http://localhost:3000/registration", {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            password: this.password,
            email: this.email
          })
          .then(() => {
              this.$router.push("login");
          })
          .catch(() => {
              this.usernameExistsError = true;
          });
      }
    }
  }
};
</script>