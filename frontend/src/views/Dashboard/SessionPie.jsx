// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie

import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data =
    [
        {
            "id": "character",
            "label": "Character",
            "value": 6
        },
        {
            "id": "place",
            "label": "Place",
            "value": 4
        },
        {
            "id": "feeling",
            "label": "Feeling",
            "value": 3
        },
        {
            "id": "action",
            "label": "Action",
            "value": 2
        },
        {
            "id": "causal relation",
            "label": "CausalRelationship",
            "value": 2
        },
        {
            "id": "outcome",
            "label": "Outcome",
            "value": 3
        },
        {
            "id": "prediction",
            "label": "Prediction",
            "value": 1
        }
    ]

export default function SessionPie() {
    return (
        <ResponsivePie
            data={data}
            margin={{ left: 10, right: 10, top: 30, bottom: 30 }}
            sortByValue={true}
            innerRadius={0.7}
            padAngle={0.7}
            cornerRadius={2}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={9}
            colors={{ scheme: 'set3' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={8}
            arcLinkLabelsTextOffset={4}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsOffset={-13}
            arcLinkLabelsDiagonalLength={19}
            arcLinkLabelsStraightLength={5}
            arcLinkLabelsThickness={2}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        // legends={[
        //     {
        //         anchor: 'right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 0,
        //         itemWidth: 100,
        //         itemHeight: 20,
        //         itemsSpacing: 0,
        //         symbolSize: 20,
        //         itemDirection: 'left-to-right'
        //     }
        // ]}
        />
    )
};