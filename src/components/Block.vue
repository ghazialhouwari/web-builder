<script setup lang="ts">
	import { ref } from 'vue';
	import { IBlock, IGridItem } from '@/utils/types';
	import { useGridStore } from '@/store/grid';
	import useBlockDraggable from '@/composables/useBlockDraggable';

	interface Props {
		block: IBlock;
	}
	const props = defineProps<Props>();

	const gridStore = useGridStore();
	const blockItem = ref<HTMLElement | null>(null);
	const { isDragging, offset, width, height } = useBlockDraggable({
		blockItem,
		block: props.block,
		onEnd: addBlockToGrid,
	});

	function addBlockToGrid() {
		const item: IGridItem = {
			gridArea: gridStore.draggedGridItemArea!,
			block: props.block,
		};
		gridStore.addItem(item);
	}
</script>

<template>
	<li ref="blockItem">
		<div class="block__item">
			<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
			<h4>{{ block.title }}</h4>
		</div>
		<div
			v-if="isDragging"
			class="block__item block__item__placeholder"
			:class="{ 'block__item--drag': isDragging }"
			:style="{
				'--x-offset': `${offset.x}px`,
				'--y-offset': `${offset.y}px`,
				'--width': `${width}px`,
				'--height': `${height}px`,
			}"
		>
			<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
			<h4>{{ block.title }}</h4>
		</div>
	</li>
</template>

<style scoped>
	.block__item {
		position: relative;
		user-select: none;
		cursor: grab;
		padding: 12px;
		border-radius: 4px;
		display: flex;
	}
	.block__item:hover {
		background: var(--site-hover);
	}
	.block__item--drag {
		background: var(--site-hover);
		box-shadow: var(--site-box-shadow);
	}
	.block__item__placeholder {
		position: absolute;
		z-index: 999;
		opacity: 0.9;
		width: var(--width, auto);
		height: var(--height, auto);
		top: var(--y-offset);
		left: var(--x-offset);
	}
</style>
