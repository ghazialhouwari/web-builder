<script setup lang="ts">
	import { KeyValuePair } from '@/utils/types';
	import { computed } from 'vue';

	const props = defineProps<{
		modelValue: any;
		items: KeyValuePair[];
	}>();
	const emits = defineEmits(['update:modelValue']);

	const modelValue = computed({
		get() {
			return props.modelValue;
		},
		set(newValue) {
			emits('update:modelValue', newValue);
		},
	});
</script>

<template>
	<v-btn-toggle
		v-model="modelValue"
		v-bind="$attrs"
		variant="outlined"
		divided
		class="mb-3 w-100"
	>
		<v-btn
			v-for="item in items"
			:key="item.value"
			:value="item.value"
			class="btn-toggle__btn"
		>
			<v-icon v-if="item.key.startsWith('mdi-')" :icon="item.key"></v-icon>
			<template v-else>{{ item.key }}</template>
		</v-btn>
	</v-btn-toggle>
</template>

<style scoped>
	.btn-toggle__btn {
		flex-grow: 1;
		min-width: auto;
	}
</style>
