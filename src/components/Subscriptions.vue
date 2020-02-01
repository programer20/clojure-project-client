<template>
  <div>
    <b-table
      id="my-table"
      class="my-3"
      striped
      hover
      :items="subscriptions"
      :fields="columns"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template v-slot:cell(city)="data">{{ data.value.toUpperCase() }}</template>
      <template v-slot:cell(city_part)="data">{{ data.value.toUpperCase() }}</template>
      <template v-slot:cell(min_price)="data">{{ data.value }} EUR</template>
      <template v-slot:cell(max_price)="data">{{ data.value }} EUR</template>
      <template v-slot:cell(min_surface)="data">{{ data.value }} m2</template>
      <template v-slot:cell(max_surface)="data">{{ data.value }} m2</template>
      <template v-slot:cell(agency)="data">
        <b-icon font-scale="2" v-show="data.value" icon="check-circle" />
        <b-icon font-scale="2" v-show="!data.value" icon="x-circle" />
      </template>
      <template v-slot:cell(owner)="data">
        <b-icon font-scale="2" v-show="data.value" icon="check-circle" />
        <b-icon font-scale="2" v-show="!data.value" icon="x-circle" />
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
    <b-modal id="bv-modal-success" centered title="Message" hide-footer>
      <p>Subscription successfully deleted!</p>
    </b-modal>
    <b-modal id="bv-modal-error" centered title="Error" hide-footer>
      <p>Delete failed. Please try again!</p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Subscriptions",
  props: {
    userId: Number
  },
  data() {
    return {
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
        { key: "owner", label: "Owner" },
        { key: "action", label: "Action" }
      ],
      currentPage: 1,
      perPage: 10
    };
  },
  created() {
    this.getSubscriptions();
  },
  computed: {
    rows() {
      return this.subscriptions.length;
    }
  },
  methods: {
    getSubscriptions() {
      axios
        .get("http://localhost:3000/subscriptions/" + this.userId)
        .then(res => {
          this.subscriptions = res.data;
        })
        .catch(() => {
          this.$bvModal.show("bv-modal-error");
        });
    },
    deleteSubscription(subscriptionId) {
      axios
        .delete("http://localhost:3000/delete-subscription/" + subscriptionId)
        .then(() => {
          this.$bvModal.show("bv-modal-success");
          this.getSubscriptions();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>