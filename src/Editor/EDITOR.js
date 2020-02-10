
const EDITOR = {
    version: 1.0,
    entities: {},
    ENTITY_ACTION_HIGHLIGHT: 1,
    entitiesCount: function () {
        let entitiesCount = 0;
        for(let e in EDITOR.entities) {
            entitiesCount++;
        }

        return entitiesCount;
    }
};

EDITOR.entityActions = [
    {id: EDITOR.ENTITY_ACTION_HIGHLIGHT, title: 'Highlight'},
    {id: 2, title: 'Edit'},
    {id: 3, title: 'Hide'},
    {id: 4, title: 'Remove'}
];

export {EDITOR}