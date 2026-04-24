import { Flex, SegmentGroup, Text } from '@chakra-ui/react'
import { LocalStorageSettings } from 'enums/localStorage';

const PerPageSetting = () => {
    const perPageValue = window.localStorage.getItem("settings_perPage") || "30";

    const onChangeValue = (value: string) => {
        window.localStorage.setItem(LocalStorageSettings.PER_PAGE, value);
    }

    return (
        <Flex w="full" justifyContent="space-between">
            <Text>Items per page</Text>
            <SegmentGroup.Root defaultValue={perPageValue} onChange={({ target }) => onChangeValue(target.value)}>
                <SegmentGroup.Indicator />
                <SegmentGroup.Items items={['10', '15', '30', '50', '100']} />
            </SegmentGroup.Root>
        </Flex>
    )
}

export default PerPageSetting
