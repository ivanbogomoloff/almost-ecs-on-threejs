const EDITOR = {
    version: 1.0,
    entities: {},
    entityActions: [
        {action: 1, title: 'Highlight'},
        {action: 2, title: 'Edit'},
        {action: 3, title: 'Hide'},
        {action: 4, title: 'Remove'},
    ],
    entitiesCount: function () {
        let entitiesCount = 0;
        for(let e in EDITOR.entities) {
            console.log(e);
            entitiesCount++;
        }

        return entitiesCount;
    }
};

export {EDITOR}