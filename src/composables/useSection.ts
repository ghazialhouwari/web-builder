import { computed, Ref } from 'vue';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';

export default function useGrid(sectionIndex: Ref<number>) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

	const highestBlockEndY = computed<number | null>(() => {
		const { viewType, activeSectionIndex } = gridStore;
		const section = sectionsStore.sections[sectionIndex.value];

		if (activeSectionIndex === null || sectionIndex.value !== activeSectionIndex)
			return null;

		const blocks = sectionsStore.sections[activeSectionIndex].blocks;
		if (!blocks.length) return null;

		// Use the reduce() method to find the index of the block with the highest end.y value
		const highestBlockRowCountIndex = blocks.reduce(
			(highestIndex, block, currentIndex) => {
				const blockEndY = block.layout[viewType].end.y;
				const highestBlockEndY = blocks[highestIndex].layout[viewType].end.y;

				return blockEndY > highestBlockEndY ? currentIndex : highestIndex;
			},
			0
		);

		return section.blocks[highestBlockRowCountIndex].layout[viewType].end.y;
	});

	const rowCount = computed(() => {
		const section = sectionsStore.sections[sectionIndex.value];
		const {
			gridActiveEvent,
			minRowCount,
			viewType,
			activeSectionIndex,
			activeSectionRowCount,
			draggedBlockLayout,
		} = gridStore;

		let sectionRowCount = section.layout[viewType].rows + 1;
		if (gridActiveEvent === 'RESIZE_SECTION' && highestBlockEndY.value) {
			sectionRowCount = 1;
		}

		let draggedBlockRowCount = 1;
		let sectionResizeRowCount = 1;

		if (sectionIndex.value === activeSectionIndex) {
			sectionResizeRowCount = activeSectionRowCount;
			draggedBlockRowCount = draggedBlockLayout?.end.y ?? 1;
		}

		return (
			Math.max(
				minRowCount + 1,
				sectionRowCount,
				sectionResizeRowCount,
				draggedBlockRowCount,
				highestBlockEndY.value ?? 1
			) - 1
		);
	});

	return {
		highestBlockEndY,
		rowCount,
	};
}
