// @TODO COUNTRY SELECT PREFIX IN MOBILE NUMBER
<template>
  <div id="signup-page-wrapper" class="dark-background-color" style="height: 100vh">
    <v-row id="animated">
      <v-col class="dark-background-color">
        <v-card class="a1">
          <v-card-title>
            <h1 v-if="!otp_confirmed" class="light-color">Sign Up</h1>
            <h1 v-else class="light-color">Enter Details</h1>
          </v-card-title>
          <!-- <transition :duration="1000" name="fade"> -->
          <div v-if="!otp_confirmed">
            <v-col cols="12" sm="12">
              <v-text-field
                label="Mobile Number"
                v-model="phoneNumber"
                placeholder="9999999999"
                outlined
                :hint="true ? 'Please enter a 10 digit number' : null"
                color="#1e2738da"
                class="input-field"
                clearable
                prefix="+91 "
              >
              </v-text-field>

              <v-btn
                :loading="sending_otp"
                class="a3"
                id="log-in"
                @click="submit"
                v-bind:style="styleObject ? styleObject : null"
              >
                <span id="send-otp-button"> Send OTP</span>
              </v-btn>
            </v-col>

            <v-expand-transition>
              <v-col v-if="show_otp_div">
                <h3>
                  <span class="extra-light"> Enter the OTP sent to</span>
                  <span class="dark-color"> {{ display_number }} </span>
                </h3>
                <v-otp-input
                  v-model="OTP"
                  required
                  length="6"
                  color="#1e2738da"
                  type="number"
                ></v-otp-input>
                <v-btn class="a3" @click="confirmOTP" id="otp-btn"> Confirm OTP </v-btn>
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
          </div>
          <div v-else>
            <v-col cols="12" sm="12">
              <v-text-field
                label="Mobile Number"
                v-model="phoneNumber"
                placeholder="9999999999"
                outlined
                :hint="true ? 'Please enter a 10 digit number' : null"
                color="#1e2738da"
                class="input-field"
                clearable
              >
              </v-text-field>

              <v-btn class="a3" id="submit-details" @click="submit_details">
                <span id="send-otp-button"> Submit Details</span>
              </v-btn>
            </v-col>
          </div>
          <!-- </transition> -->
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
    styleObject: null,
    otp_confirmed: false,
  }),
  async mounted() {},
  methods: {
    // async submit() {
    //   signInWithPhoneNumber(auth, this.phoneNumber, this.recaptchaVerifier)
    //     .then((confirmationResult) => {
    //       this.confirmResult = confirmationResult;
    //       console.log(this.confirmResult);
    //       alert("Sms Sent!");
    //       this.smsSent = true;
    //     })
    //     .catch((error) => {
    //       console.log("Sms not sent", error.message);
    //     });
    // },


    async submit() {
      this.display_number = this.phoneNumber;
      this.sending_otp = true; //temp

      this.show_otp_div = true;
      this.sending_otp = false; //temp
      this.otp_confirmed = false;
      this.styleObject = {
        "background-color": "green !important",
      };
      document.getElementById("send-otp-button").innerHTML = "OTP Sent";
      // setTimeout(() => {
      // }, 1000);
    },
    async confirmOTP() {
      this.otp_confirmed = true;

      // setTimeout(() => {
      //   document.getElementById("send-otp-button").innerHTML = "OTP Sent";
      // }, 3000);
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

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all 1s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(1000px);
  opacity: 0;
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
