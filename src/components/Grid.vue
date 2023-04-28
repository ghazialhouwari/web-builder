<script lang="ts" setup>
	import { Section } from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Composables
	import useGrid from '@/composables/useGrid';
	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedBlock from '@/components/DraggedBlock.vue';
	// Props
	defineProps<{
		section: Section;
		sectionIndex: number;
		rowCount: number;
	}>();
	// Store definition
	const gridStore = useGridStore();
	// Use composables
	useGrid();
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
		/>
		<GridCells
			v-if="gridStore.isDragging && gridStore.activeSectionIndex === sectionIndex"
			:rowCount="rowCount"
		/>
		<DraggedBlock
			v-if="
				gridStore.isDragging &&
				gridStore.activeSectionIndex === sectionIndex &&
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
