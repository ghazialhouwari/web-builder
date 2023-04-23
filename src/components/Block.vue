<script setup lang="ts">
	import { ref } from 'vue';
	import { SiteBlock } from '@/utils/types';
	import { useSectionsStore } from '@/store/sections';
	import useBlockDraggable from '@/composables/useBlockDraggable';

	const props = defineProps<{
		block: SiteBlock;
	}>();

	const sectionsStore = useSectionsStore();

	const blockItem = ref<HTMLElement | null>(null);
	const { isDragging, offset, width, height } = useBlockDraggable({
		blockItem,
		block: props.block,
		onEnd: sectionsStore.addBlock,
	});
</script>

<template>
	<li ref="blockItem">
		<div class="block__item">
			<slot />
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
				<slot />
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
