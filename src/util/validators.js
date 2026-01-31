const isEmpty = (value) => !value?.trim();

export const validateConfigData = (data) => {
	const errors = {};
	const REQUIRED_MSG = 'Must not be empty!';

	const requireField = (field, message = REQUIRED_MSG) => {
		if (isEmpty(data[field])) {
			errors[field] = 'Must not be empty!';
		}
	};

	// Always-required fields
	[
		'circuitType',
		'carrier',
		'speedDn',
		'measurement',
		'ipAddress_1',
		'cidr_1',
		'clientName',
		'address_1',
		'city',
		'state',
		'zipCode',
		'entryType',
	].forEach(requireField);

	// Special-case message
	if (isEmpty(data.timeZone)) {
		errors.timeZone = 'Time zone not processed!';
	}

	// Conditional: symmetrical = no
	if (data.symmetrical === 'no') {
		requireField('speedUp');
	}

	// Config-type–specific rules
	if (data.circuitType === 'dia') {
		requireField('dnsP');
		requireField('dnsS');
	}

	if (data.circuitType === 'nni') {
		requireField('ipAddress_2');
		requireField('cidr_2');

		if (data.isTagged === 'yes') {
			requireField('vlanId');
		}
	}

	return {
		errors,
		valid: Object.keys(errors).length === 0,
	};
};
