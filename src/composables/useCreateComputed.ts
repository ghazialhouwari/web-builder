import { SectionBlockValue } from '@/utils/types';
import { computed, Ref } from 'vue';
// Store
import { useSectionsStore } from '@/store/sections';

export function useCreateComputed<T extends SectionBlockValue>(
	blockValue: T,
	blockIndex: number,
	sectionIndex: Ref<number>
) {
	// Store definition
	const sectionsStore = useSectionsStore();

	const getter = (key: keyof T): any => {
		return blockValue[key];
	};

	const setter = (key: keyof T, value: any) => {
		sectionsStore.updateBlockValue(sectionIndex.value, blockIndex, {
			...blockValue,
			[key]: value,
		});
	};

	const createComputedProperty = (key: keyof T) => {
		return computed({
			get: () => getter(key),
			set(value) {
				setter(key, value);
			},
		});
	};

	return { getter, setter, createComputedProperty };
}
