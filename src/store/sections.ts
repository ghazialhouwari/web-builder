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

export const useSectionsStore = defineStore('sections', () => {
	const sections = reactive<Section[]>(siteSections);

	function updateSectionBlockLayoutByIndex(
		sectionIndex: number,
		blockIndex: number,
		layout: SectionBlockLayout,
		viewType: ViewType
	) {
		sections[sectionIndex].blocks[blockIndex].layout[viewType] = layout;
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
	}

	return {
		sections,
		addBlock,
		updateSectionBlockLayoutByIndex,
	};
});
