import * as React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export class App extends React.Component<any, any> {
  render() {
    const data = [
      { nameX: "X", uv: 4000, pv: 2400, amt: 2400, nameY: 'N' },
      { nameX: "X", uv: 3000, pv: 1398, amt: 2210, nameY: 'N' },
      { nameX: "X", uv: 2000, pv: 9800, amt: 2290, nameY: 'N' },
      { nameX: "X", uv: 2780, pv: 3908, amt: 2000, nameY: 'N' },
      { nameX: "X", uv: 1890, pv: 4800, amt: 2181, nameY: 'N' },
      { nameX: "X", uv: 2390, pv: 3800, amt: 2500, nameY: 'N' },
      { nameX: "X", uv: 3490, pv: 4300, amt: 2100, nameY: 'N' }
    ];
    return (
      <div className='mainContainer'>
        <h1 className="title">
        Программа для моделирования профилей
        распределения примеси, введённой в кремний
        диффузией из поверхностного источника ограниченной емкости
        </h1>
        <div>
          <button>изобразить</button>
        </div>
        <div className='graphsContainer'>
          <LineChart
            width={800}
            height={500}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="nameX" />
            <YAxis dataKey="nameY"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    );
  }
}
