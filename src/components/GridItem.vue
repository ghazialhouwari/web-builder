<script setup lang="ts">
	import { ref } from 'vue';
	import useGridItemDraggable from '@/composables/useGridItemDraggable';
	import { SectionBlock, SectionBlockLayout } from '@/utils/types';
	import useGrid from '@/composables/useGrid';

	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	/* eslint-disable no-unused-vars */
	const emit = defineEmits({
		start: () => true,
		move: (x: number, y: number, blockLayout: SectionBlockLayout) => true,
		end: (blockIndex: number) => true,
	});

	const gridItem = ref<HTMLElement | null>(null);

	const { viewType } = useGrid();
	const { offset } = useGridItemDraggable({ gridItem, onStart, onMove, onEnd });

	function onStart() {
		emit('start');
	}
	function onMove(x: number, y: number) {
		emit('move', x, y, props.block.layout[viewType.value]);
	}
	function onEnd() {
		emit('end', props.blockIndex);
	}
</script>

<template>
	<div
		ref="gridItem"
		class="grid-wrapper__item d-flex align-center justify-center"
		:style="{
			'--row-start': block.layout[viewType].start.y,
			'--col-start': block.layout[viewType].start.x,
			'--row-end': block.layout[viewType].end.y,
			'--col-end': block.layout[viewType].end.x,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		{{ block.type }}
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
