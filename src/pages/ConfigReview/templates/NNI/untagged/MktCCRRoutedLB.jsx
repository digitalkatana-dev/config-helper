import React from 'react';
import { useSelector } from 'react-redux';
import {
	processClientLocation,
	processCircuitName,
} from '../../../../../util/helpers';
import '../../template.scss';

const MktCCRRoutedLB = () => {
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
			<h2>Mikrotik - CCR Routed - Data - with LAN Bridge</h2>
			<pre>
				<p className='config-details'>
					{`/interface bridge
add name=LAN_Bridge
/snmp community
set [ find default=yes ] addresses=\
    66.171.157.2/32,68.68.198.2/32,66.171.147.130/32 name=\
    nli-client
set [ find default=yes ] addresses=207.7.100.77/32 name=nli-client
/interface bridge port
add bridge=LAN_Bridge interface=sfp-sfpplus2
add bridge=LAN_Bridge interface=sfp-sfpplus3
add bridge=LAN_Bridge interface=sfp-sfpplus4
/ip address
add address=[[[[[CHANGE WAN IP ADDRESS][/NOTATION for SUBNET ex:192.168.1.2/30]]]]]]]] interface=sfp-sfpplus1 network=[[[[[WAN NETWORK IP ADDRESS]]]]]]]
add address=[[[[[CHANGE LAN IP ADDRESS][/NOTATION for SUBNET ex:10.10.50.2/29]]]]]]]] interface=LAN_Bridge network=[[[[[LAN NETWORK IP ADDRESS]]]]]]]]
/ip dns
set allow-remote-requests=no servers=208.67.222.222,66.171.145.146,207.7.100.100,8.8.8.8
/ip firewall filter
add action=drop chain=forward comment="Drop to bogon list" dst-address-list=Bogons
add action=accept chain=forward protocol=icmp
add action=accept chain=input protocol=icmp
add action=accept chain=input connection-state=established
add action=accept chain=input connection-state=related
add action=accept chain=input dst-port=8291 protocol=tcp src-port=""
add action=accept chain=input dst-port=161 protocol=udp
add action=accept chain=input dst-port=22 protocol=tcp
add action=drop chain=input in-interface=sfp-sfpplus1
/ip firewall nat
add action=masquerade chain=srcnat disabled=yes
/ip firewall service-port
set ftp disabled=yes
set tftp disabled=yes
set irc disabled=yes
set h323 disabled=yes
set sip disabled=yes
set pptp disabled=yes
set udplite disabled=yes
set dccp disabled=yes
set sctp disabled=yes						 
/ip route
add distance=1 gateway=[[[[[[IP ADDRESS OF CORE]]]]]]]
/queue simple
add max-limit=[[[[[Upload/download speed of circuit ex: 500M/500M]]]]] name=Shaping-[[[[speed of circuit ex:500M]]]] target=sfp-sfpplus1 dst=0.0.0.0/0
/ip service
set telnet disabled=yes
set ftp disabled=yes
set www disabled=yes
set ssh address=66.171.144.0/20,66.185.160.0/20,207.7.96.0/19,68.101.245.246/32,104.51.34.250/32,76.248.46.80/29,47.157.175.189/32,63.247.145.30/32,71.208.138.15/32
set api disabled=yes
set winbox address="66.171.144.0/20,66.185.160.0/20,207.7.96.0/19,192.168.25.0/24,68.101.245.246/32,47.157.175.189/32,63.247.145.30/32,71.208.138.15/32"
set api-ssl disabled=yes
/snmp
set contact=support@nextlevelinternet.com enabled=yes location="[[[[[CLIENT ADDRESS]]]]]]]" trap-generators=interfaces trap-interfaces=sfp-sfpplus1 trap-target=207.7.100.77 trap-version=2
/system clock
set time-zone-name=[[[[[America/Los_Angeles, America/Denver, America/Chicago, America/New_York]]]]]
/system logging
set 2 action=echo
add action=echo topics=interface
/system identity
set name=[[[[[Circuit Name in HOMIR (Caps for first letter, no spaces or special characters - ex:Luna_Grill_LG25_Ventura_50M]]]]]]]
/user group
add name=tech policy="local,read,write,test,winbox,!telnet,!ssh,!ftp,!reboot,!policy,!password,!web,!sniff,!sensitive,!api,!romon,!dude"
/user add name=nli-sup password=B@ndw1dth4@11 group=full
/user add name=nli-eng password=An51bl3w0rk54us! group=full
/user add name=tech password=!nlit3mpt3ch! group=tech 
/user disable admin
/system ntp client
set enabled=yes servers=132.163.96.1,132.163.97.1`}
				</p>
			</pre>
		</div>
	);
};

export default MktCCRRoutedLB;
