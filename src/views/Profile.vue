<template>
  <b-container class="my-5">
    <h1 class="text-center mb-4">User profile</h1>
    <b-row class="justify-content-md-center">
      <b-col cols="10">
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Personal details" active>
            <PersonalDetails :user="user"/>
          </b-tab>
          
          <b-tab title="Subscriptions">
            <Subscriptions :userId="userId"/>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import PersonalDetails from "../components/PersonalDetails.vue";
import Subscriptions from "../components/Subscriptions.vue";

export default {
  name: "Profile",
  components: {
    PersonalDetails,
    Subscriptions
  },
  computed: { 
    ...mapGetters(["userId"])
  },
  data() {
    return {
      user: {},
      subscriptions: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/user/" + this.userId)
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