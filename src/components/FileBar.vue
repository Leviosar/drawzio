<template>
    <nav class="filebar-container">
        <FileTabButton :key="index" :file="file" v-for="(file, index) in files" />
        <button v-on:click="this.createFile">
            <i class="fas fa-plus"></i>
        </button>
        <button v-on:click="this.saveFile">
            <i class="fas fa-save"></i>
        </button>
    </nav>
</template>

<script lang="ts">
import Vue from "vue";
import FileTabButton from "@/components/FileTabButton.vue";

export default Vue.extend({
    name: "Filebar",
    components: {
        FileTabButton
    },
    methods: {
        createFile() {
            this.$store.commit("createFile");
        },
        saveFile() {
            const canvas = document.querySelector(
                "canvas.p5Canvas"
            ) as HTMLCanvasElement;
            const link = document.createElement("a");
            link.setAttribute("download", "untitled.png");
            link.setAttribute(
                "href",
                canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream")
            );
            link.click();
        }
    },
    data() {
        return {
            files: this.$store.state.files
        };
    }
});
</script>

<style lang="scss" scoped>
nav.filebar-container {
    height: 50px;
    width: 100%;
    background-color: #494949;
    display: flex;
    align-items: flex-end;

    button {
        width: 50px;
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
        border: none;
        font-size: 1.5em;
    }
}
</style>
