// @TODO COUNTRY SELECT PREFIX IN MOBILE NUMBER
<template>
  <div class="dark-background-color" style="height: 100vh">
    <v-row justify="">
      <!-- <v-col cols="4"></v-col> -->
      <v-col class="dark-background-color" cols="12">
        <v-card class="a1">
          <v-card-title><h1 class="light-color">Sign Up</h1></v-card-title>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Mobile Number"
              v-model="phoneNumber"
              placeholder="Ex. +91 99999 99999"
              outlined
              :hint="true ? 'Please enter a 10 digit number' : null"
              color="#1e2738da"
              class="input-field"
            >
            </v-text-field>
            <v-btn
              :loading="sending_otp"
              class="a3"
              id="log-in"
              @click="submit"
              v-bind:style="styleObject ? styleObject : null"
              >{{ otp_button_text }}</v-btn
            >
          </v-col>

          <v-expand-transition>
            <v-col v-if="show_otp_div">
              <h5>
                <span class="extra-light"> Enter the Verification Code sent to</span>
                <span class="dark-color"> {{ display_number }} </span>
              </h5>
              <v-otp-input v-model="OTP" required length="6" type="number"></v-otp-input>
              <v-btn class="a3" @click="verifyCode" id="otp-btn"> Confirm OTP </v-btn>
            </v-col>
          </v-expand-transition>
          <v-col>
            <v-divider></v-divider>
            <div class="captcha-text">
              (This site is protected by reCAPTCHA and the Google
              <a class="captcha-link" href="https://policies.google.com/privacy"
                >Privacy Policy</a
              >
              and
              <a class="captcha-link" href="https://policies.google.com/terms"
                >Terms of Service</a
              >
              apply.)
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    show_otp_div: false,
    sending_otp: false,
    drawer: false,
    phoneNumber: "",
    display_number: "",
    otp_button_text: "Send OTP",
    styleObject: null,
  }),
  async mounted() {
    console.log("imakhva");
    this.yash();
  },
  methods: {
    yash() {
      console.log("jbakjsvkasvk");
    },
    async submit() {
      this.display_number = this.phoneNumber;
      this.sending_otp = true; //temp
      setTimeout(() => {
        this.show_otp_div = true;
        this.sending_otp = false; //temp
        this.styleObject = {
          "background-color": "green !important",
        };
        this.otp_button_text = "OTP Sent";
      }, 3000);
    },
  },
};
</script>

<style>
.v-text-field {
  border-radius: 10px;
}
.v-divider {
  background-color: #1e2738;
}
.v-text-field .v-input__slot {
  background-color: white !important;
}
.a1 {
  background-image: url("../assets/signup-card-bg.jpg");
  max-width: 25% !important;
  border-radius: 2% !important;
  padding: 1%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #dfdfdf !important;
}
.dark-background-color {
  background-color: #1e2738;
}
.a3 {
  width: 100% !important;
  border-radius: 10px;
  background-color: #1e2738da !important;
  color: white !important;
}
.dark-color {
  color: #1e2738;
}
.light-color {
  color: #1e2738da;
}
.extra-light {
  color: #1e2738b9;
}
.captcha-text {
  margin-top: 5px;
  font-size: 0.84em;
  color: #1e2738b9;
}
.captcha-text .captcha-link {
  color: black;
}
</style>
