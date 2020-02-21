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
	
</style>