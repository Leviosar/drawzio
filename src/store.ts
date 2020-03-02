/* eslint-disable  @typescript-eslint/no-explicit-any */

import Vue from "vue";
import Vuex from "vuex";
import File from "@/models/File";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mode: "brush",
        colorMode: "fill",
        currentIndex: 0,
        shift: false,
        delete: false,
        files: [new File("untitled-0.png", 0)],
        brush: {
            size: 10
        },
        rect: {
            start: {
                x: undefined,
                y: undefined
            }
        },
        ellipse: {
            start: {
                x: undefined,
                y: undefined
            }
        },
        fillColor: {
            rgba: { r: 255, g: 255, b: 255 },
            hex: "#FFFFFF"
        },
        strokeColor: {
            rgba: { r: 74, g: 144, b: 226 },
            hex: "#4A90E2"
        }
    },
    mutations: {
        changeActiveFile(state: any, newIndex: number) {
            state.currentIndex = newIndex;
        },
        createFile(state: any) {
            state.files.push(
                new File(`untitled-${state.files.length}.png`, state.files.length)
            );
        },
        mode(state: any, mode: string) {
            state.mode = mode;
        },
        shift(state: any, newValue: boolean) {
            state.shift = newValue;
        },
        delete(state: any, newValue: boolean) {
            state.delete = newValue;
        },
        colorMode(state: any, mode: string) {
            state.colorMode = mode;
        },
        rectStart(state: any, coords: any) {
            state.rect.start = coords;
        },
        rectEnd(state: any) {
            state.rect.start = {
                x: undefined,
                y: undefined
            };
        },
        ellipseStart(state: any, coords: any) {
            state.ellipse.start = coords;
        },
        ellipseEnd(state: any) {
            state.ellipse.start = {
                x: undefined,
                y: undefined
            };
        }
    }
});
