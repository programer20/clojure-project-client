<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <h4>Grad</h4>
          <b-form-input v-model="city" placeholder="Grad"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Deo grada</h4>
          <b-form-input v-model="cityPart" placeholder="Deo grada"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Cena</h4>
          <b-form-input v-model="minPrice" type="number" min="0" step="10" placeholder="Od"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Cena</h4>
          <b-form-input v-model="maxPrice" type="number" min="0" step="10" placeholder="Do"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Oglašivač</h4>
          <b-form-group>
            <b-form-checkbox-group id="checkbox-group" v-model="advertiser">
              <b-form-checkbox value="agencija">Agencija</b-form-checkbox>
              <b-form-checkbox value="vlasnik">Vlasnik</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="8">
          <b-button @click="sendRequest" block variant="outline-primary">Pretraži</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      params: {},
      city: null,
      cityPart: null,
      minPrice: null,
      maxPrice: null,
      advertiser: []
    };
  },
  methods: {
    sendRequest() {

      if(!this.minPrice){
        this.minPrice = 0;
      }

      if(!this.maxPrice){
        this.maxPrice = 0;
      }

      this.params = {
        city: this.city.toLowerCase(),
        cityPart: this.cityPart.toLowerCase(),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        advertiser: this.advertiser
      };

      axios
        .post("http://localhost:3000/vue", this.params)
        .then(res => {
          console.log(res);
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