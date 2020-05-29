import { WorldObject } from './world-object';
import Victor from 'victor';
import { KeyState, Keys } from './key-state';

export class Car extends WorldObject {
    speed = 0;
    acceleration = 10;
    brakeAcceleration = 50;
    inertionAcceleration = 5;
    rotateSpeed = Math.PI / 3;

    constructor(public pos: Victor, public size: Victor, private keyState: KeyState) {
        super(pos, size);
    }

    process(seconds: number) {
        if (this.keyState.isPressed(Keys.ArrowUp)) {
            if (this.speed > 0) {
                this.speed += this.acceleration * seconds;
            } else {
                this.speed += this.brakeAcceleration * seconds;
            }
        } else if (this.keyState.isPressed(Keys.ArrowDown)) {
            if (this.speed > 0) {
                this.speed -= this.brakeAcceleration * seconds;
            } else {
                this.speed -= this.acceleration * seconds;
            }
        } else {
            if (this.speed > 0) {
                this.speed -= this.inertionAcceleration * seconds;
            }

            if (this.speed < 0) {
                this.speed += this.inertionAcceleration * seconds;
            }
        }

        if (this.keyState.isPressed(Keys.ArrowLeft)) {
            this.rotation += this.rotateSpeed * seconds;
        } else if (this.keyState.isPressed(Keys.ArrowRight)) {
            this.rotation -= this.rotateSpeed * seconds;
        } else {
            if (this.rotation > 0) {
                this.rotation -= this.rotateSpeed * seconds;
            }

            if (this.rotation < 0) {
                this.rotation += this.rotateSpeed * seconds;
            }
        }

        this.rotation = this.rotation % (Math.PI * 2);

        const path = new Victor(0, this.speed * seconds)
            .rotate(this.rotation);

        this.pos.add(path);
    }
}
