import { Badge, Stat } from '@chakra-ui/react'

const Last30Days = () => {
    return (
        <Stat.Root>
            <Stat.Label>Last 30 Days sales</Stat.Label>
            <Stat.ValueText>100</Stat.ValueText>
            <Badge colorPalette="green" variant="plain" px="0">
                <Stat.UpIndicator />
                1.9%
            </Badge>
        </Stat.Root>
    )
}

export default Last30Days