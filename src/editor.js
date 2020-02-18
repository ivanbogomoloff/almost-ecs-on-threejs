//Core
import {ECS} from "./ECS/ECS";
import {ThreeSystem} from "./Game/System/Render/Webgl/ThreeSystem";
import {FpsLoopHelper} from "./Helper/Loop/FpsLoopHelper";
import {SceneComponent} from "./Game/Component/SceneComponent";
import {CameraComponent} from "./Game/Component/CameraComponent";
import {RenderComponent} from "./Game/Component/RenderComponent";
import {PlaneDrawComponent} from "./Game/Component/Drawable/PlaneDrawComponent";
import {CubeDrawComponent} from "./Game/Component/Drawable/CubeDrawComponent";
import {PointLightComponent} from "./Game/Component/Drawable/Light/PointLightComponent";
import {CameraObserverSystem} from "./Game/System/Camera/CameraObserverSystem";
import {PlaneSurfaceComponent} from "./Game/Component/Math/PlaneSurfaceComponent";
import {Vector4dComponent} from "./Game/Component/Math/Vector4dComponent";
import {RayCasterSystem} from "./Game/System/RayCasterSystem";
import {HightLightMeshComponent} from "./Game/Component/HightLightMeshComponent";
import {PositionComponent} from "./Game/Component/PositionComponent";
import {MovementSystem} from "./Game/System/MovementSystem";
import {Config} from "./Game/Config";
// Editor
import Vue from 'vue/dist/vue.esm'
import {EDITOR} from "./Editor/EDITOR";
import LeftPanel from './Editor/LeftPanel.vue'
import RightPanel from './Editor/RightPanel.vue'
import {HighLightSystem} from "./Editor/System/HighLightSystem";

let userEntity = ECS.entity.create('user');
ECS.entity.addComponent(userEntity, ECS.component.create(CameraComponent.id));
ECS.entity.addComponent(userEntity, ECS.component.create(RenderComponent.id));

let mapEntity = ECS.entity.create('map');
ECS.entity.addComponent(
    mapEntity,
    ECS.component.create(PlaneDrawComponent.id)
).addComponent(
    mapEntity,
    ECS.component.create(PlaneSurfaceComponent.id)
).addComponent(
    mapEntity,
    ECS.component.create(SceneComponent.id)
);

let cubeEntity = ECS.entity.create('cube_1');
ECS.entity.addComponent(
    cubeEntity,
    ECS.component.create(CubeDrawComponent.id),
    {color: 0xB404AE }  //Purple
).addComponent(
    cubeEntity,
    ECS.component.create(PositionComponent.id),
    {x: 0, y: 1 / 2, z: 0}
).addComponent(
    cubeEntity,
    ECS.component.create(HightLightMeshComponent.id)
);

let cubeEntity2 = ECS.entity.create('cube_2');
ECS.entity.addComponent(
    cubeEntity2,
    ECS.component.create(CubeDrawComponent.id),
    {color: 0xB40404 }  //Red
).addComponent(
    cubeEntity2,
    ECS.component.create(PositionComponent.id),
    {x: 4, y: 1 / 2, z: 0}
).addComponent(
    cubeEntity2,
    ECS.component.create(HightLightMeshComponent.id)
);

let lightEntity = ECS.entity.create('map_light');
ECS.entity.addComponent(
    lightEntity,
    ECS.component.create(PointLightComponent.id)
).addComponent(
    lightEntity,
    ECS.component.create(Vector4dComponent.id)
);

let cameraObserverSystem = new CameraObserverSystem();
ECS.system.add('camera_observer', cameraObserverSystem);
ECS.system.registerEntity('camera_observer', userEntity);

let renderingSystem = new ThreeSystem(document.getElementById('render'));
ECS.system.add('render', renderingSystem);

ECS.system.registerEntity('render', userEntity);
ECS.system.registerEntity('render', mapEntity);
ECS.system.registerEntity('render', lightEntity);
ECS.system.registerEntity('render', cubeEntity);
ECS.system.registerEntity('render', cubeEntity2);

let movementSystem = new MovementSystem(renderingSystem);
ECS.system.add('movement', movementSystem);

ECS.system.registerEntity('movement', cubeEntity);
ECS.system.registerEntity('movement', cubeEntity2);

let rayCasterSystem = new RayCasterSystem(renderingSystem);
ECS.system.add('raycaster', rayCasterSystem);
ECS.system.registerEntity('raycaster', cubeEntity);
ECS.system.registerEntity('raycaster', cubeEntity2);

/**
 * EDITOR SYSTEMS
 */
ECS.system.add('editor.high_light', new HighLightSystem(renderingSystem));
ECS.system.registerEntity('editor.high_light', cubeEntity);
ECS.system.registerEntity('editor.high_light', cubeEntity2);
ECS.system.registerEntity('editor.high_light', mapEntity);

ECS.system.init();

let fps = Config.getFps();
let loop = new FpsLoopHelper(function () {
    ECS.systems.forEach(function (system) {
        if(ECS.system.enabled(system.id)) {
            system.loop();
        }
    });
}, fps);

loop.run();

/**
 * EDITOR START HERE!
 */
Vue.config.productionTip = false;
EDITOR.version = '1.0';
EDITOR.entities = ECS.entities;
EDITOR.entities_high_lighted_counter = 0;

EDITOR.vue = new Vue({
    el: '#editor',
    data: {
        showRightPanel: false,
        entityActionShow: false,
        selectedEntity: null,
        entityAction: ''
    },
    components: {
        'left-panel': LeftPanel,
        'right-panel': RightPanel
    }
});

EDITOR.addEntityAction('high_light_on', function (entity) {
    if(ECS.entity.has(entity) && ECS.system.hasSystem('editor.high_light'))
    {
        let system = ECS.system.getSystem('editor.high_light');
        ECS.system.disableSystem('raycaster');
        system.highLight(entity);
        EDITOR.entities_high_lighted_counter++;
    }
});
EDITOR.addEntityAction('high_light_off', function (entity) {
    if(ECS.entity.has(entity) && ECS.system.hasSystem('editor.high_light'))
    {
        let system = ECS.system.getSystem('editor.high_light');
        system.undoHighLight(entity);
        EDITOR.entities_high_lighted_counter--;
        // Can highlight many entities and when all unhighlighted, then
        // enable raycaster!
        if(EDITOR.entities_high_lighted_counter <= 0) {
            ECS.system.enableSystem('raycaster');
            EDITOR.entities_high_lighted_counter = 0;
        }
    }
});

EDITOR.addEntityAction('move', function (entity) {
    EDITOR.vue.entityActionShow = true;
    EDITOR.vue.showRightPanel   = true;
    EDITOR.vue.entityAction     = 'move';
    EDITOR.vue.selectedEntity   = entity;
});