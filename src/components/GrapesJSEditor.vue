<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import grapesjs from 'grapesjs';
	import 'grapesjs/dist/css/grapes.min.css';

	const grapesjsEditor = ref<HTMLElement>();

	onMounted(() => {
		const editor = grapesjs.init({
			container: grapesjsEditor.value,
			height: '600px',
			width: 'auto',
			storageManager: { type: 'none' },
			plugins: [], // Add GrapesJS plugins if needed
			blockManager: {
				blocks: [
					{
						label: 'Text Block',
						category: 'Basic',
						attributes: { class: 'gjs-fonts gjs-f-text' },
						content: {
							type: 'text',
							content: 'Insert your text here',
							style: { 'font-size': '18px' },
							activeOnRender: 1,
						},
					},
					{
						label: 'Image Block',
						category: 'Media',
						attributes: { class: 'gjs-fonts gjs-f-image' },
						content: {
							type: 'image',
							src: 'https://via.placeholder.com/350x250/ffffff/000000?text=Image+Block',
							style: { width: '100%' },
						},
					},
				],
			},
		});
		const blockManager = editor.BlockManager;

		// Add custom blocks, components, or configuration for GrapesJS here
	});
</script>

<template>
	<div>
		<div ref="grapesjsEditor" class="gjs-editor"></div>
	</div>
</template>

<style scoped>
	.gjs-editor {
		border: 1px solid #c0c0c0;
		height: 800px;
	}
</style>
