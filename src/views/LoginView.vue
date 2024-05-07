<template>
  <div>
    <navbar-component></navbar-component>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-gray-900"
          style="background-size: 100%; background-repeat: no-repeat"
          :style="{
            'background-image': '../assets/img/register_bg_2.png'
          }"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
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
                    <!-- <div>
                      <label class="inline-flex items-center cursor-pointer"
                        ><input
                          name="rememberMe"
                          id="customCheckLogin"
                          type="checkbox"
                          class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style="transition: all 0.15s ease 0s"
                        /><span class="ml-2 text-sm font-semibold text-gray-700"
                          >Remember me</span
                        ></label
                      >
                    </div> -->
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex flex-wrap mt-6">
                <div class="w-1/2">
                  <a href="#pablo" class="text-gray-300"><small>Forgot password?</small></a>
                </div>
                <div class="w-1/2 text-right">
                  <a href="#pablo" class="text-gray-300"><small>Create new account</small></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <footer-component></footer-component> -->
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '../components/Navbar.vue'
import FooterComponent from '../components/Footer.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const showErrorText = ref(false)

// Rest of the code...

const testFunc = (event: any) => {
  showErrorText.value = false
  const formData = new FormData(event.target)
  const email = formData.get('email')
  const password = formData.get('password')
  if (email == 'anmar.noah@gmail.com' || 'admin@admin.com' && password == '12345') {
    router.push('/')
  } else {
    showErrorText.value = true
    console.log('Login Failed')
  }
}
</script>
