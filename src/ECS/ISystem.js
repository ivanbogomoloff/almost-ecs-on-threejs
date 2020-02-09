class ISystem {
    constructor(id){
        this.id = id;
        this._entity_counter = 0;
        this._component_counter = 0;
        this._entities = [];
        this._entitiesMap = {};
        this._components = [];
        this._componentsMap = {};
        this._dependencies = {};
    }

    log(msg) {
        console.log('[system.'+this.id+'] '+msg);
    }

    init(){}

    addDependency(id, dependency) {
        this._dependencies[id] = dependency;
        this.log('addDependency ' + id);
    }

    getDependency(id)
    {
        if(!this._dependencies.hasOwnProperty(id)) {
            this.log('error getDependency = ' + id);
        }

        let d = this._dependencies[id];
        if(d != null) {
            this.log('getDependency [' + id + '] -> OK');
        }
        return d;
    }

    registerComponent(component) {
        this._components.push(component);
        this._componentsMap[component.ID] = this._component_counter;
        this._component_counter++;
    }

    registerEntity(entity) {
        this._entities.push(entity);
        this._entitiesMap[entity.id] = this._entity_counter;
        this._entity_counter++;
    }

    getEntity(entityId){
        if(this._entitiesMap.hasOwnProperty(entityId)) {
            return this._entities[this._entitiesMap[entityId]];
        }
        return null;
    }

    getEntities() {
        return this._entities;
    }

    getComponent(entity, componentName) {
        let componentId = entity != null ? entity.getComponent(componentName) : componentName;
        if(componentId != null && this._componentsMap.hasOwnProperty(componentId))
        {
            return this._components[this._componentsMap[componentId]];
        }

        //console.log("["+this.id+"] no component " + componentName)
    }

    getComponentWithParams(entity, componentName) {
        let c = this.getComponent(entity, componentName);
        if(c) {
            return {self: c, params: c ? entity.getComponentParams(componentName) : {}};
        }
    }
}

export {ISystem}