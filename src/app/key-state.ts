export class KeyState {
    keys: { [code: string]: boolean };

    constructor() {
        this.keys = {};
    }

    keydown(code: string) {
        this.keys[code] = true;
    }

    keyup(code: string) {
        this.keys[code] = false;
    }

    isPressed(code: Keys) {
        return !!this.keys[code];
    }
}

export enum Keys {
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight'
}
