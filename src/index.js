import React, { Component } from "react";
import { render } from "react-dom";
import { noise, invert, blackWhite, brighten, distinct } from "./filter";

let ctx = null;
function pipe(...fns) {
  return fns.reduce((f, g) => (...args) => g(f(...args)));
}
function clone(imgData) {
  return new ImageData(
    new Uint8ClampedArray(imgData.data),
    imgData.width,
    imgData.height
  );
}

function putImageData(cloned) {
  return ctx.putImageData(cloned, 0, 0);
}

class App extends Component {
  constructor() {
    super();
    this.blackWhite = this.blackWhite.bind(this);
    this.invert = this.invert.bind(this);
    this.noise = this.noise.bind(this);
    this.brighten = this.brighten.bind(this);
    this.distinct = this.distinct.bind(this);
  }
  componentDidMount() {
    //获取canvas元素
    ctx = document.getElementById("canvas").getContext("2d");
    //创建image对象
    var img = new Image();
    img.src = require("./avatar.jpeg");
    // img.src = require("./seal.png");

    //待图片加载完后，将其显示在canvas上
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      this.imgData = ctx.getImageData(0, 0, 300, 300);
    };
  }
  brighten(e) {
    pipe(clone, brighten(e), putImageData)(this.imgData);
  }
  noise() {
    pipe(clone, noise, putImageData)(this.imgData);
  }
  invert() {
    pipe(clone, invert, putImageData)(this.imgData);
  }

  blackWhite() {
    pipe(clone, blackWhite, putImageData)(this.imgData);
  }
  distinct(e) {
    pipe(clone, distinct(e), putImageData)(this.imgData);
  }
  render() {
    return (
      <div>
        <canvas id="canvas" width="300px" height="300px"></canvas>
        <div>
          <button onClick={this.blackWhite}>黑白</button>
          <button onClick={this.invert}>反色</button>
          <button onClick={this.noise}>噪音</button>
          <button>
            提亮
            <input
              onChange={this.brighten}
              type="range"
              min="-255"
              max="255"
            ></input>
          </button>

          <button>
            清晰度
            <input
              onChange={this.distinct}
              type="range"
              min="-255"
              max="0"
            ></input>
          </button>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
