<template>
    <aside class="toolbar">
        <Sketch v-show="this.$store.state.colorMode == 'fill'" v-model="$store.state.fillColor"/>
        <Sketch v-show="this.$store.state.colorMode == 'stroke'" v-model="$store.state.strokeColor"/>
        <div class="button-grid">
            <button class="brush" v-on:click="mode('brush')">
                <i class="fas fa-paint-brush"></i>
            </button>
            <button class="rect" v-on:click="mode('rect')">
                <i class="far fa-square"></i>
            </button>
            <button class="ellipse" v-on:click="mode('ellipse')">
                <i class="far fa-circle"></i>
            </button>
            <button class="delete" v-on:click="del(true)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="colors-grid">
            <div class="color active fill" v-on:click="colorMode('fill')">
                <span :style="'background:' + fillColor"></span>
                <span>Fill</span>
            </div>
            <div class="color stroke" v-on:click="colorMode('stroke')">
                <span :style="'background:' + strokeColor"></span>
                <span>Stroke</span>
            </div>
        </div>
    </aside>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import { Sketch } from "vue-color";

export default Vue.extend({
    data() {
        return {};
    },
    methods: {
        mode(newMode) {
            this.$store.commit("mode", newMode);

            document
                .querySelectorAll("div.button-grid > button.active")
                .forEach(el => el.classList.remove("active"));

            document
                .querySelector(`div.button-grid > button.${newMode}`)
                .classList.add("active");
        },
        colorMode(newMode) {
            this.$store.commit("colorMode", newMode);

            document
                .querySelectorAll("div.colors-grid > div.active")
                .forEach(el => el.classList.remove("active"));

            const newActive = document.querySelector(`div.colors-grid > div.${newMode}`)
            newActive.classList.add("active");
        },
        del(value){
            this.$store.commit('delete', value)
        }
    },
    computed: {
        fillColor: function() {
            return this.$store.state.fillColor.hex
        },
        strokeColor: function() {
            return this.$store.state.strokeColor.hex
        }
    },
    components: {
        Sketch
    }
});
</script>

<style lang="scss" scoped>
aside.toolbar {
    width: 245px;
    padding-left: 25px;
    padding-top: 25px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div.colors-grid {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        div.color {
            width: 100px;
            height: 60px;
            background-color: #505050;
            display: flex;
            flex-direction: column;
            box-shadow: 1px 1px 1px #505050;

            span:first-child {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                height: 40px;
                width: 100px;
                background-color: white;
                cursor: pointer;
            }

            span:last-child {
                color: white;
                height: 20px;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        div.active {
            background: #404040;

            span:last-child {
                color: white;
            }
        }
    }

    div.button-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        button {
            width: 50px;
            height: 50px;
            background-color: #505050;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            box-shadow: 1px 1px 0px #505050;
            margin-top: 10px;
        }

        button.active {
            background-color: #404040;
        }

        button::focus {
            outline: none;
        }

        button:hover {
            background-color: #454545;
        }
    }
}
</style>
