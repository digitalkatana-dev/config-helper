import React from 'react';
import { useSelector } from 'react-redux';
import {
	processClientLocation,
	processCircuitName,
} from '../../../../../util/helpers';
import '../../template.scss';

const Mkt5009RoutedVDHCPVBTPF = () => {
	const {
		clientName,
		speedDn,
		measurement,
		cidr_1,
		address_1,
		address_2,
		city,
		state,
		zipCode,
		timeZone,
		ipTemplate,
	} = useSelector((state) => state.app);

	const wan = `${ipTemplate?.verveRouter + cidr_1}`;

	const clientLocation = () => {
		const data = {
			address_1,
			...(address_2 && { address_2 }),
			city,
			state,
			zipCode,
		};

		return processClientLocation(data);
	};

	const circuitName = () => {
		const data = {
			clientName,
			city,
			speedDn,
			measurement,
		};

		return processCircuitName(data);
	};

	return (
		<div className='template'>
			<h2>
				Mikrotik - 5009 Routed - with Voice DHCP Server Voice Bridge - Fiber
				Handoff from Carrier - with TP-Link switch
			</h2>
			<pre>
				<p className='config-details'></p>
			</pre>
		</div>
	);
};

export default Mkt5009RoutedVDHCPVBTPF;
