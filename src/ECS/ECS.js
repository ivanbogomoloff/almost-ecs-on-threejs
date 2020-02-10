const ECS = {
    // Entity
    entities: {},
    // Components
    components: {},
    // Entity -> Components[]
    entities_components: {}, //{}.[]
    // Systems
    systems: [],
    system_index: 0,
    system_index_map: {},
    // System - Entity
    system_entities: {}, //{}.[]
    system_entities_index: 0,
    system_entities_index_map: {},
    // System - Component
    system_components: {}, //{}.[]
    system_components_index: 0,
    system_components_index_map: {},
    debugDump: function() {
        console.log(this);
    },
    entity: {
        create: function(id)
        {
            ECS.entities[id] = id;

            return id;
        },
        get: function(id) {
            return ECS.entities[id];
        },
        has: function(id) {
            return ECS.entities.hasOwnProperty(id);
        },
        addComponent: function (entity, componentId, args) {
            if(!ECS.entities_components.hasOwnProperty(entity)) {
                ECS.entities_components[entity] = [];
            }

            if(ECS.entity.hasComponent(entity, componentId)) {
                return ECS.entity;
            }

            let component = ECS.component.get(componentId);
            if(component != null) {
                ECS.entities_components[entity][componentId] = args || {};

                return ECS.entity;

            } else {
                console.log('[entity.'+entity+'] error: add component '+componentId+' fail');
            }

            return null;
        },
        hasComponent: function (entity, componentId) {
            return ECS.entities_components[entity][componentId];
        },
        getComponents: function (entity) {
            return ECS.entities_components[entity];
        }
    },
    component: {
        create: function (id) {
            if(ECS.components.hasOwnProperty(id)) {
                return id;
            }

            ECS.components[id] = id;
            console.log('[component.'+id+'] created');
            return id;
        },
        get: function (id) {
            if(ECS.components.hasOwnProperty(id)) {
                return ECS.components[id];
            }
            console.log('[component.'+id+'] error: component ' + id + ' not created');
            return null;
        }
    },
    system: {
        init: function() {
            for(let systemId in ECS.system_index_map) {
                let systemIndex = ECS.system_index_map[systemId];
                let system = ECS.systems[systemIndex];
                if(typeof system.init === 'function')
                {
                    system.init(systemId, ECS.system.getEntities(systemId));
                } else {
                    console.log('['+systemId+'] error: init method not exists');
                }
            }
        },
        getSystem: function(systemId){
            if(ECS.system.has(systemId)) {
                let index = ECS.system_index_map[systemId];
                return ECS.systems[index];
            }
            console.log('['+systemId+'.get] error: system not found');
            return null;
        },
        hasSystem: function(systemId) {
            return ECS.system_index_map.hasOwnProperty(systemId);
        },
        add: function (id, system) {
            if(ECS.system.hasSystem(system)) {
                return false;
            }
            ECS.systems.push(system);
            ECS.system_index_map[id] = ECS.system_index;

            ECS.system_entities[id] = {};
            ECS.system_components[id] = {};

            ECS.system_index++;
        },
        registerEntity: function (systemId, entity) {
            if(!ECS.system_entities.hasOwnProperty(systemId)) {
                ECS.system_entities[systemId] = {};
            }

            if(!ECS.system_entities[systemId].hasOwnProperty(entity)) {
                ECS.system_entities[systemId][entity] = entity;
                console.log('[system.'+systemId+'] registerEntity: ' + entity);
            } else {
                console.log('[system.'+systemId+'] registerEntity error: system not found');
            }
        },
        hasEntity: function(systemId, entity) {
            return ECS.system_entities_index_map.hasOwnProperty(systemId+"_"+entity);
        },
        getEntities: function(systemId)
        {
            let entities = [];
            for(let entity in ECS.system_entities[systemId]) {
                let components = [];
                let entityComponentsObject = ECS.entity.getComponents(entity);
                for(let ck in entityComponentsObject) {
                    components.push({
                        id: ck,
                        args: entityComponentsObject[ck]
                    });
                }
                entities.push({
                    id: entity,
                    components: components
                });
            }

            return entities;
        },
        registerComponent: function (systemId, componentId, args) {
            if(ECS.system_components.hasOwnProperty(systemId)) {
                let component = ECS.component.get(componentId);
                if(component != null) {
                    ECS.system_components[systemId].push({
                        system: systemId,
                        component: componentId,
                        args: args
                    });

                    ECS.system_components_index_map[systemId+'_'+componentId] = ECS.system_components_index;
                    ECS.system_components_index++;
                    console.log('[system.'+systemId+'] registerComponent: '+componentId);
                } else {
                    console.log('[system.'+systemId+'] error: component '+componentId+' not found');
                }
            } else {
                console.log('[system.'+systemId+'] error: must be add first!');
            }

        },
        hasComponent: function(systemId, entity) {
            return ECS.system_components_index_map.hasOwnProperty(systemId+"_"+entity);
        },
        getComponents: function(systemId)
        {
            let components = [];
            let componentsInSystem = ECS.system_components[systemId];
            for(let key in ECS.system_components_index_map) {
                let index = ECS.system_components_index[key];
                components.push(componentsInSystem[index]);
            }

            return components;
        },
        getComponent: function (systemId, componentId) {
            let index = ECS.system_components_index_map[systemId+'_'+componentId];
            return ECS.system_components[systemId][index];
        }
    }
};

export { ECS }
