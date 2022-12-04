<template>
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 glass">
        <div class="container px-4 mx-auto flex flex-wrap xl:justify-between justify-center">
          <div class="relative flex justify-between flex-cols w-auto px-4">
            <img class="w-20 p-4" src="/optimaz.png" alt="logo" />
            <NuxtLink class="logo text-3xl font-bold inline-block mr-4 py-5 uppercase text-white" to="/">          
              <p>Optimaz.me</p>
            </NuxtLink>
          </div>
          <div class="hidden xl:flex">
            <div class="flex flex-grow items-center">
              <ul class="flex flex-row list-none ml-auto">
                <li class="nav-item">
                  <a class="px-1 py-2 flex items-center uppercase font-bold text-white hover:opacity-25" href="https://twitter.com/optimazme">
                    <i class="fab fa-twitter text-lg text-white opacity-75" />
                    <span class="ml-2">
                      <svg class="w-6 h-6 text-white hover:text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="32"
                        height="32"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      ><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor" /></svg>
                    </span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="px-1 py-2 flex items-center uppercase font-bold text-white hover:opacity-25" href="https://github.com/optimazme">
                    <i class="fab fa-pinterest text-lg text-white opacity-75" />
                    <span class="ml-2">
                      <svg
                        class="w-6 h-6 text-white hover:text-white/90"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="32"
                        height="32"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      ><path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247z" fill="currentColor" /></svg>
                    </span>
                  </a>
                </li>
                <li class="nav-item">
                  <NuxtLink to="/team" class="px-1 py-2 flex items-center uppercase font-bold text-white hover:opacity-25">
                    <span class="ml-2">
                      <svg 
                        class="w-6 h-6 text-white hover:text-white/90" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        aria-hidden="true"
                        role="img"
                        width="32"
                        height="32"
                        fill="currentColor"
                      ><path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" /></svg>
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    data() {
      return {
        showMenu: false
      }
    },
    methods: {
      toggleNavbar (){
        this.showMenu = !this.showMenu;
      }
    }
  }
  </script>