import upFlapUrl from "./assets/redbird-upflap.png";
import midFlapUrl from "./assets/redbird-midflap.png";
import downFlapUrl from "./assets/redbird-downflap.png";
import { AnimatedSprite, Texture } from "pixi.js";

export const files: string[] = [upFlapUrl, midFlapUrl, downFlapUrl];

export default function Bird() {
  const textures = [];
  for (const url of files) {
    textures.push(Texture.from(url));
  }

  const bird = new AnimatedSprite(textures);
  bird.play();
  bird.animationSpeed = 0.1;

  bird.anchor.x = 0.5;
  bird.anchor.y = 0.5;

  return bird;
}
