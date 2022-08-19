import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: {
				_focus: {
					boxShadow: '0 0 0px 3px orange',
				},
			},
		},
		Input: {
			baseStyle: {
				_focus: {
					boxShadow: '0 0 0px 3px orange',
					borderColor: 'orange',
				},
			},
		},
		Switch: {
			baseStyle: {
				_focus: {
					boxShadow: '0 0 0px 3px orange',
				},
			},
		},
	},
});

export default theme;
