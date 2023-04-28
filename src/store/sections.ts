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
		sections[sectionIndex].layout[viewType].rows = value;
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

	return {
		sections,
		undosLength,
		redosLength,
		addBlock,
		setSectionBlockLayoutByIndex,
		setSectionRowCountByIndex,
		undo,
		redo,
	};
});
