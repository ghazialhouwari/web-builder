<script setup lang="ts">
	import { ButtonSectionBlock, SectionBlockButton } from '@/utils/types';
	import { computed, inject, ref, Ref, toRef } from 'vue';
	// Store
	import { useSectionsStore } from '@/store/sections';

	// Props
	const props = defineProps<{
		block: ButtonSectionBlock;
		blockIndex: number;
		tab: number;
	}>();

	// Store definition
	const sectionsStore = useSectionsStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));
	const tab = toRef(props, 'tab');

	const createComputedProperty = (key: keyof SectionBlockButton) => {
		return computed({
			get() {
				return props.block.value[key];
			},
			set(value) {
				sectionsStore.updateBlockValue(sectionIndex.value, props.blockIndex, {
					...props.block.value,
					[key]: value,
				});
			},
		});
	};

	const buttonText = createComputedProperty('buttonText');
	const fluid = createComputedProperty('fluid');
	const horizontalAlignment = createComputedProperty('horizontalAlignment');
	const verticalAlignment = createComputedProperty('verticalAlignment');
</script>

<template>
	<v-window v-model="tab">
		<v-window-item :value="1">
			<v-text-field
				v-model="buttonText"
				label="Text"
				variant="underlined"
			></v-text-field>
		</v-window-item>
		<v-window-item :value="2">
			<v-btn-toggle v-model="fluid" variant="outlined" divided class="mb-3">
				<v-btn :value="false" class="text-transform-initial">Fit</v-btn>
				<v-btn :value="true" class="text-transform-initial">Fill</v-btn>
			</v-btn-toggle>
			<v-btn-toggle
				v-model="horizontalAlignment"
				variant="outlined"
				divided
				class="mb-3"
			>
				<v-btn value="start">
					<v-icon icon="mdi-format-align-left"></v-icon>
				</v-btn>

				<v-btn value="center">
					<v-icon icon="mdi-format-align-center"></v-icon>
				</v-btn>

				<v-btn value="end">
					<v-icon icon="mdi-format-align-right"></v-icon>
				</v-btn>
			</v-btn-toggle>
			<v-btn-toggle v-model="verticalAlignment" variant="outlined" divided>
				<v-btn value="start">
					<v-icon icon="mdi-format-vertical-align-top"></v-icon>
				</v-btn>

				<v-btn value="center">
					<v-icon icon="mdi-format-vertical-align-center"></v-icon>
				</v-btn>

				<v-btn value="end">
					<v-icon icon="mdi-format-vertical-align-bottom"></v-icon>
				</v-btn>
			</v-btn-toggle>
		</v-window-item>
	</v-window>
</template>
