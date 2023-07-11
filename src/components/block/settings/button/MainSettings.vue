<script setup lang="ts">
	import {
		ButtonSectionBlock,
		CornerRadius,
		SectionBlockButton,
	} from '@/utils/types';
	import { computed, inject, ref, Ref } from 'vue';
	import { tabs } from '@/data/blockSettingsTabs';
	import {
		shapes,
		scalingOptions,
		sizeOptions,
		horizontalAlignmentOptions,
		verticalAlignmentOptions,
		contentAlignmentOptions,
	} from '@/data/options';
	import { debounce } from '@/utils';
	// Components
	import AppSelectMenu from '@/components/app/SelectMenu.vue';
	import AppButtonToggle from '@/components/app/ButtonToggle.vue';
	import AppCornerRadius from '@/components/app/CornerRadius.vue';
	import AppSubtitle from '@/components/app/Subtitle.vue';
	import AppSelectButton from '@/components/app/SelectButton.vue';
	// Store
	import { useSectionsStore } from '@/store/sections';
	// Props
	const props = defineProps<{
		block: ButtonSectionBlock;
		blockIndex: number;
	}>();

	// Store definition
	const sectionsStore = useSectionsStore();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	const tab = ref(1);

	const getter = (key: keyof SectionBlockButton): any => {
		return props.block.value[key];
	};

	const setter = (key: keyof SectionBlockButton, value: any) => {
		sectionsStore.updateBlockValue(sectionIndex.value, props.blockIndex, {
			...props.block.value,
			[key]: value,
		});
	};

	const createComputedProperty = (key: keyof SectionBlockButton) => {
		return computed({
			get: () => getter(key),
			set(value) {
				setter(key, value);
			},
		});
	};

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
	<div>
		<div class="block-settings__title">
			<v-tabs v-model="tab" color="primary">
				<v-tab
					v-for="(item, tabIndex) of tabs[block.type]"
					:key="block.type + item"
					:value="tabIndex + 1"
					min-width="auto"
					class="px-0 me-4"
					variant="plain"
					:ripple="false"
					>{{ item }}</v-tab
				>
			</v-tabs>
		</div>
		<v-card-text class="block-settings__content pt-0 border-t d-grid">
			<v-window v-model="tab" class="d-grid">
				<v-window-item :value="1" class="pt-4">
					<v-text-field
						v-model="buttonText"
						label="Text"
						variant="underlined"
					></v-text-field>
				</v-window-item>
				<v-window-item :value="2">
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
				</v-window-item>
				<v-window-item :value="3">
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
				</v-window-item>
			</v-window>
		</v-card-text>
	</div>
</template>
