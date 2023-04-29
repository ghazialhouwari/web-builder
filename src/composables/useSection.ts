import { computed } from 'vue';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';

export default function useGrid(sectionIndex: number) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

	const highestBlockEndY = computed<number | null>(() => {
		const { viewType, activeSectionIndex } = gridStore;
		const section = sectionsStore.sections[sectionIndex];

		if (activeSectionIndex === null || sectionIndex !== activeSectionIndex)
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
		const section = sectionsStore.sections[sectionIndex];
		const {
			isResizing,
			minRowCount,
			viewType,
			activeSectionRowCount,
			draggedBlockLayout,
		} = gridStore;

		let sectionRowCount = section.layout[viewType].rows + 1;
		if (isResizing && highestBlockEndY.value) {
			sectionRowCount = 1;
		}

		const draggedBlockRowCount = draggedBlockLayout?.end.y ?? 1;

		return (
			Math.max(
				minRowCount + 1,
				sectionRowCount,
				activeSectionRowCount,
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
