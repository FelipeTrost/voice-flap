import "./styles.css";
import { Application, Container, Loader, Texture } from "pixi.js";
import Pipe, { files as pipeFiles } from "./pipe";
import checkCrash from "./checkCrash";
import load from "./loader";
import Bird from "./bird";
import { randInt } from "./utils";
import { requesetStream, volumeMeter, VolumeSprite } from "./volumeMeter";

(async () => {
  document.addEventListener("click", () => {
    birdVel = -10;
  });

  // Pixi app instance
  const app = new Application();
  app.renderer.backgroundColor = 0x33a5ff;
  document.body.appendChild(app.view);

  const gravity = 0.5;
  let birdVel = 0;
  const birdX = app.renderer.width / 4;

  // Load assets
  await load();

  const bird = Bird();
  app.stage.addChild(bird);
  bird.x = birdX;

  const stream = await requesetStream();
  volumeMeter(stream, (amp) => {
    bird.y = amp * 1000;
    console.log(amp);
  });

  // volumeMeter(stream, console.log);
  const VolumeMeter = VolumeSprite();
  VolumeMeter.x = 10;
  VolumeMeter.y = 10;
  app.stage.addChild(VolumeMeter);

  const pipeSpacing = 250;
  const pipeWidth = Texture.from(pipeFiles[0]).width;
  const pipesNeeded =
    Math.floor(app.renderer.width / (pipeSpacing + pipeWidth)) + 1;

  const pipes = new Container();
  app.stage.addChild(pipes);

  function createPipe(x: number) {
    const gap = randInt(150, 200);
    const mid = app.renderer.height / 2;
    const height = randInt(mid - gap, mid + gap);
    const pipe = Pipe(gap, height, app.renderer);
    pipes.addChild(pipe);
    pipe.x = x;
    pipe.y = 0;
  }

  for (let i = 0; i < pipesNeeded; i++) {
    createPipe(app.renderer.width + (pipeSpacing + pipeWidth) * i);
  }

  // Listen for frame updates
  app.ticker.add(() => {
    // if (pipes[pipes.length - 1].x <= pipeSpacing) {
    //   const pipe = Pipe(300, app.renderer.height / 2 - 50, app.renderer);
    //   app.stage.addChild(pipe);
    //   pipe.x = app.renderer.width;
    //   pipes.push(pipe);
    // }

    // const check = checkCrash(bird, pipe);
    // if (check) {
    //   alert("hola");
    //   console.log({ check });
    // }
    const furdestBackPipe = pipes.children.reduce((acc, curr) =>
      acc.x > curr.x ? acc : curr
    );
    console.log(pipes.children.length);

    for (const pipe of pipes.children) {
      if (pipe.x + pipeWidth <= 0) {
        pipes.removeChild(pipe);
        createPipe(app.renderer.width + pipeSpacing + pipeWidth);
      }

      pipe.x -= 1;
    }

    // each frame we spin the bunny around a bit
    // birdVel += gravity;
    // bird.rotation = birdVel / 50;

    if (bird.y + birdVel < app.renderer.height - 20) bird.y += birdVel;
  });
})();
