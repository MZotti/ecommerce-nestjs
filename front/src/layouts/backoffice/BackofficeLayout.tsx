import type { ReactNode } from "react"
import Header from "./Header"
import NavBar from "./NavBar"

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <NavBar />
            {children}
        </>
    )
}

export default BackofficeLayout