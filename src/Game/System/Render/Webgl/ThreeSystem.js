import * as THREE from "three";
import {ISystem} from "../../../../ECS/ISystem";
import {CameraComponent} from "../../../Component/CameraComponent";
import {SceneComponent} from "../../../Component/SceneComponent";
import {RenderComponent} from "../../../Component/RenderComponent";
import {PlaneDrawComponent} from "../../../Component/Drawable/PlaneDrawComponent";
import {CubeDrawComponent} from "../../../Component/Drawable/CubeDrawComponent";
import {PointLightComponent} from "../../../Component/Drawable/Light/PointLightComponent";
import {PlaneSurfaceComponent} from "../../../Component/Math/PlaneSurfaceComponent";
import {Vector4dComponent} from "../../../Component/Math/Vector4dComponent";
import {PositionComponent} from "../../../Component/PositionComponent";

class ThreeSystem extends ISystem {
    constructor(id, renderDom) {
        super(id);

        this.viewPort = renderDom;
        this.window = window;
        this.renderWidth = window.innerWidth - 10;
        this.renderHeight = window.innerHeight - 10;

        this.renderableEntites = [];
        this.renderableEntites_indexMap = {};
        this.renderableEntites_index = 0;
        this.camera = null;
        this.renderer = null;

        this.mapLightVector = null;
        this.mapLightMesh = null;
        this.mapShadowsSurface = null;
        this.mapMesh = null;

        this.updatePositionData = {};
    }

    init() {
        super.log('init start');
        this.camera = this.getComponent(null, CameraComponent.ID).init();
        this.camera.position.set(0, 2, -1);
        this.scene = this.getComponent(null, SceneComponent.ID).init();
        this.renderer = this.getComponent(null, RenderComponent.ID).init();
        this.renderer.setSize(
            this.renderWidth,
            this.renderHeight
        );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.viewPort.appendChild(this.renderer.domElement);

        let _ = this;

        let mapEntity = _.getEntity('map');
        this.mapShadowsSurface = null;
        this.mapMesh = null;
        if (mapEntity != null) {
            this.mapMesh = _.getComponent(mapEntity, PlaneDrawComponent.ID).init();
            if (this.mapMesh != null) {
                this.scene.add(this.mapMesh.object3d);
            }

            this.mapShadowsSurface = _.getComponent(mapEntity, PlaneSurfaceComponent.ID).init();
        }

        let mapLightEntity = _.getEntity('map_light');
        this.mapLightVector = null;
        this.mapLightMesh = null;
        if (mapLightEntity != null) {
            this.mapLightVector = _.getComponent(mapLightEntity, Vector4dComponent.ID).init();
            this.mapLightMesh = _.getComponent(mapLightEntity, PointLightComponent.ID).init();
            if (this.mapLightMesh != null) {
                this.mapLightMesh.object3d.lookAt(this.scene.position);
                this.scene.add(this.mapLightMesh.object3d);
                this.mapLightVector.x = this.mapLightMesh.object3d.position.x;
                this.mapLightVector.y = this.mapLightMesh.object3d.position.y;
                this.mapLightVector.z = this.mapLightMesh.object3d.position.z;
                this.mapLightVector.w = 0.001;
            }
        }

        let entities = this.getEntities().filter(function (entity) {
            return entity.id !== 'map' && entity.id !== 'map_light';
        });

        entities.forEach(function (entity) {
            _.log('entity = ' + entity.id + ' start init');
            let cube = _.getComponentWithParams(entity, CubeDrawComponent.ID);
            if (cube) {
                let cubeInstance = cube.self.init(cube.params);
                let positionComponent = _.getComponentWithParams(entity, PositionComponent.ID);
                if (positionComponent) {
                    positionComponent.self.init(entity.id, positionComponent.params);
                    cubeInstance.object3d.position.set(
                        positionComponent.params.x,
                        positionComponent.params.y,
                        positionComponent.params.z
                    );
                }

                _.scene.add(cubeInstance.object3d);
                _.scene.add(cubeInstance.shadow);
                //
                _.storeDrawableEntity(entity, [cubeInstance]);

                console.log('[system.' + _.id + '] entity = ' + entity.id + ' finish init');
            }
        });
        this.camera.lookAt(this.scene.position);

        this.window.addEventListener('resize', function (e) {
            _.camera.aspect = _.window.innerWidth / _.window.innerHeight;
            _.camera.updateProjectionMatrix();

            _.renderer.setSize(_.window.innerWidth, _.window.innerHeight);
        });
    }

    storeDrawableEntity(entity, components) {
        this.renderableEntites.push({entity: entity, components: components});
        this.renderableEntites_indexMap[entity.id] = this.renderableEntites_index;
        this.renderableEntites_index++;
    }

    /**
     * {
     *     entity: entity,
     *     components: [
     *         ...
     *     ]
     * }
     * @param entity
     * @returns {*}
     */
    getDrawableEntity(entity) {
        let index = this.renderableEntites_indexMap[entity.id];

        return this.renderableEntites[index];
    }

    loop() {
        let _ = this;
        _.renderableEntites.forEach(function (r) {
            let entity = r.entity;
            r.components.forEach(function (drawableComponent) {
                //Update positions
                if (_.isEntityPositionChanged(entity)) {
                    let p = _.getEntityPosition(entity);
                    drawableComponent.object3d.position.set(p.x, p.y, p.z);
                }
                //Update shadows
                if (_.mapShadowsSurface && _.mapLightVector) {
                    drawableComponent.shadow.update(_.mapShadowsSurface, _.mapLightVector);
                }
            });

        });

        this.renderer.render(this.scene, this.camera);
    }

    getEntityPosition(entity) {
        let p = this.updatePositionData[entity.id];

        return p.pop();
    }

    isEntityPositionChanged(entity) {
        return this.updatePositionData.hasOwnProperty(entity.id)
            && this.updatePositionData[entity.id].length > 0;
    }

    updatePosition(entityId, x, y, z, fromSystemId) {
        this.updatePositionData[entityId] = [{
            entity_id: entityId,
            x: x,
            y: y,
            z: z
        }];
    }
}

export {ThreeSystem}