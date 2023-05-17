<script setup lang="ts">
	import { ref } from 'vue';
	// Composables
	import useBlockResize from '@/composables/useBlockResize';
	import { SectionBlock } from '@/utils/types';
	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	const resizeHandleRef = ref<HTMLElement | null>(null);
	// Use composables
	useBlockResize({
		block: props.block,
		blockIndex: props.blockIndex,
		resizeHandleRef,
	});
</script>

<template>
	<div ref="resizeHandleRef" class="block__resize">
		<span data-directions="top,left" class="block__resize-handle top left"></span>
		<span
			data-directions="top,center"
			class="block__resize-handle top center"
		></span>
		<span
			data-directions="top,right"
			class="block__resize-handle top right"
		></span>
		<span
			data-directions="right,center"
			class="block__resize-handle right center"
		></span>
		<span
			data-directions="bottom,right"
			class="block__resize-handle bottom right"
		></span>
		<span
			data-directions="bottom,center"
			class="block__resize-handle bottom center"
		></span>
		<span
			data-directions="bottom,left"
			class="block__resize-handle bottom left"
		></span>
		<span
			data-directions="left,center"
			class="block__resize-handle left center"
		></span>
	</div>
</template>

<style scoped>
	.block__handle {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		cursor: grab;
	}
	.block__resize {
		position: absolute;
		top: -7px;
		left: -7px;
		bottom: -7px;
		right: -7px;
		z-index: 4;
	}
	.block__resize-handle {
		position: absolute;
		width: 9px;
		height: 9px;
		border: 2px solid var(--site-engine-color);
		background: #fff;
	}
	.block__resize-handle.top {
		top: 1px;
	}
	.block__resize-handle.bottom {
		bottom: 1px;
	}
	.block__resize-handle.left {
		left: 1px;
	}
	.block__resize-handle.right {
		right: 1px;
	}
	.block__resize-handle.top.left,
	.block__resize-handle.bottom.right {
		cursor: nwse-resize;
	}
	.block__resize-handle.top.right,
	.block__resize-handle.bottom.left {
		cursor: nesw-resize;
	}
	.block__resize-handle.top.center,
	.block__resize-handle.bottom.center {
		left: 0;
		right: 0;
		margin: 0 auto;
		cursor: ns-resize;
	}
	.block__resize-handle.left.center,
	.block__resize-handle.right.center {
		top: 0;
		bottom: 0;
		margin: auto 0;
		cursor: ew-resize;
	}
</style>
