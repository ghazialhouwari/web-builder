<script setup lang="ts">
	import { inject, ref, Ref } from 'vue';
	import { SectionBlock } from '@/utils/types';

	// Store
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';

	import { shiftBlock } from '@/utils/grid';
	import { deepClone } from '@/utils';
	// Emits
	const emits = defineEmits({
		openSettingsMenu: () => true,
	});
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
	function moveBlock(direction: 'forward' | 'backward') {
		const { viewType, activeSectionIndex } = gridStore;
		const layout = deepClone(props.block.layout[viewType]);

		if (direction === 'forward') {
			layout.zIndex++;
		} else {
			layout.zIndex--;
		}

		sectionsStore.setSectionBlockLayoutByIndex(
			activeSectionIndex!,
			props.blockIndex,
			layout,
			viewType
		);
	}
	function editBlock() {
		emits('openSettingsMenu');
	}
</script>

<template>
	<div class="block__menu py-3">
		<v-card class="elevation-4">
			<v-card-text class="block__menu-content d-flex align-center pa-1">
				<v-btn
					icon="mdi-pencil-outline"
					variant="text"
					density="comfortable"
					@click="editBlock"
				></v-btn>
				<v-divider vertical length="25" inset class="mx-3"></v-divider>
				<v-btn
					icon="mdi-flip-to-front"
					variant="text"
					density="comfortable"
					@click="moveBlock('forward')"
				></v-btn>
				<v-btn
					icon="mdi-flip-to-back"
					variant="text"
					density="comfortable"
					:disabled="block.layout[gridStore.viewType].zIndex <= 1"
					@click="moveBlock('backward')"
				></v-btn>
				<v-divider vertical length="25" inset class="mx-3"></v-divider>
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
		bottom: 100%;
		left: 0;
	}
</style>
