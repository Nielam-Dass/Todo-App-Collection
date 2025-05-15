import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { MemoryRouter } from "react-router-dom";
import TodoTable from "../TodoTable";
import Task from "../Task";


describe("TodoTable component tests", () => {
    it("Renders the table", () =>{
        render(
            <MemoryRouter>
                <TodoTable tasks={[{taskId: "1", taskName: "My task", taskUrgency: 4}]} deleteTodo={()=>{}}/>
            </MemoryRouter>
        );

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText("Task Name")).toBeInTheDocument();
        expect(screen.getByText("Urgency Level")).toBeInTheDocument();
        expect(screen.getByText("Edit Task")).toBeInTheDocument();
        expect(screen.getByText("Remove Task")).toBeInTheDocument();

        expect(screen.getByText("My task")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("Renders the empty table message", () =>{
        render(
            <MemoryRouter>
                <TodoTable tasks={[]} deleteTodo={()=>{}}/>
            </MemoryRouter>
        );

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
        expect(screen.getByText("There are no tasks left")).toBeInTheDocument();
    });

    it("Renders multiple todos in table", () => {
        const todos: Task[] = [
            {taskId: "1", taskName: "My task", taskUrgency: 4},
            {taskId: "2", taskName: "My other task", taskUrgency: 7},
            {taskId: "3", taskName: "My final task", taskUrgency: 5}
        ]
        render(
            <MemoryRouter>
                <TodoTable tasks={todos} deleteTodo={()=>{}}/>
            </MemoryRouter>
        );
        
        const todoRows: HTMLElement[] = screen.queryAllByRole("row");
        expect(todoRows).toHaveLength(4);
        expect(todoRows[0]).toHaveTextContent("Task Name");
        expect(todoRows[0]).toHaveTextContent("Urgency Level");
        expect(todoRows[0]).toHaveTextContent("Edit Task");
        expect(todoRows[0]).toHaveTextContent("Remove Task");

        expect(todoRows[1]).toHaveTextContent("My task");
        expect(todoRows[2]).toHaveTextContent("My other task");
        expect(todoRows[3]).toHaveTextContent("My final task");
    });

    it("Calls the deleteTodo function when button is clicked", async () => {
        const deleteTodoMock: (delId: string)=>void = vi.fn();
        render(
            <MemoryRouter>
                <TodoTable tasks={[{taskId: "1", taskName: "My task", taskUrgency: 4}]} deleteTodo={deleteTodoMock}/>
            </MemoryRouter>
        );
        const removeButton: HTMLElement = screen.getByRole("button", {name: "Remove"});

        expect(deleteTodoMock).toHaveBeenCalledTimes(0);
        await userEvent.click(removeButton);
        expect(deleteTodoMock).toHaveBeenCalledTimes(1);
        expect(deleteTodoMock).toHaveBeenLastCalledWith("1");
    });
});
