<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { CornerRadius } from '@/utils/types';
	// Components
	import BaseInput from '@/components/base/Input.vue';
	import BorderRadiusIcon from '@/components/icon/BorderRadius.vue';
	import { deepClone } from '@/utils';

	/* eslint-disable no-unused-vars */
	const emits = defineEmits({
		'update:modelValue': (cornerRadius: CornerRadius) => true,
	});
	const props = defineProps<{
		modelValue: CornerRadius;
	}>();

	const isMultipleRadius = computed(() =>
		Object.values(props.modelValue).every(
			(obj, i, arr) => obj.value === arr[0].value
		)
	);
	const cornerRadiusType = ref<'single' | 'multiple'>(
		isMultipleRadius.value ? 'multiple' : 'single'
	);

	const multiCornerRadius = computed({
		get(): number {
			return props.modelValue.topLeft.value;
		},
		set(value: number) {
			updateMultiModleValue(value);
		},
	});

	const createComputedProperty = (key: keyof CornerRadius) => {
		return computed({
			get() {
				return props.modelValue[key].value;
			},
			set(value) {
				updateModelValue(key, value);
			},
		});
	};

	const topLeftRadius = createComputedProperty('topLeft');
	const topRightRadius = createComputedProperty('topRight');
	const bottomRightRadius = createComputedProperty('bottomRight');
	const bottomLeftRadius = createComputedProperty('bottomLeft');

	function updateModelValue(key: keyof CornerRadius, value: number) {
		const newCornerRadius = deepClone(props.modelValue);

		newCornerRadius[key].value = value;
		emits('update:modelValue', newCornerRadius);
	}
	function updateMultiModleValue(value: number) {
		const newCornerRadius = deepClone(props.modelValue);
		newCornerRadius.topLeft.value = value;
		newCornerRadius.topRight.value = value;
		newCornerRadius.bottomLeft.value = value;
		newCornerRadius.bottomRight.value = value;

		emits('update:modelValue', newCornerRadius);
	}
	function cornerRadiusTypeChange(value: 'single' | 'multiple') {
		console.log('cornerRadiusTypeChange', value);
		if (value === 'multiple') {
			updateMultiModleValue(props.modelValue.topLeft.value);
		}
	}
</script>

<template>
	<div>
		<v-row no-gutters>
			<v-col cols="4">
				<v-btn-toggle
					v-model="cornerRadiusType"
					variant="outlined"
					divided
					class="mb-3 w-100"
					@update:modelValue="cornerRadiusTypeChange"
				>
					<v-btn value="multiple" class="btn-toggle__btn">
						<v-icon icon="mdi-square-rounded-outline" size="22px"></v-icon>
					</v-btn>
					<v-btn value="single" class="btn-toggle__btn">
						<v-icon icon="mdi-border-radius" size="22px"></v-icon>
					</v-btn>
				</v-btn-toggle>
			</v-col>
			<v-col cols="8" class="ps-2">
				<v-row v-if="cornerRadiusType === 'single'" no-gutters class="gap-4">
					<v-col>
						<BaseInput
							v-model="topLeftRadius"
							type="number"
							density="comfortable"
							align="center"
							:min="0"
							:max="999"
							class="single-radius__input"
						>
							<template #append-inner>
								<span class="input__icon">
									<BorderRadiusIcon direction="topLeft" />
								</span>
							</template>
						</BaseInput>
					</v-col>
					<v-col>
						<BaseInput
							v-model="topRightRadius"
							type="number"
							density="comfortable"
							align="center"
							:min="0"
							:max="999"
							class="single-radius__input"
						>
							<template #append-inner>
								<span class="input__icon">
									<BorderRadiusIcon direction="topRight" />
								</span> </template
						></BaseInput>
					</v-col>
					<v-col>
						<BaseInput
							v-model="bottomRightRadius"
							type="number"
							density="comfortable"
							align="center"
							:min="0"
							:max="999"
							class="single-radius__input"
						>
							<template #append-inner>
								<span class="input__icon">
									<BorderRadiusIcon direction="bottomRight" />
								</span> </template
						></BaseInput>
					</v-col>
					<v-col>
						<BaseInput
							v-model="bottomLeftRadius"
							type="number"
							density="comfortable"
							align="center"
							:min="0"
							:max="999"
							class="single-radius__input"
						>
							<template #append-inner>
								<span class="input__icon">
									<BorderRadiusIcon direction="bottomLeft" />
								</span> </template
						></BaseInput>
					</v-col>
				</v-row>
				<template v-else>
					<BaseInput
						v-model="multiCornerRadius"
						type="number"
						placeholder="Mixed"
						density="comfortable"
						align="center"
						:min="0"
						:max="999"
					></BaseInput>
				</template>
			</v-col>
		</v-row>
	</div>
</template>

<style scoped>
	.btn-toggle__btn {
		flex-grow: 1;
		min-width: auto;
		padding: 0;
	}
	.gap-4 {
		gap: 4px;
	}
	.input__icon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		padding: 2px;
	}
	.single-radius__input :deep(.v-field),
	.single-radius__input :deep(.v-field input) {
		padding: 0;
	}
</style>
