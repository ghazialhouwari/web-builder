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

	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();

	const gridStore = useGridStore();
	const { columnCount, rowCount } = useGrid();
	const { moveStartHandler, moveHandler, moveEndHandler } = useGridDraggable(
		props.sectionIndex
	);
	const { resizeHanlder } = useGridResize(props.sectionIndex);

	onMounted(() => {
		gridStore.setSectionLayout(props.section.layout);
	});
</script>

<template>
	<div
		id="gridWrapper"
		class="grid-wrapper"
		:style="{
			'--grid-row-count': rowCount,
			'--grid-column-count': columnCount,
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
