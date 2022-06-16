// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { ResponsiveRadar } from '@nivo/radar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
        "category": "character",
        "session": 0.75,
        "average": 0.62
    },
    {
        "category": "place",
        "session": 1, "average": 0.62
    }, { "category": "feeling", "session": 0.66, "average": 0.62 }, { "category": "causal relationship", "session": 0.5, "average": 0.62 }, { "category": "outcome", "session": 0.33, "average": 0.62 }, { "category": "prediction", "session": 1, "average": 0.62 }


]
export default function SessionRadar() {
    return (
        <ResponsiveRadar
            data={data}
            keys={['session', 'average']}
            indexBy="category"
            maxValue="auto"
            margin={{ left: 10, top: 20, bottom: 20 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }
            }
            gridLevels={4}
            gridShape="circular"
            gridLabelOffset={10}
            enableDots={false}
            // dotSize={6}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            // enableDotLabel={true}
            // dotLabel="value"
            dotLabelYOffset={0}
            colors={{ scheme: 'set3' }}
            fillOpacity={0.5}
            blendMode="multiply"
            animate={true}
            motionConfig="wobbly"
            isInteractive={true}
            legends={
                [

                ]}
        />
    )
};