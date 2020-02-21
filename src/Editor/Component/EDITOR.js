
const EDITOR = {
    version: 1.0,
    entities: [],
    entities_high_lighted_counter: 0,
    // Editor actions
    ACTION_SHOW_ENTITY_ACTIONS: 1,
    //Entity actions
    ENTITY_ACTION_HIGHLIGHT: 1,
    ENTITY_ACTION_HIGHLIGHT_OFF: 2,
    ENTITY_ACTION_MOVE: 3,
    tree: {
        entities: {},
        buildEntities: function () {
            let entitiesArr = [];

            EDITOR.entities.forEach(function (entityData) {
                entitiesArr.push({
                    name: entityData.entity_id,
                    children: [
                        {
                            name: 'Actions',
                            editor_action: EDITOR.ACTION_SHOW_ENTITY_ACTIONS,
                            selected: false,
                            entity_id: entityData.entity_id
                        },
                        {
                            name: 'Components',
                            children: entityData.entity_components
                        },
                        {
                            name: 'Systems',
                            children: entityData.entity_systems
                        }
                    ]
                })
            });

            return {
                name: 'Entities ('+EDITOR.entitiesCount()+')',
                children: entitiesArr
            }
        }
    },
    right_panel: {
        _entityActions: [],
        addEntityActions: function (entityId, actionId) {
            EDITOR.right_panel._entityActions.push({
                entity_id: entityId,
                action_id: actionId
            });
        }
    },
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