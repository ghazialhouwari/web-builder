<script setup lang="ts">
	// Store
	import { useSectionsStore } from '@/store/sections';
	// Components
	import PageSection from '@/components/PageSection.vue';
	// Store definition
	const sectionsStore = useSectionsStore();
</script>
<template>
	<PageSection
		v-for="(section, sectionIndex) of sectionsStore.sections"
		:key="section.id"
		:section="section"
		:sectionIndex="sectionIndex"
	/>
</template>
