<script lang="ts" setup>
	import { ref, computed } from 'vue';
	import { gridAreaToArray } from '@/utils';
	import { useGridStore } from '@/store/grid';
	import GridItem from '@/components/GridItem.vue';

	const gridStore = useGridStore();

	const isDragging = ref(false);
	const placeholder = ref('');

	const draggedItemRowEnd = ref(0);

	const gridRowCount = computed(() => {
		return getMaxRow();
	});

	function updatePlaceholderPosition(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number
	) {
		placeholder.value = getUpdatedGridArea(x, y, columnSize, rowSize);
		draggedItemRowEnd.value = gridAreaToArray(placeholder.value)[2];
		updateGridRowCount();
	}

	function updateGridRowCount() {
		document.documentElement.style.setProperty(
			'--grid-row-count',
			`${getMaxRow()}`
		);
	}

	function getMaxRow() {
		const maxRow = gridStore.items.reduce((max, item) => {
			const rowEnd = gridAreaToArray(item.style.gridArea)[2];
			return Math.max(max, rowEnd);
		}, 0);
		return Math.max(maxRow, 9, draggedItemRowEnd.value) - 1;
	}

	function getUpdatedGridArea(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number
	) {
		const gridX = Math.round(
			(x - gridStore.grid.gutters + gridStore.grid.gap) /
				(gridStore.grid.cellWidth + gridStore.grid.gap)
		);
		const gridY = Math.round(
			y / (gridStore.grid.cellHeight + gridStore.grid.gap)
		);

		const columnStart = Math.max(1, gridX + 1);
		const rowStart = Math.max(1, gridY + 1);
		const columnEnd = columnStart + columnSize;
		const rowEnd = rowStart + rowSize;

		return `${rowStart}/${columnStart}/${rowEnd}/${columnEnd}`;
	}
</script>

<template>
	<div class="GridWrapper">
		<GridItem
			v-for="(item, index) in gridStore.items"
			:key="index"
			:item="item"
			:index="index"
			:placeholder="placeholder"
			@updatePlaceholderPosition="updatePlaceholderPosition"
			@move="isDragging = true"
			@end="isDragging = false"
		/>
		<template v-if="isDragging">
			<template v-for="row in gridRowCount" :key="row">
				<template v-for="column in gridStore.grid.columnCount" :key="column">
					<div
						class="GridCell"
						:style="`grid-area: ${row}/${column + 1}/${row}/${column + 1}`"
					></div>
				</template>
			</template>
		</template>
		<div
			v-if="isDragging"
			class="GridPlaceholder"
			:style="{ gridArea: placeholder }"
		></div>
	</div>
</template>

<style>
	.GridWrapper {
		display: grid;
		position: relative;
		gap: var(--grid-gap);
		grid-template-rows: repeat(
			var(--grid-row-count),
			minmax(calc(var(--container-width) * var(--grid-row-height-ratio)), auto)
		);
		grid-template-columns:
			minmax(var(--grid-gutter), 1fr)
			repeat(var(--grid-column-count), minmax(0, var(--cell-max-width)))
			minmax(var(--grid-gutter), 1fr);
	}

	.GridPlaceholder {
		border: 2px solid rgb(2, 122, 255);
		inset: -2px;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(2, 122, 255);
		box-sizing: border-box;
		z-index: 10;
	}
	.GridCell {
		pointer-events: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
