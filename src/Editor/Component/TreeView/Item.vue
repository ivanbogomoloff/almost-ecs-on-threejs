<template>
	<li>
		<div
			:class="{bold: isFolder}"
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
				@make-folder="$emit('make-folder', $event)"
				@add-item="$emit('add-item', $event)"
			></tree-item>
			<li class="add" @click="$emit('add-item', item)">+</li>
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
            },
            /**
             * This method allow to create sub tree in item by dbclicking
             * If need to create make subtrees add @ondbclick and invoke this makeFolder
             */
            makeFolder: function () {
                if (!this.isFolder) {
                    this.$emit('make-folder', this.item);
                    this.isOpen = true
                }
            }
        }
    }
</script>