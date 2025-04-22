import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import TodoHome from '../TodoHome';
import { MemoryRouter } from 'react-router-dom';


describe("Todo home page tests", () => {
    it("Renders the title", () => {
        render(
            <MemoryRouter>
                <TodoHome tasks={[]} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );
        expect(screen.getByText("Todo App")).toBeInTheDocument();
    });

    it("Displays empty todo table message", () => {
        render(
            <MemoryRouter>
                <TodoHome tasks={[]} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );
        expect(screen.queryByText("There are no tasks left")).toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("Does NOT display empty todo table message", () => {
        render(
            <MemoryRouter>
                <TodoHome tasks={[{taskId: "id-1", taskName: "Task 1", taskUrgency: 1}]} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );
        expect(screen.queryByText("There are no tasks left")).not.toBeInTheDocument();
        expect(screen.queryByRole("table")).toBeInTheDocument();
    });
});
