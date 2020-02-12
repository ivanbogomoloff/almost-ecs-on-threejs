
const EDITOR = {
    version: 1.0,
    entities: {},
    ENTITY_ACTION_HIGHLIGHT: 1,
    UNDO_ENTITY_ACTION_HIGHLIGHT: 2,
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
    {id: EDITOR.UNDO_ENTITY_ACTION_HIGHLIGHT, title: 'Highlight/OFF'}
];

export {EDITOR}