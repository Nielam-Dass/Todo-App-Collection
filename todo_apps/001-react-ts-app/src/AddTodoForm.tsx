function AddTodoForm() {
    return (
        <>
            <label htmlFor="todo-name">Task Name: </label>
            <input type="text" className="todo-name-input" id="todo-name"/>
            <br></br>
            <label htmlFor="todo-urgency">Task Urgency Level (1-10): </label>
            <input type="number" min="1" max="10" className="todo-urgency-input" id="todo-urgency"/>
            <br></br>
            <button>Add Todo</button>
        </>
    )
}

export default AddTodoForm
