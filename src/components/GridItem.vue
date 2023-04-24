<script setup lang="ts">
	import { defineAsyncComponent, ref } from 'vue';
	import {
		SectionBlock,
		SectionBlockLayout,
		BlockComponentType,
		BlocksComponenets,
		SectionBreakpoints,
	} from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Composables
	import useGridItemResize from '@/composables/useGridItemResize';
	import useGridItemDraggable from '@/composables/useGridItemDraggable';
	// Components
	import BlockResizeHandle from '@/components/BlockResizeHandle.vue';
	const blocks: BlocksComponenets = {
		ButtonBlock: defineAsyncComponent(
			() => import('@/components/ButtonBlock.vue')
		),
		TextBlock: defineAsyncComponent(() => import('@/components/TextBlock.vue')),
		ImageBlock: defineAsyncComponent(() => import('@/components/ImageBlock.vue')),
		QuoteBlock: defineAsyncComponent(() => import('@/components/QuoteBlock.vue')),
	};
	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();
	// Emits

	/* eslint-disable no-unused-vars */
	const emits = defineEmits({
		start: () => true,
		move: (
			x: number,
			y: number,
			blockLayout: SectionBreakpoints<SectionBlockLayout>
		) => true,
		end: (blockIndex: number) => true,
		resize: (blockIndex: number, layout: SectionBlockLayout) => true,
	});
	// Store definition
	const gridStore = useGridStore();

	const currentBlock = ref<BlockComponentType>('ButtonBlock');

	const gridItem = ref<HTMLElement | null>(null);
	const dragHandle = ref<HTMLElement | null>(null);
	const resizeHandle = ref<HTMLElement | null>(null);
	// Use composables
	const { offset } = useGridItemDraggable({
		gridItem,
		dragHandle,
		onStart: () => emits('start'),
		onMove: (x: number, y: number) => emits('move', x, y, props.block.layout),
		onEnd: () => emits('end', props.blockIndex),
	});
	useGridItemResize({
		block: props.block,
		resizeHandle,
		onResize: (layout: SectionBlockLayout) =>
			emits('resize', props.blockIndex, layout),
	});
</script>

<template>
	<div
		ref="gridItem"
		class="grid-item d-flex"
		:style="{
			'--row-start': block.layout[gridStore.viewType].start.y,
			'--col-start': block.layout[gridStore.viewType].start.x,
			'--row-end': block.layout[gridStore.viewType].end.y,
			'--col-end': block.layout[gridStore.viewType].end.x,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		<span ref="dragHandle" class="grid-item__handle"></span>
		<component :is="blocks[currentBlock]" :value="block.value" />
		<div ref="resizeHandle"><BlockResizeHandle /></div>
	</div>
</template>

<style scoped>
	.grid-item {
		position: relative;
		user-select: none;
		background: var(--site-hover);
		grid-area: var(--row-start) / var(--col-start) / var(--row-end) /
			var(--col-end);
		transform: translate(var(--x-offset), var(--y-offset));
		border-width: var(--site-engine-border-width);
		border-style: solid;
		border-color: transparent;
		will-change: border-color;
		transition: border-color 150ms ease;
	}
	.grid-item:hover {
		border-color: var(--site-engine-color);
	}
	.grid-item__handle {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		cursor: grab;
	}
	.grid-item:hover :deep(.grid-item__resize) {
		display: block;
	}
</style>
