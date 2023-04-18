<script setup lang="ts">
	import { IGridItemArea } from '@/utils/types';

	interface Props {
		gridArea: IGridItemArea;
	}

	defineProps<Props>();
</script>

<template>
	<div
		class="grid-wrapper__dragged-item-area"
		:style="{
			gridArea: `${gridArea.rowStart}/${gridArea.columnStart}/${gridArea.rowEnd}/${gridArea.columnEnd}`,
		}"
	></div>
</template>

<style scoped>
	.grid-wrapper__dragged-item-area {
		border: 2px solid rgb(2, 122, 255);
		inset: -2px;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(2, 122, 255);
		box-sizing: border-box;
		z-index: 10;
	}
</style>
