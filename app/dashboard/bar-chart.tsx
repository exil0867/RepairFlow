'use client'
import { ResponsiveBar } from '@nivo/bar'
export default function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {
            name: 'A',
            data: 111,
          },
          {
            name: 'B',
            data: 157,
          },
          {
            name: 'C',
            data: 129,
          },
          {
            name: 'D',
            data: 187,
          },
          {
            name: 'E',
            data: 119,
          },
          {
            name: 'F',
            data: 22,
          },
          {
            name: 'G',
            data: 101,
          },
          {
            name: 'H',
            data: 83,
          },
        ]}
        keys={['data']}
        indexBy='name'
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Name',
          legendPosition: 'middle',
          legendOffset: 45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number',
          legendPosition: 'middle',
          legendOffset: -45,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  )
}
