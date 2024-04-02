<script setup>
import LineStripe from '@/components/LineStripe.vue'
import { useGeoStore } from '@/stores/geoStore'
import { ref } from 'vue'

const geoStore = useGeoStore()
const gemeentes = ref(geoStore.getAllGemeentes())

let handleSelect = (event) => {
  let gemeenteNaam = event.target.value
  let wijkData = geoStore.getMatchingData(gemeenteNaam)
  selectedWijken.value = wijkData
}

const selectedWijken = ref([])

const handleForm = async (event) => {
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
}

window.onload = function () {
  let date = new Date()
  let dateString = date.toISOString().substring(0, 10)
  document.getElementById('end-date').value = dateString

  date.setDate(date.getDate() - 30)
  dateString = date.toISOString().substring(0, 10)

  document.getElementById('start-date').value = dateString
}
</script>

<template>
  <div class="my-16 mx-24">
    <h1 class="text-4xl font-semibold">Raport genereren</h1>
    <p class="my-3 text-gray-500">Lorem ipsum dolor sit amet, consecteur</p>
    <LineStripe />
    <div class="">
      <form @submit.prevent="handleForm">
        <div class="space-y-12">
          <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-gray-900">Locatie & Datum</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Geef de gewenste locatie, start en einddatum op voor het genereren van het rapport.
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
                    <option v-for="(gemeente, index) in gemeentes" :key="index">
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
                <div id="wijken" v-for="(wijk, index) in selectedWijken" :key="index">
                  <input type="checkbox" :name="wijk.WK_CODE" :id="wijk.WK_CODE" />
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
                Vink de gewenste details aan voor vergelijkingen op het rapport.
              </p>
            </div>

            <div class="max-w-2xl space-y-10 md:col-span-2">
              <fieldset id="vergelijkingen">
                <legend class="text-sm font-semibold leading-6 text-gray-900">
                  Vergelijkingen
                </legend>
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
                        Vergelijk het aantal aanwezige / gebruikte voertuigen in de geselecteerde
                        periode.
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
                        Vergelijk de afstand afgelegd per voertuig in de geselecteerd periode.
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
                      <label for="rentals" class="font-medium text-gray-900">Rentals</label>
                      <p class="text-gray-500">bla bla bla bla</p>
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
                        >Occupation</label
                      >
                      <p class="text-gray-500">Vergelijk ???</p>
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
          <button type="button" class="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Rapport genereren
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
