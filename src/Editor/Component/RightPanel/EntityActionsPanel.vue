<template>
	<div v-if="show" class="controls-panel">
		<h2>Entity actions</h2>
		<div id="controls-right_entity-actions-container" class="controls-panel-container">
			<div v-for="entityAction in actions" class="controls-right_entity-action-item">
				<h3>{{ entityAction.entity_id }}</h3>
				<p class="debug" style="display: none;">
					{{ entityAction }}
				</p>
				<div class="controls-right_entity-action-item-a-list">

				</div>
				<hr>
			</div>
		</div>
		<hr>
	</div>
</template>
<script>
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
        computed: {
            show: function() {
                return this.actions.length > 0
            }
        },
        components: {

        }
	}
</script>