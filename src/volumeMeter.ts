import { Container, Graphics } from "pixi.js";

export function requesetStream() {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
}

export function volumeMeter(
  stream: MediaStream,
  callback: (amp: number) => void
) {
  const audioContext = new AudioContext();
  const mediaStreamAudioSource = audioContext.createMediaStreamSource(stream);
  const analyserNode = audioContext.createAnalyser();
  mediaStreamAudioSource.connect(analyserNode);

  const pcmData = new Float32Array(analyserNode.fftSize);

  const onFrame = () => {
    analyserNode.getFloatTimeDomainData(pcmData);
    let sumSquares = 0.0;
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude;
    }

    callback(Math.sqrt(sumSquares / pcmData.length));

    window.requestAnimationFrame(onFrame);
  };
  window.requestAnimationFrame(onFrame);
}

export function VolumeSprite(percentage: number = 1) {
  const meter = new Container();

  const graphics = new Graphics();
  meter.addChild(graphics);

  const lineWidth = 10;
  const width = 50;
  const height = 100;

  graphics.lineStyle(lineWidth, 0xffffff, 1);
  graphics.beginFill(0, 0);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();

  const computedHeight = (height - lineWidth) * percentage;
  graphics.lineStyle(0, 0, 0);
  graphics.beginFill(1);
  graphics.drawRect(
    lineWidth / 2,
    lineWidth / 2 + height - computedHeight - lineWidth,
    width - lineWidth,
    computedHeight
  );
  graphics.endFill();

  return meter;
}
