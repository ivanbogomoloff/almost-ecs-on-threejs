<template>
	<div v-if="show" class="controls-panel">
		<h2 class="right-panel-h">Entity actions</h2>
		<div id="controls-right_entity-actions-container" class="controls-panel-container">
			<div v-for="entityAction in actions" class="controls-right_entity-action-item">
				<h3 class="right-panel-h">{{ entityAction.entity_id }}</h3>
				<p class="debug" style="display: none;">
					{{ entityAction }}
				</p>
				<div class="controls-right_entity-action-item-a-list">
					<div v-if="hasComponent(entityAction.entity_id, 'position')" class="controls-right_entity-action-control-item">
						<position
							v-bind:entity_id="entityAction.entity_id"
						></position>
					</div>
					<div v-if="hasComponent(entityAction.entity_id, 'highlight')" class="controls-right_entity-action-control-item">
						<table class="entity-control-table">
							<tr><td colspan="2">Highlight</td></tr>
							<tr><td>OFF/ON</td><td>
								<input type="checkbox" >
							</td></tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<hr>
	</div>
</template>
<script>
	import {EDITOR} from "../EDITOR";
    import Position from "./Position.vue";

    export default {
        props: {
            actions: Array
        },
		watch: {
            /**
             * When selected entities in LeftPanel
             * This will update!
             * And we can rebuild UI for entity actions here
             */
            actions: function () {

            }
		},
		methods: {
            hasComponent: function (entity_id, component_id) {
				return EDITOR.hasEntityComponent(entity_id, component_id);
            }
		},
        computed: {
            show: function() {
                return this.actions.length > 0
            }
        },
        components: {
            Position

        }
	}
</script>
<style>
	.controls-right_entity-action-item {
		padding: 2px;
	}
	.right-panel-h {
		margin: 0; padding: 2px
	}
	.entity-control-table {
		width: 100%;
	}
	.controls-right_entity-action-item {
		border: 1px solid #c3c3c3;
		background: #005490;
		margin-bottom: 5px;
	}
</style>