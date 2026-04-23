import { Button } from '@chakra-ui/react'

interface Props {
    item: React.ReactNode
    page: number
    isActive?: boolean
    changePage?: (args1: number) => void
}

const PageButton = ({ item, page, isActive = false, changePage }: Props) => {
    return (
        <Button size="sm" variant={isActive ? 'solid' : 'outline'} onClick={() => changePage && changePage(page)}>
            {item}
        </Button>
    )
}

export default PageButton
