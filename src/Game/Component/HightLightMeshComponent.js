function HightLightMeshComponent_perEntity(initMaterial) {
    this.material = initMaterial;
    this.restore = function(mesh) {
        mesh.material.color.r = this.material.color.r;
        mesh.material.color.g = this.material.color.g;
        mesh.material.color.b = this.material.color.b;

    };
    this.highlight = function (mesh) {
        mesh.material.color.r = 0;
        mesh.material.color.g = 0;
        mesh.material.color.b = 1;
    }
}

const HightLightMeshComponent = {
    ID: 'three_js.highlight_1',
    _instances: {},
    load: function(entityId, initMaterial)
    {
        if(!this._instances.hasOwnProperty(entityId)) {
            this._instances[entityId] = new HightLightMeshComponent_perEntity(initMaterial);
        }
    },
    restore: function(entityId, mesh) {
        this._instances[entityId].restore(mesh);
    },
    highlight: function (entityId, intersectMesh) {
        this._instances[entityId].highlight(intersectMesh);
    }
};

export {HightLightMeshComponent}