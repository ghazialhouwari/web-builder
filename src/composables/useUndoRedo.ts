import { ActionType } from '@/utils/types';
import { reactive } from 'vue';

interface Action {
	type: ActionType;
	undo: () => void;
	redo: () => void;
}

export default function useUndoRedo() {
	const history = reactive({ undos: [] as Action[], redos: [] as Action[] });
	const maxHistorySize = 20;

	function addAction(action: Action) {
		if (history.undos.length >= maxHistorySize) {
			history.undos.shift();
		}
		history.undos.push(action);
		history.redos.length = 0;
	}

	function undo() {
		const action = history.undos.pop();
		if (action) {
			action.undo();
			history.redos.push(action);
		}
	}

	function redo() {
		const action = history.redos.pop();
		if (action) {
			action.redo();
			history.undos.push(action);
		}
	}

	return {
		history,
		addAction,
		undo,
		redo,
	};
}
