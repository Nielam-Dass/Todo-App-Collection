import { JSX } from "react"
import { Link } from "react-router-dom"

function NotFound(): JSX.Element{
    return (
        <>
        <h1>Page Not Found</h1>
        <Link to={"/"}>Go to main page</Link>
        </>
    )
}

export default NotFound
