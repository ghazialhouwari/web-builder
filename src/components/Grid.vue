<script lang="ts" setup>
	import { onMounted, ref, computed } from 'vue';
	import { useDraggable } from '@vueuse/core';
	import { gridAreaToArray } from '@/utils';

	import { useGridStore } from '@/store/grid';
	const gridStore = useGridStore();

	const gridItems = ref<HTMLElement[]>([]);
	const isDragging = ref(false);
	const placeholder = ref('');

	const draggedItemRowEnd = ref(0);

	onMounted(() => {
		gridItems.value.forEach((item: HTMLElement, index: number) => {
			const initialPos = { x: 0, y: 0 };
			const { x, y, style } = useDraggable(item, {
				onStart: () => {
					initialPos.x = item.offsetLeft;
					initialPos.y = item.offsetTop;
				},
				onMove: () => {
					isDragging.value = true;

					const [rowStart, columnStart, rowEnd, columnEnd] =
						gridStore.getItemGridAreaByIndex(index);

					placeholder.value = getUpdatedGridArea(
						x.value,
						y.value,
						columnEnd - columnStart,
						rowEnd - rowStart
					);
					draggedItemRowEnd.value = gridAreaToArray(placeholder.value)[2];

					// Update the item's transform property relative to its original position
					const deltaX = x.value - initialPos.x;
					const deltaY = y.value - initialPos.y;
					gridStore.updateItemTransformByIndex(index, deltaX, deltaY);
				},
				onEnd: () => {
					isDragging.value = false;
					gridStore.updateItemGridAreaByIndex(index, placeholder.value);
					gridStore.updateItemTransformByIndex(index, 0, 0);
				},
			});
		});
	});

	const grid = computed(() => {
		const columnCount = 24;
		const gap = 11;
		const rowHeightRatio = 0.0215;
		const gutters = window.innerWidth * 0.02 - gap;
		const containerWidth = window.innerWidth - gutters * 2 - gap * 2;
		const width = Math.min(1400, containerWidth);
		const height = 8 * width * rowHeightRatio + gap * 7;
		const gapCount = (columnCount - 1) * gap;

		const cellWidth = (width - gapCount) / columnCount;
		const cellHeight = width * rowHeightRatio;

		return {
			columnCount,
			gap,
			rowHeightRatio,
			gutters,
			containerWidth,
			width,
			height,
			gapCount,
			cellWidth,
			cellHeight,
		};
	});

	const gridRowCount = computed(() => {
		const maxRow = gridStore.items.reduce((max, item) => {
			const rowEnd = gridAreaToArray(item.style.gridArea)[2];
			return Math.max(max, rowEnd);
		}, 0);

		return Math.max(maxRow, 9, draggedItemRowEnd.value) - 1;
	});

	function getUpdatedGridArea(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number
	) {
		const gridX = Math.round(
			(x - grid.value.gutters + grid.value.gap) /
				(grid.value.cellWidth + grid.value.gap)
		);
		const gridY = Math.round(y / (grid.value.cellHeight + grid.value.gap));

		const columnStart = Math.max(1, gridX + 1);
		const rowStart = Math.max(1, gridY + 1);
		const columnEnd = columnStart + columnSize;
		const rowEnd = rowStart + rowSize;

		return `${rowStart}/${columnStart}/${rowEnd}/${columnEnd}`;
	}
</script>

<template>
	<div
		class="grid-wrapper"
		:style="{
			'grid-template-rows': `repeat(
				${gridRowCount},
				minmax(calc(var(--container-width) * var(--grid-row-height-ratio)), auto)
			)`,
		}"
	>
		<div
			v-for="(item, index) in gridStore.items"
			:key="index"
			class="grid-item"
			:style="{
				gridArea: item.style.gridArea,
				transform: item.style.transform,
			}"
			ref="gridItems"
		>
			{{ item.content }}
		</div>
		<template v-if="isDragging">
			<template v-for="row in gridRowCount" :key="row">
				<template v-for="column in grid.columnCount" :key="column">
					<div
						class="grid-cell"
						:style="`grid-area: ${row}/${column + 1}/${row}/${column + 1}`"
					></div>
				</template>
			</template>
		</template>
		<div
			v-if="isDragging"
			class="placeholder"
			:style="{ gridArea: placeholder }"
		></div>
	</div>
</template>

<style>
	:root {
		--site-gutter: 2vw;
		--site-max-width: 1400px;
		--grid-gap: 11px;
		--grid-column-count: 24;
		--grid-row-height-ratio: 0.0215;
		--grid-gap-count: (var(--grid-column-count) - 1);
		--grid-gutter: calc(var(--site-gutter) - var(--grid-gap));
		--cell-max-width: calc(
			(var(--site-max-width) - (var(--grid-gap) * var(--grid-gap-count))) /
				var(--grid-column-count)
		);
		--container-width: min(
			var(--site-max-width),
			calc(100vw - var(--site-gutter))
		);
	}
	.grid-wrapper {
		display: grid;
		position: relative;
		gap: var(--grid-gap);
		grid-template-rows: repeat(
			8,
			minmax(calc(var(--container-width) * var(--grid-row-height-ratio)), auto)
		);
		grid-template-columns:
			minmax(var(--grid-gutter), 1fr)
			repeat(var(--grid-column-count), minmax(0, var(--cell-max-width)))
			minmax(var(--grid-gutter), 1fr);
	}

	.grid-item {
		position: relative;
		user-select: none;
		cursor: grab;
		background: lightblue;
	}

	.placeholder {
		border: 2px solid rgb(2, 122, 255);
		inset: -2px;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(2, 122, 255);
		box-sizing: border-box;
		z-index: 10;
	}
	.grid-cell {
		pointer-events: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
