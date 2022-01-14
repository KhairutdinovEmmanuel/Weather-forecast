<template>
  <main class="main-layout">
    <app-header class="main-layout-header" />
    <div class="main-layout-content">
      <slot />
    </div>
    <app-footer class="main-layout-footer" />
  </main>
</template>

<script>
import Header from "../Header.vue";
import Footer from "../Footer.vue";

export default {
  name: "main-layout",
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.main-layout-header {
  width: 100%;
}

.main-layout-content {
  width: 100%;
  margin: 20px 10px;
}

.main-layout-footer {
  width: 100%;
}
</style>
