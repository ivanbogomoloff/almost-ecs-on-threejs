import {EDITOR} from "../Component/EDITOR";
import {PositionComponent} from "../../Game/Component/PositionComponent";

class PositionSystem
{
    init(id, entities)
    {
        EDITOR.addEntityAction('position.get_step_value', function (params) {
            let systemId = params[0];
            let entity_id = params[1];

            return 1;
        });

        EDITOR.addEntityAction('position.get', function (params) {
            let systemId = params[0];
            let entity_id = params[1];

            return PositionComponent.get(
                systemId, entity_id
            );
        });

        EDITOR.addEntityAction('position.get_for_system', function (params) {
            let systemId = params[0];
            let entity_id = params[1];
            let coordinate = params[2];

            let pos = {x: 0.0, y: 0.0, z: 0.0};
            if (systemId) {
                pos = PositionComponent.get(systemId, entity_id);
            }
            let data = {
                x: pos.x,
                y: pos.y,
                z: pos.z
            };

            return data[coordinate]
        });
        EDITOR.addEntityAction('position.get_systems_for_entity', function (entityId) {
            let s = PositionComponent.getSystemsForEntity(entityId);
            // Ignore render system
            s = s.filter(function (s) {
               return s !== 'render';
            });
            return s;
        });

        EDITOR.addEntityAction('position.change_x', function (params) {
            PositionComponent.changeX(
                params[0], params[1], params[2]
            );
        });
        EDITOR.addEntityAction('position.change_y', function (params) {
            PositionComponent.changeY(
                params[0], params[1], params[2]
            );
        });
        EDITOR.addEntityAction('position.change_z', function (params) {
            PositionComponent.changeZ(
                params[0], params[1], params[2]
            );
        });
    }

    loop(){

    }
}

export {PositionSystem}