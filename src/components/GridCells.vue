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
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
