import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import TodoHome from '../TodoHome';
import { MemoryRouter } from 'react-router-dom';
import Task from '../Task';


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

    it("Displays table with all tasks", () => {
        const taskList: Task[] = [
            {taskId: "id-1", taskName: "Task 1", taskUrgency: 1},
            {taskId: "id-2", taskName: "Task 2", taskUrgency: 5},
        ]
        render(
            <MemoryRouter>
                <TodoHome tasks={taskList} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );
        expect(screen.queryByRole("table")).toBeInTheDocument();
        const todoRows: HTMLElement[] = screen.queryAllByRole("row");
        expect(todoRows).toHaveLength(3);
        expect(todoRows[1]).toHaveTextContent("Task 1" + "1");
        expect(todoRows[2]).toHaveTextContent("Task 2" + "5");
    });
});
