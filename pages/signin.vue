<template>
  <div>
    <h1>Login</h1>
    <br />
    <div>
      <v-text-field
        v-model="phoneNumber"
        label="Phone Number"
        id="phonenumber"
        maxlength="13"
        placeholder="+919876543210"
        required
        outlined
      ></v-text-field>
      <div
        id="recaptcha-container"
        style="background-color: #1b1a1a; width: 300px; margin: auto"
      ></div>
      <v-btn id="log-in" @click="submit">Send OTP</v-btn>
      <div>
        (This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.)
      </div>
    </div>
    <br />
    <v-divider></v-divider>
    <br />
    <div>
      <!-- use inner html for this -->
      Please enter the verification code sent to {{ phoneNumber }}:
      <v-otp-input v-model="OTP" required length="6" type="number"></v-otp-input>
      <v-btn @click="verifyCode" id="otp-btn"> Confirm OTP </v-btn>
    </div>
  </div>
</template>

<script>
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from "../plugins/firebase";
import loginServices from "../services/loginServices";

export default {
  name: "login",
  data() {
    return {
      testNumber: "+19999999999",
      phoneNumber: "9999999999",
      confirmationResult: null,
      testOTP: "000000",
      OTP: "000000",
      recaptchaVerifier: null,
      recaptchaWidgetId: null,
      confirmResult: null,
      smsSent: false,
    };
  },
  async mounted() {
    this.recaptchaVerifier = new RecaptchaVerifier(
      "log-in",
      {
        size: "invisible",
        callback: (response) => {
          alert("reCAPTCHA cleared");
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          this.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
        },
      },
      auth
    );
    //to always view reCaptcha
    // this.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    // await this.recaptchaVerifier.render().then((widgetId) => {
    //   this.recaptchaWidgetId = widgetId;
    // });
  },
  methods: {
    submit() {
      signInWithPhoneNumber(auth, "+1" + this.phoneNumber, this.recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmResult = confirmationResult;
          console.log(this.confirmResult);
          alert("Sms Sent!");
          this.smsSent = true;
        })
        .catch((error) => {
          console.log("Sms not sent", error.message);
        });
    },
    verifyCode() {
      this.confirmResult
        .confirm(this.OTP)
        .then(async (result) => {
          alert("Registeration Successfull!", result);
          let response = await loginServices.signup("");
          this.redirectFunction();
          var user = result.user;
          console.log(user);
        })
        .catch((error) => {
          alert("Invalid OTP");
          console.error(error);
        });
    },
    redirectFunction() {
      alert("You will be redirected");
      // this.$router.replace({ name: 'home' })
    },
  },
};
</script>
