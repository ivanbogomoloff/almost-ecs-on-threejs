# Editor

![alt text](https://github.com/ivanbogomoloff/almost-ecs-on-threejs/blob/master/editor.png)

## Instalation

```bash
$ npm install
$ npm start
```

## Editor UI

### Left panel

- Entities
  - EntityName
    - Actions
    - Components
    - Systems
    
    
#### Left panel - `Actions`:
 
Click on this menu will enable Right panel with EntityActions

EntityActions depends on Entity Components.

For example: if entity has position component, change component data will reflect on ALL systems.

But if we want to change position for this entity only in `TARGET SYSTEM`, we need go to `Entites->Entity->Systems->TargetSystem` and change
component data in target system for this entity.
    

## TODO

- In editor: actions log window and history





