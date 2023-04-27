<script setup lang="ts">
	// Store
	import { useGridStore } from '@/store/grid';
	// Props
	defineProps<{
		rowCount: number;
	}>();
	// Store definition
	const gridStore = useGridStore();
</script>

<template>
	<template v-for="row in rowCount" :key="row">
		<template v-for="column in gridStore.columnCount" :key="column">
			<div
				class="grid-wrapper__cell"
				:style="`grid-area: ${row}/${column + 1}/${row}/${column + 1}`"
			></div>
		</template>
	</template>
</template>

<style scoped>
	.grid-wrapper__cell {
		pointer-events: none;
		border-radius: 4px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
	}
</style>
