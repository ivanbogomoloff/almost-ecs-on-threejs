
const EDITOR = {
    version: 1.0,
    entities: {},
    ENTITY_ACTION_HIGHLIGHT: 1,
    ENTITY_ACTION_HIGHLIGHT_OFF: 2,
    ENTITY_ACTION_MOVE: 3,
    entitiesCount: function () {
        let entitiesCount = 0;
        for(let e in EDITOR.entities) {
            entitiesCount++;
        }

        return entitiesCount;
    },
    registeredEntityActions: {},
    addEntityAction: function(actionName, callback) {
        this.registeredEntityActions[actionName] = callback;
    },
    entityAction: function (actionName, params) {
        if(this.registeredEntityActions.hasOwnProperty(actionName)) {
            let fn = this.registeredEntityActions[actionName];
            fn(params);
        }
        else {
            alert('No action ' + actionName);
        }
    }
};

EDITOR.entityActions = [
    {id: EDITOR.ENTITY_ACTION_HIGHLIGHT, title: 'Highlight/ON'},
    {id: EDITOR.ENTITY_ACTION_HIGHLIGHT_OFF, title: 'Highlight/OFF'},
    {id: EDITOR.ENTITY_ACTION_MOVE, title: 'Move'}
];

export {EDITOR}