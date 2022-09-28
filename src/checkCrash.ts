import { Container, Sprite } from "pixi.js";

// To check a crash we just basically check if the bird crashes with any of the pipes rectangles
export default function checkCrash(bird: Sprite, pipe: Container) {
  const birdRect = bird.getBounds();

  for (const pipePart of pipe.children) {
    if (birdRect.intersects(pipePart.getBounds())) return true;
  }

  return false;
}
