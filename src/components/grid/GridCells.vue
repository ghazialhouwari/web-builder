<script setup lang="ts">
	import { inject, ref, Ref } from 'vue';
	// Store
	import { useGridStore } from '@/store/grid';

	// Store definition
	const gridStore = useGridStore();

	const rowCount = inject<Ref<number>>('rowCount', ref(0));
</script>

<template>
	<template v-for="row in rowCount" :key="row">
		<template v-for="column in gridStore.columnCount" :key="column">
			<div
				class="grid__cell"
				:style="`grid-area: ${row}/${column + 1}/${row}/${column + 1}`"
			></div>
		</template>
	</template>
</template>

<style scoped>
	.grid__cell {
		pointer-events: none;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		background: rgba(255, 255, 255, 0.2);
	}
</style>
