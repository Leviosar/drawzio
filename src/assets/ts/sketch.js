import p5 from "p5";

const pencil = {
  color: {
    hue: 0,
    saturation: 100,
    lightness: 50
  },
  size: 10
};

export const sketch = function(p) {
  p.setup = () => {
    const parent = document.querySelector("section.current-file");
    const canvas = p.createCanvas(
      parent.offsetWidth - 50,
      parent.offsetHeight - 50
    );
    parent.appendChild(canvas.elt);
    p.background(255);
  };

  p.draw = () => {
    if (p.mouseIsPressed && p.mouseY > 30) {
      p.noStroke();
      p.fill(pencil.color.hue, pencil.color.saturation, pencil.color.lightness);
      p.ellipse(p.mouseX, p.mouseY, pencil.size);
    }
  };

  p.keyPressed = function() {
    if (p.keyCode == 61) {
      pencil.size += 2;
    } else if (p.keyCode == 173) {
      pencil.size = p.max(2, pencil.size - 2);
    } else if (p.keyCode == 46) {
      p.background(360, 0, 100);
    }
  };
};
