import { Box } from "@chakra-ui/react"
import { HouseIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const HomeButton = () => {
    return (
        <Box>
            <Link to="/backoffice">
                <HouseIcon size={28} />
            </Link>
        </Box>
    )
}

export default HomeButton