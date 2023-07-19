<script setup lang="ts">
	import { ImageSectionBlock, SectionBlockImage } from '@/utils/types';
	import { useCreateComputed } from '@/composables/useCreateComputed';
	// Components
	import Tabs from '@/components/block/settings/Tabs.vue';
	import { inject, ref, Ref } from 'vue';
	// Props
	const props = defineProps<{
		block: ImageSectionBlock;
		blockIndex: number;
	}>();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	// const { getter, setter, createComputedProperty } =

	useCreateComputed<SectionBlockImage>(
		props.block.value,
		props.blockIndex,
		sectionIndex
	);
</script>

<template>
	<Tabs :blockType="block.type">
		<template #windowContent> Content Tab </template>
		<template #windowDesign> Design Tab </template>
	</Tabs>
</template>
@/composables/useCreateComputed
