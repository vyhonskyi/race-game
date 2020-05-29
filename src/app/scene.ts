import { SceneObject } from './scene-object';
import Victor from 'victor';
import { WorldObject } from './world-object';

export class Scene {
    size: Victor = new Victor(2, 2);
    objects: SceneObject[] = [];
    scale: number;

    constructor(public realPos: Victor, private realSize: Victor) {
        this.scale = Math.max(this.size.x, this.size.y) / Math.min(this.realSize.x, this.realSize.y);
    }

    clear() {
        this.objects.length = 0;
    }

    add(obj: WorldObject) {
        const size = obj.size.clone()
            .multiply(new Victor(this.scale, this.scale));

        const pos = obj.pos.clone()
            .subtract(this.realPos)
            .multiply(new Victor(this.scale, this.scale));

        const sceneObj = new SceneObject(pos, size, obj.rotation);
        this.objects.push(sceneObj);
    }
}

