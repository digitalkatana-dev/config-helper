export const processIPs = (data) => {
	const {
		circuitType,
		slash1,
		ipAddress1,
		dnsP,
		dnsS,
		slash2,
		ipAddress2,
		gatewayLocation,
	} = data;

	const maskMap = {
		'/30': '255.255.255.252 /30',
		'/29': '255.255.255.248 /29',
		'/28': '255.255.255.240 /28',
		'/27': '255.255.255.224 /27',
		'/26': '255.255.255.192 /26',
		'/25': '255.255.255.128 /25',
		'/24': '255.255.255.0 /24',
		'/23': '255.255.254.0 /23',
		'/22': '255.255.252.0 /22',
		'/21': '255.255.248.0 /21',
		'/20': '255.255.240.0 /20',
		'/19': '255.255.224.0 /19',
		'/18': '255.255.192.0 /18',
		'/17': '255.255.128.0 /17',
		'/16': '255.255.0.0 /16',
	};

	const parseIP = (ip) => {
		const [a, b, c, d] = ip?.split('.').map(Number);
		return {
			base: `${a}.${b}.${c}.`,
			last: d,
		};
	};

	const usableHosts = (slash) =>
		Math.pow(2, 32 - Number(slash?.replace('/', ''))) - 2;

	const buildRange = (base, start, end) => `${base}${start} - ${base}${end}`;

	if (circuitType === 'dia') {
		const { base, last } = parseIP(ipAddress1);
		const hosts = usableHosts(slash1);

		const firstUsable = last + 1;
		const lastUsable = last + hosts;

		const verveRouter =
			gatewayLocation === 'beg'
				? `${base}${firstUsable + 1}`
				: `${base}${firstUsable}`;

		const available =
			gatewayLocation === 'beg'
				? buildRange(base, firstUsable + 2, lastUsable)
				: buildRange(base, firstUsable + 1, lastUsable - 1);
		const gateway =
			gatewayLocation === 'beg'
				? `${base}${firstUsable}`
				: `${base}${lastUsable}`;

		return {
			network: ipAddress1,
			verveRouter,
			available,
			subnetMask: maskMap[slash1],
			gateway,
			dnsP,
			dnsS,
		};
	}

	if (circuitType === 'nni') {
		const wan = parseIP(ipAddress1);
		const lan = parseIP(ipAddress2);
		const lanHosts = usableHosts(slash2);

		const firstUsable = lan.last + 1;
		const lastUsable = lan.last + lanHosts;

		const clientGateway =
			gatewayLocation === 'beg'
				? `${lan.base}${firstUsable}`
				: `${lan.base}${lastUsable}`;
		const available =
			gatewayLocation === 'beg'
				? buildRange(lan.base, firstUsable + 1, lastUsable)
				: buildRange(lan.base, firstUsable, lastUsable - 1);

		return {
			wanNetwork: ipAddress1,
			coreVerveGateway: `${wan.base}${wan.last + 1}`,
			verveRouterWan: `${wan.base}${wan.last + 2}`,
			wanMask: maskMap[slash1] || '255.255.255.252 /30',

			lanNetwork: ipAddress2,
			clientGateway,
			available,
			lanMask: maskMap[slash2],

			dnsP: '208.67.222.222',
			dnsS: '207.7.100.100',
		};
	}

	return null;
};

export const processInterfaceName = (data) => {
	let { carrier, speedDn, measurement } = data;
	carrier = carrier.toUpperCase();

	if (carrier === 'ATT') {
		carrier = 'ATT ASE';
	}

	const nameString = `${carrier} ${speedDn}${measurement}`;

	const interfaceName = nameString?.replaceAll(' ', '_');

	return interfaceName;
};

export const processClientLocation = (data) => {
	const { address_1, address_2, city, state, zipCode } = data;

	const nameString = `${address_1} ${
		address_2 ? address_2 : ''
	} ${city} ${state} ${zipCode}`;

	return nameString;
};

export const processCircuitName = (data) => {
	const { clientName, city, speedDn, measurement } = data;

	const nameString = `${clientName} ${city} ${speedDn}${measurement}`;

	const circuitName = nameString?.replaceAll(' ', '_');

	return circuitName;
};

export const processCircuitSpeed = (data) => {
	const { speedUp, speedDn, measurement } = data;

	let maxLimit;
	if (speedUp) {
		maxLimit = `${speedUp + measurement}/${speedDn + measurement}`;
	} else {
		maxLimit = `${speedDn + measurement}/${speedDn + measurement}`;
	}

	return maxLimit;
};
