import { Container, Renderer, Sprite, Texture, TilingSprite } from "pixi.js";

import pipeBaseUrl from "./assets/pipe-base.png";
import pipeTopUrl from "./assets/pipe-top.png";
import pipeBottomUrl from "./assets/pipe-bottom.png";

export const files: string[] = [pipeBaseUrl, pipeTopUrl, pipeBottomUrl];

export default function Pipe(
  gap: number,
  gapStart: number,
  renderer: Renderer
) {
  const pipeTopTexture = Texture.from(pipeTopUrl);
  const pipeBottomTexture = Texture.from(pipeBottomUrl);
  const pipeBaseTexture = Texture.from(pipeBaseUrl);

  const pipe = new Container(); // TODO: make particle container for speed

  const bottom = new Sprite(pipeBottomTexture);
  pipe.addChild(bottom);
  bottom.y = gapStart - bottom.height;

  const baseBottom = new TilingSprite(
    pipeBaseTexture,
    bottom.width,
    gapStart - bottom.height
  );
  pipe.addChild(baseBottom);
  baseBottom.y = 0;

  const top = new Sprite(pipeTopTexture);
  pipe.addChild(top);
  top.y = gapStart + gap;

  const baseTop = new TilingSprite(
    pipeBaseTexture,
    top.width,
    renderer.height - top.y - top.height
  );
  pipe.addChild(baseTop);
  baseTop.y = top.y + top.height;

  return pipe;
}
