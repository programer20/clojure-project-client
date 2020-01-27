<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#/">Home</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-show="userId" href="#/profile">Profile</b-nav-item>
        <b-nav-item v-show="!userId" href="#/registration">Register</b-nav-item>
        <b-nav-item v-show="!userId" href="#/login">Login</b-nav-item>
        <b-nav-item v-show="userId" @click="logout" href="#">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: mapGetters(['userId']),
  methods: {
    ...mapActions(["removeId"]),
    logout() {
      this.removeId();
      this.$router.push({ name: 'login'});
    }
  }
};
</script>

<style scoped>
</style>