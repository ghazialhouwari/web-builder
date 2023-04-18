<script setup lang="ts">
	import { onMounted, ref, toRef } from 'vue';
	import { useDraggable } from '@vueuse/core';
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

	const gridItem = ref<HTMLElement>();
	const gridArea = toRef(props.item, 'gridArea');

	const offset = ref({ x: 0, y: 0 });

	// Update the item's offset relative to its original position
	function updateItemOffset(x: number, y: number) {
		offset.value.x = x - gridItem.value!.offsetLeft;
		offset.value.y = y - gridItem.value!.offsetTop;
	}

	function resetItemOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	onMounted(() => {
		const { x, y } = useDraggable(gridItem.value, {
			onMove: () => {
				emit('move', x.value, y.value);

				updateItemOffset(x.value, y.value);
			},
			onEnd: () => {
				emit('end');
				resetItemOffset();
			},
		});
	});
</script>

<template>
	<div
		ref="gridItem"
		class="GridItem"
		:style="{
			gridArea: `${gridArea.rowStart}/${gridArea.columnStart}/${gridArea.rowEnd}/${gridArea.columnEnd}`,
			transform: `translate(${offset.x}px, ${offset.y}px)`,
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
	}
</style>
