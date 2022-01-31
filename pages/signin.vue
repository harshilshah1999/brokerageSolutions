<template>
  <div>
    <h1>Login</h1>
    <br /><br />
    <form @submit.prevent="submit">
      <div>
        <label
          for="phonenumber"
          style="font:family:system-ui;font-size: x-large;"
          >Phone Number</label
        >
      </div>
      <div>
        <input
          type="tel"
          id="phonenumber"
          maxlength="13"
          required
          v-model="phoneNumber"
          style="
            text-align: center;
            maxwidth: 300px;
            width: 300px;
            height: 40px;
          "
          placeholder="+91 NUMBER"
          title="Enter Phone number with the code"
        />
      </div>
      <br />
      <div
        id="recaptcha-container"
        style="background-color: #1b1a1a; width: 300px; margin: auto"
      ></div>
      <br />
      <div>
        <button class="btn btn-primary" id="log-in" type="submit">Login</button>
      </div>
    </form>
    <br /><br />

    <br /><br />
    <div>
      <div>
        <label style="font:family:system-ui;font-size: x-large;"
          >Enter Otp</label
        >
      </div>
      <br />
      <div>
        <input
          type="text"
          id="otpField"
          style="text-align: center"
          pattern="[0-9]{6}"
          maxlength="6"
          v-model="otpnum"
          placeholder="Enter OTP"
          required
        />
      </div>
      <br />
      <div>
        <button class="btn btn-primary" @click="verifyCode" id="otp-btn">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getAuth, RecaptchaVerifier } from 'firebase/auth'

import {
  auth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from '../plugins/firebase'

export default {
  name: 'login',
  data() {
    return {
      phoneNumber: '+19999999999',
      confirmationResult: null,
      otpnum: '000000',
      recaptchaVerifier: null,
      recaptchaWidgetId: null,
      confirmResult: null,
      smsSent: false,
    }
  },
  mounted() {
    this.recaptchaVerifier = new RecaptchaVerifier(
      'log-in',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit()
        },
      },
      auth
    )
    this.submit()
  },
  methods: {
    submit() {
      this.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {},
        auth
      )
      this.recaptchaVerifier.render().then((widgetId) => {
        this.recaptchaWidgetId = widgetId
      })

      var number = this.phoneNumber
      signInWithPhoneNumber(auth, number, this.recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmResult = confirmationResult
          console.log(this.confirmResult)
          alert('Sms Sent!')
          this.smsSent = true
        })
        .catch((error) => {
          console.log('Sms not sent', error.message)
        })
    },
    verifyCode() {
      this.confirmResult
        .confirm(this.otpnum)
        .then((result) => {
          alert('Registeration Successfull!', result)
          this.gotonext()
          var user = result.user
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    gotonext() {
      this.$router.replace({ name: 'home' })
    },
  },
}
</script>