import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import App from '../App';
import { MemoryRouter, StaticRouter } from 'react-router-dom';


describe("App component tests", () => {
    it("Renders app title", () => {
        render(
            <StaticRouter location={'/'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.getByText("Todo App")).toBeInTheDocument();
    });

    it("Displays the empty todo table message", () => {
        render(
            <StaticRouter location={'/'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.getByText("There are no tasks left")).toBeInTheDocument();
    });

    it("Displays not found message for wrong route", () => {
        render(
            <StaticRouter location={'/does-not-exist'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("Displays not found message for invalid edit route", () => {
        render(
            <StaticRouter location={'/edit/1'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("Adds todo when the add button is clicked", async () => {
        render(
            <StaticRouter location={'/'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.queryByText("There are no tasks left")).toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
        expect(screen.queryByText("Important task")).not.toBeInTheDocument();

        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(todoNameInputField, "Important task");
        await userEvent.type(todoUrgencyInputField, "8");
        await userEvent.click(addButton);

        expect(screen.queryByText("There are no tasks left")).not.toBeInTheDocument();
        expect(screen.queryByRole("table")).toBeInTheDocument();
        expect(screen.queryByText("Important task")).toBeInTheDocument();
    });

    it("Adds multiple todos through form submissions to the table with rows ordered by urgency level", async () => {
        render(
            <StaticRouter location={'/'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.queryByText("There are no tasks left")).toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();

        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "5");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "My other task");
        await userEvent.type(todoUrgencyInputField, "8");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "Another task");
        await userEvent.type(todoUrgencyInputField, "3");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "Extra task");
        await userEvent.type(todoUrgencyInputField, "4");
        await userEvent.click(addButton);

        const todoRows: HTMLElement[] = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(4);

        expect(todoRows[0]).toHaveTextContent("My other task");
        expect(todoRows[1]).toHaveTextContent("My task");
        expect(todoRows[2]).toHaveTextContent("Extra task");
        expect(todoRows[3]).toHaveTextContent("Another task");
    });

    it("Removes todos when the associated remove buttons are clicked", async () => {
        render(
            <StaticRouter location={'/'}>
                <App/>
            </StaticRouter>
        );
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "5");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "My other task");
        await userEvent.type(todoUrgencyInputField, "8");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "Another task");
        await userEvent.type(todoUrgencyInputField, "3");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "Extra task");
        await userEvent.type(todoUrgencyInputField, "4");
        await userEvent.click(addButton);

        let todoRows: HTMLElement[] = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(4);

        expect(todoRows[0]).toHaveTextContent("My other task");
        expect(todoRows[1]).toHaveTextContent("My task");
        expect(todoRows[2]).toHaveTextContent("Extra task");
        expect(todoRows[3]).toHaveTextContent("Another task");

        const removeButtons: HTMLElement[] = screen.queryAllByRole("button", {name: "Remove"});
        
        await userEvent.click(removeButtons[0]);

        todoRows = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(3);

        expect(screen.queryByText("My other task")).not.toBeInTheDocument();
        expect(todoRows[0]).toHaveTextContent("My task");
        expect(todoRows[1]).toHaveTextContent("Extra task");
        expect(todoRows[2]).toHaveTextContent("Another task");

        await userEvent.click(removeButtons[2]);

        todoRows = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(2);

        expect(screen.queryByText("My other task")).not.toBeInTheDocument();
        expect(todoRows[0]).toHaveTextContent("My task");
        expect(screen.queryByText("Extra task")).not.toBeInTheDocument();
        expect(todoRows[1]).toHaveTextContent("Another task");
    });

    it("Renders edit form with correct values when an edit button is clicked", async () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );

        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(todoNameInputField, "My task");
        await userEvent.type(todoUrgencyInputField, "5");
        await userEvent.click(addButton);

        await userEvent.type(todoNameInputField, "My other task");
        await userEvent.type(todoUrgencyInputField, "8");
        await userEvent.click(addButton);

        let todoRows: HTMLElement[] = screen.queryAllByRole("row").slice(1);
        expect(todoRows[0]).toHaveTextContent("My other task");
        expect(todoRows[1]).toHaveTextContent("My task");

        const editButtons: HTMLElement[] = screen.queryAllByRole("button", {name: "Edit"});
        await userEvent.click(editButtons[0]);

        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name:")).toHaveValue("My other task");
        expect(screen.getByLabelText("Task Urgency Level (1-10):")).toHaveValue(8);
    });

    it("Updates values for single task through edit form", async () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const addTodoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const addTodoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(addTodoNameInputField, "My task");
        await userEvent.type(addTodoUrgencyInputField, "5");
        await userEvent.click(addButton);

        let todoRows: HTMLElement[] = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(1);
        expect(todoRows[0]).toHaveTextContent("My task" + "5");

        const editButtons: HTMLElement[] = screen.queryAllByRole("button", {name: "Edit"});
        await userEvent.click(editButtons[0]);

        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});
        const editTodoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const editTodoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        expect(screen.getByText("Edit Todo")).toBeInTheDocument();
        expect(editTodoNameInputField).toHaveValue("My task");
        expect(editTodoUrgencyInputField).toHaveValue(5);

        await userEvent.clear(editTodoNameInputField);
        await userEvent.type(editTodoNameInputField, "My updated task");
        await userEvent.clear(editTodoUrgencyInputField);
        await userEvent.type(editTodoUrgencyInputField, "8");
        await userEvent.click(editButton);

        expect(screen.getByText("Todo App")).toBeInTheDocument();
        expect(screen.queryByText("Edit Todo")).not.toBeInTheDocument();
        todoRows = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(1);
        expect(todoRows[0]).toHaveTextContent("My updated task" + "8");
    });

    it("Reorders task rows after editing task urgency level", async () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );
        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const addTodoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const addTodoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.type(addTodoNameInputField, "My task");
        await userEvent.type(addTodoUrgencyInputField, "5");
        await userEvent.click(addButton);

        await userEvent.type(addTodoNameInputField, "My other task");
        await userEvent.type(addTodoUrgencyInputField, "8");
        await userEvent.click(addButton);

        await userEvent.type(addTodoNameInputField, "Another task");
        await userEvent.type(addTodoUrgencyInputField, "3");
        await userEvent.click(addButton);

        let todoRows: HTMLElement[] = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(3);
        expect(todoRows[0]).toHaveTextContent("My other task" + "8");
        expect(todoRows[1]).toHaveTextContent("My task" + "5");
        expect(todoRows[2]).toHaveTextContent("Another task" + "3");

        const editButtons: HTMLElement[] = screen.queryAllByRole("button", {name: "Edit"});
        await userEvent.click(editButtons[1]);

        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});
        const editTodoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        await userEvent.clear(editTodoUrgencyInputField);
        await userEvent.type(editTodoUrgencyInputField, "10");
        await userEvent.click(editButton);

        todoRows = screen.queryAllByRole("row").slice(1);
        expect(todoRows).toHaveLength(3);
        expect(todoRows[0]).toHaveTextContent("My task" + "10");
        expect(todoRows[1]).toHaveTextContent("My other task" + "8");
        expect(todoRows[2]).toHaveTextContent("Another task" + "3");
    });
});
