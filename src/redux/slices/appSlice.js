import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import env from 'react-dotenv';
import tzlookup from 'tz-lookup';

export const getTimeZone = createAsyncThunk(
	'app/get_time_zone',
	async (data, { rejectWithValue }) => {
		try {
			const locationRes = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=${env.API_KEY}`
			);
			const location = locationRes?.data.results[0].geometry.location;
			const { lat, lng } = location;
			let timeZone;
			if (lat && lng) {
				timeZone = tzlookup(lat, lng);
			}
			return timeZone;
		} catch (err) {
			return rejectWithValue(err.response.datat);
		}
	}
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
	speed: '',
	measurement: '',
	entryType: '',
	circuitType: '',
	vlanId: '',
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
		setSpeed: (state, action) => {
			state.speed = action.payload;
		},
		setMeasurement: (state, action) => {
			state.measurement = action.payload;
		},
		setEntryType: (state, action) => {
			state.entryType = action.payload;
		},
		setCircuitType: (state, action) => {
			state.circuitType = action.payload;
		},
		setVlanId: (state, action) => {
			state.vlanId = action.payload;
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
	setSpeed,
	setMeasurement,
	setEntryType,
	setCircuitType,
	setVlanId,
	clearAppSuccess,
	clearAppErrors,
} = appSlice.actions;

export default appSlice.reducer;
