<script setup lang="ts">
	import { computed, provide, ref, toRefs } from 'vue';
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/app/Grid.vue';
	import SectionResizeHandle from '@/components/section/ResizeHandle.vue';
	import SectionControls from '@/components/section/Controls.vue';
	import SectionAddBtn from '@/components/section/AddBtn.vue';
	import BlocksMenu from '@/components/menu/Blocks.vue';
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

	const sectionBackgroundColor = computed(
		() => section.value.styles.backgroundColor
	);

	const sectionItem = ref<HTMLElement | null>();
	// Computed
	const isSectionActive = computed(
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
			'site-section--hover': isSectionActive,
		}"
	>
		<SectionAddBtn
			v-if="
				isSectionActive && !gridStore.focusedBlockId && !gridStore.isGridActive
			"
			position="top"
		/>

		<Transition name="top-down">
			<BlocksMenu v-if="isSectionActive && !gridStore.focusedBlockId" />
		</Transition>

		<Transition name="top-down">
			<SectionControls
				v-if="
					isSectionActive && !gridStore.focusedBlockId && !gridStore.isGridActive
				"
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
		<SectionResizeHandle
			v-if="
				isSectionActive &&
				!gridStore.focusedBlockId &&
				(!gridStore.isGridActive ||
					(gridStore.isGridActive && gridStore.gridActiveEvent === 'RESIZE_SECTION'))
			"
		/>
		<SectionAddBtn
			v-if="
				isSectionActive && !gridStore.focusedBlockId && !gridStore.isGridActive
			"
			position="bottom"
		/>
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
		background-color: v-bind(sectionBackgroundColor);
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
