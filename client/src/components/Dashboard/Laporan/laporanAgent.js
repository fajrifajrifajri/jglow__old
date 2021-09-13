// Import React & Required libs
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine  } from '@nivo/line'

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// Set Axios Default URL
// var port = 5000;
// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  

const MyResponsivePie = (props) => (
	<ResponsivePie
		data={props.data}
		margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
		innerRadius={0.5}
		padAngle={0.7}
		cornerRadius={3}
		activeOuterRadiusOffset={8}
		borderWidth={1}
		borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
		arcLinkLabelsSkipAngle={10}
		arcLinkLabelsTextColor="#333333"
		arcLinkLabelsThickness={2}
		arcLinkLabelsColor={{ from: 'color' }}
		arcLabelsSkipAngle={10}
		arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
		defs={[
			{
				id: 'dots',
				type: 'patternDots',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				size: 4,
				padding: 1,
				stagger: true
			}
		]}
		fill={[
			{
				match: '*',
				id: 'dots'
			}
		]}
		
		legends={[
			{
				anchor: 'bottom',
				direction: 'row',
				justify: false,
				translateX: 0,
				translateY: 56,
				itemsSpacing: 0,
				itemWidth: 100,
				itemHeight: 18,
				itemTextColor: '#999',
				itemDirection: 'left-to-right',
				itemOpacity: 1,
				symbolSize: 18,
				symbolShape: 'circle',
				effects: [
					{
						on: 'hover',
						style: {
							itemTextColor: '#000'
						}
					}
				]
			}
		]}
	/>
);

const MyResponsiveLine = (props) => (
    <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Hari/tanggal',
            legendOffset: 36,
            legendPosition: 'middle',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'terjual',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
		defs={[
			{
				id: 'lines',
				type: 'patternLines',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				rotation: -45,
				lineWidth: 6,
				spacing: 10
			}
		]}
		fill={[
			{
				match: '*',
				id: 'lines'
			},
		]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

const LaporanAgent = (props) => {

	const [data1, setData1] = useState([]);
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([]);
	const [dataLine1, setDataLine1] = useState([]);
	const [dataLine2, setDataLine2] = useState([]);
	const [dataLine3, setDataLine3] = useState([]);
	
	useEffect(() => {
		const requestOne = axios.get('/backend/laporan-agent/minggu');
		const requestTwo = axios.get('/backend/laporan-agent/minggu-lalu');
		const requestThree = axios.get('/backend/laporan-agent/bulan');
		const requestFour = axios.get('/backend/laporan-agent/kategori-minggu');
		const requestFive = axios.get('/backend/laporan-agent/kategori-minggu-lalu');
		const requestSix = axios.get('/backend/laporan-agent/kategori-bulan');
		
		axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix]).then(axios.spread((...res) => {
		
		  setDataLine1(res[0].data);
		  setDataLine2(res[1].data);
		  setDataLine3(res[2].data);
		  console.log(res[0].data);
		  console.log(res[1].data);
		  console.log(res[2].data);
		  setData1(res[3].data);
		  setData2(res[4].data);
		  setData3(res[5].data);
		  
		})).catch(err => {
		  console.log(err.response)
		})
		
	}, [setData1, setData2, setData3, setDataLine1, setDataLine2, setDataLine3]);
	
  return ( 
  <div className="all__container">
		<div className="sidebar__container">
			<Sidebar/>
		</div>
		<div className="body__container">
			<Header />
			<div className="bg-layout min-h-screen rounded-tl-lg">
				<div className="grid grid-cols-12 py-12 gap-y-12 text-center text-pink-dark">
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan <span>semua agent</span>  minggu ini</h3>
						<div style={{height: 400}}>
							<MyResponsiveLine data={dataLine1}/>
						</div>
					</div>
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan berdasarkan agent minggu ini</h3>
						<div style={{height: 400}}>
							<MyResponsivePie data={data1}/>
						</div>
					</div>
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan <span>semua agent</span> minggu lalu</h3>
						<div style={{height: 400}}>
							<MyResponsiveLine data={dataLine2}/>
						</div>
					</div>
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan berdasarkan agent minggu lalu</h3>
						<div style={{height: 400}}>
							<MyResponsivePie data={data2}/>
						</div>
					</div>
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan <span>semua agent</span> bulan September</h3>
						<div style={{height: 400}}>
							<MyResponsiveLine data={dataLine3}/>
						</div>
					</div>
					<div className="col-span-6">
						<h3 className="text-2xl font-bold px-24">Penjualan berdasarkan agent bulan September</h3>
						<div style={{height: 400}}>
							<MyResponsivePie data={data3}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}

export default LaporanAgent;