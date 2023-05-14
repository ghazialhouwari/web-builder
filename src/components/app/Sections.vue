<script setup lang="ts">
	// Store
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';
	// Components
	import AppSection from '@/components/app/Section.vue';
	// Store definition
	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
</script>
<template>
	<AppSection
		v-for="(section, sectionIndex) of sectionsStore.sections"
		:key="section.id"
		:section="section"
		:sectionIndex="sectionIndex"
	/>
	<div v-if="gridStore.viewType === 'mobile'" class="mobile-view__shadow"></div>
</template>

<style scoped>
	.mobile-view__shadow {
		--section-box-shadow: 0 0 25px rgba(0, 0, 0, 0.1),
			0 -5px 25px rgba(0, 0, 0, 0.1), 0 5px 25px rgba(0, 0, 0, 0.1);
		width: var(--site-mobile-width);
		margin: 0 auto;
		box-shadow: var(--section-box-shadow);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
</style>
