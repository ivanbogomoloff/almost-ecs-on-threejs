<template>
	<div>
		<h2>Entites (<span>{{ entitiesCount() }}</span>) : <a href="" title="Add new Entity">+</a></h2>
		<div id="controls-left_entities-container" class="controls-panel-container">
			<table>
				<tr>
					<td width="80%">
						<select name="" id="select-entity" style="width: 100%">
							<option value="" >Select entity</option>
							<option :value="entity" v-for="entity in entities">{{ entity }}</option>
						</select>
					</td>
					<td width="20%"><select class="form-control">
						<option value="" >Action</option>
						<option :value="action.id" v-for="action in entityActions">{{ action.title }}</option>
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
	            entityActions: EDITOR.entityActions
            };
        }
    }
</script>