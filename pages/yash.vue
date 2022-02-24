// @TODO COUNTRY SELECT PREFIX IN MOBILE NUMBER
<template>
  <div id="signup-page-wrapper" class="dark-background-color" style="height: 100vh">
    <v-row id="animated">
      <v-col class="dark-background-color">
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
              <h4>
                <span class="extra-light"> Enter the Verification Code sent to</span>
                <span class="dark-color"> {{ display_number }} </span>
              </h4>
              <v-otp-input
                v-model="OTP"
                required
                length="6"
                color="#1e2738da"
                type="number"
              ></v-otp-input>
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
              apply)
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
    OTP: null,
    sending_otp: false,
    drawer: false,
    phoneNumber: "",
    display_number: "",
    otp_button_text: "Send OTP",
    styleObject: null,
  }),
  async mounted() {},
  methods: {
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
#signup-page-wrapper {
  background-image: linear-gradient(#1e2738da, #1e2738da),
    url("../assets/signup-wallpaper.jpg") !important;
}

.v-text-field {
  border-radius: 10px;
}
.v-divider {
  background-color: rgb(30, 39, 56);
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
  text-align: justify;
}
.captcha-text .captcha-link {
  color: black;
}
#animated {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
