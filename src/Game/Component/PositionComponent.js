function Position(p) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    this.changed = false;

    this.move = function () {

    };

    this.isChanged = function () {
        return this.changed;
    };
}

const PositionComponent = {
    id: 'position',
    _instances: {},
    get: function(systemId, entity) {
        return this._instances[systemId][entity];
    },
    init: function (systemId, entityId, componentParams) {
        if(!this._instances.hasOwnProperty(systemId))
        {
            this._instances[systemId] = {};
        }

        if(!this._instances[systemId].hasOwnProperty(entityId))
        {
            this._instances[systemId][entityId] = new Position(componentParams);
            console.log('[component.'+this.id+'] init for system = '+systemId+' entity = ' + entityId);
        }
        
        return this._instances[systemId][entityId];
    },
    move: function (systemId, entityId) {
        this._instances[systemId][entityId].move();
    },
    getSystemsForEntity: function (entityId) {
        let s = [];
        for(let systemId in this._instances) {
            if(this._instances[systemId].hasOwnProperty(entityId)) {
                s.push(systemId);
            }
        }
        return s;
    }
};

export {PositionComponent}