<template>
	<div v-if="show" class="controls-panel">
		<h2>Entity actions</h2>
		<div id="controls-right_entity-actions-container" class="controls-panel-container">

		</div>
		<hr>
	</div>
</template>
<script>
	export default {
        props: {
            show: Boolean
        },
        components: {

        }
	}
</script>