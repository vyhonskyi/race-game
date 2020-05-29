import { Component, ViewChild, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { World } from './world';
import { ScreenComponent } from './screen/screen.component';
import { KeyState } from './key-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('screen') screen: ScreenComponent;

  keyState: KeyState;
  world: World;
  requestID: any;
  _frame: FrameRequestCallback;
  prevTimestamp: number = 0;

  constructor() {
    this.keyState = new KeyState();
    this.world = new World(this.keyState);
  }

  @HostListener('document:keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    this.keyState.keydown(event.code);
  }

  @HostListener('document:keyup', ['$event'])
  keyup(event: KeyboardEvent) {
    this.keyState.keyup(event.code);
  }

  ngOnInit(): void {
    this._frame = this.frame.bind(this);
  }

  ngAfterViewInit(): void {
    this.start();
  }

  start() {
    this.requestID = window.requestAnimationFrame(this._frame);
  }

  frame(timestamp: number) {
    const seconds = (timestamp - this.prevTimestamp) / 1000;
    this.prevTimestamp = timestamp;

    this.world.process(seconds);
    this.screen.render(this.world.getScene());

    this.requestID = window.requestAnimationFrame(this._frame);
  }
}
