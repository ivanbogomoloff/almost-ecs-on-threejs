import {PositionComponent} from "../../Game/Component/PositionComponent";

const EDITOR = {
    version: 1.0,
    entities: [],
    entities_components: {},
    entity_systems: {},
    entities_high_lighted_counter: 0,
    // Editor actions
    ACTION_SHOW_ENTITY_ACTIONS: 1,
    //Entity actions
    ENTITY_ACTION_HIGHLIGHT: 1,
    ENTITY_ACTION_HIGHLIGHT_OFF: 2,
    ENTITY_ACTION_MOVE: 3,
    hasEntityComponent: function (entityId, componentId) {
        return EDITOR.entities_components[entityId][componentId];
    },
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
                name: 'Entities (' + EDITOR.entitiesCount() + ')',
                children: entitiesArr
            }
        }
    },
    entitiesCount: function () {
        let entitiesCount = 0;
        for (let e in EDITOR.entities) {
            entitiesCount++;
        }

        return entitiesCount;
    },
    registeredEntityActions: {},
    addEntityAction: function (actionName, callback) {
        this.registeredEntityActions[actionName] = callback;
    },
    entityAction: function (actionName, params) {
        if (this.registeredEntityActions.hasOwnProperty(actionName)) {
            let fn = this.registeredEntityActions[actionName];
            return fn(params);
        }
        else {
            alert('No action ' + actionName);
        }
    }
};

export {EDITOR}