<template>
  <div class="container text-center">
    <h1 class="my-5">Filters</h1>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <h4>City</h4>
          <b-form-input v-model="city" placeholder="City"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Location</h4>
          <b-form-input v-model="cityPart" placeholder="Location"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Price</h4>
          <b-form-input v-model="minPrice" type="number" min="0" step="10" placeholder="From"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Price</h4>
          <b-form-input v-model="maxPrice" type="number" min="0" step="10" placeholder="To"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Area</h4>
          <b-form-input v-model="minSurface" type="number" min="0" step="10" placeholder="From"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Area</h4>
          <b-form-input v-model="maxSurface" type="number" min="0" step="10" placeholder="To"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Advertiser</h4>
          <b-form-group>
            <b-form-checkbox-group id="checkbox-group" v-model="advertiser">
              <b-form-checkbox value="agencija">Agency</b-form-checkbox>
              <b-form-checkbox value="vlasnik">Owner</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="8">
          <b-button @click="sendRequest" block variant="outline-primary">Search <b-icon icon="search"/></b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      city: null,
      cityPart: null,
      minPrice: null,
      maxPrice: null,
      minSurface: null,
      maxSurface: null,
      advertiser: []
    };
  },
  methods: {
    sendRequest() {
      if (!this.minPrice) {
        this.minPrice = 0;
      }

      if (!this.maxPrice) {
        this.maxPrice = 0;
      }

      if (!this.minSurface) {
        this.minSurface = 0;
      }

      if (!this.maxSurface) {
        this.maxSurface = 0;
      }

      this.params = {
        city: this.city == null ? this.city : this.city.toLowerCase(),
        cityPart:
          this.cityPart == null ? this.cityPart : this.cityPart.toLowerCase(),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minSurface: parseInt(this.minSurface),
        maxSurface: parseInt(this.maxSurface),
        advertiser: this.advertiser
      };

      this.$router.push({
        name: "searchResult",
        params: { params: this.params }
      });
    }
  }
};
</script>

<style scoped>
</style>