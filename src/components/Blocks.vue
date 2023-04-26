<script setup lang="ts">
	import { ref } from 'vue';
	import { onClickOutside } from '@vueuse/core';
	import { SiteBlock } from '@/utils/types';
	import { blocks as data } from '@/data/blocks';
	// Store
	import { useAppStore } from '@/store/app';
	import { useGridStore } from '@/store/grid';
	// Components
	import Block from '@/components/Block.vue';
	// Use Store
	const appStore = useAppStore();
	const gridStore = useGridStore();

	const blocks = ref<SiteBlock[]>(data);
	const blocksMenu = ref<HTMLElement | null>();
	onClickOutside(blocksMenu, appStore.closeBlocksMenu);
</script>

<template>
	<div
		ref="blocksMenu"
		class="blocks__menu"
		:class="{
			'grid--is-dragging': gridStore.isDragging,
		}"
		:style="{
			'--blocks-menu-offset-x': `${appStore.blocksMenuPosition.x}px`,
			'--blocks-menu-offset-y': `${appStore.blocksMenuPosition.y}px`,
		}"
	>
		<v-card min-width="340" max-width="390" class="overflow-visible">
			<v-card-text class="block__group">
				<h3 class="font-weight-bold text-subtitle-2 px-4">Basic</h3>
				<ul class="block__group-content py-2">
					<Block v-for="(block, i) in blocks" :key="i" :block="block">
						<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
						<h4>{{ block.type }}</h4>
					</Block>
				</ul>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
	.blocks__menu {
		position: absolute;
		top: calc(var(--blocks-menu-offset-y) + 20px);
		left: calc(var(--blocks-menu-offset-x) + 20px);
		z-index: 999;
	}
	.blocks__menu.grid--is-dragging {
		opacity: 0;
		pointer-events: none;
	}
	.block__group-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		list-style: none;
	}
</style>
