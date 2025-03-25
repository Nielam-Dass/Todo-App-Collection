import { JSX } from "react";
import { Link } from "react-router-dom";

function EditTodoForm(): JSX.Element {
    return (
        <>
            <h1>Edit todo form</h1>
            <Link to={"/"}>Home</Link>
        </>
    )
}

export default EditTodoForm
