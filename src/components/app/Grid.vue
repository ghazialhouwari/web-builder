<script lang="ts" setup>
	import { computed, inject, ref, Ref } from 'vue';
	import { Section } from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Components
	import GridBlock from '@/components/grid/Block.vue';
	import GridCells from '@/components/grid/GridCells.vue';
	import GridDraggedBlock from '@/components/grid/DraggedBlock.vue';

	const section = inject<Ref<Section>>('section');
	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));
	const rowCount = inject<Ref<number>>('rowCount', ref(0));

	// Store definition
	const gridStore = useGridStore();
	const columnCount = computed(() => gridStore.columnCount);
</script>

<template>
	<div
		:id="`grid${sectionIndex}`"
		class="grid"
		:class="{
			'view-type--mobile': gridStore.viewType === 'mobile',
		}"
	>
		<template v-if="section?.blocks.length">
			<GridBlock
				v-for="(block, blockIndex) in section?.blocks"
				:key="block.id"
				:blockIndex="blockIndex"
				:block="block"
			/>
		</template>
		<GridCells
			v-if="
				gridStore.isGridActive && gridStore.activeSectionIndex === sectionIndex
			"
		/>
		<GridDraggedBlock
			v-if="
				gridStore.isGridActive &&
				gridStore.activeSectionIndex === sectionIndex &&
				gridStore.draggedBlockLayout
			"
			:blockLayout="gridStore.draggedBlockLayout"
		/>
	</div>
</template>

<style>
	.grid {
		display: grid;
		position: relative;
		gap: var(--grid-gap);
		grid-template-rows: repeat(
			v-bind(rowCount),
			minmax(calc(var(--container-width) * var(--grid-row-height-ratio)), auto)
		);
		grid-template-columns:
			minmax(var(--grid-gutter), 1fr)
			repeat(v-bind(columnCount), minmax(0, var(--cell-max-width)))
			minmax(var(--grid-gutter), 1fr);
	}
	.grid.view-type--mobile {
		grid-template-rows: repeat(v-bind(rowCount), 30px);
	}
</style>
