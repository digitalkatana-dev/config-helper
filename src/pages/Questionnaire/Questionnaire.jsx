import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import {
	RB5009noSwitch,
	RB5009switch,
	RB5009taggedNoSwitch,
	RB5009taggedSwitch,
	RB5009SFPtaggedNoSwitch,
	RB5009SFPtaggedSwitch,
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
	setHandoffType,
	setSpeed,
	setMeasurement,
	setEntryType,
	setCircuitType,
	setIsTagged,
	setVlanId,
	setIPAddress1,
	setIPAddress2,
	setCidr1,
	setCidr2,
	setTPLink,
	clearForm,
	// clearAppSuccess,
	clearAppErrors,
} from '../../redux/slices/appSlice';
import {
	states,
	speedMeasurements,
	entryTypes,
	circuitTypes,
	taggedOptions,
	handoffOptions,
	cidrOptions,
} from '../../util/data';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import RadioGroup from '../../components/RadioGroup';
import Button from '../../components/Button';
import './questionnaire.scss';

const Questionnaire = () => {
	// const [isTagged, setIsTagged] = useState(false);
	// const [handoffType, setHandoffType] = useState('copper');
	const {
		clientName,
		address_1,
		address_2,
		city,
		state,
		zipCode,
		timeZone,
		carrier,
		handoffType,
		speed,
		measurement,
		entryType,
		circuitType,
		isTagged,
		vlanId,
		ipAddress_1,
		ipAddress_2,
		cidr_1,
		cidr_2,
		tpLink,
	} = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleClear = () => {
		dispatch(clearForm());
	};

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
			handoff: setHandoffType,
			speed: setSpeed,
			measure: setMeasurement,
			entry: setEntryType,
			circuit: setCircuitType,
			tag: setIsTagged,
			vlan: setVlanId,
			ip1: setIPAddress1,
			ip2: setIPAddress2,
			cidr1: setCidr1,
			cidr2: setCidr2,
			tp: setTPLink,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(setTimeZone(''));
	};

	const configViews = () => {
		if (entryType !== 'auto') return null;
		if (circuitType !== 'nni') return null;

		const isTaggedBool = isTagged === 'true';
		const tpLinkBool = tpLink === 'true';
		const key = `${measurement}_${isTaggedBool}_${tpLinkBool}`;

		const copperMap = {
			M_false_false: <RB5009noSwitch />,
			M_false_true: <RB5009switch />,
			M_true_false: <RB5009taggedNoSwitch />,
			M_true_true: <RB5009taggedSwitch />,

			G_false_false: <CCRnoSwitch />,
			G_false_true: <CCRswitch />,
			G_true_false: <CCRtaggedNoSwitch />,
			G_true_true: <CCRtaggedSwitch />,
		};

		const fiberMap = {
			M_false_false: <RB5009SFPtaggedNoSwitch />,
			M_false_true: <RB5009SFPtaggedSwitch />,
		};

		if (handoffType === 'copper') {
			return copperMap[key] ?? null;
		}

		if (handoffType === 'fiber') {
			return fiberMap[key] ?? null;
		}

		return null;
	};

	const handleTimeZone = useCallback(() => {
		if (!timeZone && zipCode?.length === 5) dispatch(getTimeZone(zipCode));
	}, [dispatch, timeZone, zipCode]);

	useEffect(() => {
		handleTimeZone();
	}, [handleTimeZone]);

	return (
		<Container>
			<Button onClick={handleClear}>Clear</Button>
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
				<div className='carrier-row'>
					<div className='txt'>
						<TextInput
							placeholder='Carrier'
							value={carrier}
							onFocus={handleFocus}
							onChange={(e) => handleChange('carrier', e.target.value)}
						/>
					</div>
					<div className='radio'>
						<RadioGroup
							row
							label='Handoff'
							value={handoffType}
							onChange={(e) => handleChange('handoff', e.target.value)}
							options={handoffOptions}
						/>
					</div>
				</div>
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
						onChange={(e) => handleChange('tag', e.target.value)}
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
				{circuitType === 'nni' && (
					<>
						<div className='cidr-row'>
							<TextInput
								placeholder='IP Address 1'
								value={ipAddress_1}
								onFocus={handleFocus}
								onChange={(e) => handleChange('ip1', e.target.value)}
							/>
							<Select
								// fullWidth
								label='Subnet'
								options={cidrOptions}
								value={cidr_1}
								onChange={(e) => handleChange('cidr1', e.target.value)}
							/>
						</div>
						<div className='cidr-row'>
							<TextInput
								placeholder='IP Address 2'
								value={ipAddress_2}
								onFocus={handleFocus}
								onChange={(e) => handleChange('ip2', e.target.value)}
							/>
							<Select
								// fullWidth
								label='Subnet'
								options={cidrOptions}
								value={cidr_2}
								onChange={(e) => handleChange('cidr2', e.target.value)}
							/>
						</div>
					</>
				)}
				<RadioGroup
					row
					label='TP-Link?'
					value={tpLink}
					onChange={(e) => handleChange('tp', e.target.value)}
					options={taggedOptions}
				/>
				<Button type='submit'>Submit</Button>
			</form>
			{configViews()}
		</Container>
	);
};

export default Questionnaire;
