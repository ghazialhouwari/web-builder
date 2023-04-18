<script setup lang="ts">
	import { ref, toRef } from 'vue';
	import useDraggable from '@/composables/useDraggable';
	import { IGridItem, IGridItemArea } from '@/utils/types';

	interface Props {
		item: IGridItem;
		index: number;
		placeholder?: IGridItemArea;
	}

	const props = defineProps<Props>();

	const emit = defineEmits({
		move: (x: number, y: number) => true,
		end: () => true,
	});

	const gridItem = ref<HTMLElement | null>(null);
	const gridArea = toRef(props.item, 'gridArea');

	const { offset } = useDraggable(gridItem, onMove, onEnd);

	function onMove(x: number, y: number) {
		emit('move', x, y);
	}
	function onEnd() {
		emit('end');
	}
</script>

<template>
	<div
		ref="gridItem"
		class="GridItem"
		:style="{
			'--row-start': gridArea.rowStart,
			'--col-start': gridArea.columnStart,
			'--row-end': gridArea.rowEnd,
			'--col-end': gridArea.columnEnd,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		{{ props.item.content }}
	</div>
</template>

<style scoped>
	.GridItem {
		position: relative;
		user-select: none;
		cursor: grab;
		background: lightblue;
		grid-area: var(--row-start) / var(--col-start) / var(--row-end) /
			var(--col-end);
		transform: translate(var(--x-offset), var(--y-offset));
	}
</style>
