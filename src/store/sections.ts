import { defineStore } from 'pinia';
import { reactive } from 'vue';
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
	const { addAction, undo, redo } = useUndoRedo();

	function updateLayout(
		sectionIndex: number,
		blockIndex: number,
		layout: SectionBlockLayout,
		viewType: ViewType
	) {
		sections[sectionIndex].blocks[blockIndex].layout[viewType].start.x =
			layout.start.x;
		sections[sectionIndex].blocks[blockIndex].layout[viewType].end.x =
			layout.end.x;
		sections[sectionIndex].blocks[blockIndex].layout[viewType].start.y =
			layout.start.y;
		sections[sectionIndex].blocks[blockIndex].layout[viewType].end.y =
			layout.end.y;
	}

	function updateSectionBlockLayoutByIndex(
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
		const blockIndex = siteBlocks.findIndex((block) => block.type === type);
		const block: SiteBlock = JSON.parse(JSON.stringify(siteBlocks[blockIndex]));
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
		addBlock,
		updateSectionBlockLayoutByIndex,
		undo,
		redo,
	};
});
