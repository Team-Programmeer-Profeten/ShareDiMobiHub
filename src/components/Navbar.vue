<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 pt-3 mb-10"
  >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between flex-row">
        <p
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
        >
          ShareDiMoBiHub
        </p>
        <img src="/src/assets/img/CROW_logo.png" class="w-40 h-14" />
        <img src="/src/assets/img/HU_logo.png" class="w-40 h-28 -mt-8" />
        <img src="/src/assets/img/INTERREG_logo.png" class="w-40 h-12" />
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{ hidden: !showMenu, block: showMenu }"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><i class="lg:text-gray-300 text-gray-500 fab fa-facebook text-lg leading-lg"></i
              ><span class="lg:hidden inline-block ml-2">Share</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><i class="lg:text-gray-300 text-gray-500 fab fa-twitter text-lg leading-lg"></i
              ><span class="lg:hidden inline-block ml-2">Tweet</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><i class="lg:text-gray-300 text-gray-500 fab fa-github text-lg leading-lg"></i
              ><span class="lg:hidden inline-block ml-2">Star</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function () {
      x
      this.showMenu = !this.showMenu
    }
  }
}
</script>
