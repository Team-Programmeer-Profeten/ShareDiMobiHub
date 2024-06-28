<template>
  <div>
    <navbar-component></navbar-component>
    <main class="pt-4 grid grid-cols-1 sm:grid-cols-6 w-full h-screen bg-[#0d0a22]">
      <section class="w-full xl:w-5/6 h-full col-span-3 xl:col-span-4">
        <div class="container mx-auto px-4 xl:px-16 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full px-2">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="flex-auto px-4 lg:px-10 py-10">
                  <form @submit.prevent="testFunc">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        type="email"
                        name="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        required
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        type="password"
                        name="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        required
                        style="transition: all 0.15s ease 0s"
                      />
                      <small v-if="showErrorText" class="text-red-500 mt-2"
                        >Invalid Login Credentials</small
                      >
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        Sign In
                      </button>
                      <GoogleLogin class="w-full" :callback="callback"></GoogleLogin>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex flex-wrap mt-6">
                <div class="w-1/2">
                  <a href="#pablo" class="text-gray-300"><small>Forgot password?</small></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="w-full h-full flex flex-col items-center justify-center col-span-3 xl:col-span-2"
      >
        <div
          class="w-4/5 h-4/5 bg-white shadow-xl rounded-md flex flex-col items-center justify-center"
          style="
            background-image: url('/src/assets/img/PDF.png');
            background-size: cover;
            background-position: top;
            background-repeat: no-repeat;
            background-color: rgba(255, 255, 255, 0.8);
          "
        >
          <p class="bg-[#ece7f9] opacity-75 px-5 py-4 rounded-lg font-bold">Rapport Voorbeeld</p>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '../components/Navbar.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { decodeCredential, GoogleLogin } from 'vue3-google-login'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const showErrorText = ref(false)

const testFunc = async (event: any) => {
  showErrorText.value = false
  const formData = new FormData(event.target)
  const email = (formData.get('email') ?? '').toString()
  const password = (formData.get('password') ?? '').toString()
  const loggedIn = await authStore.login({ email: email, password: password })
  if (loggedIn) {
    router.push('/')
  } else {
    showErrorText.value = true
    console.log('Login Failed')
  }
}

const callback = async (response: any) => {
  console.log('logged in')
  let user = decodeCredential(response.credential)
  showErrorText.value = false
  const password = 'google'
  const loggedIn = await authStore.login({ email: user.email, password: password })
  if (loggedIn) {
    router.push('/')
  } else {
    showErrorText.value = true
    console.log('Login Failed')
  }
}
</script>
