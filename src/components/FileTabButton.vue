<template>
  <div
    v-on:click="this.selectFile"
    :class="{
      filetabButton: true,
      active: this.file.index == this.$store.state.currentIndex
    }"
  >
    {{ this.file.name }}
  </div>
</template>

<script>
import File from "@/models/File";
import Vue from "vue";

export default Vue.extend({
  props: {
    file: {
      type: File,
      required: true
    }
  },
  methods: {
    selectFile() {
      this.$store.commit("changeActiveFile", this.file.index);
    }
  }
});
</script>

<style lang="scss" scoped>
div.filetabButton {
  width: 200px;
  height: 80%;
  background-color: #606060;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-right: 8px;
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

div.active {
  background-color: #808080;
}
</style>
