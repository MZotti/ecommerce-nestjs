import { Skeleton, SkeletonCircle, Timeline } from '@chakra-ui/react'

const LoadingItem = () => {
    return (
        <Timeline.Item>
            <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>
                    <SkeletonCircle w="20px" h="20px" />
                </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
                <Timeline.Title>
                    <Skeleton w="160px" h="20px" /> 
                </Timeline.Title>
                <Timeline.Description>
                    <Skeleton w="180px" h="16px" /> 
                </Timeline.Description>
                <Timeline.Description>
                    <Skeleton w="340px" h="20px" /> 
                </Timeline.Description>
            </Timeline.Content>
        </Timeline.Item>
    )
}

export default LoadingItem