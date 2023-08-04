<script setup lang="ts">
	// Composables
	import useBlockResize from '@/composables/useBlockResize';
	import { SectionBlock } from '@/utils/types';
	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	const directions = [
		'top,left',
		'top,center',
		'top,right',
		'right,center',
		'bottom,right',
		'bottom,center',
		'bottom,left',
		'left,center',
	];

	const handles: string[] = directions.map(
		(direction) => `#blockResize${direction.replace(',', '_')}`
	);

	useBlockResize({
		block: props.block,
		blockIndex: props.blockIndex,
		handles,
	});
</script>

<template>
	<span
		v-for="direction in directions"
		:key="direction"
		:data-directions="direction"
		:id="`blockResize${direction.replace(',', '_')}`"
		:class="`d-inline-flex block__resize-handle ${direction.replace(',', ' ')}`"
	>
		<span
			:data-directions="direction"
			class="d-inline-flex block__resize-handle__icon"
		></span>
	</span>
</template>

<style scoped>
	.block__resize-handle {
		position: absolute;
		z-index: 5;
		width: 28px;
		height: 28px;
		padding: 10px;
	}
	.block__resize-handle__icon {
		width: 9px;
		height: 9px;
		border: 2px solid var(--site-engine-color);
		background: #fff;
	}
	.block__resize-handle.top {
		top: -16px;
	}
	.block__resize-handle.bottom {
		bottom: -16px;
	}
	.block__resize-handle.left {
		left: -16px;
	}
	.block__resize-handle.right {
		right: -16px;
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
