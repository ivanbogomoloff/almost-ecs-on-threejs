import {IEntity} from "../../ECS/IEntity";

class MapEntity extends IEntity {
    constructor(id, type) {
        super(id, type);
        this.x = 0;
        this.y = 0;
    }

    setPosition(x, y) {
        console.log(this.id+' :'+x);
        console.log(this.id+' y :'+y);
        console.log(y);
    }
}

export { MapEntity }