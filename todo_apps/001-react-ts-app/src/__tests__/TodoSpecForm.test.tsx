import { JSX, useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import TodoSpecForm from "../TodoSpecForm";


function TodoSpecFormWrapper(): JSX.Element {
    const [todoName, setTodoName] = useState<string>("");
    const [todoUrgency, setTodoUrgency] = useState<string>("");
    
    return (
        <>
            <TodoSpecForm todoName={todoName} todoUrgency={todoUrgency} setTodoName={setTodoName} setTodoUrgency={setTodoUrgency}/>
        </>
    )
}

describe("TodoSpecForm component tests", () => {
    it("Renders the component", () => {
        render(<TodoSpecForm todoName="" todoUrgency="" setTodoName={()=>{}} setTodoUrgency={()=>{}}/>);
        expect(screen.getByLabelText("Task Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toBeInTheDocument();
    });

    it("Accepts valid todo name input string", async () => {
        render(<TodoSpecFormWrapper/>);
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        expect(todoNameInputField).toHaveValue(null);
        await userEvent.type(todoNameInputField, "Important Task");
        expect(todoNameInputField).toHaveValue("Important Task");
    });

    it("Accepts valid todo urgency input level", async () => {
        render(<TodoSpecFormWrapper/>);
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        expect(todoUrgencyInputField).toHaveValue(null);
        await userEvent.type(todoUrgencyInputField, "10");
        expect(todoUrgencyInputField).toHaveValue(10);
    });

    it("Does not accept invalid todo urgency input level", async () => {
        render(<TodoSpecFormWrapper/>);
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        expect(todoUrgencyInputField).toHaveValue(null);
        await userEvent.type(todoUrgencyInputField, "0");
        expect(todoUrgencyInputField).toHaveValue(null);
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "-2");
        expect(todoUrgencyInputField).toHaveValue(null);
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "11");
        expect(todoUrgencyInputField).toHaveValue(1);
    });
});
