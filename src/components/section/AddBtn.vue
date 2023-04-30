<script setup lang="ts">
	import { inject, ref, Ref } from 'vue';
	// Store
	import { useSectionsStore } from '@/store/sections';

	const props = defineProps<{
		position: 'top' | 'bottom';
	}>();

	const sectionIndex = inject<Ref<number>>('sectionIndex', ref(0));

	// Store definition
	const sectionsStore = useSectionsStore();
	function addSection() {
		const index =
			props.position === 'top' ? sectionIndex.value : sectionIndex.value + 1;
		sectionsStore.addSection(index);
	}
</script>

<template>
	<div class="section__add-btn" :class="`section__add-btn--${position}`">
		<v-btn color="primary" size="small" @click="addSection">Add Section</v-btn>
	</div>
</template>

<style scoped>
	.section__add-btn {
		position: absolute;
		width: fit-content;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	.section__add-btn--top {
		top: 0;
		transform: translateY(-50%);
	}
	.section__add-btn--bottom {
		bottom: 0;
		transform: translateY(50%);
	}
</style>
