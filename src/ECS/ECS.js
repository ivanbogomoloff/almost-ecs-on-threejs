import {IEntity} from "./IEntity";

const ECS = {
    entities: [],
    entities_to_components: [],
    entities_to_systems: [],
    components: [],
    components_to_systems: [],
    systems: [],
    logger: function() {

    },
    createEntity: function(id)
    {
        ECS.entities.push(id);

        return new IEntity(id);
    },
    systemsInitializer:  {
        _systems: [],
        add: function (system) {
            this._systems.push(system);
        },
        init: function () {
            this._systems.forEach(function (system) {
                system.init();
            });
        },
        loop: function () {
            this._systems.forEach(function (system) {
                system.loop();
            });
        }
    },
    entity: {
        addComponent: function (entity, component, args) {
            ECS.entities_to_components.push({
                entity: entity.id,
                component: component.ID,
                args: args
            });

            entity.addComponent(component, args);
        }
    },
    system: {
        registerEntity: function (system, entity) {
            ECS.entities_to_systems.push({
                entity: entity.id,
                system: system.id
            });
            system.registerEntity(entity);
        },
        registerComponent: function (system, component) {
            ECS.components_to_systems.push({
                component: component.ID,
                system: system.id
            });

            system.registerComponent(component);
        }
    }
};

export { ECS }
