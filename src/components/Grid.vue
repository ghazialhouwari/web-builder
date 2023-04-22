<script lang="ts" setup>
	import { useGridStore } from '@/store/grid';
	import useGrid from '@/composables/useGrid';
	import useGridDraggable from '@/composables/useGridDraggable';
	import { Section } from '@/utils/types';

	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedBlock from '@/components/DraggedBlock.vue';

	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();

	const gridStore = useGridStore();
	const { rowCount } = useGrid();
	const { moveStartHandler, moveHandler, moveEndHandler } = useGridDraggable(
		props.section,
		props.sectionIndex
	);
</script>

<template>
	<div
		id="gridWrapper"
		class="grid-wrapper"
		:style="{
			'--grid-row-count': rowCount,
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
		/>
		<GridCells
			v-if="gridStore.isDragging && gridStore.sectionIndex === sectionIndex"
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
</style>
