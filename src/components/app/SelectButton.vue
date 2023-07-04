<script setup lang="ts">
	withDefaults(
		defineProps<{ title: string; value: any; valueType: 'string' | 'color' }>(),
		{
			valueType: 'string',
		}
	);
	const emits = defineEmits(['click']);

	function clickHandler() {
		emits('click');
	}
</script>
<template>
	<button
		v-bind="$attrs"
		class="d-flex align-center w-100 py-4 border-b"
		@click="clickHandler"
	>
		<h3 class="text-subtitle-2 font-weight-bold text-grey-darken-2">
			{{ title }}
		</h3>
		<v-spacer></v-spacer>
		<span
			v-if="valueType === 'color'"
			class="select-button__sheet d-flex me-1"
		></span>
		<span v-else class="text-subtitle-2 text-grey-darken-1 me-1">{{
			value
		}}</span>
		<v-icon icon="mdi-chevron-down" size="24px"></v-icon>
	</button>
</template>

<style scoped>
	.select-button__sheet {
		width: 24px;
		height: 24px;
		background: v-bind(value);
		border: 2px solid #eee;
		border-radius: 50%;
	}
</style>
