<script lang="ts" setup>
	import { inject, ref, Ref } from 'vue';
	import { Section } from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Composables
	import { useWindowSize } from '@/composables/useWindowSize';
	// Components
	import GridItem from '@/components/GridItem.vue';
	import GridCells from '@/components/GridCells.vue';
	import DraggedBlock from '@/components/DraggedBlock.vue';

	const section = inject<Ref<Section>>('section');
	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));
	const rowCount = inject<Ref<number>>('rowCount', ref(0));

	// Store definition
	const gridStore = useGridStore();
	// Use composables
	useWindowSize((width: number) => {
		const { viewType, setViewType, updateGrid } = gridStore;
		if (viewType === 'desktop' && width <= 767) {
			setViewType('mobile');
		} else if (viewType === 'mobile' && width > 767) {
			setViewType('desktop');
		} else {
			updateGrid();
		}
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
			v-for="(block, blockIndex) in section?.blocks"
			:key="block.id"
			:blockIndex="blockIndex"
			:block="block"
		/>
		<GridCells
			v-if="gridStore.isDragging && gridStore.activeSectionIndex === sectionIndex"
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
