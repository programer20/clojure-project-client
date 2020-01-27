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
          <b-button
            @click="$bvModal.show('bv-modal-example')"
            class="float-right"
            variant="outline-primary"
          >Pretplati se <b-icon icon="inbox-fill"/></b-button>
          <b-modal id="bv-modal-example" centered title="Pretplata" hide-footer>
            <div v-show="subscribeSignal">
              <p>Da li zelite da se pretplatite na pretragu sa sledecim parametrima:</p>
              <b-row>
                <b-col>
                  <p>Grad: {{params.city == null ? " " : params.city.toUpperCase()}}</p>
                </b-col>
                <b-col>
                  <p>Deo grada: {{params.cityPart == null ? " " : params.cityPart.toUpperCase()}}</p>
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
              <b-row>
                <b-col>
                  <p>
                    Oglasivac:
                    <span
                      v-for="advertiser in params.advertiser"
                      :key="advertiser"
                    >{{advertiser}}</span>
                  </p>
                </b-col>
              </b-row>
              <b-button variant="primary" class="float-right mt-3 ml-2" @click="subscribe">Da</b-button>
              <b-button variant="secondary" class="float-right mt-3" @click="$bvModal.hide('bv-modal-example')">Ne</b-button>
            </div>
            <div  class="d-flex justify-content-center mb-3">
              <b-spinner v-show="!subscribeSignal" variant="primary" label="Spinning"></b-spinner>
            </div>
          </b-modal>
          <b-modal id="bv-modal-success" centered title="Obavestenje" hide-footer>
            <p>Uspesno ste se pretplatili!</p>
          </b-modal>
          <b-modal id="bv-modal-error" centered title="Obavestenje" hide-footer>
            <p>Doslo je do greske!</p>
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
      >
        <template v-slot:cell(href)="data">
          <a :href=data.value>{{ data.value }}</a></template>
      </b-table>
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
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: "SearchResult",
  data() {
    return {
      signal: false,
      subscribeSignal: true,
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
        this.data = res.data;
        this.signal = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(['userId']),
    rows() {
      return this.data.length;
    }
  },
  methods: {
    subscribe() {
      this.subscribeSignal = false;
      axios
        .post("http://localhost:3000/subscribe", {
          user_id: this.userId,
          city: this.params.city,
          city_part: this.params.cityPart,
          min_price: this.params.minPrice,
          max_price: this.params.maxPrice,
          min_surface: this.params.minSurface,
          max_surface: this.params.maxSurface,
          advertiser: this.params.advertiser
        })
        .then(() => {
          this.$bvModal.hide("bv-modal-example");
          this.subscribeSignal = true;
          this.$bvModal.show("bv-modal-success");
        })
        .catch(() => {
          this.$bvModal.hide("bv-modal-example");   
          this.subscribeSignal = true;               
          this.$bvModal.show("bv-modal-error");
        });
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