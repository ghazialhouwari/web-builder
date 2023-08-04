import { ref } from 'vue';
import { useFetch, useFileDialog } from '@vueuse/core';

interface UseUploadOptions {
	onSuccess?: (imageUrl: string) => void;
	onError?: (error: Error) => void;
}

export function useUpload({ onSuccess, onError }: UseUploadOptions = {}) {
	const { open, onChange } = useFileDialog();
	const mediaURL = ref<string | null>(null);
	const loading = ref<boolean>(false);

	onChange(async (files: FileList | null) => {
		if (!files?.length) {
			return;
		}
		loading.value = true;

		const reader = new FileReader();
		reader.onload = async () => {
			const url = 'https://api.bobapps.co/v1/upload';
			const { error, data } = await useFetch(url, {
				async beforeFetch({ options, cancel }) {
					const myToken =
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuVHdxUGhkVnlkNnFVV0JpWiIsImVtYWlsIjoiZ2hhemlhbGhvdXdhcmlAZ21haWwuY29tIiwic3lzdGVtX3VzZXJfaWQiOiJuVHdxUGhkVnlkNnFVV0JpWiIsImlhdCI6MTY3OTc3NjYyNSwiZXhwIjoxNzQyODkxODI1fQ.89tnR1Yo1vOB2ztRGY-xH4KUf-WN4h-cV8ODIrMM-lA';

					if (!myToken) {
						cancel();
					}

					options.headers = {
						...options.headers,
						Authorization: `Bearer ${myToken}`,
					};

					return {
						options,
					};
				},
			}).json();

			if (error.value) {
				loading.value = false;
				onError?.(new Error(error.value));
			} else {
				// Create and execute useFetch instance
				const { statusCode } = await useFetch(data.value.url, {
					method: data.value.method,
					headers: {
						'Content-Type': '',
						...data.value.headers,
					},
					body: reader.result,
				}).json();

				if (statusCode.value === 200) {
					mediaURL.value = `https://bobofficialbucket.s3.us-west-2.amazonaws.com/${data.value.image_name}`;
					onSuccess?.(mediaURL.value);
				}
				loading.value = false;
			}
		};
		reader.readAsArrayBuffer(files[0]);
	});

	return {
		open,
		mediaURL,
		loading,
	};
}
