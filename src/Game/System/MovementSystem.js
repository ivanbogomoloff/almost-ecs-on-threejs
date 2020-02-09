import {ISystem} from "../../ECS/ISystem";
import {PositionComponent} from "../Component/PositionComponent";

class MovementSystem extends ISystem
{
    constructor(id) {
        super(id);
        this.movable = [];
        this.renderingSystem = null;
    }
    init() {
        super.log('init start');
        this.renderingSystem = super.getDependency('render');

        let _ = this;
        super.getEntities().forEach(function (entity) {
            let posComp = _.getComponentWithParams(entity, PositionComponent.ID);
            if(posComp) {
                let position = posComp.self.init(entity.id, posComp.params);
                _.movable.push({entityId: entity.id, position: position});
            }
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