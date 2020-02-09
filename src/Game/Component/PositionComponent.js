function Position(p) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    this.changed = false;

    this.move = function () {
        this.x += 0.05;
        this.z += 0.03;
        //this.changed = true;
    };

    this.isChanged = function () {
        return this.changed;
    };
}

const PositionComponent = {
    ID: 'position',
    _instances: {},
    init: function (entityId, componentParams) {
        if(!this._instances.hasOwnProperty(entityId)) {
            this._instances[entityId] = new Position(componentParams);
            console.log('[component.'+this.ID+'] init for ' + entityId);
        }
        
        return this._instances[entityId];
    },
    move: function (entityId) {
        this._instances[entityId].move();
    }
};

export {PositionComponent}