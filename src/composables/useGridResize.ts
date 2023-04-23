import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import useGrid from '@/composables/useGrid';
import { SectionBlockLayout } from '@/utils/types';

export default function useGridResize(sectionIndex: number) {
	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
	const { viewType } = useGrid();

	function resizeHanlder(blockIndex: number, layout: SectionBlockLayout) {
		sectionsStore.updateSectionBlockLayoutByIndex(
			sectionIndex,
			blockIndex,
			layout,
			viewType.value
		);
		gridStore.updateSectionRowCount(layout.end.y);
	}
	return { resizeHanlder };
}
