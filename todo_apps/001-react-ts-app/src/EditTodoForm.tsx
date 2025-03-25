import { JSX } from "react";
import { Link, useParams } from "react-router-dom";

function EditTodoForm(): JSX.Element {
    const params = useParams()
    return (
        <>
            <h1>Edit todo form for task at index {params.id}</h1>
            <Link to={"/"}>Home</Link>
        </>
    )
}

export default EditTodoForm
