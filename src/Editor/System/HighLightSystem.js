import {CubeDrawComponent} from "../../Game/Component/Drawable/CubeDrawComponent";

class HighLightSystem
{
    constructor(renderingSystem){
        this._entities = [];
        this.hightLightedEntities = [];
        this.renderingSystem = renderingSystem;
        this._initedEntities = {};
        this._entitiesForRestore = [];
    }

    init(id, entities)
    {
        let _ = this;
        if(this.renderingSystem) {
            this._entities = entities;
            this._entities.forEach(function (entity) {
                entity.components.forEach(function (component) {
                    switch (component.id) {
                        case CubeDrawComponent.id:
                            let obj = _.renderingSystem.getDrawableEntity(entity);
                            if(obj)
                            {
                                obj.components.forEach(function (drawableComponent) {
                                    _._initEntity(entity.id, drawableComponent.init_material);
                                });
                            }
                            break;
                    }
                });
            });
        }
    }

    undoHighLight(entity) {
        if(this._initedEntities.hasOwnProperty(entity)
            && this._initedEntities[entity] != null) {
            let index = this.hightLightedEntities.indexOf(entity);
            if(index >= 0)
            {
                this._entitiesForRestore.push(entity);
            }
        } else {
            let msg = "undoHighLight: " + entity + " not in initedEntities or not registered for this system";
            console.log(msg);
            alert(msg);
        }
    }

    highLight(entity)
    {
        if(this._initedEntities.hasOwnProperty(entity)
            && this._initedEntities[entity] != null) {
            this.hightLightedEntities.push(entity);
        } else {
            let msg = "highLight:" + entity + " not in initedEntities or not registered for this system";
            console.log(msg);
            alert(msg);
        }
    }

    _initEntity(entity, initMaterial){
        let HighLightMeshComponent_perEntity = function (m) {
            this.material = m;
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
        };

        this._initedEntities[entity] = new HighLightMeshComponent_perEntity(initMaterial);
    }

    _restoreEntity(entity, mesh) {
        if(this._initedEntities.hasOwnProperty(entity)
            && this._initedEntities[entity] != null)
        {
            this._initedEntities[entity].restore(mesh);
        }
    }

    _highLightEntity(entity, mesh) {
        if(this._initedEntities.hasOwnProperty(entity)
            && this._initedEntities[entity] != null)
        {
            this._initedEntities[entity].highlight(mesh);
        }
    }

    loop()
    {
        let _ = this;
        if(this.hightLightedEntities.length > 0) {
            this._entities.forEach(function (entity)
            {
                if(_.hightLightedEntities.indexOf(entity.id) === -1
                    || (!_._initedEntities.hasOwnProperty(entity.id)
                        || !_._initedEntities[entity.id] === null)
                )
                {
                    return;
                }

                entity.components.forEach(function (component) {
                    switch (component.id) {
                        case CubeDrawComponent.id:
                            let obj = _.renderingSystem.getDrawableEntity(entity);
                            if(obj)
                            {
                                obj.components.forEach(function (drawableComponent) {
                                    _._restoreEntity(entity.id, drawableComponent.object3d);
                                    _._highLightEntity(entity.id, drawableComponent.object3d);
                                    if(_._entitiesForRestore.length > 0) {
                                        let restoreEntityIndex = _._entitiesForRestore.indexOf(entity.id);
                                        if(restoreEntityIndex >= 0) {
                                            delete _._entitiesForRestore[restoreEntityIndex];
                                            let index = _.hightLightedEntities.indexOf(entity.id);
                                            if(index >= 0) {
                                                _._restoreEntity(entity.id, drawableComponent.object3d);
                                                delete _.hightLightedEntities[index];
                                            }
                                        }
                                    }
                                });
                            }
                            break;
                    }
                });
            });
        }

    }
}

export {HighLightSystem}