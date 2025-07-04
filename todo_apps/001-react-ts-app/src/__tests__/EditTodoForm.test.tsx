import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { JSX } from "react";
import EditTodoForm from "../EditTodoForm";
import Task from "../Task";


function EditTodoFormWrapper({tasks, routeLocation, editTodo=()=>{}}: {tasks: Task[], routeLocation: string, editTodo?: (todo: Task)=>void}): JSX.Element {
    return (
        <MemoryRouter initialEntries={[routeLocation]} >
            <Routes>
                <Route path="/edit/:id" element={<EditTodoForm tasks={tasks} editTodo={editTodo}/>}/>
                <Route path="*" element={<></>}/>
            </Routes>
        </MemoryRouter>
    );
}

describe("EditTodoForm component tests", () => {
    it("Renders the edit form", () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123"/>
        );
        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
    });

    it("Displays the not found message for invalid edit route", () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/456"/>
        );
        expect(screen.queryByText("Edit Todo")).not.toBeInTheDocument();
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("Prefills edit form with original values", () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123"/>
        );
        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toHaveValue("My task");
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toHaveValue(4);
    });

    it("Invokes the editTodo function when button is clicked", async () => {
        const editTodoMock = vi.fn<(task: Task)=>void>();
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123" editTodo={editTodoMock}/>
        );
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});
        
        expect(editTodoMock).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);
        
        expect(editTodoMock).toHaveBeenCalledTimes(1);
        expect(editTodoMock).toHaveBeenLastCalledWith({taskId: "123", taskName: "My task", taskUrgency: 4});
    });

    it("Invokes the editTodo function with updated values as the parameters", async () => {
        const editTodoMock = vi.fn<(task: Task)=>void>();
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123" editTodo={editTodoMock}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        await userEvent.clear(todoNameInputField);
        await userEvent.type(todoNameInputField, "My updated task");
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "6");
        
        expect(editTodoMock).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);
        
        expect(editTodoMock).toHaveBeenCalledTimes(1);
        expect(editTodoMock).toHaveBeenLastCalledWith({taskId: "123", taskName: "My updated task", taskUrgency: 6});
    });

    it("Displays alert message when submitting edit form with invalid values", async () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123" editTodo={()=>{}}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        await userEvent.clear(todoNameInputField);
        await userEvent.type(todoNameInputField, "My updated task");
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "0");
        
        expect(window.alert).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);
        
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenLastCalledWith("Must provide valid task name and urgency level!");
    });

    it("Does not display alert message when submitting edit form with valid values", async () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123" editTodo={()=>{}}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        await userEvent.clear(todoNameInputField);
        await userEvent.type(todoNameInputField, "My updated task");
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "10");
        
        expect(window.alert).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);
        
        expect(window.alert).toHaveBeenCalledTimes(0);
    });

    it("Does not invoke the editTodo function when submitting edit form with invalid values", async () => {
        const editTodoMock = vi.fn<(task: Task)=>void>();
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123" editTodo={editTodoMock}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        await userEvent.clear(todoNameInputField);
        await userEvent.type(todoNameInputField, "My updated task");
        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "0");
        
        expect(editTodoMock).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);
        
        expect(editTodoMock).toHaveBeenCalledTimes(0);
    });

    it("Displays alert message when submitting form with only whitespace for task name", async () => {
        render(
            <EditTodoFormWrapper tasks={[{taskId: "123", taskName: "My task", taskUrgency: 4}]} routeLocation="/edit/123"/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        await userEvent.clear(todoNameInputField);
        await userEvent.type(todoNameInputField, "   ");

        expect(window.alert).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);

        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenLastCalledWith("Must provide valid task name and urgency level!");
    });

    it("Displays the correct task when multiple tasks exist", () => {
        const taskList: Task[] = [
            {taskId: "123", taskName: "My task", taskUrgency: 4}, 
            {taskId: "456", taskName: "My second task", taskUrgency: 7},
            {taskId: "789", taskName: "My task", taskUrgency: 8}
        ];
        render(
            <EditTodoFormWrapper tasks={taskList} routeLocation="/edit/456"/>
        );

        expect(screen.getByText("Task ID: 456")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toHaveValue("My second task");
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toHaveValue(7);

        expect(screen.queryByText("Task ID: 123")).not.toBeInTheDocument();
        expect(screen.queryByText("Task ID: 789")).not.toBeInTheDocument();
    });
});
