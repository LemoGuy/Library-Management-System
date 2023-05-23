<script setup>

import { useQuasar } from 'quasar'
import { token, setToken } from '../services/token'
import { ref } from 'vue'
import backend from '../services/backend'
import { useRouter } from 'vue-router'


const $q = useQuasar()

const router = useRouter()
if (token.value) {
  router.push({ path: '/dashboard' })
}

let credentials = ref({})

let rememberMe = ref(false)

async function submit() {
  let res
  try {
    res = await backend.post('/login', credentials.value)
    setToken(res.data.token)
    router.push('/dashboard')

  } catch (e) {
    $q.notify('Incorrect Username or Password!')
  }


}

function handleLoginEntry(e) {
  if (e.key == "Enter") {
    submit();
  }
}

</script>

<template>
  <div class="login-form" v-on:keydown="handleLoginEntry">
    <q-card class="input-container">
      <img class='login-image' src="/images/logo.png" alt="no pic">
      <q-input class='username' label="Username" v-model="credentials.username" />
      <q-input type="password" class='password' label="Password" v-model="credentials.password" />


      <div class="login-container">
        <router-link class="shad" to="/forget_password">Help!</router-link>
        <!-- <q-checkbox label="Remember me" v-model="rememberMe" /> -->
        <q-btn class="login-btn button button--moema button--inverted button--text-thick button--size-s" @click="submit()">Login</q-btn>

      </div>
    
    </q-card>

  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  background-color: #bbdef2;
  padding-bottom: 41.5px;
}
.shad{
  color: #58a2cd;
  margin-top: 0px;
  padding-top: 0px;
  display: inline-block;
}

.input-container {
  gap: 20px;
  padding: 25px;
  flex-direction: column;
  display: flex;
  width: 400px;
  margin: auto;
  margin-top: 25px;
  box-shadow: 10px 18px 50px 6px #414141 ;
}

.login-btn {
  width: 75px;
  margin-left: auto;
  display: inline-block;
}

.login-image {
  width: 300px;
  margin-inline: auto;
}

.login-container {
  display: flex;

}
.button--moema {
	padding: 0.5em 1em;
	border-radius: 50px;
	background: #7986cb;
	color: #fff;
	-webkit-transition: background-color 0.3s, color 0.3s;
	transition: background-color 0.3s, color 0.3s;
}
.button--moema.button--inverted {
	background: #ECEFF1;
	color: #37474f;
}
.button--moema::before {
	content: '';
	position: absolute;
	top: -10px;
	left: -10px;
	bottom: -10px;
	right: -10px;
	background: inherit;
	border-radius: 50px;
	z-index: -1;
	opacity: 0.4;
	-webkit-transform: scale3d(0.8, 0.5, 1);
	transform: scale3d(0.8, 0.5, 1);
}
.button--moema:hover {
	-webkit-transition: background-color 0.1s 0.3s, color 0.1s 0.3s;
	transition: background-color 0.1s 0.3s, color 0.1s 0.3s;
	color: #ECEFF1;
	background-color: #a4cfe8;
	-webkit-animation: anim-moema-1 0.3s forwards;
	animation: anim-moema-1 0.3s forwards;
}
.button--moema.button--inverted:hover {
	color: #ECEFF1;
	background-color: #76bbe3;
}
.button--moema:hover::before {
	-webkit-animation: anim-moema-2 0.3s 0.3s forwards;
	animation: anim-moema-2 0.3s 0.3s forwards;
}
@-webkit-keyframes anim-moema-1 {
	60% {
		-webkit-transform: scale3d(0.8, 0.8, 1);
		transform: scale3d(0.8, 0.8, 1);
	}
	85% {
		-webkit-transform: scale3d(1.1, 1.1, 1);
		transform: scale3d(1.1, 1.1, 1);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}
@keyframes anim-moema-1 {
	60% {
		-webkit-transform: scale3d(0.8, 0.8, 1);
		transform: scale3d(0.8, 0.8, 1);
	}
	85% {
		-webkit-transform: scale3d(1.1, 1.1, 1);
		transform: scale3d(1.1, 1.1, 1);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}
@-webkit-keyframes anim-moema-2 {
	to {
		opacity: 0;
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}
@keyframes anim-moema-2 {
	to {
		opacity: 0;
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}



</style>