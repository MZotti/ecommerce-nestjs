import { Image, Input, InputGroup } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useFormContext } from "@/contexts/FormContext"
import { useFormContext as useHookFormContext } from 'react-hook-form'
import { getCardBrandLogo } from '@/functions/paymentCard'
import creditCardType from 'credit-card-type'
import { CreditCardIcon } from '@phosphor-icons/react'

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
}

const CardImage = ({ cardNumber }: { cardNumber: string }) => {
    const cardNumberToImage = (number: string) => {
        const card = creditCardType(number)[0];
        const cardImage = getCardBrandLogo(card?.type || "");

        return String(cardImage)
    }

    if (!cardNumber || cardNumber == "")
        return <CreditCardIcon size={22} />

    return (
        <Image src={cardNumberToImage(cardNumber)} width="20px" />
    )
}

const CardNumberInput = (props: Props) => {
    const { id } = props
    const { isLoadingSubmit } = useFormContext();
    const { register, watch } = useHookFormContext();

    const wInput = watch(id)

    return (
        <InputContainer {...props}>
            <InputGroup
                zIndex={{ _focusWithin: "1" }}
                startElement={<CardImage cardNumber={wInput} />}
            >
                <Input {...register(id)} disabled={isLoadingSubmit} />
            </InputGroup>
        </InputContainer>
    )
}

export default CardNumberInput