import { MouseEvent, ReactNode } from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Tooltip,
	InputGroup,
	InputRightAddon,
	NumberInput,
	NumberInputField,
	NumberIncrementStepper,
	NumberDecrementStepper,
	NumberInputStepper,
	UseCounterProps as ChakraUseCounterProps,
} from '@chakra-ui/react';
import { GoCheck } from 'react-icons/go';

import { useControl } from '@/contexts/play';
import { defaultSettings } from '@/utils/index';

export default function Controls() {
	const { controlState, dispatchControl, changeControlWithServer } = useControl();

	return (
		<Box>
			<NumberField
				label="Height"
				info="number of pixels to consider in the height of the image"
				val={controlState.height}
				onChange={(curVal) =>
					changeControlWithServer({
						type: 'CHANGE_HEIGHT',
						payload: { height: parseInt(curVal, 10) },
					})
				}
				rightSideDisplay="px"
				max={100}
				min={5}
				step={1}
			/>
			<NumberField
				label="Width"
				info="number of pixels to consider in the width of the image"
				val={controlState.width}
				onChange={(curVal) =>
					changeControlWithServer({
						type: 'CHANGE_WIDTH',
						payload: { width: parseInt(curVal, 10) },
					})
				}
				rightSideDisplay="px"
				max={100}
				min={5}
				step={1}
			/>
			<NumberField
				label="Blur"
				info="the amount by which the image will be blurred"
				val={controlState.blur}
				onChange={(curVal) =>
					dispatchControl({
						type: 'CHANGE_BLUR',
						payload: { blur: parseFloat(curVal) },
					})
				}
				rightSideDisplay="px"
				max={30.0}
				min={0.0}
				step={0.5}
			/>
			<NumberField
				label="Scale"
				info="the magnification factor of the image"
				val={controlState.scale}
				onChange={(curVal) =>
					dispatchControl({
						type: 'CHANGE_SCALE',
						payload: { scale: parseFloat(curVal) },
					})
				}
				max={3.0}
				min={0.0}
				step={0.05}
			/>
			<ToggleButtons
				label="Config"
				info="config for css-styles or base64-image"
				options={defaultSettings.PLAY_CONFIGS}
				val={controlState.config}
				onClick={(e) =>
					changeControlWithServer({
						type: 'CHANGE_CONFIG',
						payload: { config: (e.target as any).value },
					})
				}
			/>
			<Button
				mt="3.5"
				variant="outline"
				colorScheme="pink"
				onClick={() => dispatchControl({ type: 'RESET', payload: {} })}>
				Reset All Values
			</Button>
		</Box>
	);
}

function NumberField({
	val,
	label,
	step,
	min,
	max,
	onChange,
	rightSideDisplay,
	info,
}: INumberFieldProps) {
	return (
		<Box my="1.5">
			<FormControl id={label}>
				<Tooltip hasArrow label={info} placement="top">
					<FormLabel fontWeight="extrabold">{label}</FormLabel>
				</Tooltip>
				<InputGroup>
					<NumberInput
						max={max}
						min={min}
						step={step}
						value={val.toString()}
						onChange={onChange}
						clampValueOnBlur={true}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					{rightSideDisplay && <InputRightAddon>{rightSideDisplay}</InputRightAddon>}
				</InputGroup>
			</FormControl>
		</Box>
	);
}

function ToggleButtons({ label, options, val, info, onClick }: IToggleButtonProps) {
	const isFirstActive = options[0] === val;
	const isSecondActive = options[1] === val;

	const variant1 = isFirstActive ? 'solid' : 'outline';
	const variant2 = isSecondActive ? 'solid' : 'outline';

	const leftIcon = isFirstActive ? <GoCheck /> : undefined;
	const rightIcon = isSecondActive ? <GoCheck /> : undefined;

	return (
		<FormControl id={label}>
			<Tooltip hasArrow label={info} placement="top">
				<FormLabel fontWeight="extrabold">Config</FormLabel>
			</Tooltip>
			<InputGroup>
				<ButtonGroup size="sm" isAttached>
					<Button
						value={options[0]}
						onClick={onClick}
						variant={variant1}
						disabled={isFirstActive}
						leftIcon={leftIcon}>
						CSS
					</Button>
					<Button
						onClick={onClick}
						value={options[1]}
						variant={variant2}
						disabled={isSecondActive}
						rightIcon={rightIcon}>
						Base64
					</Button>
				</ButtonGroup>
			</InputGroup>
		</FormControl>
	);
}

interface INumberFieldProps {
	label: string;
	info: string;
	max: number;
	min: number;
	val: number;
	step: number;
	onChange: ChakraUseCounterProps['onChange'];
	rightSideDisplay?: ReactNode;
}

interface IToggleButtonProps {
	label: string;
	info: string;
	options: string[];
	val: number | string;
	onClick: (e: MouseEvent) => void;
}
