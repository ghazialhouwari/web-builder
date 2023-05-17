<script setup lang="ts">
	import { inject, Ref, ref } from 'vue';
	// Componenets
	import SectionSettings from '@/components/section/Settings.vue';
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
</script>

<template>
	<div class="section__controls">
		<v-card class="elevation-4">
			<v-card-text class="section__controls-content d-flex align-center pa-1">
				<v-btn
					icon="mdi-arrow-up"
					density="comfortable"
					variant="text"
					:disabled="sectionIndex <= 0"
					@click="sectionsStore.shiftSectionUp(sectionIndex)"
				></v-btn>
				<v-btn
					icon="mdi-arrow-down"
					density="comfortable"
					variant="text"
					:disabled="sectionIndex >= sectionsStore.sections.length - 1"
					@click="sectionsStore.shiftSectionDown(sectionIndex)"
				></v-btn>
				<v-divider vertical length="25" inset class="mx-3"></v-divider>
				<v-btn
					icon="mdi-trash-can-outline"
					color="error"
					variant="text"
					density="comfortable"
					@click="removeSection"
				></v-btn>
				<v-menu :close-on-content-click="false" transition="slide-y-transition">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							icon="mdi-pencil-outline"
							density="comfortable"
							variant="text"
						></v-btn>
					</template>
					<SectionSettings />
				</v-menu>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
	.section__controls {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 3;
	}
</style>
