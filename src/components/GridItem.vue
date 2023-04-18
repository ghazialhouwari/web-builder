<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { useDraggable } from '@vueuse/core';
	import { gridAreaToArray } from '@/utils';
	import { IGridItem } from '@/utils/types';

	import { useGridStore } from '@/store/grid';

	interface Props {
		item: IGridItem;
		index: number;
		placeholder: string;
	}

	const props = defineProps<Props>();
	const emit = defineEmits({
		updatePlaceholderPosition: (
			x: number,
			y: number,
			columnSize: number,
			rowSize: number
		) => true,
		move: () => true,
		end: () => true,
	});

	const gridStore = useGridStore();

	const gridItem = ref<HTMLElement>();

	onMounted(() => {
		if (gridItem.value) {
			const initialPos = { x: 0, y: 0 };

			const { x, y, style } = useDraggable(gridItem.value, {
				onStart: () => {
					if (!gridItem.value) return;
					initialPos.x = gridItem.value.offsetLeft;
					initialPos.y = gridItem.value.offsetTop;
				},
				onMove: () => {
					emit('move');

					const [rowStart, columnStart, rowEnd, columnEnd] = gridAreaToArray(
						props.item.style.gridArea
					);

					emit(
						'updatePlaceholderPosition',
						x.value,
						y.value,
						columnEnd - columnStart,
						rowEnd - rowStart
					);

					// Update the item's transform property relative to its original position
					const deltaX = x.value - initialPos.x;
					const deltaY = y.value - initialPos.y;
					gridStore.updateItemTransformByIndex(props.index, deltaX, deltaY);
				},
				onEnd: () => {
					emit('end');
					gridStore.updateItemGridAreaByIndex(props.index, props.placeholder);
					gridStore.updateItemTransformByIndex(props.index, 0, 0);
				},
			});
		}
	});
</script>

<template>
	<div
		ref="gridItem"
		class="grid-item"
		:style="{
			gridArea: props.item.style.gridArea,
			transform: props.item.style.transform,
		}"
	>
		{{ props.item.content }}
	</div>
</template>

<style scoped>
	.grid-item {
		position: relative;
		user-select: none;
		cursor: grab;
		background: lightblue;
	}
</style>
