<script setup lang="ts">
	import { computed, provide, ref, toRefs } from 'vue';
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/Grid.vue';
	import SectionResizeHandle from '@/components/section/ResizeHandle.vue';
	import SectionMenu from '@/components/section/Menu.vue';
	import SectionBlocksMenuTrigger from '@/components/menu/BlocksMenuTrigger.vue';
	// Composables
	import useSection from '@/composables/useSection';
	// Store
	import { useGridStore } from '@/store/grid';
	import { useAppStore } from '@/store/app';
	// Props
	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();
	// Store definition
	const gridStore = useGridStore();
	const appStore = useAppStore();

	const { section, sectionIndex } = toRefs(props);
	const { rowCount, highestBlockEndY } = useSection(sectionIndex);

	const sectionItem = ref<HTMLElement | null>();
	// Computed
	const isHovered = computed(
		() => gridStore.activeSectionIndex === sectionIndex.value
	);

	provide('section', section);
	provide('sectionIndex', sectionIndex);
	provide('rowCount', rowCount);
	provide('highestBlockEndY', highestBlockEndY);
	// Functions
	function mouseOverHandler() {
		gridStore.setActiveSectionIndex(sectionIndex.value);
	}
	function showBlocksMenu() {
		if (sectionItem.value) {
			const rect = sectionItem.value.getBoundingClientRect();
			appStore.showBlocksMenu({
				x: rect.left + window.scrollX,
				y: rect.top + window.scrollY,
			});
		}
	}
</script>

<template>
	<div
		ref="sectionItem"
		class="site-section"
		@mouseover="mouseOverHandler"
		:class="{
			'site-section--hover': isHovered,
		}"
	>
		<Transition name="top-down">
			<SectionBlocksMenuTrigger
				v-if="!gridStore.isDragging && isHovered"
				@showBlocksMenu="showBlocksMenu"
			/>
		</Transition>
		<div
			class="site-section__container py-16"
			:class="{
				'view-type--mobile': gridStore.viewType === 'mobile',
			}"
		>
			<Grid />
		</div>
		<SectionResizeHandle v-if="isHovered" />
		<Transition name="top-down">
			<SectionMenu v-if="!gridStore.isDragging && isHovered" />
		</Transition>
	</div>
</template>

<style scoped>
	.site-section {
		position: relative;
		overflow: hidden;
		z-index: 20;
	}
	.site-section__container.view-type--mobile {
		--box-shadow: 0 0 25px rgba(0, 0, 0, 0.1), 0 -5px 25px rgba(0, 0, 0, 0.1),
			0 5px 25px rgba(0, 0, 0, 0.1);
		width: var(--site-mobile-width);
		margin: 0 auto;
		box-shadow: var(--box-shadow);
	}
	.site-section.site-section--hover .site-section__container {
		box-shadow: inset 0 0 0 var(--site-engine-border-width)
			var(--site-engine-color);
	}
	.site-section.site-section--hover .site-section__container.view-type--mobile {
		box-shadow: var(--box-shadow),
			inset 0 0 0 var(--site-engine-border-width) var(--site-engine-color);
	}
</style>
