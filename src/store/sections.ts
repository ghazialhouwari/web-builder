import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import {
	BlockType,
	Section,
	SectionBlockLayout,
	SiteBlock,
	ViewType,
} from '@/utils/types';
import { sections as siteSections } from '@/data/sections';
import { blocks as siteBlocks } from '@/data/blocks';
import { deepClone } from '@/utils';

import useSectionGuard from '@/composables/useSectionGuard';
import useUndoRedo from '@/composables/useUndoRedo';

export const useSectionsStore = defineStore('sections', () => {
	const sections = reactive<Section[]>(siteSections);
	const { history, addAction, undo, redo } = useUndoRedo();

	const undosLength = computed(() => history.undos.length);
	const redosLength = computed(() => history.redos.length);

	function updateLayout(
		sectionIndex: number,
		blockIndex: number,
		layout: SectionBlockLayout,
		viewType: ViewType
	) {
		Object.assign(
			sections[sectionIndex].blocks[blockIndex].layout[viewType],
			layout
		);
	}

	function setSectionBlockLayoutByIndex(
		sectionIndex: number,
		blockIndex: number,
		layout: SectionBlockLayout,
		viewType: ViewType
	) {
		const prevLayout = JSON.parse(
			JSON.stringify(sections[sectionIndex].blocks[blockIndex].layout[viewType])
		);

		updateLayout(sectionIndex, blockIndex, layout, viewType);

		addAction({
			type: 'UPDATE_SECTION_BLOCK_LAYOUT',
			undo: () => {
				updateLayout(sectionIndex, blockIndex, prevLayout, viewType);
			},
			redo: () => {
				updateLayout(sectionIndex, blockIndex, layout, viewType);
			},
		});
	}
	function setSectionRowCountByIndex(
		sectionIndex: number,
		viewType: ViewType,
		value: number
	) {
		const prevValue = sections[sectionIndex].layout[viewType].rows;
		sections[sectionIndex].layout[viewType].rows = value;

		addAction({
			type: 'SET_SECTION_ROW_COUNT',
			undo: () => {
				sections[sectionIndex].layout[viewType].rows = prevValue;
			},
			redo: () => {
				sections[sectionIndex].layout[viewType].rows = value;
			},
		});
	}

	function createBlock(
		sectionIndex: number,
		block: SiteBlock,
		layout: SectionBlockLayout
	) {
		const sectionBlock = useSectionGuard(block, layout);
		sections[sectionIndex].blocks.push(sectionBlock);
	}

	function addBlock(
		sectionIndex: number,
		type: BlockType,
		layout: SectionBlockLayout
	) {
		const block = siteBlocks.find((block) => block.type === type);
		if (!block) return;

		createBlock(sectionIndex, block, layout);
		addAction({
			type: 'ADD_BLOCK',
			undo: () => {
				sections[sectionIndex].blocks.pop();
			},
			redo: () => {
				createBlock(sectionIndex, block, layout);
			},
		});
	}
	function removeSection(sectionIndex: number) {
		const removedSection = sections[sectionIndex];
		sections.splice(sectionIndex, 1);

		addAction({
			type: 'REMOVE_SECTION',
			undo: () => {
				sections.splice(sectionIndex, 0, removedSection);
			},
			redo: () => {
				sections.splice(sectionIndex, 1);
			},
		});
	}

	function swapSections(indexA: number, indexB: number) {
		const temp = deepClone(sections[indexA]);
		sections.splice(indexA, 1, deepClone(sections[indexB]));
		sections.splice(indexB, 1, temp);
	}

	function shiftSectionUp(sectionIndex: number) {
		if (sectionIndex <= 0) return;

		swapSections(sectionIndex - 1, sectionIndex);

		addAction({
			type: 'SHIFT_SECTION_UP',
			undo: () => {
				swapSections(sectionIndex - 1, sectionIndex);
			},
			redo: () => {
				swapSections(sectionIndex - 1, sectionIndex);
			},
		});
	}

	function shiftSectionDown(sectionIndex: number) {
		if (sectionIndex >= sections.length - 1) return;

		swapSections(sectionIndex, sectionIndex + 1);

		addAction({
			type: 'SHIFT_SECTION_DOWN',
			undo: () => {
				swapSections(sectionIndex, sectionIndex + 1);
			},
			redo: () => {
				swapSections(sectionIndex, sectionIndex + 1);
			},
		});
	}

	return {
		sections,
		undosLength,
		redosLength,
		addBlock,
		setSectionBlockLayoutByIndex,
		setSectionRowCountByIndex,
		removeSection,
		shiftSectionDown,
		shiftSectionUp,
		undo,
		redo,
	};
});
