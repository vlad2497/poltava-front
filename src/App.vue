<template>
  <v-app>
    <div class="app__wrapper">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.app__wrapper {
  padding: 20px;
}
</style>
