<template>
    <div>
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
    </div>
</template>

<script>
export default {
    name: "PersonalDetails",
    props: {
        user: Object
    }
}
</script>

<style scoped>

</style>