import Victor from 'victor';

import { Scene } from './scene';
import { Road } from './road';
import { Car } from './car';
import { SceneObject } from './scene-object';
import { KeyState } from './key-state';

export class World {
    scene: Scene;
    road: Road;
    car: Car;

    constructor(private keyState: KeyState) {
        this.car = new Car(new Victor(0, 0), new Victor(2, 4), keyState);
        this.road = new Road();

        this.scene = new Scene(new Victor(0, 45), new Victor(100, 300));
    }

    process(seconds: number): void {
        this.car.process(seconds);

        this.scene.realPos = this.car.pos.clone();

        this.scene.clear();
        this.scene.add(this.car);

        this.road.getObjects(this.scene.realPos, this.scene.size)
            .forEach(x => this.scene.add(x));
    }

    getScene(): Scene {
        return this.scene;
    }
}


