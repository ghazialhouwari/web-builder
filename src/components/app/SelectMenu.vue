<script setup lang="ts">
	import { KeyValuePair } from '@/utils/types';

	defineProps<{
		modelValue?: any;
		items?: KeyValuePair[];
	}>();
	const emits = defineEmits(['update:modelValue']);

	function updateModelValue(value: any) {
		emits('update:modelValue', value);
	}
</script>

<template>
	<v-menu
		attach
		:close-on-content-click="false"
		transition="slide-y-transition"
		location-strategy="static"
		content-class="mt-12 mx-2"
	>
		<template v-slot:activator="{ props }">
			<div v-bind="props">
				<slot name="activator" />
			</div>
		</template>
		<v-card min-width="270px" max-width="270px" class="elevation-4">
			<v-card-text>
				<div
					v-for="item in items"
					:key="item.key"
					class="pa-2"
					:class="{ 'bg-grey-lighten-3 pa-2 rounded': modelValue === item.key }"
					@click="updateModelValue(item.key)"
				>
					<slot :name="item.key" :title="item.key" />
				</div>
				<slot />
			</v-card-text>
		</v-card>
	</v-menu>
</template>

<style scoped></style>
