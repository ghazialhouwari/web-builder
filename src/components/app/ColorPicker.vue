<script setup lang="ts">
	import { computed } from 'vue';
	const props = defineProps(['modelValue']);
	const emits = defineEmits(['update:modelValue']);

	const color = computed({
		get() {
			return props.modelValue;
		},
		set(newColor) {
			emits('update:modelValue', newColor);
		},
	});
</script>

<template>
	<v-expansion-panels class="color-picker">
		<v-expansion-panel elevation="0">
			<v-expansion-panel-title>
				Color
				<template v-slot:actions>
					<span class="color-picker__color"></span>
				</template>
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<v-color-picker v-model="color" elevation="0"></v-color-picker>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<style scoped>
	.color-picker__color {
		width: 24px;
		height: 24px;
		border: 1px solid #a8a6a1;
		border-radius: 50%;
		background: v-bind(color);
	}
	.color-picker :deep(.v-expansion-panel--active > .v-expansion-panel-title) {
		min-height: auto;
	}
	.color-picker :deep(.v-expansion-panel-text__wrapper) {
		padding: 8px 0;
	}
</style>
