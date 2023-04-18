<template>
	<template v-for="row in gridRowCount" :key="row">
		<template v-for="column in gridStore.grid.columnCount" :key="column">
			<div
				class="grid-wrapper__cell"
				:style="`grid-area: ${row}/${column + 1}/${row}/${column + 1}`"
			></div>
		</template>
	</template>
</template>

<script setup lang="ts">
	import { useGridStore } from '@/store/grid';

	interface Props {
		gridRowCount: number;
	}

	defineProps<Props>();

	const gridStore = useGridStore();
</script>

<style scoped>
	.grid-wrapper__cell {
		pointer-events: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
