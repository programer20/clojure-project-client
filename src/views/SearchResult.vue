<template>
  <div>
    <div v-show="!signal" class="spinner">
      <b-spinner variant="primary" label="Spinning" style="width: 4rem; height: 4rem;"></b-spinner>
    </div>
    <div class="my-4 mx-4" v-show="signal">
      <h2 class="my-3 text-center">Rezultat pretrage</h2>
      <b-row>
        <b-col cols="10">
          <h5>{{ data.length }} pronadjenih oglasa</h5>
        </b-col>
        <b-col cols="2">
          <b-button class="float-right" variant="outline-primary">Pretplati se</b-button>
        </b-col>
      </b-row>
      <b-table
        id="my-table"
        class="my-3"
        striped
        hover
        :items="data"
        :fields="columns"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchResult",
  data() {
    return {
      signal: false,
      data: [],
      columns: [
        { key: "name", label: "Naziv" },
        { key: "price", label: "Cena" },
        { key: "surface", label: "Površina" },
        { key: "location", label: "Lokacija" },
        { key: "href", label: "URL" }
      ],
      currentPage: 1,
      perPage: 20
    };
  },
  props: {
    params: Object
  },
  created() {
    axios
      .post("http://localhost:3000/search", this.params)
      .then(res => {
        console.log(res);
        this.data = res.data;
        this.signal = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    rows() {
      return this.data.length;
    }
  }
};
</script>

<style scoped>
.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
}
</style>