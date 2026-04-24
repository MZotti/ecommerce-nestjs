import { Flex, HStack, RadioCard, Text } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useColorMode } from 'components/chakra-ui/color-mode'

const ColorModeSetting = () => {
    const { colorMode, setColorMode } = useColorMode()

    return (
        <Flex w="full" justifyContent="space-between">
            <Text>System theme</Text>
            <RadioCard.Root
                orientation="horizontal"
                align="center"
                justify="center"
                defaultValue={colorMode}
            >
                <HStack align="stretch">
                    <RadioCard.Item
                        minW="160px"
                        value="light"
                        onClick={() => setColorMode('light')}
                    >
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl cursor="pointer">
                            <SunIcon size={28} />
                            <RadioCard.ItemText>Light Theme</RadioCard.ItemText>
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
                    <RadioCard.Item minW="160px" value="dark" onClick={() => setColorMode('dark')}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl cursor="pointer">
                            <MoonIcon size={28} />
                            <RadioCard.ItemText>Dark Theme</RadioCard.ItemText>
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
                </HStack>
            </RadioCard.Root>
        </Flex>
    )
}

export default ColorModeSetting
