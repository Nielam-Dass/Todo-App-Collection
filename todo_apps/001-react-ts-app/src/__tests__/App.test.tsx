import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import App from '../App';
import { StaticRouter } from 'react-router-dom';

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
});
