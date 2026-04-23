import { Box, Input, InputGroup } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useTableContext } from 'contexts/TableContext'
import { useEffect, useState } from 'react'

const Search = () => {
    const { setSearch } = useTableContext()
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (searchValue.length >= 4) {
            const timerId = setTimeout(() => {
                setSearch(searchValue)
            }, 1000)

            return () => {
                clearTimeout(timerId)
            }
        } else if (searchValue.length == 0) {
            setSearch('')
        }
    }, [searchValue, setSearch])

    return (
        <Box>
            <InputGroup startAddon={<MagnifyingGlassIcon />}>
                <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            </InputGroup>
        </Box>
    )
}

export default Search
