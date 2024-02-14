'use client'
import { ResponsivePie } from '@nivo/pie'
import { CardContent, Card } from '@/components/ui/card'
import { JSX, ClassAttributes, HTMLAttributes } from 'react'

export default function LabelledpieChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement> & {
      data: any
    },
) {
  return (
    <div {...props}>
      <ResponsivePie
        data={props.data}
        sortByValue
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        arcLinkLabelsThickness={1}
        enableArcLabels={true}
        colors={['#117e23', '#b8a70f', '#b31313']}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
        }}
        role='application'
      />
    </div>
  )
}
