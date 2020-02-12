import * as THREE from "three";
import {CubeDrawComponent} from "../Component/Drawable/CubeDrawComponent";
import {HightLightMeshComponent} from "../Component/HightLightMeshComponent";
import {CameraComponent} from "../Component/CameraComponent";
import {RenderComponent} from "../Component/RenderComponent";

class RayCasterSystem {
    constructor(renderingSystem) {
        this.camera = null;
        this.renderer = null;
        this.rayCaster = null;
        this.mouseVector2 = null;
        this.hightLightComponent = null;
        this.renderingSystem = renderingSystem;
        this._disabled = false;
        this._needRestore = false;
        this.entities = [];
    }

    init(id, entities) {
        this.entities = entities;
        let _ = this;
        this.rayCaster = new THREE.Raycaster();
        this.mouseVector2 = new THREE.Vector2( 1, 1 );
        this.camera = CameraComponent.init();
        this.renderer = RenderComponent.init();
        this.hightLightComponent = HightLightMeshComponent;

        if(this.renderer) {
            this.renderer.domElement.addEventListener('mousemove', function (e) {
                if(_._disabled) {
                    return true;
                }

                e.preventDefault();
                _._highLight(e);
            });
        }

    }

    _highLight(event){
        let _ = this;
        if(_.camera != null
            && _.renderer != null
        )
        {
            _.entities.forEach(function (entity) {
                if(_.renderingSystem)
                {
                    _._iterateEntityComponents(entity, event);
                }
            });
        }
    }

    _iterateEntityComponents(entity, event)
    {
        let _ = this;
        entity.components.forEach(function (component) {
            switch (component.id) {
                case CubeDrawComponent.id:
                    let obj = _.renderingSystem.getDrawableEntity(entity);
                    if(obj && _.hightLightComponent != null)
                    {
                        obj.components.forEach(function (drawableComponent) {
                            // Handle system disable!
                            if(_._needRestore) {
                                _.hightLightComponent.restore(entity.id, drawableComponent.object3d);
                            } else {
                                _.hightLightComponent.load(entity.id, drawableComponent.init_material);
                                _.findIntersection({
                                    id: entity.id,
                                    object3d: drawableComponent.object3d
                                }, event);
                            }
                        });
                    }
                    break;
            }
        });
    }

    findIntersection(entityForTest, event) {
        if(event === null) {
            return;
        }
        let self = this;
        self.hightLightComponent.restore(entityForTest.id, entityForTest.object3d);
        self.rayCaster.setFromCamera( self.mouseVector2, self.camera );

        self.mouseVector2.x = ( event.clientX / self.renderer.domElement.clientWidth ) * 2 - 1;
        self.mouseVector2.y = - ( event.clientY / self.renderer.domElement.clientHeight ) * 2 + 1;

        let intersects = self.rayCaster.intersectObject(entityForTest.object3d);
        if(intersects != null && intersects.length > 0)
        {
            let intersection = intersects[0];
            let intersectMesh = intersection.object;

            if(self.hightLightComponent) {
                self.hightLightComponent.highlight(entityForTest.id, intersectMesh);
            }
        }
    }

    loop(){
        // Handle system disable!
        if(this._needRestore) {
            let _ = this;
            _.entities.forEach(function (entity) {
                _._iterateEntityComponents(entity);
            });
            _._needRestore = false;
            _._disabled = true;
        }
    }

    disable(){
        this._needRestore = true;
    }

    enable(){
        this._disabled = false;
    }
}

export {RayCasterSystem}