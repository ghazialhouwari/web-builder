<script setup lang="ts">
	import { computed, inject, ref, Ref } from 'vue';
	// Store
	import { useSectionsStore } from '@/store/sections';
	import { debounce } from '@/utils';

	const sectionsStore = useSectionsStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));
	const debounceSetColor = debounce(setColor, 100);

	const color = computed({
		get: () => sectionsStore.sections[sectionIndex.value].styles.backgroundColor,
		set: (newColor: string) => debounceSetColor(newColor),
	});

	function setColor(newColor: string) {
		sectionsStore.updateSectionBackgroundColor(sectionIndex.value, newColor);
	}
</script>

<template>
	<div ref="settingsMenu" class="settings__menu">
		<v-card min-width="300" max-width="320" class="overflow-visible">
			<v-card-text class="settings__menu-content">
				<h3 class="font-weight-bold text-subtitle-2 px-4 mb-2">Background</h3>
				<v-color-picker v-model="color" elevation="0"></v-color-picker>
			</v-card-text>
		</v-card>
	</div>
</template>
