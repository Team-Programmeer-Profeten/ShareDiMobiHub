import { defineStore } from 'pinia'
const jsonData = await import('@/assets/wijk.json')
const gemeentesJson = await import('@/assets/gemeentes.json')

export const useGeoStore = defineStore('geo', {
  state: () => ({
    data: jsonData.default,
    gemeentes: gemeentesJson.default
  }),
  actions: {
    getMatchingData(searchString: string) {
      return this.data.features.filter(
        (item) => item.GM_NAAM.toLowerCase() == searchString.toLowerCase()
      )
    },
    getAllGemeentes() {
      return this.gemeentes
    }
  }
})
