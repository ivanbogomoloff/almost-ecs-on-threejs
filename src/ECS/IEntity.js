class IEntity {
    constructor(id) {
        this.id = id;
        this.components = {};
        this.componentArgs = {};
    }

    addComponent(componentObj, args) {
        this.components[componentObj.ID] = componentObj.ID;
        this.componentArgs[componentObj.ID] = args || {};
    }

    getComponent(name){
        return this.components[name];
    }

    getComponentParams(name) {
        return this.componentArgs[name];
    }
}

export {IEntity}