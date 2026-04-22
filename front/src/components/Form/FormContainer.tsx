import { Grid } from '@chakra-ui/react'
import type { ReactNode } from 'react'

const FormContainer = ({ children }: { children?: ReactNode }) => {
    return (
        <Grid gap={4}>
            {children}
        </Grid>
    )
}

export default FormContainer