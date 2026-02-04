import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getTimeZone = createAsyncThunk(
	'app/get_time_zone',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.get(
				`https://tools-backend-7x55.onrender.com/config/timezone/${data}`,
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.datat);
		}
	},
);

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'light',
	clientName: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	zipCode: '',
	timeZone: '',
	carrier: '',
	handoffType: 'copper',
	symmetrical: 'yes',
	speedUp: '',
	speedDn: '',
	measurement: '',
	entryType: '',
	circuitType: '',
	isTagged: 'no',
	vlanId: '',
	ipAddress_1: '',
	ipAddress_2: '',
	cidr_1: '',
	cidr_2: '',
	verveRouter: '',
	available: '',
	subnetMask: '',
	gateway: '',
	coreVerveGateway: '',
	verveRouterWan: '',
	wanMask: '',
	clientGateway: '',
	lanMask: '',
	gatewayLocation: 'beg',
	dnsP: '',
	dnsS: '',
	tpLink: 'no',
	ipTemplate: null,
	config: null,
	appSuccess: null,
	appErrors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setClientName: (state, action) => {
			state.clientName = action.payload;
		},
		setAddress1: (state, action) => {
			state.address_1 = action.payload;
		},
		setAddress2: (state, action) => {
			state.address_2 = action.payload;
		},
		setCity: (state, action) => {
			state.city = action.payload;
		},
		setState: (state, action) => {
			state.state = action.payload;
		},
		setZipCode: (state, action) => {
			state.zipCode = action.payload;
		},
		setTimeZone: (state, action) => {
			state.timeZone = action.payload;
		},
		setCarrier: (state, action) => {
			state.carrier = action.payload;
		},
		setHandoffType: (state, action) => {
			state.handoffType = action.payload;
		},
		setSymmetrical: (state, action) => {
			state.symmetrical = action.payload;
			if (action.payload === 'yes') state.speedUp = '';
		},
		setSpeedUp: (state, action) => {
			state.speedUp = action.payload;
		},
		setSpeedDn: (state, action) => {
			state.speedDn = action.payload;
		},
		setMeasurement: (state, action) => {
			state.measurement = action.payload;
		},
		setEntryType: (state, action) => {
			state.entryType = action.payload;
		},
		setCircuitType: (state, action) => {
			state.circuitType = action.payload;
			if (action.payload === 'nni') state.cidr_1 = '/30';
		},
		setIsTagged: (state, action) => {
			state.isTagged = action.payload;
			if (action.payload === 'no') state.vlanId = '';
		},
		setVlanId: (state, action) => {
			state.vlanId = action.payload;
		},
		setIPAddress1: (state, action) => {
			state.ipAddress_1 = action.payload;
		},
		setIPAddress2: (state, action) => {
			state.ipAddress_2 = action.payload;
		},
		setCidr1: (state, action) => {
			state.cidr_1 = action.payload;
		},
		setCidr2: (state, action) => {
			state.cidr_2 = action.payload;
		},
		setVerveRouter: (state, action) => {
			state.verveRouter = action.payload;
		},
		setAvailable: (state, action) => {
			state.available = action.payload;
		},
		setSubnetMask: (state, action) => {
			state.subnetMask = action.payload;
		},
		setGateway: (state, action) => {
			state.gateway = action.payload;
		},
		setCoreVerveGateway: (state, action) => {
			state.coreVerveGateway = action.payload;
		},
		setVerveRouterWan: (state, action) => {
			state.verveRouterWan = action.payload;
		},
		setWanMask: (state, action) => {
			state.wanMask = action.payload;
		},
		setClientGateway: (state, action) => {
			state.clientGateway = action.payload;
		},
		setLanMask: (state, action) => {
			state.lanMask = action.payload;
		},
		setGatewayLocation: (state, action) => {
			state.gatewayLocation = action.payload;
		},
		setDNSp: (state, action) => {
			state.dnsP = action.payload;
		},
		setDNSs: (state, action) => {
			state.dnsS = action.payload;
		},
		setTPLink: (state, action) => {
			state.tpLink = action.payload;
		},
		setIPTemplate: (state, action) => {
			state.ipTemplate = action.payload;
		},
		setErrors: (state, action) => {
			state.appErrors = action.payload;
		},
		clearForm: (state) => {
			state.clientName = '';
			state.address_1 = '';
			state.address_2 = '';
			state.city = '';
			state.state = '';
			state.zipCode = '';
			state.timeZone = '';
			state.carrier = '';
			state.handoffType = 'copper';
			state.symmetrical = 'yes';
			state.speedUp = '';
			state.speedDn = '';
			state.measurement = '';
			state.entryType = '';
			state.circuitType = '';
			state.isTagged = 'no';
			state.vlanId = '';
			state.ipAddress_1 = '';
			state.ipAddress_2 = '';
			state.cidr_1 = '';
			state.cidr_2 = '';
			state.verveRouter = '';
			state.available = '';
			state.subnetMask = '';
			state.gateway = '';
			state.coreVerveGateway = '';
			state.verveRouterWan = '';
			state.wanMask = '';
			state.clientGateway = '';
			state.lanMask = '';
			state.gatewayLocation = 'beg';
			state.dnsP = '';
			state.dnsS = '';
			state.tpLink = 'no';
			state.ipTemplate = null;
		},
		clearAppSuccess: (state) => {
			state.appSuccess = null;
		},
		clearAppErrors: (state) => {
			state.appErrors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTimeZone.pending, (state) => {
				state.loading = true;
				state.appErrors = null;
			})
			.addCase(getTimeZone.fulfilled, (state, action) => {
				state.loading = false;
				state.timeZone = action.payload;
			})
			.addCase(getTimeZone.rejected, (state, action) => {
				state.loading = false;
				state.appErrors = action.payload;
			});
	},
});

export const {
	setTheme,
	setClientName,
	setAddress1,
	setAddress2,
	setCity,
	setState,
	setZipCode,
	setTimeZone,
	setCarrier,
	setHandoffType,
	setSymmetrical,
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
	setVerveRouter,
	setAvailable,
	setSubnetMask,
	setGateway,
	setCoreVerveGateway,
	setVerveRouterWan,
	setWanMask,
	setClientGateway,
	setLanMask,
	setGatewayLocation,
	setDNSp,
	setDNSs,
	setTPLink,
	setIPTemplate,
	setErrors,
	clearForm,
	clearAppSuccess,
	clearAppErrors,
} = appSlice.actions;

export default appSlice.reducer;
