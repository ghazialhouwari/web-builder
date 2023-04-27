<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/Grid.vue';
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

	const sectionItem = ref<HTMLElement | null>();
	// Computed
	const isHovered = computed(
		() => gridStore.sectionIndex === props.sectionIndex
	);
	// Functions
	function mouseOverHandler() {
		gridStore.setSectionIndex(props.sectionIndex);
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
			<div
				v-if="!gridStore.isDragging && isHovered"
				class="block-menu"
				@click="showBlocksMenu"
			>
				<v-btn prependIcon="mdi-plus" color="white" class="block-menu__trigger"
					>Add Menu</v-btn
				>
			</div>
		</Transition>
		<div
			class="site-section__container py-16"
			:class="{
				'view-type--mobile': gridStore.viewType === 'mobile',
			}"
		>
			<Grid :section="section" :sectionIndex="sectionIndex" />
		</div>
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
	.block-menu {
		position: absolute;
		top: 20px;
		left: 20px;
	}
</style>
