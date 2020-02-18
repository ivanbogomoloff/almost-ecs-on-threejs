<template>
		<div v-if="show" id="controls-right" style="max-height: 800px; overflow: auto">

		</div>
</template>
<script>

    export default {
        name: 'RightPanel',
	    data: function () {
		    return {show: true};
        },
        components: {

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