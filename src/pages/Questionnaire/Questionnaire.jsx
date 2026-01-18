import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import {
	RB5009noSwitch,
	RB5009switch,
	RB5009taggedNoSwitch,
	RB5009taggedSwitch,
	CCRnoSwitch,
	CCRswitch,
	CCRtaggedNoSwitch,
	CCRtaggedSwitch,
} from '../../templates/NNI';
import {
	setClientName,
	setAddress1,
	setAddress2,
	setCity,
	setState,
	setZipCode,
	getTimeZone,
	setTimeZone,
	setCarrier,
	setSpeed,
	setMeasurement,
	setEntryType,
	setCircuitType,
	setVlanId,
	// clearAppSuccess,
	clearAppErrors,
} from '../../redux/slices/appSlice';
import {
	states,
	speedMeasurements,
	entryTypes,
	circuitTypes,
	taggedOptions,
} from '../../util/data';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import RadioGroup from '../../components/RadioGroup';
import Button from '../../components/Button';
import './questionnaire.scss';

const Questionnaire = () => {
	const [isTagged, setIsTagged] = useState(false);
	const {
		clientName,
		address_1,
		address_2,
		city,
		state,
		zipCode,
		timeZone,
		carrier,
		speed,
		measurement,
		entryType,
		circuitType,
		vlanId,
	} = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearAppErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			name: setClientName,
			add1: setAddress1,
			add2: setAddress2,
			city: setCity,
			state: setState,
			zip: setZipCode,
			carrier: setCarrier,
			speed: setSpeed,
			measure: setMeasurement,
			entry: setEntryType,
			circuit: setCircuitType,
			vlan: setVlanId,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(setTimeZone(''));
	};

	const configViews = () => {
		if (entryType === 'auto' && circuitType === 'nni') {
			if (measurement === 'M' && isTagged === 'true') {
				return <RB5009taggedNoSwitch />;
			} else if (measurement === 'M' && isTagged === 'false') {
				return <RB5009noSwitch />;
			} else if (measurement === 'G' && isTagged === 'true') {
				return <CCRtaggedNoSwitch />;
			} else if (measurement === 'G' && isTagged === 'false') {
				return <CCRnoSwitch />;
			} else {
				return;
			}
		}
	};

	const handleTimeZone = useCallback(() => {
		if (!timeZone && zipCode?.length === 5) dispatch(getTimeZone(zipCode));
	}, [dispatch, timeZone, zipCode]);

	useEffect(() => {
		handleTimeZone();
	}, [handleTimeZone]);

	return (
		<Container>
			<form onSubmit={handleClick}>
				<TextInput
					placeholder='Client Name'
					value={clientName}
					onFocus={handleFocus}
					onChange={(e) => handleChange('name', e.target.value)}
				/>
				<div className='address'>
					<TextInput
						placeholder='Address 1'
						value={address_1}
						onFocus={handleFocus}
						onChange={(e) => handleChange('add1', e.target.value)}
					/>
					<TextInput
						placeholder='Address 2'
						value={address_2}
						onFocus={handleFocus}
						onChange={(e) => handleChange('add2', e.target.value)}
					/>
					<div className='address-row'>
						<TextInput
							placeholder='City'
							value={city}
							onFocus={handleFocus}
							onChange={(e) => handleChange('city', e.target.value)}
						/>
						<Select
							fullWidth
							label='State'
							options={states}
							value={state}
							onChange={(e) => handleChange('state', e.target.value)}
						/>
						<TextInput
							placeholder='Zip Code'
							value={zipCode}
							onFocus={handleFocus}
							onChange={(e) => handleChange('zip', e.target.value)}
						/>
					</div>
				</div>
				<TextInput
					placeholder='Carrier'
					value={carrier}
					onFocus={handleFocus}
					onChange={(e) => handleChange('carrier', e.target.value)}
				/>
				<div className='speed-row'>
					<TextInput
						placeholder='Speed'
						value={speed}
						onFocus={handleFocus}
						onChange={(e) => handleChange('speed', e.target.value)}
					/>
					<Select
						fullWidth
						label='Measure'
						options={speedMeasurements}
						value={measurement}
						onChange={(e) => handleChange('measure', e.target.value)}
					/>
				</div>
				<Select
					fullWidth
					label='Entry Type'
					options={entryTypes}
					value={entryType}
					onChange={(e) => handleChange('entry', e.target.value)}
				/>
				<Select
					fullWidth
					label='Circuit Type'
					options={circuitTypes}
					value={circuitType}
					onChange={(e) => handleChange('circuit', e.target.value)}
				/>
				{circuitType === 'nni' && (
					<RadioGroup
						row
						label='Tagged?'
						value={isTagged}
						onChange={(e) => setIsTagged(e.target.value)}
						options={taggedOptions}
					/>
				)}
				{isTagged === 'true' && (
					<TextInput
						placeholder='VLAN'
						value={vlanId}
						onFocus={handleFocus}
						onChange={(e) => handleChange('vlan', e.target.value)}
					/>
				)}
				<Button type='submit'>Submit</Button>
			</form>
			{configViews()}
		</Container>
	);
};

export default Questionnaire;
