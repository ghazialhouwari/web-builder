<script setup lang="ts">
	import { useSectionsStore } from '@/store/sections';
	import PageSection from '@/components/PageSection.vue';
	import Blocks from '@/components/Blocks.vue';

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
