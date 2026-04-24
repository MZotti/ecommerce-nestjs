import { Box, HStack, Text } from '@chakra-ui/react'
import PageButton from './PageButton'
import {
    CaretDoubleLeftIcon,
    CaretDoubleRightIcon,
    CaretLeftIcon,
    CaretRightIcon,
} from '@phosphor-icons/react'
import { calculatePages } from 'functions/pagination'
import { useTableContext } from 'contexts/TableContext'
import { useEffect, useState } from 'react'

const Paginator = () => {
    const { currentPage, perPage, lastPage, totalItems, setCurrentPage } = useTableContext()

    const [memTotalItems, setMemTotalItems] = useState<number>(0);

    useEffect(() => {
        if (totalItems && totalItems != null)
            setMemTotalItems(totalItems)
    }, [totalItems])

    const pagesToShow = calculatePages(memTotalItems, perPage, currentPage)

    const fontSize = 15

    const arrowPagination = (page: number) => {
        console.log("entrou arrow pagination", page, lastPage);
        if (page < 1 || page > lastPage) return

        setCurrentPage(page)
    }

    return (
        <HStack gap={1}>
            <PageButton
                changePage={setCurrentPage}
                page={1}
                item={
                    <Box>
                        <CaretDoubleLeftIcon size={fontSize} />
                    </Box>
                }
            />
            <PageButton
                changePage={arrowPagination}
                page={currentPage - 1}
                item={
                    <Box>
                        <CaretLeftIcon size={fontSize} />
                    </Box>
                }
            />
            {pagesToShow.map(page => (
                <PageButton
                    key={page.pageNumber}
                    isActive={page.pageNumber === currentPage}
                    page={page.pageNumber}
                    item={
                        <Box>
                            <Text fontSize={fontSize}>{page.pageNumber}</Text>
                        </Box>
                    }
                    changePage={setCurrentPage}
                />
            ))}
            {
                pagesToShow.length == 0 &&
                <PageButton
                    key={1}
                    isActive={true}
                    page={1}
                    item={
                        <Box>
                            <Text fontSize={fontSize}>{1}</Text>
                        </Box>
                    }
                    changePage={setCurrentPage}
                />
            }
            <PageButton
                changePage={arrowPagination}
                page={currentPage + 1}
                item={
                    <Box>
                        <CaretRightIcon size={fontSize} />
                    </Box>
                }
            />
            <PageButton
                changePage={setCurrentPage}
                page={lastPage}
                item={
                    <Box>
                        <CaretDoubleRightIcon size={fontSize} />
                    </Box>
                }
            />
        </HStack>
    )
}

export default Paginator
