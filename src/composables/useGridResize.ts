import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import useGrid from '@/composables/useGrid';
import { SectionBlockLayout } from '@/utils/types';

export default function useGridResize(sectionIndex: number) {
	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();

	function resizeHanlder(blockIndex: number, layout: SectionBlockLayout) {
		sectionsStore.updateSectionBlockLayoutByIndex(
			sectionIndex,
			blockIndex,
			layout,
			gridStore.viewType
		);
		gridStore.updateSectionRowCount(layout.end.y);
	}
	return { resizeHanlder };
}
