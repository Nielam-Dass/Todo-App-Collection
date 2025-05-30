import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import AddTodoForm from '../AddTodoForm';
import Task from '../Task';

describe('AddTodoForm component tests', () => {
    it("Accepts valid text in input fields", async () => {
        render(
            <AddTodoForm addTodo={() => {}}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        expect(todoNameInputField).toHaveValue("");
        expect(todoUrgencyInputField).toHaveValue(null);

        await userEvent.type(todoNameInputField, "Task 1");
        await userEvent.type(todoUrgencyInputField, "10");

        expect(todoNameInputField).toHaveValue("Task 1");
        expect(todoUrgencyInputField).toHaveValue(10);
    });

    it("Does not accept urgency level above 10", async () => {
        render(
            <AddTodoForm addTodo={() => {}}/>
        );
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        expect(todoUrgencyInputField).toHaveValue(null);

        await userEvent.type(todoUrgencyInputField, "11");

        expect(todoUrgencyInputField).not.toHaveValue(11);
        expect(todoUrgencyInputField).toHaveValue(1);
    });

    it("Does not accept urgency level below 1", async () => {
        render(
            <AddTodoForm addTodo={() => {}}/>
        );
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        expect(todoUrgencyInputField).toHaveValue(null);

        await userEvent.type(todoUrgencyInputField, "0");

        expect(todoUrgencyInputField).not.toHaveValue(0);
        expect(todoUrgencyInputField).toHaveValue(null);

        await userEvent.clear(todoUrgencyInputField);
        await userEvent.type(todoUrgencyInputField, "-2");

        expect(todoUrgencyInputField).toHaveValue(null);
    });

    it("Calls addTodo function when button is clicked", async () => {
        const addTodoMock = vi.fn<(task: Task)=>void>();
        render(
            <AddTodoForm addTodo={addTodoMock}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "10");

        expect(todoNameInputField).toHaveValue("My task");
        expect(todoUrgencyInputField).toHaveValue(10);
        expect(addTodoMock).toHaveBeenCalledTimes(0);

        await userEvent.click(addButton);

        expect(addTodoMock).toHaveBeenCalledTimes(1);
        expect(addTodoMock).toHaveBeenLastCalledWith(expect.objectContaining({taskName: "My task", taskUrgency: 10}));
    });

    it("Displays alert message when submitting form with invalid values", async () => {
        render(
            <AddTodoForm addTodo={() => {}}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "0");

        expect(window.alert).toHaveBeenCalledTimes(0);

        await userEvent.click(addButton);

        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenLastCalledWith("Must provide valid task name and urgency level!");
    });

    it("Does not call addTodo function when submitting form with invalid values", async () => {
        const addTodoMock = vi.fn<(task: Task)=>void>();
        render(
            <AddTodoForm addTodo={addTodoMock}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "0");

        expect(addTodoMock).toHaveBeenCalledTimes(0);

        await userEvent.click(addButton);

        expect(addTodoMock).toHaveBeenCalledTimes(0);
    });

    it("Does not display alert message when submitting form with valid values", async () => {
        render(
            <AddTodoForm addTodo={() => {}}/>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "1");

        expect(window.alert).toHaveBeenCalledTimes(0);

        await userEvent.click(addButton);

        expect(window.alert).toHaveBeenCalledTimes(0);
    });
});
