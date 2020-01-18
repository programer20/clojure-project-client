<template>
  <div>
    <Navbar/>
    <div id="app">
      <h1>Pretraga</h1>
      <div class="container my-5">
        <Filters />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    Filters,
    Navbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
