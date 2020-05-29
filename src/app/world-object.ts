import Victor from 'victor';

export abstract class WorldObject {
    constructor(public pos: Victor, public size: Victor, public rotation: number = 0) {
    }
}