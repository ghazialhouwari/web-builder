<script setup lang="ts">
	import { inject, ref, Ref } from 'vue';
	import { SectionBlock } from '@/utils/types';

	// Store
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';
	import { shiftBlock } from '@/utils/grid';
	// Props
	const props = defineProps<{
		block: SectionBlock;
		blockIndex: number;
	}>();

	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	function duplicateBlock() {
		const layout = shiftBlock(props.block);

		sectionsStore.duplicateBlock(sectionIndex.value, props.blockIndex, layout);
		gridStore.setFocusedBlock(null);
	}
	function removeBlock() {
		sectionsStore.removeBlock(sectionIndex.value, props.blockIndex);
	}
</script>

<template>
	<div class="block__menu">
		<v-card class="elevation-4">
			<v-card-text class="block__menu-content d-flex align-center pa-1">
				<v-btn
					icon="mdi-pencil-outline"
					variant="text"
					density="comfortable"
				></v-btn>
				<v-btn
					icon="mdi-content-copy"
					variant="text"
					density="comfortable"
					@click="duplicateBlock"
				></v-btn>
				<v-btn
					icon="mdi-trash-can-outline"
					color="error"
					variant="text"
					density="comfortable"
					@click="removeBlock"
				></v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped>
	.block__menu {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 0;
	}
</style>
