import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Route, Routes, StaticRouter } from "react-router-dom";
import { JSX } from "react";
import EditTodoForm from "../EditTodoForm";
import Task from "../Task";

function EditTodoFormWrapper({tasks, routeLocation, editTodo=()=>{}}: {tasks: Task[], routeLocation: string, editTodo?: (todo: Task)=>void}): JSX.Element {
    return (
        <StaticRouter location={routeLocation} >
            <Routes>
                <Route path="/edit/:id" element={<EditTodoForm tasks={tasks} editTodo={editTodo}/>}/>
            </Routes>
        </StaticRouter>
    );
}

describe("EditTodoForm component tests", () => {
    it("Renders the edit form", () => {
        render(<EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123"/>);
        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
    });

    it("Displays the not found message for invalid edit route", () => {
        render(<EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/456"/>);
        expect(screen.queryByText("Edit Todo")).not.toBeInTheDocument();
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("Prefills edit form with original values", () => {
        render(<EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123"/>);
        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toHaveValue("My task");
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toHaveValue(4);
    });
});
