<script setup lang="ts">
	import { SectionBlockImage } from '@/utils/types';
	import { useUpload } from '@/composables/useUpload';
	import { inject, onMounted, ref, Ref } from 'vue';
	// Store
	import { useSectionsStore } from '@/store/sections';

	// Props
	const props = defineProps<{
		value: SectionBlockImage;
		blockIndex: number;
	}>();

	// Store definition
	const sectionsStore = useSectionsStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));
	const blockContentOffsetHeight = ref<number | undefined>();

	const { open, loading } = useUpload({
		onSuccess: (url) => {
			sectionsStore.updateBlockValue(sectionIndex.value, props.blockIndex, {
				...props.value,
				url: url,
			});
		},
		onError: (error) => {
			console.error('Upload error', error);
		},
	});

	onMounted(() => {
		const element = document.querySelector(
			`#blockContent_${sectionIndex.value}_${props.blockIndex}`
		) as HTMLElement | null;
		blockContentOffsetHeight.value = element?.offsetHeight;
	});
</script>

<template>
	<div
		v-if="loading || !blockContentOffsetHeight"
		class="w-100 d-flex align-center justify-center"
	>
		<v-progress-circular indeterminate></v-progress-circular>
	</div>
	<div v-else-if="value.url" class="h-100 w-100">
		<v-img
			:src="value.url"
			class="w-100"
			:max-height="blockContentOffsetHeight"
		/>
	</div>
	<div v-else class="bg-white w-100 d-flex align-center justify-center">
		<v-btn
			icon="mdi-plus"
			class="elevation-0"
			color="grey-lighten-3"
			@click="open"
		></v-btn>
	</div>
</template>
