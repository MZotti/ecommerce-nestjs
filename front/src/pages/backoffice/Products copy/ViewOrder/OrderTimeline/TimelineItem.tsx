import { dateFormat } from '@/functions/date'
import { Text, Timeline } from '@chakra-ui/react'
import { LuShip } from 'react-icons/lu'

interface Props {
    title: string
    datetime: Date
}

const TimelineItem = ({ title, datetime }: Props) => {
    return (
        <Timeline.Item>
            <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>
                    <LuShip />
                </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
                <Timeline.Title>{title}</Timeline.Title>
                <Timeline.Description>{dateFormat(datetime, 'dd/MM/yyyy HH:mm:ss')}</Timeline.Description>
                <Text textStyle="sm">
                    We shipped your product via <strong>FedEx</strong> and it should
                    arrive within 3-5 business days.
                </Text>
            </Timeline.Content>
        </Timeline.Item>
    )
}

export default TimelineItem