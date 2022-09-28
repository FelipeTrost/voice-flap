import { Loader } from "pixi.js";
import { files as birdFiles } from "./bird";
import { files as pipeFiles } from "./pipe";

const loader = new Loader();
loader.add(birdFiles).add(pipeFiles);

export default function load() {
  return new Promise((res) => loader.load(res));
}
