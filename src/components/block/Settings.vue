<script setup lang="ts">
	import { onClickOutside, useDraggable, useWindowSize } from '@vueuse/core';
	import { defineAsyncComponent, ref, toRef, onMounted } from 'vue';
	import { BlocksComponenets, SectionBlock } from '@/utils/types';
	import { tabs } from '@/data/blockSettingsTabs';
	// Components
	const blocks: BlocksComponenets = {
		buttonBlock: defineAsyncComponent(
			() => import('@/components/block/settings/Button.vue')
		),
		textBlock: defineAsyncComponent(
			() => import('@/components/block/settings/Text.vue')
		),
		imageBlock: defineAsyncComponent(
			() => import('@/components/block/settings/Image.vue')
		),
		quoteBlock: defineAsyncComponent(
			() => import('@/components/block/settings/Quote.vue')
		),
	};

	// Emits
	const emits = defineEmits({
		closeBlockSettings: () => true,
	});
	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
		blockRect: DOMRect;
	}>();

	const block = toRef(props, 'block');

	const settingsCard = ref<HTMLElement | null>();
	const dragHandle = ref<HTMLElement | null>();
	const tab = ref(1);

	// Handle click outside
	onClickOutside(settingsCard, () => {
		emits('closeBlockSettings');
	});

	const offsetX = ref(0);
	const offsetY = ref(0);

	const { width: windowWidth, height: windowHeight } = useWindowSize();

	useDraggable(settingsCard, {
		handle: dragHandle,
		onMove: ({ x, y }) => {
			// Limit the draggable area to the window's width and height
			// If the draggable element (settingsCard) is being dragged off the window,
			// it's repositioned to the boundary (either width or height)
			offsetX.value = Math.min(
				Math.max(x, 0), // Prevent dragging off the left side of the window
				windowWidth.value - (settingsCard.value?.offsetWidth || 0) // Prevent dragging off the right side of the window
			);
			offsetY.value = Math.min(
				Math.max(y, 0), // Prevent dragging off the top of the window
				windowHeight.value - (settingsCard.value?.offsetHeight || 0) // Prevent dragging off the bottom of the window
			);
		},
	});

	function setupCardPosition() {
		// This function sets the initial position of the settings card
		// based on the block's position and the window's dimensions

		if (!settingsCard.value) return;

		// Calculate how much space is available on the right side of the block
		const rightEdgeDistance = windowWidth.value - props.blockRect.right;

		// If there isn't enough space on the right side to fit the settings card,
		// position it on the left side of the block. Otherwise, position it on the right side of the block.
		if (rightEdgeDistance < settingsCard.value.offsetWidth) {
			offsetX.value = Math.max(
				0,
				props.blockRect.left - settingsCard.value.offsetWidth
			);
		} else {
			offsetX.value = props.blockRect.right;
		}

		// Calculate how much space is available below the block
		const topEdgeDistance = windowHeight.value - props.blockRect.top;

		// If there isn't enough space below to fit the settings card,
		// position it above the block. Otherwise, position it below the block.
		if (topEdgeDistance < settingsCard.value.offsetHeight) {
			offsetY.value = Math.max(
				0,
				windowHeight.value - settingsCard.value.offsetHeight
			);
		} else {
			offsetY.value = props.blockRect.top;
		}
	}

	onMounted(setupCardPosition);
</script>

<template>
	<div ref="settingsCard" class="block-settings">
		<v-card width="320" height="500" elevation="6">
			<div ref="dragHandle" class="cursor-grab">
				<v-card-title class="pb-0 border-b">
					<v-tabs v-model="tab" color="primary">
						<v-tab
							v-for="(item, tabIndex) of tabs[block.type]"
							:key="block.type + item"
							:value="tabIndex + 1"
							class="text-transform-initial"
							>{{ item }}</v-tab
						>
					</v-tabs>
				</v-card-title>
			</div>
			<v-card-text>
				<Component
					:is="blocks[`${block.type}Block`]"
					:block="block"
					:blockIndex="blockIndex"
					:tab="tab"
				/>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
	.block-settings {
		position: fixed;
		top: v-bind(offsetY + 'px');
		left: v-bind(offsetX + 'px');
		z-index: 1006;
	}
</style>
