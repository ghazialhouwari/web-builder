<script setup lang="ts">
	import { computed, provide, ref, toRefs } from 'vue';
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/Grid.vue';
	import SectionResizeHandle from '@/components/section/ResizeHandle.vue';
	import SectionMenu from '@/components/section/Menu.vue';
	import SectionAddBtn from '@/components/section/AddBtn.vue';
	import SectionBlocksMenu from '@/components/menu/BlocksMenu.vue';
	// Composables
	import useSection from '@/composables/useSection';
	// Store
	import { useGridStore } from '@/store/grid';
	// Props
	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();
	// Store definition
	const gridStore = useGridStore();

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
		<SectionAddBtn v-if="isHovered" position="top" />

		<Transition name="top-down">
			<SectionBlocksMenu v-if="isHovered" />
		</Transition>

		<Transition name="top-down">
			<SectionMenu v-if="!gridStore.isGridActive && isHovered" />
		</Transition>

		<div
			class="site-section__container py-16"
			:class="{
				'view-type--mobile': gridStore.viewType === 'mobile',
			}"
			:style="{
				'--section-background-color': section.styles.backgroundColor,
			}"
		>
			<Grid />
		</div>
		<SectionResizeHandle v-if="isHovered" />
		<SectionAddBtn v-if="isHovered" position="bottom" />
	</div>
</template>

<style scoped>
	.site-section {
		position: relative;
		background: transparent;
	}
	.site-section.site-section--hover {
		z-index: 1005;
	}
	.site-section__container {
		background-color: var(--section-background-color);
	}
	.site-section__container.view-type--mobile {
		width: var(--site-mobile-width);
		margin: 0 auto;
	}
	.site-section.site-section--hover .site-section__container {
		box-shadow: inset 0 0 0 var(--site-engine-border-width)
			var(--site-engine-color);
	}
</style>
