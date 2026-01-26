import React from 'react';
import { useSelector } from 'react-redux';
import {
	Mkt5009BridgedPrivate,
	Mkt5009BridgedPrivateTP,
	MktCCRBridgedPrivate,
	Mkt5009RoutedSwitchSub,
	Mkt5009RoutedTPSub,
	Mkt5009RoutedSwitchSubSFP,
	Mkt5009RoutedTPSubSFP,
	MktCCRRoutedSwitchSub,
	Mkt5009RoutedVDHCPVB,
	Mkt5009RoutedVDHCPVBTP,
	Mkt5009RoutedVDHCPVBF,
	Mkt5009RoutedVDHCPVBTPF,
	MktCCRRoutedLB,
	MktCCRRoutedVDHCPVB,
} from './templates';
import './config.scss';

const ConfigReview = () => {
	const { handoffType, circuitType, entryType, measurement, isTagged, tpLink } =
		useSelector((state) => state.app);

	const configViews = () => {
		const isTaggedBool = isTagged === 'yes';
		const tpLinkBool = tpLink === 'yes';

		const keyByCircuit = {
			dia: `${measurement}_${tpLinkBool}`,
			nni: `${measurement}_${isTaggedBool}_${tpLinkBool}`,
		};

		const views = {
			dia: {
				copper: {
					M_false: <Mkt5009BridgedPrivate />,
					M_true: <Mkt5009BridgedPrivateTP />,
				},
				fiber: {
					G_false: <MktCCRBridgedPrivate />,
				},
			},

			nni: {
				copper: {
					M_false_false: <Mkt5009RoutedVDHCPVB />,
					M_false_true: <Mkt5009RoutedVDHCPVBTP />,
					M_true_false: <Mkt5009RoutedSwitchSub />,
					M_true_true: <Mkt5009RoutedTPSub />,

					G_false_false: <MktCCRRoutedLB />,
					G_false_true: <MktCCRRoutedVDHCPVB />,
					G_true_false: <MktCCRRoutedSwitchSub />,
				},
				fiber: {
					M_false_false: <Mkt5009RoutedVDHCPVBF />,
					M_false_true: <Mkt5009RoutedVDHCPVBTPF />,
					M_true_false: <Mkt5009RoutedSwitchSubSFP />,
					M_true_true: <Mkt5009RoutedTPSubSFP />,
				},
			},
		};

		return (
			views?.[circuitType]?.[handoffType]?.[keyByCircuit[circuitType]] ?? null
		);
	};

	return <div id='config-review'>{configViews()}</div>;
};

export default ConfigReview;
