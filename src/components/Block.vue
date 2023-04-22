<script setup lang="ts">
	import { ref } from 'vue';
	import { useGridStore } from '@/store/grid';
	import { useSectionsStore } from '@/store/sections';
	import useBlockDraggable from '@/composables/useBlockDraggable';
	import { SiteBlock } from '@/utils/types';

	const props = defineProps<{
		block: SiteBlock;
	}>();

	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();
	const blockItem = ref<HTMLElement | null>(null);
	const { isDragging, offset, width, height } = useBlockDraggable({
		blockItem,
		block: props.block,
		onEnd: addBlock,
	});

	function addBlock() {
		if (gridStore.sectionIndex !== null && gridStore.draggedBlockLayout) {
			sectionsStore.addBlock(
				gridStore.sectionIndex,
				props.block.type,
				gridStore.draggedBlockLayout
			);
		}
	}
</script>

<template>
	<li ref="blockItem">
		<div class="block__item">
			<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
			<h4>{{ block.type }}</h4>
		</div>
		<Teleport v-if="isDragging" to="#dragged-block">
			<div
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
				<h4>{{ block.type }}</h4>
			</div>
		</Teleport>
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
