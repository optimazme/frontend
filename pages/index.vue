<template>
  <div class="home">
    <NavBar />
    <div class="body-container">
      <p class="text-white text-2xl px-2">Website is under construction. 🏗️</p>
      <h1 class="text-9xl font-bold text-white">Coming <span class="text-gray-700">Soon</span>...</h1>
      <div class="launching-timer flex px-2 py-5 text-white">
       <div class="basis-24">
         <p class="text-5xl" id="days">00</p>
         <span>Days</span>
       </div>
       <div class="basis-24">
         <p class="text-5xl" id="hours">00</p>
         <span>Hours</span>
       </div>
       <div class="basis-24">
         <p class="text-5xl" id="minutes">00</p>
         <span>Minutes</span>
       </div>
       <div class="basis-24">
         <p class="text-5xl" id="seconds">00</p>
         <span>Seconds</span>
       </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
var countdownEndDate = new Date("Dec 4, 2022 00:00:00").getTime();
var x = setInterval(function(){
  var now = new Date().getTime();
  var difference = countdownEndDate - now;
  var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
},1000);

export default {
name: 'IndexPage',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
.logo {
  font-family: 'Poppins', sans-serif;
}
.home {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/images/pexels-billel-moula-540518.jpg);
  background-position: center;
  background-size: cover;
}
.body-container {
  top: 30%;
  position: absolute;
  transform: translateX(20%);
}

.body-container:before {
  background-color: rgba(255, 255, 255, .15);  
  backdrop-filter: blur(5px);
}
</style>
