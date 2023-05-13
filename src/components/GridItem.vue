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
	import useGridItemDraggable from '@/composables/useGridItemDraggable';
	// Components
	import BlockResizeHandle from '@/components/BlockResizeHandle.vue';
	import BlockMenu from '@/components/block/Menu.vue';
	import BlockSettings from '@/components/BlockSettings.vue';
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
	const gridItemRef = ref<HTMLElement | null>(null);
	const dragHandleRef = ref<HTMLElement | null>(null);
	const isBlockSettingsVisible = ref(false);

	// Computed
	const isFocused = computed(() => gridStore.focusedBlockId === props.block.id);
	const isSectionActive = computed(
		() => gridStore.activeSectionIndex === sectionIndex.value
	);
	// Use composables
	const { offset, isDragging, rect } = useGridItemDraggable({
		gridItemRef,
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
		ref="gridItemRef"
		class="grid-item d-flex"
		:class="{
			'is--focused': isFocused || isBlockSettingsVisible,
			'is-dragging': isDragging,
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
			<BlockMenu
				v-if="isFocused"
				:block="block"
				:blockIndex="blockIndex"
				@openSettingsMenu="toggleBlockSettingsVisibility(true)"
			/>
		</Transition>
		<span ref="dragHandleRef" class="grid-item__handle"></span>
		<Component :is="blocks[currentBlock]" :value="block.value" />
		<BlockResizeHandle
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
	.grid-item {
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
	.grid-item.is-dragging {
		box-shadow: var(--site-box-shadow);
		background: rgba(255, 255, 255, 0.6);
	}
	.grid-item.is--focused,
	.grid-item:hover {
		border-color: var(--site-engine-color);
	}
	.grid-item.is--focused {
		z-index: 1001;
	}
	.grid-item:hover {
		z-index: 1002;
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
</style>
