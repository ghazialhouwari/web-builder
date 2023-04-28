import { reactive, Ref } from 'vue';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import useDrag from '@/composables/useDrag';

export default function useSectionResize({
	rowCount,
	resizeHandle,
}: {
	rowCount: Ref<number>;
	resizeHandle: Ref<HTMLElement | null>;
}) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

	const state = reactive({
		gridRows: 0,
		rows: 0,
		start: 0,
		end: 0,
		distanceY: 0,
	});

	const { cellHeight, gap } = gridStore;

	function onMouseDown(evt: MouseEvent) {
		gridStore.setIsDragging(true);
		gridStore.setIsResizing(true);
		dragging.attachMouseListeners();

		state.end = state.start = evt.clientY;
		state.gridRows = rowCount.value;
		gridStore.setActiveSectionRowCount(state.gridRows);
		sectionsStore.setSectionRowCountByIndex(
			gridStore.activeSectionIndex!,
			gridStore.viewType,
			state.gridRows
		);
	}

	function onMouseMove(evt: MouseEvent) {
		if (!gridStore.isDragging) return;

		state.end = evt.clientY;
		state.distanceY = state.end - state.start;
		// Get grid row from grid item offset
		state.rows = Math.round(state.distanceY / (cellHeight + gap));

		const rows = state.gridRows + state.rows;
		gridStore.setActiveSectionRowCount(rows);
	}

	function onMouseUp() {
		sectionsStore.setSectionRowCountByIndex(
			gridStore.activeSectionIndex!,
			gridStore.viewType,
			gridStore.activeSectionRowCount - 1
		);

		gridStore.setIsDragging(false);
		gridStore.setIsResizing(false);
		dragging.removeMouseListeners();
	}

	const dragging = useDrag(resizeHandle, onMouseDown, onMouseMove, onMouseUp);

	return { rows: state.rows };
}
