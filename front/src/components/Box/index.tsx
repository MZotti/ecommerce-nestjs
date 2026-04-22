import type { ReactNode } from "react"
import Layout from "./Layout"

const Box = ({ children }: { children: ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default Box