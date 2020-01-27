<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Korisnicki profil</h1>
    <b-tabs content-class="mt-3" justified>
      <b-tab title="Licni podaci" active><p>{{ user }}</p></b-tab>
      <b-tab title="Pretplate"><p>I'm the second tab</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: "Profile",
  computed: mapGetters(['userId']),
  data() {
      return {
          user: {}
      }
  },
  created() {
      axios.get("http://localhost:3000/user/" + this.userId)
      .then(res => {
          this.user = res.data[0];
      })
      .catch(err => {
          console.log(err);
      });
  }
};
</script>

<style scoped>
</style>