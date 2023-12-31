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
		state.gridRows = rowCount.value;
		// Set the initial row count before indicate draging and resizing
		gridStore.setActiveSectionRowCount(state.gridRows);

		state.end = state.start = evt.clientY;
		gridStore.activateGrid('RESIZE_SECTION');
		dragging.attachMouseListeners();

		sectionsStore.setSectionRowCountByIndex(
			gridStore.activeSectionIndex!,
			gridStore.viewType,
			state.gridRows
		);
	}

	function onMouseMove(evt: MouseEvent) {
		if (!gridStore.isGridActive) return;

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

		gridStore.setActiveSectionRowCount(0);
		gridStore.deactivateGrid();
		dragging.removeMouseListeners();
	}

	const dragging = useDrag(resizeHandle, onMouseDown, onMouseMove, onMouseUp);

	return { rows: state.rows };
}
