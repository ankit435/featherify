import { PlayType } from '@/types/index';

export default function removeAPlayItem(originalPlays: PlayType[], uuid: string): PlayType[] {
	const plays = [...originalPlays];
	console.log('before', plays);
	for (let i = 0; i < plays.length; i++) {
		if (plays[i].uuid === uuid) {
			plays.splice(i, 1);
			break;
		}
	}
	console.log('after', plays);
	return plays;
}
