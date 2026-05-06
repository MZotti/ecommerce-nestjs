import React from 'react'
import CardContainer from '../CardContainer'

interface Props {
    title: string
    children: React.ReactNode
}

const ChartContainer = ({ title, children }: Props) => {
    return (
        <CardContainer title={title} fullW height="360px">
            {children}
        </CardContainer>
    )
}

export default ChartContainer