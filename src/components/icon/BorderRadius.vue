<script setup lang="ts">
	withDefaults(
		defineProps<{
			direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null;
		}>(),
		{
			direction: null,
		}
	);
</script>

<template>
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 43 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_1_2)">
			<path
				d="M10 1C10 1 10 1 7 1C4 1 1 4 1 7C1 10 1 10 1 10"
				:stroke="direction === 'topLeft' ? '#000' : '#aaa'"
				stroke-width="2"
			/>
			<path
				d="M10 47C10 47 10 47 7 47C4 47 1 44 1 41C1 38 1 38 1 38"
				:stroke="direction === 'bottomLeft' ? '#000' : '#aaa'"
				stroke-width="2"
			/>
			<path
				d="M33 1C33 1 33 1 36 1C39 1 42 4 42 7C42 10 42 10 42 10"
				:stroke="direction === 'topRight' ? '#000' : '#aaa'"
				stroke-width="2"
			/>
			<path
				d="M33 47C33 47 33 47 36 47C39 47 42 44 42 41C42 38 42 38 42 38"
				:stroke="direction === 'bottomRight' ? '#000' : '#aaa'"
				stroke-width="2"
			/>
		</g>
		<defs>
			<clipPath id="clip0_1_2">
				<rect width="43" height="48" fill="white" />
			</clipPath>
		</defs>
	</svg>
</template>
