<template>
		<div v-if="show" id="controls-right" style="max-height: 800px; overflow: auto">
			<entity-actions
				v-bind:show="showEntityActions"
			></entity-actions>
		</div>
</template>
<script>
	import EntityActionsPanel from './RightPanel/EntityActionsPanel.vue';

    export default {
        props: {
            show: Boolean,
            showEntityActions: Boolean
        },
        name: 'RightPanel',
        components: {
			'entity-actions': EntityActionsPanel
        }
    }
</script>
<style>
	#controls-right {
		position: absolute;
		width: 200px;
		background: black;
		opacity: 0.6;
		color: white;
		font-size: 13px;
		right: 0;
	}

	#controls-right:hover {
		opacity: 1;
	}

	table , table td {
		border-collapse: collapse;
		border: 1px solid white
	}
	a {
		color: white;
		text-decoration: none;
	}

	h1, h2 {
		font-size: 13px;
	}

	hr {
		height: 2px;
		background: black;
	}
</style>