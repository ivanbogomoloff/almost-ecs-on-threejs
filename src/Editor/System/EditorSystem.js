import {EDITOR} from "../Component/EDITOR";

class EditorSystem
{
    constructor(ecs){
        this.ECS = ecs;
    }

    init(id, entities)
    {
        let _ = this;
        let systems = _.ECS.systems;
        entities.forEach(function (entity) {
            let perEntitySystems = [];
            for(let systemId in _.ECS.system_index_map){
                if(_.ECS.system.hasEntity(systemId, entity.id)) {
                    perEntitySystems.push({name: systemId});
                }
            }

            EDITOR.entities.push({
                entity_id: entity.id,
                entity_components: entity.components.map(function (component) {
                    return {
                        name: component.id
                    }
                }),
                entity_systems: perEntitySystems
            });
        });

        EDITOR.tree.entities = EDITOR.tree.buildEntities();
    }

    loop(){

    }
}

export {EditorSystem}