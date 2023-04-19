<script setup lang="ts">
	import { ref } from 'vue';
	import { IBlock, IGridItem } from '@/utils/types';
	import { useGridStore } from '@/store/grid';
	import useBlockDraggable from '@/composables/useBlockDraggable';

	interface Props {
		item: IBlock;
	}
	defineProps<Props>();

	const gridStore = useGridStore();
	const blockItem = ref<HTMLElement | null>(null);
	const { isDragging, offset } = useBlockDraggable({
		blockItem,
		onEnd: addBlockToGrid,
	});

	function addBlockToGrid() {
		const item: IGridItem = {
			content: 'item',
			gridArea: gridStore.draggedGridItemArea!,
		};
		gridStore.addItem(item);
	}
</script>

<template>
	<div ref="blockItem">
		<v-list-item class="block__item" active-color="primary">
			<v-list-item-title>{{ item.title }}</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isDragging"
			class="block__item block__item__placeholder"
			active-color="primary"
			:style="{
				'--x-offset': `${offset.x}px`,
				'--y-offset': `${offset.y}px`,
			}"
		>
			<v-list-item-title>{{ item.title }}</v-list-item-title>
		</v-list-item>
	</div>
</template>

<style scoped>
	.block__item {
		position: relative;
		user-select: none;
		cursor: grab;
	}
	.block__item__placeholder {
		position: absolute;
		opacity: 0.5;
		top: var(--y-offset);
		left: var(--x-offset);
		border: 1px solid rgba(0, 0, 0, 0.3);
	}
</style>
