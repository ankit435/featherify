import DropZone from './dropZone';
import UrlZone from './urlZone';
import { InputProvider } from '@/contexts/input';

export default function InputChamber() {
	return (
		<InputProvider>
			<DropZone />
			<UrlZone />
		</InputProvider>
	);
}
