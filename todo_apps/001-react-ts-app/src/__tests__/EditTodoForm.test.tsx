import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import EditTodoForm from "../EditTodoForm";
import { Route, Routes, StaticRouter } from "react-router-dom";

describe("EditTodoForm component tests", () => {
    it("Renders the edit form", () => {
        render(
            <StaticRouter location={"/edit/123"} >
                <Routes>
                    <Route path="/edit/:id" element={<EditTodoForm tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} editTodo={()=>{}}/>}/>
                </Routes>
            </StaticRouter>
            
        );
        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
    });
});
