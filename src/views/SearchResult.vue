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
          <b-button @click="$bvModal.show('bv-modal-example')" class="float-right" variant="outline-primary">Pretplati se</b-button>
          <b-modal id="bv-modal-example" centered title="Pretplata" hide-footer>
            <p>Da li zelite da se pretplatite na pretragu sa sledecim parametrima:</p>
            <b-row>
              <b-col>
                <p>Grad: {{params.city.toUpperCase()}}</p>
              </b-col>
              <b-col>
                <p>Deo grada: {{params.cityPart.toUpperCase()}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p>Cena od: {{params.minPrice}}</p>
              </b-col>
              <b-col>
                <p>Cena do: {{params.maxPrice}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p>Kvadratura od: {{params.minSurface}}</p>
              </b-col>
              <b-col>
                <p>Kvadratura do: {{params.maxSurface}}</p>
              </b-col>
            </b-row>
            <b-button variant="success" class="float-right mt-3 ml-2" @click="subscribe">Da</b-button>
            <b-button variant="danger" class="float-right mt-3" @click="$bvModal.hide('bv-modal-example')">Ne</b-button>
          </b-modal>
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
  },
  methods: {
    subscribe() {
      console.log("subscribe");
      this.$bvModal.hide('bv-modal-example');
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