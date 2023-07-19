<script setup lang="ts">
	import {
		ButtonSectionBlock,
		CornerRadius,
		SectionBlockButton,
	} from '@/utils/types';
	import { computed, inject, ref, Ref } from 'vue';
	import {
		shapes,
		scalingOptions,
		sizeOptions,
		horizontalAlignmentOptions,
		verticalAlignmentOptions,
		contentAlignmentOptions,
	} from '@/data/options';
	import { debounce } from '@/utils';
	// Composables
	import { useCreateComputed } from '@/composables/useCreateComputed';
	// Components
	import Tabs from '@/components/block/settings/Tabs.vue';
	import AppSelectMenu from '@/components/app/SelectMenu.vue';
	import AppButtonToggle from '@/components/app/ButtonToggle.vue';
	import AppCornerRadius from '@/components/app/CornerRadius.vue';
	import AppSubtitle from '@/components/app/Subtitle.vue';
	import AppSelectButton from '@/components/app/SelectButton.vue';

	// Props
	const props = defineProps<{
		block: ButtonSectionBlock;
		blockIndex: number;
	}>();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	const { getter, setter, createComputedProperty } =
		useCreateComputed<SectionBlockButton>(
			props.block.value,
			props.blockIndex,
			sectionIndex
		);

	const buttonText = createComputedProperty('buttonText');
	const shape = createComputedProperty('shape');
	const fluid = createComputedProperty('fluid');
	const buttonSize = createComputedProperty('buttonSize');
	const horizontalAlignment = createComputedProperty('horizontalAlignment');
	const verticalAlignment = createComputedProperty('verticalAlignment');
	const contentAlignment = createComputedProperty('contentAlignment');

	const cornerRadius = computed({
		get: () => getter('cornerRadius'),
		set(value: CornerRadius) {
			setter('cornerRadius', value);
		},
	});

	const debounceSetColor = debounce(setColor, 100);

	function setColor(key: keyof SectionBlockButton, value: string) {
		setter(key, value);
	}
	const backgroundColor = computed({
		get: () => getter('backgroundColor'),
		set: (value: string) => debounceSetColor('backgroundColor', value),
	});
	const color = computed({
		get: () => getter('color'),
		set: (value: string) => debounceSetColor('color', value),
	});
</script>

<template>
	<Tabs :blockType="block.type">
		<template #windowContent>
			<v-text-field
				v-model="buttonText"
				label="Text"
				variant="underlined"
			></v-text-field>
		</template>
		<template #windowLayout>
			<AppSelectMenu v-model="shape" :items="shapes">
				<template #activator>
					<AppSelectButton title="Shape" :value="shape" class="mb-4" />
				</template>

				<template #elevated>
					<v-btn variant="elevated" color="primary" block>Elevated</v-btn>
				</template>
				<template #tonal>
					<v-btn variant="tonal" color="primary" block>Tonal</v-btn>
				</template>
				<template #outlined>
					<v-btn variant="outlined" color="primary" block>Outline</v-btn>
				</template>
				<template #text>
					<v-btn variant="text" color="primary" block>Text</v-btn>
				</template>
				<template #plain>
					<v-btn variant="plain" color="primary" block>Plain</v-btn>
				</template>
			</AppSelectMenu>
			<!-- Scaling -->
			<AppSubtitle title="Scaling" />
			<AppButtonToggle v-model="fluid" :items="scalingOptions" class="mb-4" />
			<!-- Size -->
			<AppSubtitle title="Size" />
			<AppButtonToggle v-model="buttonSize" :items="sizeOptions" class="mb-4" />
			<!-- Alignment -->
			<AppSubtitle title="Alignment" />
			<AppButtonToggle
				v-model="horizontalAlignment"
				:items="horizontalAlignmentOptions"
			/>
			<AppButtonToggle
				v-model="verticalAlignment"
				:items="verticalAlignmentOptions"
			/>
		</template>
		<template #windowDesign>
			<!-- Background Color -->
			<AppSelectMenu>
				<template #activator>
					<AppSelectButton
						title="Background Color"
						:value="backgroundColor"
						valueType="color"
				/></template>
				<v-color-picker v-model="backgroundColor" elevation="0"></v-color-picker>
			</AppSelectMenu>
			<!-- Text Color -->
			<AppSelectMenu>
				<template #activator>
					<AppSelectButton
						title="Text Color"
						:value="color"
						valueType="color"
						class="mb-4"
				/></template>
				<v-color-picker v-model="color" elevation="0"></v-color-picker>
			</AppSelectMenu>
			<!-- Alignment -->
			<AppSubtitle title="Content Alignment" />
			<AppButtonToggle
				v-model="contentAlignment"
				:items="contentAlignmentOptions"
				class="mb-4"
			/>
			<!-- Corner Radius -->
			<AppSubtitle title="Corner Radius" />
			<AppCornerRadius v-model="cornerRadius" />
		</template>
	</Tabs>
</template>
@/composables/useCreateComputed
