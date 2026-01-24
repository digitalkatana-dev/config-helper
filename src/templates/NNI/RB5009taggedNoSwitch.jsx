import React from 'react';
import { useSelector } from 'react-redux';

const RB5009taggedNoSwitch = () => {
	const {
		carrier,
		speed,
		measurement,
		vlanId,
		cidr_1,
		cidr_2,
		address_1,
		address_2,
		city,
		state,
		zipCode,
		timeZone,
	} = useSelector((state) => state.app);

	let wanip = 4;
	let lanip = 6;
	const ether1 = `${carrier}_ASE_${speed}${measurement}`;
	const wan = `${wanip}${cidr_1}`;
	const lan = `${lanip}${cidr_2}`;
	const maxSpeed = `${speed}${measurement}/${speed}${measurement}`;
	const shaping = `${speed}${measurement}`;
	const wanNet = 'wan net';
	const lanNet = 'lan net';
	const core = 'core';
	const location = `${address_1}${
		address_2 ? '_' + address_2 : ''
	}_${city}_${state}_${zipCode}`;

	return (
		<div style={{ textAlign: 'left', padding: '0 30%' }}>
			<p>/interface bridge</p>
			<p>add name=Voice_Bridge</p>
			<p>/interface vlan</p>
			<p>
				add interface=ether1 name={ether1} vlan-id=
				{vlanId}
			</p>
			<p>/ip pool</p>
			<p>add name=dhcp_pool1 ranges=192.168.25.100-192.168.25.200</p>
			<p>/snmp community</p>
			<p>set [ find default=yes ] addresses=\</p>
			<p>66.171.157.2/32,68.68.198.2/32,66.171.147.130/32 name=\</p>
			<p>nli-client</p>
			<p>/ip dhcp-server</p>
			<p>
				add address-pool=dhcp_pool1 disabled=no interface=Voice_Bridge
				name=dhcp1
			</p>
			<p>/ip dhcp-server option</p>
			<p>add code=160 name=Option160 value="'http://ndp.mynlv.com/cfg'"</p>
			<p>/interface bridge port</p>
			<p>add bridge=Voice_Bridge interface=ether3</p>
			<p>add bridge=Voice_Bridge interface=ether4</p>
			<p>add bridge=Voice_Bridge interface=ether5</p>
			<p>add bridge=Voice_Bridge interface=ether6</p>
			<p>add bridge=Voice_Bridge interface=ether7</p>
			<p>/ip address</p>
			<p>
				add address={wan} interface={ether1} network={wanNet}
			</p>
			<p>
				add address=192.168.25.1/24 interface=Voice_Bridge network=192.168.25.0
			</p>
			<p>
				add address={lan} interface=ether2 network={lanNet}
			</p>
			<p>/ip dhcp-server network</p>
			<p>
				add address=192.168.25.0/24 dhcp-option=Option160
				dns-server=207.7.100.100,208.67.222.222,8.8.4.4\
			</p>
			<p>gateway=192.168.25.1</p>
			<p>/ip dns</p>
			<p>set allow-remote-requests=no servers=\</p>
			<p>208.67.222.222,66.171.145.146,207.7.100.100,8.8.8.8</p>
			<p>/ip firewall filter</p>
			<p>
				add action=drop chain=forward comment="Drop to bogon list"
				dst-address-list=\
			</p>
			<p>Bogons</p>
			<p>add action=accept chain=forward protocol=icmp</p>
			<p>add action=accept chain=input protocol=icmp</p>
			<p>add action=accept chain=input connection-state=established</p>
			<p>add action=accept chain=input connection-state=related</p>
			<p>
				add action=accept chain=input dst-port=8291 protocol=tcp src-port=""
			</p>
			<p>add action=accept chain=input dst-port=161 protocol=udp</p>
			<p>add action=accept chain=input dst-port=2222 protocol=tcp</p>
			<p>add action=accept chain=input dst-port=22 protocol=tcp</p>
			<p>add action=drop chain=input in-interface={ether1}</p>
			<p>/ip firewall nat</p>
			<p>add action=masquerade chain=srcnat disabled=yes</p>
			<p>add action=masquerade chain=srcnat src-address=192.168.25.0/24</p>
			<p>
				add action=dst-nat chain=dstnat dst-port=2222 in-interface={ether1}{' '}
				log=yes \
			</p>
			<p>port="" protocol=tcp to-addresses=192.168.25.2 to-ports=22</p>
			<p>/ip firewall service-port</p>
			<p>set ftp disabled=yes</p>
			<p>set tftp disabled=yes</p>
			<p>set irc disabled=yes</p>
			<p>set h323 disabled=yes</p>
			<p>set sip disabled=yes</p>
			<p>set pptp disabled=yes</p>
			<p>set udplite disabled=yes</p>
			<p>set dccp disabled=yes</p>
			<p>set sctp disabled=yes</p>
			<p>/ip route</p>
			<p>add distance=1 gateway={core}</p>
			<p>/queue simple</p>
			<p>
				add max-limit={maxSpeed} name=Shaping-{shaping} target={ether1}{' '}
				dst=0.0.0.0/0
			</p>
			<p>/ip service</p>
			<p>set telnet disabled=yes</p>
			<p>set ftp disabled=yes</p>
			<p>set www disabled=yes</p>
			<p>
				set ssh
				address=66.171.144.0/20,66.185.160.0/20,207.7.96.0/19,68.101.245.246/32,104.51.34.250/32,76.248.46.80/29,47.157.175.189/32,63.247.145.30/32,71.208.138.15/32
			</p>
			<p>set api disabled=yes</p>
			<p>
				set winbox
				address="66.171.144.0/20,66.185.160.0/20,207.7.96.0/19,192.168.25.0\
			</p>
			<p>
				/24,68.101.245.246/32,47.157.175.189/32,63.247.145.30/32,71.208.138.15/32"
			</p>
			<p>set api-ssl disabled=yes</p>
			<p>/snmp</p>
			<p>set contact=support@nextlevelinternet.com enabled=yes location=\</p>
			<p>"{location}" trap-generators=\</p>
			<p>
				interfaces trap-interfaces=ether1 trap-target=207.7.100.77
				trap-version=2
			</p>
			<p>/system clock</p>
			<p>set time-zone-name={timeZone}</p>
			<p>/system identity</p>
			<p>
				set name=[[[[Circuit Name in HOMIR (Caps for first letter, no spaces or
				special characters - ex:Luna_Grill_LG25_Ventura_50M]]]]
			</p>
			<p>/system logging</p>
			<p>set 2 action=echo</p>
			<p>add action=echo topics=interface</p>
			<p>/user group</p>
			<p>
				add name=tech
				policy="local,read,write,test,winbox,!telnet,!ssh,!ftp,!reboot,!policy,!password,!web,!s\
			</p>
			<p>niff,!sensitive,!api,!romon,!rest-api"</p>
			<p>/user add name=nli-sup password=B@ndw1dth4@11 group=full</p>
			<p>/user add name=nli-eng password=An51bl3w0rk54us! group=full</p>
			<p>/user add name=tech password=!nlit3mpt3ch! group=tech</p>
			<p>/system ntp client</p>
			<p>set enabled=yes servers=132.163.96.1,132.163.97.1</p>
			<p>/user disable admin</p>
		</div>
	);
};

export default RB5009taggedNoSwitch;
