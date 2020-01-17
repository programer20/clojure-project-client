<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <h4>Grad</h4>
          <b-form-input v-model="grad" placeholder="Grad"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Deo grada</h4>
          <b-form-input v-model="grad" placeholder="Deo grada"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Cena</h4>
          <b-form-input v-model="grad" type="number" min="0" step="10" placeholder="Od"></b-form-input>
        </b-col>
        <b-col col lg="4">
          <h4>Cena</h4>
          <b-form-input v-model="grad" type="number" min="0" step="10" placeholder="Do"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="4">
          <h4>Oglašivač</h4>
          <b-form-group>
            <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
              <b-form-checkbox value="orange">Agencija</b-form-checkbox>
              <b-form-checkbox value="apple">Vlasnik</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center my-4">
        <b-col col lg="8">
          <b-button block variant="outline-primary">Pretraži</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>