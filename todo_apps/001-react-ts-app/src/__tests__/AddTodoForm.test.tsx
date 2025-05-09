import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import AddTodoForm from '../AddTodoForm';

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
})
