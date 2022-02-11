<template>
<div class="load-info-container">
  <div class="dino-preloader">
  </div>
  <span class="load-info-text">загрузка...</span>
</div>
</template>
<style>
.load-info-container {
  display: flex;
  align-self: center;
  align-items: center;
}
.dino-preloader {
  background: url('~@/assets/preloader-sprite.svg') no-repeat;
  background-size: cover;
  height: 40px;
  width: 50px;
  animation: splashit 1s steps(2) infinite;
}

.load-info-text {
  font-family: "PressStart";
  font-size: 16px;
  margin: 20px;
  text-transform: uppercase;
}

@keyframes splashit {
  100% { background-position: 0 -78px; }
}
</style>
<script>
export default {
};
</script>
