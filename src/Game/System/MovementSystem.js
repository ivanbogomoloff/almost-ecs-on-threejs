import {PositionComponent} from "../Component/PositionComponent";

class MovementSystem
{
    constructor(renderingSystem) {
        this.movable = [];
        this.renderingSystem = renderingSystem;
    }

    init(id, entities)
    {
        let _ = this;
        entities.forEach(function (entity) {
            entity.components.forEach(function (component) {
                switch (component.id) {
                    case PositionComponent.id:
                        let position = PositionComponent.init(id, entity.id, component.args);
                        _.movable.push({entityId: entity.id, position: position});
                        break;
                }
            });

        });
    }

    loop(){
        let _ = this;
        this.movable.forEach(function (positionData) {
            positionData.position.move();
            if (_.renderingSystem && positionData.position.isChanged()) {
                _.renderingSystem.updatePosition(
                    positionData.entityId,
                    positionData.position.x,
                    positionData.position.y,
                    positionData.position.z
                );
            }
        });
    }
}

export {MovementSystem}