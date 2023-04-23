<script setup lang="ts">
	import { ref } from 'vue';
	import useGridItemDraggable from '@/composables/useGridItemDraggable';
	import {
		SectionBlock,
		SectionBlockLayout,
		BlockComponentType,
	} from '@/utils/types';
	import useGrid from '@/composables/useGrid';
	import useGridItemResize from '@/composables/useGridItemResize';
	import ButtonBlock from '@/components/ButtonBlock.vue';
	import TextBlock from '@/components/TextBlock.vue';
	import ImageBlock from '@/components/ImageBlock.vue';
	import QuoteBlock from '@/components/QuoteBlock.vue';

	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	/* eslint-disable no-unused-vars */
	const emit = defineEmits({
		start: () => true,
		move: (x: number, y: number, blockLayout: SectionBlockLayout) => true,
		end: (blockIndex: number) => true,
		resize: (blockIndex: number, layout: SectionBlockLayout) => true,
	});

	type Blocks = {
		[key in BlockComponentType]: any;
	};

	const blocks: Blocks = { ButtonBlock, TextBlock, ImageBlock, QuoteBlock };
	const currentBlock = ref<BlockComponentType>('ButtonBlock');

	const gridItem = ref<HTMLElement | null>(null);
	const dragHandle = ref<HTMLElement | null>(null);
	const resizeHandle = ref<HTMLElement | null>(null);

	const { viewType } = useGrid();
	const { offset } = useGridItemDraggable({
		gridItem,
		dragHandle,
		onStart,
		onMove,
		onEnd,
	});
	useGridItemResize({ block: props.block, resizeHandle, onResize });

	function onResize(layout: SectionBlockLayout) {
		emit('resize', props.blockIndex, layout);
	}

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
		class="grid-item d-flex"
		:style="{
			'--row-start': block.layout[viewType].start.y,
			'--col-start': block.layout[viewType].start.x,
			'--row-end': block.layout[viewType].end.y,
			'--col-end': block.layout[viewType].end.x,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		<span ref="dragHandle" class="grid-item__handle"></span>
		<component :is="blocks[currentBlock]" :value="block.value" />
		<div ref="resizeHandle" class="grid-item__resize">
			<span data-directions="top,left" class="resize__handle top left"></span>
			<span data-directions="top,center" class="resize__handle top center"></span>
			<span data-directions="top,right" class="resize__handle top right"></span>
			<span
				data-directions="right,center"
				class="resize__handle right center"
			></span>
			<span
				data-directions="bottom,right"
				class="resize__handle bottom right"
			></span>
			<span
				data-directions="bottom,center"
				class="resize__handle bottom center"
			></span>
			<span
				data-directions="bottom,left"
				class="resize__handle bottom left"
			></span>
			<span
				data-directions="left,center"
				class="resize__handle left center"
			></span>
		</div>
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
		border-width: 3px;
		border-style: solid;
		border-color: transparent;
		will-change: border-color;
		transition: border-color 150ms ease;
	}
	.grid-item:hover {
		border-color: rgb(2, 122, 255);
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
	.grid-item__resize {
		display: none;
		position: absolute;
		top: -7px;
		left: -7px;
		bottom: -7px;
		right: -7px;
		z-index: 5;
	}
	.grid-item:hover .grid-item__resize {
		display: block;
	}
	.resize__handle {
		position: absolute;
		width: 10px;
		height: 10px;
		background: rgb(2, 122, 255);
	}
	.resize__handle.top {
		top: 0;
	}
	.resize__handle.bottom {
		bottom: 0;
	}
	.resize__handle.left {
		left: 0;
	}
	.resize__handle.right {
		right: 0;
	}
	.resize__handle.top.left,
	.resize__handle.bottom.right {
		cursor: nwse-resize;
	}
	.resize__handle.top.right,
	.resize__handle.bottom.left {
		cursor: nesw-resize;
	}
	.resize__handle.top.center,
	.resize__handle.bottom.center {
		left: 0;
		right: 0;
		margin: 0 auto;
		cursor: ns-resize;
	}
	.resize__handle.left.center,
	.resize__handle.right.center {
		top: 0;
		bottom: 0;
		margin: auto 0;
		cursor: ew-resize;
	}
	/* cursor: nwse-resize; */
</style>
