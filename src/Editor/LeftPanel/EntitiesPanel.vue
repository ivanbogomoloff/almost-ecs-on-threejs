<template>
	<div>
		<h2>Entites (<span>{{ entitiesCount() }}</span>) : <a href="" title="Add new Entity">+</a></h2>
		<div id="controls-left_entities-container" class="controls-panel-container">
			<table>
				<tr>
					<td width="80%">
						<select v-model="selectedEntity" name="" id="select-entity" style="width: 100%">
							<option disabled value="">Select entity</option>
							<option :value="entity" v-for="entity in entities">{{ entity }}</option>
						</select>
					</td>
					<td width="20%">
						<select v-model="selectEntityAction" class="form-control">
						<option disabled value="" >Action</option>
						<option v-bind:selected="selectEntityAction === action.id" :value="action.id" v-for="action in entityActions">{{ action.title }}</option>
					</select>
					</td>
				</tr>
			</table>
		</div>
		<hr>
	</div>
</template>

<script>
	import {EDITOR} from "../EDITOR";

    export default {
        data: function(){
            return {
                entities: EDITOR.entities,
	            entitiesCount: function () {
                    return EDITOR.entitiesCount();
                },
	            entityActions: EDITOR.entityActions,
	            selectedEntity: '',
                selectEntityAction: ''
            };
        },
	    watch: {
            selectedEntity: function (v) {
                console.log('[EDITOR] on entity select = '+v);
                this.selectEntityAction = '';
            },
            selectEntityAction: function (v) {
	            if(this.selectedEntity != '' && v)
	            {
                    console.log('[EDITOR] on entity action '+v+' select = '+this.selectedEntity);
                    // DO SOME ACTION WITH ENTITY
		            switch (v) {
			            case EDITOR.ENTITY_ACTION_HIGHLIGHT:
							EDITOR.entityAction('high_light_on', this.selectedEntity);
			                break;
			            case EDITOR.ENTITY_ACTION_HIGHLIGHT_OFF:
                            EDITOR.entityAction('high_light_off', this.selectedEntity);
			                //this.selectedEntity = '';
                            break;
			            case EDITOR.ENTITY_ACTION_MOVE:
							EDITOR.entityAction('move', this.selectedEntity);
			                break;
                    }
	            }
            }
        }
    }
</script>