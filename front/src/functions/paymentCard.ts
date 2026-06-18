import visaLogo from "@/assets/svgs/cards/visa_logo.svg";
import mastercardLogo from "@/assets/svgs/cards/mastercard_logo.svg";
import amexLogo from "@/assets/svgs/cards/americanexpress_logo.svg";

const getCardBrandLogo = (brand: string): React.ReactNode => {
    switch (brand) {
        case 'visa':
            return visaLogo
        case 'mastercard':
            return mastercardLogo
        case 'american-express':
            return amexLogo
        default:
            return amexLogo
    }
}

export {
    getCardBrandLogo
}