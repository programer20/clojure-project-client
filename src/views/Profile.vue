<template>
  <b-container class="my-5">
    <h1 class="text-center mb-4">User profile</h1>
    <b-row class="justify-content-md-center">
      <b-col cols="10">
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Personal details" active>
            <b-row class="justify-content-md-center">
              <b-col cols="3">
                <p>Username</p>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="user.username" disabled></b-form-input>
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center my-3">
              <b-col cols="3">
                <p>First name</p>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="user.first_name" disabled />
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center my-3">
              <b-col cols="3">
                <p>Last name</p>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="user.last_name" disabled />
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center my-3">
              <b-col cols="3">
                <p>Email adress</p>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="user.email" disabled />
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Subscriptions">
            <b-table id="my-table" class="my-3" striped hover
              :items="subscriptions"
              :fields="columns"
              :per-page="perPage"
              :current-page="currentPage"
            >
              <template v-slot:cell(city)="data">
                {{ data.value.toUpperCase() }}
              </template>
              <template v-slot:cell(city_part)="data">
                {{ data.value.toUpperCase() }}
              </template>
              <template v-slot:cell(min_price)="data">
                {{ data.value }} EUR
              </template>
              <template v-slot:cell(max_price)="data">
                {{ data.value }} EUR
              </template>
              <template v-slot:cell(min_surface)="data">
                {{ data.value }} m2
              </template>
              <template v-slot:cell(max_surface)="data">
                {{ data.value }} m2
              </template>
              <template v-slot:cell(agency)="data">
                <b-icon font-scale="2" v-show="data.value" icon="check-circle"/>
                <b-icon font-scale="2" v-show="!data.value" icon="x-circle"/>
              </template>
              <template v-slot:cell(owner)="data">
                <b-icon font-scale="2" v-show="data.value" icon="check-circle"/>
                <b-icon font-scale="2" v-show="!data.value" icon="x-circle"/>
              </template>
              <template v-slot:cell(action)="data">
                <b-button @click="deleteSubscription(data.item.id)" variant="danger">Delete</b-button>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Profile",
  computed: { 
    ...mapGetters(["userId"]),
    rows() {
      return this.subscriptions.length;
    }
  },
  data() {
    return {
      user: {},
      subscriptions: [],
      columns: [
        { key: "id", label: "Id" },
        { key: "city", label: "City" },
        { key: "city_part", label: "Location" },
        { key: "min_price", label: "Price from" },
        { key: "max_price", label: "Price to" },
        { key: "min_surface", label: "Area to" },
        { key: "max_surface", label: "Area to" },
        { key: "agency", label: "Agency" },
        { key: "owner", label: "Owner"},
        { key: "action", label: "Action"}
      ],
      currentPage: 1,
      perPage: 10,
      agencySignal: false,
      ownerSignal: false
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

    axios
      .get("http://localhost:3000/subscriptions/" + this.userId)
      .then(res => {
        this.subscriptions = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    deleteSubscription(subscriptionId) {
      console.log(subscriptionId);
    }
  }
};
</script>

<style scoped>
</style>