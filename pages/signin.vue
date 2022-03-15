<template>
  <!--
// @TODO recaptcha div size not responsive
// @TODO use v-window
// @TODO Add Validation (email id)
// @TODO Pressing enter key should send OTP, user form
// @TODO Make this page responsive
// @TODO Check Session expiry and make it infinity
 -->
  <div id="signup-page-wrapper">
    <div id="animated">
      <v-col class="wrapper" cols="12" sm="12">
        <v-card class="card">
          <v-card-title class="lightblue">
            <h1 v-if="!otp_confirmed">Sign In</h1>
            <h1 v-else>Contact Details</h1>
          </v-card-title>

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

              <div id="recaptcha-container"></div>

              <v-btn
                :loading="send_button_loading"
                :disabled="send_button_disabled"
                class="btn"
                id="log-in"
                @click="submit"
              >
                <span id="send-otp-button"> Send OTP</span>
              </v-btn>
            </v-col>

            <v-expand-transition>
              <v-col v-if="show_otp_div">
                <h3>
                  <span class="extra-lightblue"> Enter the OTP sent to</span>
                  <span class="dark-blue"> {{ display_number }} </span>
                </h3>
                <v-otp-input
                  v-model="OTP"
                  required
                  length="6"
                  color="#1e2738da"
                  type="number"
                ></v-otp-input>
                <v-btn
                  class="btn"
                  :loading="confirming_otp"
                  id="otp-btn"
                  @click="verifyCode"
                >
                  Confirm OTP
                </v-btn>
              </v-col>
            </v-expand-transition>

            <v-col>
              <v-divider></v-divider>
              <div class="captcha-text">
                This site is protected by reCAPTCHA and the Google
                <a
                  class="captcha-link"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  >Privacy Policy</a
                >
                and
                <a
                  class="captcha-link"
                  href="https://policies.google.com/terms"
                  target="_blank"
                  >Terms of Service</a
                >
                apply.
              </div>
            </v-col>
          </div>

          <div v-else>
            <v-col cols="12" sm="12">
              <v-text-field
                label="Name"
                v-model="name"
                placeholder="Firstname Lastname"
                outlined
                color="#1e2738da"
                class="input-field"
                clearable
                required
              >
              </v-text-field>

              <v-text-field
                label="Alternate Mobile Number"
                v-model="alternate_phoneNumber"
                placeholder="9999999999"
                outlined
                color="#1e2738da"
                class="input-field"
                clearable
                prefix="+91 "
              >
              </v-text-field>

              <v-text-field
                label="Email ID"
                v-model="email"
                placeholder="help@spacifyme.com"
                outlined
                color="#1e2738da"
                class="input-field"
                clearable
              >
              </v-text-field>

              <v-text-field
                label="Alternate Email ID"
                v-model="alternate_email"
                placeholder="help@spacifyme.com"
                outlined
                color="#1e2738da"
                class="input-field"
                clearable
              >
              </v-text-field>

              <v-btn
                :loading="submitting_details"
                class="btn"
                id="submit-details"
                @click="submit_details"
              >
                Submit Details
              </v-btn>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </div>
    <v-snackbar
      v-model="snackbar.show"
      top
      width="25%"
      :color="snackbar.backgroundColor"
      :timeout="3000"
    >
      <b style="font-size: 1em">{{ snackbar.text }}</b>

      <template v-slot:action="{ attrs }">
        <v-btn
          style="background-color: #1e2738da; color: #dfdfdf"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
          <!-- Cross icon -->
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from "../plugins/firebase";
import loginServices from "../services/loginServices";
export default {
  layout: "none",
  data: () => ({
    phoneNumber: "9999999999",
    confirmationResult: null,
    OTP: "000000",
    recaptchaVerifier: null,
    confirmResult: null,
    show_otp_div: false,
    send_button_loading: false,
    send_button_disabled: false,
    confirming_otp: false,
    display_number: null,
    otp_confirmed: false,
    userID: null,
    alternate_phoneNumber: null,
    name: null,
    email: null,
    alternate_email: null,
    snackbar: {
      text: null,
      show: null,
      backgroundColor: "#dfdfdf",
    },
    submitting_details: false,
  }),
  async mounted() {
    this.createInvisibleCaptcha();
  },
  methods: {
    async submit() {
      this.send_button_loading = true;
      await signInWithPhoneNumber(auth, "+91" + this.phoneNumber, this.recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmResult = confirmationResult;
          if (!this.send_button_disabled) {
            this.changeSendOTPbuttonText("Send OTP Again");
            this.changeSendOTPbuttonColors("green", "white");
          } else {
            this.changeSendOTPbuttonText("Solve reCAPTCHA");
            this.changeSendOTPbuttonColors("#1e2738b9", "white");
          }
          this.display_number = this.phoneNumber;
          this.show_otp_div = true;
          this.send_button_loading = false;
          this.showSnackbar("OTP has been sent to " + this.phoneNumber, "success");
        })
        .catch((error) => {
          this.send_button_loading = false;
          this.showSnackbar("Failed to send OTP! Please check the number!!", "error");
          console.error(error);
        });
    },
    verifyCode() {
      this.confirming_otp = true;
      this.confirmResult
        .confirm(this.OTP)
        .then(async (result) => {
          this.otp_confirmed = true;
          this.confirming_otp = false;
          this.userID = result.user.uid;
          localStorage.setItem("user_id", this.userID);
          this.showSnackbar("User verified successfully!", "success");
          await loginServices.updateUser(result.user.uid, {
            mobile_number: "+91" + this.phoneNumber,
          });
        })
        .catch((error) => {
          this.showSnackbar("Invalid OTP", "error");
          this.confirming_otp = false;
        });
    },
    async submit_details() {
      this.submitting_details = true;
      try {
        await loginServices.updateUser(this.userID, {
          user_name: this.name,
          alternate_mobile_number: this.alternate_phoneNumber,
          user_email: this.email,
          user_alternate_email: this.alternate_email,
        });
        // localStorage.setItem("user_name", this.name);
        this.showSnackbar("Contact Details saved successfully!", "success");
        this.submitting_details = false;
        this.redirectFunction();
      } catch (error) {
        this.showSnackbar("Error occured while saving contact details!", "error");
        this.submitting_details = false;
      }
    },
    redirectFunction() {
      this.$router.replace({ name: "home" });
    },

    async createInvisibleCaptcha() {
      this.recaptchaVerifier = new RecaptchaVerifier(
        "log-in",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved - will proceed with submit function
            this.send_button_loading = false;
          },
          "error-callback": (e) => {
            // reCAPTCHA error
            this.showSnackbar(
              "OTP not sent!! Please solve the reCAPTCHA before sending OTP again!",
              "error"
            );
            this.createVisibleCaptcha();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            this.showSnackbar(
              "reCAPTCHA expired!! Please solve the reCAPTCHA before sending OTP again!",
              "error"
            );
            this.createVisibleCaptcha();
          },
        },
        auth
      );
    },
    async createVisibleCaptcha() {
      this.send_button_loading = false;
      if (!this.send_button_disabled) {
        this.send_button_disabled = true;
        this.changeSendOTPbuttonText("Solve reCAPTCHA");
        this.changeSendOTPbuttonColors("#1e273864", "white");
      }
      this.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          callback: (response) => {
            this.send_button_disabled = false;
            this.changeSendOTPbuttonText("Send OTP");
            this.changeSendOTPbuttonColors("#1e2738da", "white");
          },
        },
        auth
      );
      this.recaptchaVerifier.render();
    },
    changeSendOTPbuttonText(text) {
      document.getElementById("send-otp-button").innerHTML = text;
    },
    changeSendOTPbuttonColors(backgroundColor, color) {
      document.getElementById("log-in").style =
        "background-color: " +
        backgroundColor +
        "!important; color:" +
        color +
        "!important;";
    },
    showSnackbar(text, backgroundColor) {
      this.snackbar.show = true;
      this.snackbar.text = text;
      this.snackbar.backgroundColor = backgroundColor;
    },
  },
};
</script>

<style>
#signup-page-wrapper {
  background-image: linear-gradient(#1e2738da, #1e2738b8),
    url("../assets/signup-wallpaper.jpg") !important;
  background-size: cover;
  height: 100vh;
}
#recaptcha-container {
  padding-bottom: 1%;
}
.input-field {
  border-radius: 10px;
}
.v-divider {
  background-color: rgb(30, 39, 56);
}
.input-field .v-input__slot {
  background-color: white !important;
}
.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}
.card {
  background-image: url("../assets/signup-card-bg.jpg");
  min-width: 25% !important;
  max-width: 25% !important;
  border-radius: 2% !important;
  padding: 1%;
}
.btn {
  width: 100% !important;
  height: 50px !important;
  border-radius: 10px;
  background-color: #1e2738da !important;
  color: white !important;
  transition: background-color 0.75s;
}

.dark-blue {
  color: #1e2738;
}
.lightblue {
  color: #1e2738da;
}
.extra-lightblue {
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
