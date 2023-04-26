<script lang="ts" setup>
	import { onMounted } from 'vue';
	import { Section } from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Composables
	import useGrid from '@/composables/useGrid';
	import useGridResize from '@/composables/useGridResize';
	import useGridDraggable from '@/composables/useGridDraggable';
	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedBlock from '@/components/DraggedBlock.vue';
	// Props
	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();
	// Store definition
	const gridStore = useGridStore();
	// Use composables
	const { rowCount } = useGrid();
	const { moveStartHandler, moveHandler, moveEndHandler } = useGridDraggable(
		props.sectionIndex
	);
	const { resizeHanlder } = useGridResize(props.sectionIndex);
	// Hooks
	onMounted(() => {
		gridStore.setSectionLayout(props.section.layout);
	});
</script>

<template>
	<div
		:id="`gridWrapper${sectionIndex}`"
		class="grid-wrapper"
		:class="{
			'view-type--mobile': gridStore.viewType === 'mobile',
		}"
		:style="{
			'--grid-row-count': rowCount,
			'--grid-column-count': gridStore.columnCount,
		}"
	>
		<GridItem
			v-for="(block, blockIndex) in section.blocks"
			:key="block.id"
			:blockIndex="blockIndex"
			:block="block"
			@start="moveStartHandler"
			@move="moveHandler"
			@end="moveEndHandler"
			@resize="resizeHanlder"
		/>
		<GridCells
			v-if="gridStore.isDragging && gridStore.sectionIndex === sectionIndex"
			:rowCount="rowCount"
		/>
		<DraggedBlock
			v-if="
				gridStore.isDragging &&
				gridStore.sectionIndex === sectionIndex &&
				gridStore.draggedBlockLayout
			"
			:blockLayout="gridStore.draggedBlockLayout"
		/>
	</div>
</template>

<style>
	.grid-wrapper {
		display: grid;
		position: relative;
		gap: var(--grid-gap);
		grid-template-rows: repeat(
			var(--grid-row-count),
			minmax(calc(var(--container-width) * var(--grid-row-height-ratio)), auto)
		);
		grid-template-columns:
			minmax(var(--grid-gutter), 1fr)
			repeat(var(--grid-column-count), minmax(0, var(--cell-max-width)))
			minmax(var(--grid-gutter), 1fr);
	}
	.grid-wrapper.view-type--mobile {
		grid-template-rows: repeat(var(--grid-row-count), 30px);
	}
</style>
