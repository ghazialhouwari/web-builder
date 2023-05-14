<script setup lang="ts">
	import { computed, defineAsyncComponent, inject, Ref, ref, watch } from 'vue';
	import {
		SectionBlock,
		BlockComponentType,
		BlocksComponenets,
	} from '@/utils/types';
	// Store
	import { useGridStore } from '@/store/grid';
	// Composables
	import useBlockDraggable from '@/composables/useBlockDraggable';
	// Components
	import ResizeHandle from '@/components/block/ResizeHandle.vue';
	import BlockControls from '@/components/block/Controls.vue';
	import BlockSettings from '@/components/block/Settings.vue';
	const blocks: BlocksComponenets = {
		buttonBlock: defineAsyncComponent(
			() => import('@/components/blocks/ButtonBlock.vue')
		),
		textBlock: defineAsyncComponent(
			() => import('@/components/blocks/TextBlock.vue')
		),
		imageBlock: defineAsyncComponent(
			() => import('@/components/blocks/ImageBlock.vue')
		),
		quoteBlock: defineAsyncComponent(
			() => import('@/components/blocks/QuoteBlock.vue')
		),
	};

	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	// Store definition
	const gridStore = useGridStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	const currentBlock = ref<BlockComponentType>(`${props.block.type}Block`);
	const blockRef = ref<HTMLElement | null>(null);
	const dragHandleRef = ref<HTMLElement | null>(null);
	const isBlockSettingsVisible = ref(false);

	// Computed
	const isFocused = computed(() => gridStore.focusedBlockId === props.block.id);
	const isSectionActive = computed(
		() => gridStore.activeSectionIndex === sectionIndex.value
	);
	// Use composables
	const { offset, isDragging, rect } = useBlockDraggable({
		blockRef,
		dragHandleRef,
		block: props.block,
		blockIndex: props.blockIndex,
	});

	function toggleBlockSettingsVisibility(value: boolean) {
		isBlockSettingsVisible.value = value;
		gridStore.setFocusedBlock(null);
	}

	watch(
		() => gridStore.activeSectionIndex,
		() => {
			if (isBlockSettingsVisible.value) {
				toggleBlockSettingsVisibility(false);
			}
		}
	);
</script>

<template>
	<div
		ref="blockRef"
		class="block d-flex"
		:class="{
			'is--focused': isFocused || isBlockSettingsVisible,
			'is--dragging': isDragging,
		}"
		:style="{
			'--row-start': block.layout[gridStore.viewType].start.y,
			'--col-start': block.layout[gridStore.viewType].start.x,
			'--row-end': block.layout[gridStore.viewType].end.y,
			'--col-end': block.layout[gridStore.viewType].end.x,
			'--z-index': block.layout[gridStore.viewType].zIndex,
			'--x-offset': `${offset.x}px`,
			'--y-offset': `${offset.y}px`,
		}"
	>
		<Transition name="bottom-up">
			<BlockControls
				v-if="isFocused"
				:block="block"
				:blockIndex="blockIndex"
				@openBlockSettings="toggleBlockSettingsVisibility(true)"
			/>
		</Transition>
		<span ref="dragHandleRef" class="block__handle"></span>
		<Component :is="blocks[currentBlock]" :value="block.value" />
		<ResizeHandle
			v-if="
				(isFocused && gridStore.gridActiveEvent !== 'RESIZE_BLOCK') ||
				isBlockSettingsVisible
			"
			:block="block"
			:blockIndex="blockIndex"
		/>
		<Teleport to="#block-settings-menu">
			<BlockSettings
				v-if="!gridStore.isGridActive && isSectionActive && isBlockSettingsVisible"
				:block="block"
				:blockIndex="blockIndex"
				:blockRect="rect!"
				@closeBlockSettings="toggleBlockSettingsVisibility(false)"
			/>
		</Teleport>
	</div>
</template>

<style scoped>
	.block {
		position: relative;
		user-select: none;
		background: #fff;
		grid-area: var(--row-start) / var(--col-start) / var(--row-end) /
			var(--col-end);
		transform: translate(var(--x-offset), var(--y-offset));
		border-width: var(--site-engine-border-width);
		z-index: var(--z-index);
		border-style: solid;
		border-color: transparent;
		will-change: border-color;
		transition: border-color 150ms ease;
	}
	.block.is--dragging {
		box-shadow: var(--site-box-shadow);
		background: rgba(255, 255, 255, 0.6);
	}
	.block.is--focused,
	.block:hover {
		border-color: var(--site-engine-color);
	}
	.block.is--focused {
		z-index: 1001;
	}
	.block:hover {
		z-index: 1002;
	}
	.block__handle {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		cursor: grab;
	}
</style>
