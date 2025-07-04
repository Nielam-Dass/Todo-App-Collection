import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import TodoHome from '../TodoHome';
import { MemoryRouter, useNavigate } from 'react-router-dom';
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

    it("Renders add todo form fields with empty initial values", () => {
        render(
            <MemoryRouter>
                <TodoHome tasks={[]} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        expect(todoNameInputField).toHaveValue("");
        expect(todoUrgencyInputField).toHaveValue(null);
    });

    it("Calls addTask function when add button is clicked", async () => {
        const addTaskMock = vi.fn<(t: Task)=>void>();
        render(
            <MemoryRouter>
                <TodoHome tasks={[]} addTask={addTaskMock} deleteTask={()=>{}}/>
            </MemoryRouter>
        );

        const addButton: HTMLElement = screen.getByRole("button", {name: "Add Todo"});
        const todoNameInputField: HTMLElement = screen.getByLabelText("Task Name:");
        const todoUrgencyInputField: HTMLElement = screen.getByLabelText("Task Urgency Level (1-10):");

        expect(addTaskMock).toHaveBeenCalledTimes(0);

        await userEvent.type(todoNameInputField, "Important task");
        await userEvent.type(todoUrgencyInputField, "7");
        await userEvent.click(addButton);

        expect(addTaskMock).toHaveBeenCalledTimes(1);
        expect(addTaskMock).toHaveBeenLastCalledWith(expect.objectContaining({taskName: "Important task", taskUrgency: 7}));
    });

    it("Calls deleteTask function when add button is clicked", async () => {
        const deleteTaskMock = vi.fn<(id: string)=>void>();
        render(
            <MemoryRouter>
                <TodoHome tasks={[{taskId: "123", taskName: "Important task", taskUrgency: 7}]} addTask={()=>{}} deleteTask={deleteTaskMock}/>
            </MemoryRouter>
        );

        const removeButton: HTMLElement = screen.getByRole("button", {name: "Remove"});

        expect(deleteTaskMock).toHaveBeenCalledTimes(0);

        await userEvent.click(removeButton);

        expect(deleteTaskMock).toHaveBeenCalledTimes(1);
        expect(deleteTaskMock).toHaveBeenLastCalledWith("123");
    });

    it("Navigates to edit route when edit button is clicked", async () => {
        vi.mock("react-router-dom", async () => {
            const mockedNavigate = vi.fn<(to: string)=>void>();
            return {
                ... await vi.importActual("react-router-dom"),
                useNavigate: () => mockedNavigate
            }
        });
        render(
            <MemoryRouter>
                <TodoHome tasks={[{taskId: "123", taskName: "Important task", taskUrgency: 7}]} addTask={()=>{}} deleteTask={()=>{}}/>
            </MemoryRouter>
        );

        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        const useNavigateMock = vi.mocked(useNavigate);
        const mockedNavigate = useNavigateMock();
        expect(mockedNavigate).toHaveBeenCalledTimes(0);

        await userEvent.click(editButton);

        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedNavigate).toHaveBeenLastCalledWith("/edit/123");
    });
});
