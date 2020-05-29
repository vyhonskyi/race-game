import { WorldObject } from './world-object';
import Victor from 'victor';
import { Obstacle } from './obstacle';

export class Road extends WorldObject {
    obstacles: Obstacle[] = [];

    constructor() {
        super(new Victor(0, 0), new Victor(100, 10 * 1000));

        for (var y = 0; y < this.size.y; y += 20) {
            const rand = Math.random() - 0.5;
            const x = rand < 0 ? (-20 - 20 * Math.abs(rand)) : (20 + 20 * Math.abs(rand));

            this.obstacles.push(new Obstacle(new Victor(x, y), new Victor(10, 10)));
        }
    }

    getObjects(pos: Victor, size: Victor): Obstacle[] {
        return this.obstacles;
    }
}
