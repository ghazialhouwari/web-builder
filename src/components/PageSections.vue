<script setup lang="ts">
	// Store
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';
	// Components
	import PageSection from '@/components/PageSection.vue';
	import Blocks from '@/components/Blocks.vue';
	// Store definition
	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
	// Functions
	function mouseOverHandler(sectionIndex: number) {
		gridStore.setSectionIndex(sectionIndex);
	}
</script>
<template>
	<Blocks />
	<PageSection
		v-for="(section, sectionIndex) of sectionsStore.sections"
		:key="section.id"
		:section="section"
		:sectionIndex="sectionIndex"
		@mouseOver="mouseOverHandler"
	/>
</template>
