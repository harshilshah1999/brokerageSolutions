<template>
  <div class="a2" style="height: 100vh;">
    <v-row justify="">
      <!-- <v-col cols="4"></v-col> -->
      <v-col class="a2" cols="12" >
        <v-card class="a1">
          <v-card-title><h1>Sign Up</h1></v-card-title>
          <v-col cols="12" sm="12">
            <v-text-field label="Mobile Number" outlined>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn class ="a3" id="log-in" @click="submit">Send OTP</v-btn>
          </v-col>
          <v-col>
            <v-otp-input
              v-model="OTP"
              required
              length="6"
              type="number"
            ></v-otp-input>
            <v-btn class="a3" @click="verifyCode" id="otp-btn"> Confirm OTP </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  async mounted() {
    console.log('imakhva')
    this.yash()
  },
  methods: {
    yash() {
      console.log('jbakjsvkasvk')
    },
    sends() {},
  },
}
</script>

<style>
.v-text-field {
  border-radius: 10px;
}
.v-text-field .v-input__slot{
   background-color: white !important;
   margin: 0px;
 }
.a1{
  max-width: 30% !important;
  border-radius: 2% !important;
  padding: 1%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #dfdfdf !important;
}
.a2{
  background-color: #1e2738;
}
.a3{
  width: 100% !important;
}
</style>
