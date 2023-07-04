<script setup lang="ts">
	import { SectionBlockButton } from '@/utils/types';
	import { computed } from 'vue';
	// Props
	const props = defineProps<{
		value: SectionBlockButton;
	}>();

	const cornerRadius = computed(() => {
		const radius = props.value.cornerRadius;
		return `${radius.topLeft.value}${radius.topLeft.unit} ${radius.topRight.value}${radius.topRight.unit} ${radius.bottomRight.value}${radius.bottomRight.unit} ${radius.bottomLeft.value}${radius.bottomLeft.unit}`;
	});

	const contentAlignment = computed(() => props.value.contentAlignment);
	const color = computed(() => props.value.color);
</script>

<template>
	<div
		class="button__container d-flex"
		:class="`align-${value.verticalAlignment} justify-${value.horizontalAlignment}`"
	>
		<v-btn
			:color="value.backgroundColor"
			:size="value.buttonSize"
			:block="value.fluid"
			:variant="value.shape"
			:class="{
				'h-100': value.fluid,
			}"
			class="button__block"
			>{{ value.buttonText }}</v-btn
		>
	</div>
</template>

<style scoped>
	.button__container {
		width: 100%;
		height: 100%;
	}
	.button__block {
		border-radius: v-bind(cornerRadius);
		justify-content: v-bind(contentAlignment);
		color: v-bind(color);
	}
</style>
