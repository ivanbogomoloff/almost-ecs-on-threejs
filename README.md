# Almost ECS implementation on javascript

Entity Component System implementation that used threejs for renderer

This is only started project and NOT PRODUCTION ready.

Now it's not ready and in working process.

## Description 

This is implimentation based on articles from `t-machine.org` and some reports from youtube.

This is my vision and glad for critics and recomendations.

Please welcome, by pull requests of course.

### Current arch is Entity->Component<->System

Current implementation has few common files:

- `src/IEntity.js`
- (not implemented) `src/IComponent.js`
- `src/ISystem.js`

#### Entity

Entity must be a simple string, like `id`, but current impl. has few methods for
marks `entity` to attach behavior:

- addComponent
- getComponent
- getComponentWithParams

Entity store only strings. Not objects. Only strings, for example:

```javscript
let entity1 = new IEntity('my_id_1');
let entity2 = new IEntity('my_id_2');
//etc..
````

In fact it simple `strings`, but in current relation it is objects. 

But as you can see it's very simple object.

#### Component

Component must stores only data, but current implementations of same components
uses as `Factory` for creating "components" in `systems`. 

And Component work in progress...

Current implementation example:

```javascript
const Component = {
    ID: 'identifier',
    data: {}
};
````

#### System

System - it implementation for components. 

System must do a main logic for application.
For example: RenderSystem, MovementSystem, Raycasting etc...

Any system can have subsystems . In current implementation this implemented by `addDependncy` method

#### Other files 

ECS.js - is common class/function object for basic operations like:

- create entity
- add component to entity
- add component to system
- create system
- add component to system
- add entity to system
- control initialization for systems (ordering etc...)

current ECS.js implementations like a `Registry` that helps for debuging and linking with other tools like `Editor`

ECS.js - is simple glue and can be removed if it's not nessecessary for you


## Current problems

- Some components store self instances per entities
- Some components create instances per entities
- Directory Game must be renamed
