<script setup lang="ts">
	import { computed } from 'vue';

	const emits = defineEmits(['update:modelValue']);

	const props = withDefaults(
		defineProps<{
			type: 'text' | 'number';
			placeholder: string;
			rounded: number;
			hideDetails: boolean;
			modelValue: any;
			min: number | null;
			max: number | null;
			align: 'center' | null;
		}>(),
		{
			type: 'text',
			placeholder: '',
			rounded: 4,
			hideDetails: true,
			min: null,
			max: null,
			align: null,
		}
	);

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(newValue) {
			emits('update:modelValue', newValue);
		},
	});

	function onKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		const currentValue = target.value;
		const nextValue = currentValue + event.key;

		// Validate number input
		if (props.type === 'number') {
			if (event.key.toLowerCase() === 'e') {
				event.preventDefault();
			}
			if (props.min || props.min === 0) {
				if (
					(props.min === 0 && event.key === '-') ||
					Number(nextValue) < props.min
				) {
					event.preventDefault();
				}
			}
			if (props.max || props.max === 0) {
				if (Number(nextValue) > props.max) {
					event.preventDefault();
				}
			}
		}
	}
</script>

<template>
	<v-text-field
		v-model="value"
		:type="type"
		:placeholder="placeholder"
		:rounded="rounded"
		:hide-details="hideDetails"
		v-bind="$attrs"
		class="input__field"
		:class="{ 'input__field--center': align === 'center' }"
		bg-color="rgba(var(--v-theme-on-surface), 0.1)"
		variant="solo"
		@keydown="onKeydown"
	>
		<template #append-inner>
			<slot name="append-inner"></slot>
		</template>
	</v-text-field>
</template>

<style scoped>
	/* Chrome, Safari, Edge, Opera */
	.input__field :deep(input[type='number']::-webkit-inner-spin-button),
	.input__field :deep(input[type='number']::-webkit-outer-spin-button) {
		-webkit-appearance: none;
		margin: 0;
	}
	.input__field :deep(.v-field) {
		box-shadow: none;
	}

	.input__field--center :deep(input) {
		text-align: center;
	}

	/* Firefox */
	.input__field :deep(input[type='number']) {
		-moz-appearance: textfield;
	}
</style>
