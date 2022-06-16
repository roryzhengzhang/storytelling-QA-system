// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
        "date": "Mon",
        "character": 6,
        "place": 7,
        "feeling": 3,
        "action": 5,
        "causal relationship": 2,
        "outcome": 1,
        "prediction": 1
    },
    {
        "date": "Tue",
        "character": 2,
        "place": 2,
        "feeling": 4,
        "action": 2,
        "causal relationship": 1,
        "outcome": 1,
        "prediction": 0
    },
    {
        "date": "Wed",
        "character": 5,
        "place": 6,
        "feeling": 5,
        "action": 4,
        "causal relationship": 0,
        "outcome": 1,
        "prediction": 1
    },
    {
        "date": "Thur",
        "character": 4,
        "place": 4,
        "feeling": 4,
        "action": 3,
        "causal relationship": 2,
        "outcome": 1,
        "prediction": 0
    },
    {
        "date": "Fri",
        "character": 0,
        "place": 0,
        "feeling": 0,
        "action": 0,
        "causal relationship": 0,
        "outcome": 0,
        "prediction": 0
    },
    {
        "date": "Sat",
        "character": 5,
        "place": 5,
        "feeling": 2,
        "action": 1,
        "causal relationship": 1,
        "outcome": 1,
        "prediction": 0
    },
    {
        "date": "Sun",
        "character": 3,
        "place": 5,
        "feeling": 2,
        "action": 1,
        "causal relationship": 2,
        "outcome": 1,
        "prediction": 2
    }
]

export default function WeeklyBar() {
    return (
        <ResponsiveBar
            data={data}
            keys={['character', 'place', 'feeling', 'action', 'causal relationship', 'outcome', 'prediction']}
            indexBy="date"
            margin={{ left: 30, bottom: 30, right: 150 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            valueFormat={{ format: ' >-', enabled: false }}
            colors={{ scheme: 'set3' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableGridY={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}