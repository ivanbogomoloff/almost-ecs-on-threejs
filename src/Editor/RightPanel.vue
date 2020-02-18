<template>
	<div v-if="show" id="controls-right" style="max-height: 800px; overflow: auto">
		<EntityAction v-bind:show="entity_action_show" v-bind:entity="entity" v-bind:action="entity_action" />
	</div>
</template>
<script>
    import {Config} from "../Game/Config";
    import {EDITOR} from "./EDITOR";
    import EntityAction from './RightPanel/EntityAction.vue';

    export default {
        name: 'RightPanel',
	    props: {
            show: false,
            entity_action_show: false,
		    entity: '',
            entity_action: ''
	    },
	    watch: {
		    entity: function (v) {

            }
	    },
        components: {
            EntityAction
        }
    }
</script>
<style>
	#controls-right {
		position: absolute;
		width: 200px;
		height: 100%;
		background: black;
		opacity: 0.6;
		color: white;
		font-size: 13px;
		right: 0;
	}

	#controls-right:hover {
		opacity: 1;
	}

	.controls-panel {
		background: #0083b5;
	}

	table , table td {
		border-collapse: collapse;
		border: 1px solid white
	}

	.controls-panel-container {
		max-height: 150px;
		overflow: auto;
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