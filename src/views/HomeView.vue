<script setup>
import LineStripe from '@/components/LineStripe.vue'
import { useGeoStore } from '@/stores/geoStore'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const geoStore = useGeoStore()
const gemeentes = ref([])

onMounted(() => {
  if (!authStore.loggedIn) {
    router.push('/login')
  } else {
    const user = authStore.getUser
    gemeentes.value = [user.gemeente]
    let wijkData = geoStore.getMatchingData(user.gemeente)
    selectedWijken.value = wijkData
  }
})

let handleSelect = (event) => {
  let gemeenteNaam = event.target.value
  let wijkData = geoStore.getMatchingData(gemeenteNaam)
  selectedWijken.value = wijkData
}

const selectedWijken = ref([])

let start = new Date()
let startDate = start.toISOString().substr(0, 10)
start.setDate(new Date(startDate).getDate() - 30)
startDate = start.toISOString().substr(0, 10)

let dayBefore = new Date()
dayBefore.setDate(dayBefore.getDate() - 1)
let maxDate = dayBefore.toISOString().substr(0, 10)

const handleForm = async (event) => {
  showSpinner.value = true
  errorText.value = ''
  console.log('Handle Form')

  const form = event.target
  const formData = new FormData(form)
  let data = Object.fromEntries(formData)

  let parentElement = document.querySelector('#vergelijkingen')
  let inputElements = parentElement.querySelectorAll('input')

  let compareDetails = {}

  inputElements.forEach((input) => {
    compareDetails[input.name] = input.checked
  })

  const timeFormat = document.querySelector('fieldset:last-of-type input[type="radio"]:checked').id

  let data_options = {
    municipality: data.gemeente,
    areas: [],
    details: compareDetails,
    timeslot: {
      start_date: data['start-date'],
      end_date: data['end-date']
    },
    time_format: timeFormat
  }

  let wijken = document.querySelectorAll('#wijken input[type="checkbox"]:checked')
  wijken.forEach((wijk) => {
    data_options.areas.push(wijk.id)
  })
  console.log(data_options)

  // Call API to generate report
  fetch('http://127.0.0.1:8080/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authStore.getToken
    },
    body: JSON.stringify(data_options)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.blob()
    })
    .then((blob) => {
      let objectURL = window.URL.createObjectURL(blob)
      let link = document.createElement('a')
      link.href = objectURL
      link.download = `${data_options['municipality']}-report.pdf`
      link.click()
      showSpinner.value = false
    })
    .catch((error) => {
      console.error('Error:', error)
      errorText.value = 'Er is een fout opgetreden bij het genereren van het rapport.'
      showSpinner.value = false
    })
}

window.onload = function () {
  let date = new Date()
  let dateString = date.toISOString().substring(0, 10)
  document.getElementById('end-date').value = dateString

  date.setDate(date.getDate() - 30)
  dateString = date.toISOString().substring(0, 10)

  document.getElementById('start-date').value = dateString
}

const showSpinner = ref(false)
const errorText = ref('')
</script>

<template>
  <div class="my-16 mx-24">
    <h1 class="text-4xl font-semibold">Rapport genereren</h1>
    <p class="my-3 text-gray-500">Selecteer de opties die u wilt gebruiken</p>
    <LineStripe />
    <div class="">
      <form @submit.prevent="handleForm">
        <div class="space-y-12">
          <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-gray-900">Locaties & Periode</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Geef de gewenste locaties en de start- en einddatum op van de periode voor het
                genereren van het rapport.
              </p>
            </div>

            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div class="sm:col-span-4">
                <label for="gemeente" class="block text-sm font-medium leading-6 text-gray-900"
                  >Gemeente</label
                >
                <div class="mt-2">
                  <select
                    @change="handleSelect"
                    id="gemeente"
                    name="gemeente"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option v-for="(gemeente, index) in gemeentes.sort()" :key="index">
                      {{ gemeente }}
                    </option>
                  </select>
                </div>
              </div>

              <div
                class="sm:col-span-6 h-60 overflow-scroll overflow-x-hidden grid gap-1 px-2 pt-1"
              >
                <label for="wijken" class="block text-sm font-medium leading-6 text-gray-900"
                  >Wijken</label
                >
                <div
                  id="wijken"
                  v-for="(wijk, index) in selectedWijken.sort((a, b) =>
                    a.WK_NAAM.localeCompare(b.WK_NAAM)
                  )"
                  :key="index"
                >
                  <input type="checkbox" :name="wijk.WK_CODE" :id="wijk.WK_CODE" checked />
                  <label :for="wijk.WK_CODE" class="ml-2">{{ wijk.WK_NAAM }}</label>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="start-date" class="block text-sm font-medium leading-6 text-gray-900"
                  >Startdatum</label
                >
                <div class="mt-2">
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    v-model="startDate"
                    :max="maxDate"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="end-date" class="block text-sm font-medium leading-6 text-gray-900"
                  >Einddatum</label
                >
                <div class="mt-2">
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    v-model="maxDate"
                    :max="maxDate"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-gray-900">Rapportdetails</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Vink de gewenste details aan om in uw rapport op te nemen.
              </p>
            </div>

            <div class="max-w-2xl space-y-10 md:col-span-2">
              <fieldset id="vergelijkingen">
                <legend class="text-sm font-semibold leading-6 text-gray-900">Onderwerpen</legend>

                <div class="mt-6 space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="amount_vehicles"
                        name="amount_vehicles"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked
                      />
                    </div>

                    <div class="text-sm leading-6">
                      <label for="amount_vehicles" class="font-medium text-gray-900"
                        >Hoeveelheid voertuigen</label
                      >
                      <p class="text-gray-500">
                        Hoeveel voertuigen zijn er in de geselecteerde periode beschikbaar geweest.
                      </p>
                    </div>
                  </div>

                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="distance_travelled"
                        name="distance_travelled"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked
                      />
                    </div>

                    <div class="text-sm leading-6">
                      <label for="distance_travelled" class="font-medium text-gray-900"
                        >Afstand afgelegd</label
                      >
                      <p class="text-gray-500">
                        Hoeveel kilometer is er in de geselecteerde periode afgelegd per voertuig.
                      </p>
                    </div>
                  </div>

                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="rentals"
                        name="rentals"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked
                      />
                    </div>

                    <div class="text-sm leading-6">
                      <label for="rentals" class="font-medium text-gray-900">Verhuringen</label>
                      <p class="text-gray-500">
                        Hoeveel verhuringen zijn er in de geselecteerde periode geweest.
                      </p>
                    </div>
                  </div>

                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="zone_occupation"
                        name="zone_occupation"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked
                      />
                    </div>

                    <div class="text-sm leading-6">
                      <label for="zone_occupation" class="font-medium text-gray-900"
                        >Zone bezetting</label
                      >
                      <p class="text-gray-500">
                        Hoeveel zones zijn er in de geselecteerde periode bezet geweest.
                      </p>
                    </div>
                  </div>

                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="hubs"
                        name="hubs"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked
                      />
                    </div>

                    <div class="text-sm leading-6">
                      <label for="hubs" class="font-medium text-gray-900">Hubs</label>
                      <p class="text-gray-500">
                        Hoeveel hubs zijn er in de geselecteerde periode gebruikt.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend id="time_format" class="text-sm font-semibold leading-6 text-gray-900">
                  Tijd formaat
                </legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Geef het gewenste tijdformaat op voor het rapport.
                </p>
                <div class="mt-6 space-y-6">
                  <div class="flex items-center gap-x-3">
                    <input
                      id="hourly"
                      name="time_format"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      required
                    />
                    <label for="hourly" class="block text-sm font-medium leading-6 text-gray-900"
                      >Hourly</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      id="daily"
                      name="time_format"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label for="daily" class="block text-sm font-medium leading-6 text-gray-900"
                      >Daily</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      id="weekly"
                      name="time_format"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label for="weekly" class="block text-sm font-medium leading-6 text-gray-900"
                      >Weekly</label
                    >
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      id="monthly"
                      name="time_format"
                      type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label for="monthly" class="block text-sm font-medium leading-6 text-gray-900"
                      >Monthly</label
                    >
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <p class="text-red-500">{{ errorText }}</p>
          <button
            type="submit"
            class="rounded-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            v-if="!showSpinner"
          >
            Rapport genereren
          </button>
          <div
            v-if="showSpinner"
            class="flex flex-col items-end gap-2 text-indigo-500 font-semibold"
          >
            <p>
              De PDF wordt gegenereerd en kan ongeveer 20 seconden duren. De download start
              automatisch.
            </p>
            <div
              class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-indigo-600"
              role="status"
            >
              <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
