<script setup lang="ts">
	// Store
	import { useSectionsStore } from '@/store/sections';
	// Components
	import PageSection from '@/components/PageSection.vue';
	import Blocks from '@/components/Blocks.vue';
	// Store definition
	const sectionsStore = useSectionsStore();
</script>
<template>
	<Blocks />
	<PageSection
		v-for="(section, sectionIndex) of sectionsStore.sections"
		:key="section.id"
		:section="section"
		:sectionIndex="sectionIndex"
	/>
</template>
