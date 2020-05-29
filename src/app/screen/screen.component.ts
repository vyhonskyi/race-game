import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Scene } from '../scene';
import { CanvasRender } from '../render';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  SCREEN_WIDTH = 600;
  SCREEN_HEIGHT = 600;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  rendered: CanvasRender;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.rendered = new CanvasRender(this.context, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.imageData = this.context.getImageData(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
  }

  render(scene: Scene): void {
    this.rendered.render(scene);
  }

  fitInParent = () => {
    let parent = this.canvas.parentNode;
    // @ts-ignore
    let parentWidth = parent.clientWidth;
    // @ts-ignore
    let parentHeight = parent.clientHeight;
    let parentRatio = parentWidth / parentHeight;
    let desiredRatio = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    if (desiredRatio < parentRatio) {
      this.canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
      this.canvas.style.height = `${parentHeight}px`;
    } else {
      this.canvas.style.width = `${parentWidth}px`;
      this.canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
    }
  };

}
