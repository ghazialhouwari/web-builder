<script setup lang="ts">
	import { inject, Ref, ref } from 'vue';
	// Store
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';

	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	function removeSection() {
		sectionsStore.removeSection(sectionIndex.value);
		gridStore.setActiveSectionIndex(null);
	}
	function shiftSectionUp() {
		sectionsStore.shiftSectionUp(sectionIndex.value);
	}

	function shiftSectionDown() {
		sectionsStore.shiftSectionDown(sectionIndex.value);
	}
	function editSection() {}
</script>

<template>
	<div class="section__menu">
		<v-card class="elevation-4">
			<v-card-text class="section__menu-content d-flex align-center pa-1">
				<v-btn
					icon="mdi-arrow-up"
					density="comfortable"
					variant="text"
					:disabled="sectionIndex <= 0"
					@click="shiftSectionUp"
				></v-btn>
				<v-btn
					icon="mdi-arrow-down"
					density="comfortable"
					variant="text"
					:disabled="sectionIndex >= sectionsStore.sections.length - 1"
					@click="shiftSectionDown"
				></v-btn>
				<v-divider vertical length="25" inset class="mx-3"></v-divider>
				<v-btn
					icon="mdi-trash-can-outline"
					color="error"
					variant="text"
					density="comfortable"
					@click="removeSection"
				></v-btn>
				<v-btn
					icon="mdi-pencil-outline"
					density="comfortable"
					variant="text"
					@click="editSection"
				></v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
	.section__menu {
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
