<template>
  <section class="home">
    <FileBar />
    <div class="row-container">
      <Toolbar />
      <Canvas />
    </div>
  </section>
</template>

<script>
import FileBar from "@/components/FileBar.vue";
import Canvas from "@/components/Canvas.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  name: "Home",
  components: {
    FileBar,
    Canvas,
    Toolbar
  }
};
</script>

<style lang="scss" scoped>
section.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

div.row-container {
  display: flex;
  flex-grow: 1;
}
</style>
