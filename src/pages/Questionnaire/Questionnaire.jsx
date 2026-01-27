import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import {
	setClientName,
	setAddress1,
	setAddress2,
	setCity,
	setState,
	setZipCode,
	getTimeZone,
	setCarrier,
	setHandoffType,
	setSpeedUp,
	setSpeedDn,
	setMeasurement,
	setEntryType,
	setCircuitType,
	setIsTagged,
	setVlanId,
	setIPAddress1,
	setIPAddress2,
	setCidr1,
	setCidr2,
	setDNSp,
	setDNSs,
	setTPLink,
	setIPTemplate,
	clearAppErrors,
} from '../../redux/slices/appSlice';
import { processIPs } from '../../util/helpers';
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
		speedUp,
		speedDn,
		measurement,
		entryType,
		circuitType,
		isTagged,
		vlanId,
		ipAddress_1,
		ipAddress_2,
		cidr_1,
		cidr_2,
		dnsP,
		dnsS,
		tpLink,
	} = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleIP = () => {
		const data = {
			circuitType,
			...(cidr_1 && { slash1: cidr_1 }),
			ipAddress1: ipAddress_1,
			...(dnsP && { dnsP }),
			...(dnsS && { dnsS }),
			...(cidr_2 && { slash2: cidr_2 }),
			...(ipAddress_2 && { ipAddress2: ipAddress_2 }),
		};

		dispatch(setIPTemplate(processIPs(data)));
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
			up: setSpeedUp,
			dn: setSpeedDn,
			measure: setMeasurement,
			entry: setEntryType,
			circuit: setCircuitType,
			tag: setIsTagged,
			vlan: setVlanId,
			ip1: setIPAddress1,
			ip2: setIPAddress2,
			cidr1: setCidr1,
			cidr2: setCidr2,
			dns1: setDNSp,
			dns2: setDNSs,
			tp: setTPLink,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleIP();
		navigate('/config-result');
	};

	const handleTimeZone = useCallback(() => {
		if (!timeZone && zipCode?.length === 5) dispatch(getTimeZone(zipCode));
	}, [dispatch, timeZone, zipCode]);

	useEffect(() => {
		handleTimeZone();
	}, [handleTimeZone]);

	return (
		<Container className='q-container'>
			<form onSubmit={handleSubmit}>
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
						placeholder='Speed Up'
						value={speedUp}
						onFocus={handleFocus}
						onChange={(e) => handleChange('up', e.target.value)}
					/>
					<TextInput
						placeholder='Speed Down'
						value={speedDn}
						onFocus={handleFocus}
						onChange={(e) => handleChange('dn', e.target.value)}
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
					label='Circuit Type'
					options={circuitTypes}
					value={circuitType}
					onChange={(e) => handleChange('circuit', e.target.value)}
				/>
				{circuitType === 'nni' && (
					<div className='q-row'>
						<div className='radio'>
							<RadioGroup
								row
								label='Tagged?'
								value={isTagged}
								onChange={(e) => handleChange('tag', e.target.value)}
								options={taggedOptions}
							/>
						</div>
						{isTagged === 'yes' && (
							<div className='txt'>
								<TextInput
									placeholder='VLAN'
									value={vlanId}
									onFocus={handleFocus}
									onChange={(e) => handleChange('vlan', e.target.value)}
								/>
							</div>
						)}
					</div>
				)}
				<div className='cidr-row'>
					<TextInput
						placeholder='IP Address 1'
						value={ipAddress_1}
						onFocus={handleFocus}
						onChange={(e) => handleChange('ip1', e.target.value)}
					/>
					<Select
						style={{ width: '30%' }}
						label='Subnet'
						options={cidrOptions}
						value={cidr_1}
						onChange={(e) => handleChange('cidr1', e.target.value)}
					/>
				</div>
				{circuitType === 'dia' && (
					<div className='dns-row'>
						<TextInput
							placeholder='Primary DNS'
							value={dnsP}
							onFocus={handleFocus}
							onChange={(e) => handleChange('dns1', e.target.value)}
						/>
						<TextInput
							placeholder='Secondary DNS'
							value={dnsS}
							onFocus={handleFocus}
							onChange={(e) => handleChange('dns2', e.target.value)}
						/>
					</div>
				)}
				{circuitType === 'nni' && (
					<div className='cidr-row'>
						<TextInput
							placeholder='IP Address 2'
							value={ipAddress_2}
							onFocus={handleFocus}
							onChange={(e) => handleChange('ip2', e.target.value)}
						/>
						<Select
							style={{ width: '30%' }}
							label='Subnet'
							options={cidrOptions}
							value={cidr_2}
							onChange={(e) => handleChange('cidr2', e.target.value)}
						/>
					</div>
				)}
				<RadioGroup
					row
					label='TP-Link?'
					value={tpLink}
					onChange={(e) => handleChange('tp', e.target.value)}
					options={taggedOptions}
				/>
				<Select
					fullWidth
					label='Entry Type'
					options={entryTypes}
					value={entryType}
					onChange={(e) => handleChange('entry', e.target.value)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Container>
	);
};

export default Questionnaire;
