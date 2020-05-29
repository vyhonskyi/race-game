import { Scene } from './scene';
import Victor from 'victor';

export abstract class Render {
    abstract render(scene: Scene);
}

export class CanvasRender extends Render {
    pattern: CanvasPattern;

    constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) {
        super();

        var img = new Image();
        img.src = 'assets/checkerboard-seamless-pattern.jpg';
        img.onload = () => {
            this.pattern = ctx.createPattern(img, 'repeat');
        };
    }

    render(scene: Scene) {
        this.ctx.fillStyle = this.pattern;
        this.ctx.fillRect(0, 0, this.width, this.height);

        const scale = Math.min(this.width, this.height) / Math.max(scene.size.x, scene.size.y);
        const shiftVec = new Victor(this.width / 2, this.height / 2);

        scene.objects.forEach(obj => {
            this.ctx.fillStyle = 'black';

            var size = obj.size.clone()
                .multiply(new Victor(scale, scale));

            const pos = obj.pos.clone()
                .multiply(new Victor(scale, -scale))
                .add(shiftVec);

            this.ctx.translate(pos.x, pos.y);
            this.ctx.rotate(-obj.rotation);
            this.ctx.fillRect(-size.x / 2, -size.y / 2, size.x, size.y);

            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        });
    }
}
