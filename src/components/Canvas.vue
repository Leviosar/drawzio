<template>
    <section class="current-file"></section>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import p5 from "p5";

export default Vue.extend({
    data() {
        return {
            instance: undefined
        };
    },
    mounted() {
        const store = this.$store;

        this.instance = new p5(function(p) {
            p.pencil = store.state.brush;

            p.setup = () => {
                const parent = document.querySelector("section.current-file");
                const canvas = p.createCanvas(
                    parent.offsetWidth - 50,
                    parent.offsetHeight - 50
                );
                parent.appendChild(canvas.elt);
                p.createTopLayer(parent);
                p.topLayer.clear();
            };

            p.draw = () => {
                p.background(255);
                p.image(p.topLayer, 0, 0);
                
                if (store.state.delete) {
                    p.topLayer.clear()
                    store.commit('delete', false)
                }

                switch (store.state.mode) {
                    case "brush":
                        if (p.mouseIsPressed) {
                            p.topLayer.noStroke();
                            p.topLayer.fill(
                                store.state.fillColor.rgba.r,
                                store.state.fillColor.rgba.g,
                                store.state.fillColor.rgba.b
                            );
                            p.topLayer.ellipse(
                                p.mouseX,
                                p.mouseY,
                                p.pencil.size
                            );
                        }

                        p.noFill();
                        p.stroke(0);
                        p.ellipse(p.mouseX, p.mouseY, p.pencil.size);

                        break;
                    case "rect":
                        p.drawGuide();
                        if (
                            store.state.rect.start.x != undefined &&
                            store.state.rect.start.y != undefined
                        ) {
                            p.drawRect(p);
                        }
                        break;
                    case "ellipse":
                        p.drawGuide();
                        if (
                            store.state.ellipse.start.x != undefined &&
                            store.state.ellipse.start.y != undefined
                        ) {
                            p.drawEllipse(p);
                        }
                        break;
                }
            };

            p.drawGuide = () => {
                p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY - 10);
                p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY + 10);
                p.line(p.mouseX, p.mouseY, p.mouseX + 10, p.mouseY);
                p.line(p.mouseX, p.mouseY, p.mouseX - 10, p.mouseY);
            };

            p.drawRect = (render) => {
                const shift = store.state.shift
                const start = store.state.rect.start;
                const width = shift ? p.min(p.abs(start.x - p.mouseX), p.abs(start.y - p.mouseY)) : p.abs(start.x - p.mouseX)
                const height = shift ? p.min(p.abs(start.y - p.mouseY), p.abs(start.x - p.mouseX)) : p.abs(start.y - p.mouseY)
                render.fill(store.state.fillColor.hex);
                render.stroke(store.state.strokeColor.hex);

                if (p.mouseX > start.x && p.mouseY > start.y) {
                    render.rect(
                        start.x,
                        start.y,
                        width,
                        height
                    );
                } else if (p.mouseX > start.x && p.mouseY < start.y) {
                    render.rect(
                        start.x,
                        p.mouseY,
                        width,
                        height
                    );
                } else if (p.mouseX < start.x && p.mouseY < start.y) {
                    render.rect(
                        p.mouseX,
                        p.mouseY,
                        width,
                        height
                    );
                } else {
                    render.rect(
                        p.mouseX,
                        start.y,
                        width,
                        height
                    );
                }
            };

            p.drawEllipse = (render) => {

                const shift = store.state.shift
                const start = store.state.ellipse.start;
                const width = shift ? p.min(p.abs(start.x - p.mouseX), p.abs(start.y - p.mouseY)) : p.abs(start.x - p.mouseX)
                const height = shift ? p.min(p.abs(start.y - p.mouseY), p.abs(start.x - p.mouseX)) : p.abs(start.y - p.mouseY)
                render.ellipseMode(render.CORNER);
                render.fill(store.state.fillColor.hex);
                render.stroke(store.state.strokeColor.hex);
                
                if (p.mouseX > start.x && p.mouseY > start.y) {
                    render.ellipse(
                        start.x,
                        start.y,
                        width,
                        height
                    );
                } else if (p.mouseX > start.x && p.mouseY < start.y) {
                    render.ellipse(
                        start.x,
                        p.mouseY,
                        width,
                        height
                    );
                } else if (p.mouseX < start.x && p.mouseY < start.y) {
                    render.ellipse(
                        p.mouseX,
                        p.mouseY,
                        width,
                        height
                    );
                } else {
                    render.ellipse(
                        p.mouseX,
                        start.y,
                        width,
                        height
                    );
                }
            };

            p.mousePressed = (event) => {
                console.log(event)
                switch (store.state.mode) {
                    case "rect":
                        store.commit("rectStart", { x: p.mouseX, y: p.mouseY });
                        break;
                    case "ellipse":
                        store.commit("ellipseStart", { x: p.mouseX, y: p.mouseY });
                        break;
                    default:
                        break;
                }
            };

            p.mouseReleased = () => {
                switch (store.state.mode) {
                    case "rect":
                        p.topLayer.stroke(0);
                        p.drawRect(p.topLayer);
                        store.commit("rectEnd");
                        break;
                    case "ellipse":
                        p.topLayer.stroke(0);
                        p.drawEllipse(p.topLayer);
                        store.commit("ellipseEnd");
                        break;
                    default:
                        break;
                }
            };

            p.keyPressed = function() {
                switch (p.keyCode) {
                    case 61:
                        p.pencil.size += 2;
                        break;
                    case 173:
                        p.pencil.size -= 2;
                        break;
                    case 46:
                        p.eraseCanvas(p.topLayer)
                        break;
                    case 16:
                        store.commit('shift', true);
                        break;
                    default:
                        break;
                }
            };

            p.keyReleased = function() {
                switch (p.keyCode) {
                    case 16:
                        store.commit('shift', false)
                        break;
                    default:
                        break;
                }
            }

            p.eraseCanvas = function(render) {
                render.clear()
            }

            p.createTopLayer = parent => {
                p.topLayer = p.createGraphics(
                    parent.offsetWidth - 50,
                    parent.offsetHeight - 50
                );
                p.topLayer.clear();
            };
        });
    }
});
</script>

<style lang="scss">
section.current-file {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
        cursor: none;
    }
}
</style>
