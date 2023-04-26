<script setup lang="ts">
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/Grid.vue';
	// Store
	import { useGridStore } from '@/store/grid';
	// Props
	const props = defineProps<{
		section: Section;
		sectionIndex: number;
	}>();
	// Store definition
	const gridStore = useGridStore();
	// Functions
	function mouseOverHandler() {
		gridStore.setSectionIndex(props.sectionIndex);
	}
</script>

<template>
	<div class="site-section" @mouseover="mouseOverHandler">
		<div v-if="!gridStore.isDragging" class="block-menu">
			<v-btn prependIcon="mdi-plus" color="white" class="block-menu__trigger"
				>Add Menu</v-btn
			>
		</div>
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
		overflow-y: hidden;
		z-index: 20;
	}
	.site-section__container.view-type--mobile {
		--box-shadow: 0 0 25px rgba(0, 0, 0, 0.1), 0 -5px 25px rgba(0, 0, 0, 0.1),
			0 5px 25px rgba(0, 0, 0, 0.1);
		width: var(--site-mobile-width);
		margin: 0 auto;
		box-shadow: var(--box-shadow);
	}
	.site-section:hover .site-section__container {
		box-shadow: inset 0 0 0 var(--site-engine-border-width)
			var(--site-engine-color);
	}
	.site-section:hover .site-section__container.view-type--mobile {
		box-shadow: var(--box-shadow),
			inset 0 0 0 var(--site-engine-border-width) var(--site-engine-color);
	}
	.block-menu {
		position: absolute;
		top: 20px;
		left: 20px;
		display: none;
	}
	.site-section:hover .block-menu {
		display: block;
	}
</style>
