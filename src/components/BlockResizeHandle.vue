<script setup lang="ts">
	import { ref } from 'vue';
	// Composables
	import useGridItemResize from '@/composables/useBlockResize';
	import { SectionBlock, SectionBlockLayout } from '@/utils/types';
	// Emits
	/* eslint-disable no-unused-vars */
	const emits = defineEmits({
		resize: (layout: SectionBlockLayout) => true,
	});
	// Props
	const props = defineProps<{
		block: SectionBlock;
	}>();

	const resizeHandle = ref<HTMLElement | null>(null);
	// Use composables
	useGridItemResize({
		block: props.block,
		resizeHandle,
		onResize: (layout: SectionBlockLayout) => emits('resize', layout),
	});
</script>

<template>
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
		<span data-directions="bottom,left" class="resize__handle bottom left"></span>
		<span data-directions="left,center" class="resize__handle left center"></span>
	</div>
</template>

<style scoped>
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
	.resize__handle {
		position: absolute;
		width: 9px;
		height: 9px;
		border: 2px solid var(--site-engine-color);
		background: #fff;
	}
	.resize__handle.top {
		top: 1px;
	}
	.resize__handle.bottom {
		bottom: 1px;
	}
	.resize__handle.left {
		left: 1px;
	}
	.resize__handle.right {
		right: 1px;
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
</style>
