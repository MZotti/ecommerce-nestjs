import { useFetchDataContext } from '@/contexts/FetchDataContext'
import { Box, Button, Menu, Portal } from '@chakra-ui/react';
import { ListBulletsIcon, PencilLineIcon, StackPlusIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const ProductActions = () => {
    const { data: product } = useFetchDataContext();

    return (
        <Box position="absolute" right={0}>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm"><ListBulletsIcon size={18} /></Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.ItemGroup>
                                <Menu.Item value="update" cursor="pointer" asChild><Link to={`update`}><PencilLineIcon size="16px" /> Update</Link></Menu.Item>
                                <Menu.Item value="increase-stock" cursor="pointer" ><StackPlusIcon size="16px" /> Increase Stock</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Box>
    )
}

export default ProductActions