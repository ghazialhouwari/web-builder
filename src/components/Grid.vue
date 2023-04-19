<script lang="ts" setup>
	import { useGridStore } from '@/store/grid';
	import useGrid from '@/composables/useGrid';
	import useGridDraggable from '@/composables/useGridDraggable';

	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedGridItemArea from '@/components/DraggedGridItemArea.vue';

	const gridStore = useGridStore();
	const { rowCount } = useGrid();
	const { moveStartHandler, moveHandler, moveEndHandler } = useGridDraggable();
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
			v-for="(item, index) in gridStore.items"
			:key="index"
			:item="item"
			:index="index"
			@start="moveStartHandler"
			@move="moveHandler"
			@end="moveEndHandler"
		/>
		<GridCells v-if="gridStore.isDragging" />
		<DraggedGridItemArea
			v-if="gridStore.isDragging && gridStore.draggedGridItemArea"
			:gridArea="gridStore.draggedGridItemArea"
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
