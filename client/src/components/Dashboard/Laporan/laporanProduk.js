// Import React & Required libs
import React, { Component, useState } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';
import axios from 'axios';

// Visx
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';

const coins = [
  { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
  { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
  { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
];

// Finally we'll embed it all in an SVG
function LaporanProduk(props) {
  const [active, setActive] = useState(null);
  const width = 400;
  const half = width / 2;
  return ( 
  <div className="grid grid-cols-12">
		<div className="col-span-2">
			<Sidebar/>
		</div>
		<div className="col-span-10 bg-gray-100">
			<div className="bg-layout min-h-screen rounded-tl-lg">
				 <svg width={width} height={width}>
					<Group top={half} left={half}>
					  <Pie
						data={coins}
						pieValue={(data) => data.amount * data.inUSD}
						outerRadius={half}
						innerRadius={({ data }) => {
						  const size = active && active.symbol == data.symbol ? 12 : 8;
						  return half - size;
						}}
						padAngle={0.01}
					  >
						{(pie) => {
						  return pie.arcs.map((arc) => {
							return (
							  <g
								key={arc.data.symbol}
								onMouseEnter={() => setActive(arc.data)}
								onMouseLeave={() => setActive(null)}
							  >
								<path d={pie.path(arc)} fill={arc.data.color}></path>
							  </g>
							);
						  });
						}}
					  </Pie>

					  {active ? (
						<>
						  <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
							{`$${Math.floor(active.amount * active.inUSD)}`}
						  </Text>

						  <Text
							textAnchor="middle"
							fill={active.color}
							fontSize={20}
							dy={20}
						  >
							{`${active.amount} ${active.symbol}`}
						  </Text>
						</>
					  ) : (
						<>
						  <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
							{`$${Math.floor(
							  coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
							)}`}
						  </Text>

						  <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
							{`${coins.length} Assets`}
						  </Text>
						</>
					  )}
					</Group>
				  </svg>
			</div>
		</div>
	</div>
  );
}

// ... somewhere else, render it ...
// <BarGraph />

export default withRouter(LaporanProduk);
