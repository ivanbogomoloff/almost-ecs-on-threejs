<template>
	<li>
		<div
			:class="{bold: isFolder, selected: isSelected}"
			@click="toggle">
			{{ item.name }}
			<span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
		</div>
		<ul v-show="isOpen" v-if="isFolder">
			<tree-item
				class="item"
				v-for="(child, index) in item.children"
				:key="index"
				:item="child"
				@editor-action-selected="$emit('editor-action-selected', $event)"
				@editor-action-de-selected="$emit('editor-action-de-selected', $event)"
			></tree-item>
		</ul>
	</li>
</template>
<script>
	// FROM: https://ru.vuejs.org/v2/examples/tree-view.html
	export default {
	    name: 'tree-item',
        props: {
            item: Object
        },
        data: function () {
            return {
                isOpen: false
            }
        },
        computed: {
            isSelected: function(){
                return this.item.hasOwnProperty('selected')
	                && this.item.selected === true;
            },
            isFolder: function () {
                return this.item.children &&
                    this.item.children.length
            }
        },

        methods: {
            toggle: function () {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen
                }
                else if (this.item.hasOwnProperty('selected'))
                {
                    this.item.selected = !this.item.selected;
                    if(this.item.selected)
                    {
                        if(this.item.hasOwnProperty('editor_action')) {
                            this.$emit('editor-action-selected', this.item);
                        }
                    }
                    else {
                        if(this.item.hasOwnProperty('editor_action')) {
                            this.$emit('editor-action-de-selected', this.item);
                        }
                    }
                }
            }
        }
    }
</script>