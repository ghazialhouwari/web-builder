<script setup lang="ts">
	import { ref, toRef } from 'vue';
	import useGridItemDraggable from '@/composables/useGridItemDraggable';
	import { IGridItem, IGridItemArea } from '@/utils/types';

	interface Props {
		item: IGridItem;
		index: number;
	}

	const props = defineProps<Props>();

	/* eslint-disable no-unused-vars */
	const emit = defineEmits({
		start: () => true,
		move: (x: number, y: number, gridArea: IGridItemArea) => true,
		end: (index: number) => true,
	});

	const gridItem = ref<HTMLElement | null>(null);
	const gridArea = toRef(props.item, 'gridArea');

	const { offset } = useGridItemDraggable({ gridItem, onStart, onMove, onEnd });

	function onStart() {
		emit('start');
	}
	function onMove(x: number, y: number) {
		emit('move', x, y, props.item.gridArea);
	}
	function onEnd() {
		emit('end', props.index);
	}
</script>

<template>
	<div
		ref="gridItem"
		class="grid-wrapper__item d-flex align-center justify-center"
		:style="{
			'--row-start': gridArea.rowStart,
			'--col-start': gridArea.columnStart,
			'--row-end': gridArea.rowEnd,
			'--col-end': gridArea.columnEnd,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		{{ props.item.block.title }}
	</div>
</template>

<style scoped>
	.grid-wrapper__item {
		position: relative;
		user-select: none;
		cursor: grab;
		background: var(--site-hover);
		grid-area: var(--row-start) / var(--col-start) / var(--row-end) /
			var(--col-end);
		transform: translate(var(--x-offset), var(--y-offset));
	}
</style>
