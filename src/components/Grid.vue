<script lang="ts" setup>
	import { ref } from 'vue';
	import { useGridStore } from '@/store/grid';
	import useGrid from '@/composables/useGrid';

	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedGridItemArea from '@/components/DraggedGridItemArea.vue';

	const gridStore = useGridStore();
	const gridWrapper = ref<HTMLElement | null>(null);

	const {
		isDragging,
		draggedGridItemArea,
		gridRowCount,
		moveHandler,
		moveEndHandler,
	} = useGrid(gridWrapper);
</script>

<template>
	<div
		ref="gridWrapper"
		id="gridWrapper"
		class="grid-wrapper"
		:style="{
			'--grid-row-count': gridRowCount,
		}"
	>
		<GridItem
			v-for="(item, index) in gridStore.items"
			:key="index"
			:item="item"
			:index="index"
			@move="moveHandler"
			@end="moveEndHandler"
		/>
		<GridCells v-if="isDragging" :gridRowCount="gridRowCount" />
		<DraggedGridItemArea
			v-if="isDragging && draggedGridItemArea"
			:gridArea="draggedGridItemArea"
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
