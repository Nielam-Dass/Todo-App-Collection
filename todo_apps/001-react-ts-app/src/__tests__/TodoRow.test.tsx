import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import TodoRow from '../TodoRow';

describe("TodoRow component tests", () => {
    it("Renders the component", () => {
        render(
            <table>
                <tbody>
                    <TodoRow task={{taskId: "123", taskName:"Important task", taskUrgency: 4}} onEdit={()=>{}} onRemove={()=>{}}/>
                </tbody>
            </table>
        );
        expect(screen.queryByText("Important task")).toBeInTheDocument();
        expect(screen.queryByText("123")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Remove"})).toBeInTheDocument();
    });

    it("Calls the onEdit function when button is clicked", async () => {
        const handleEditMock = vi.fn<()=>void>();
        const handleRemoveMock = vi.fn<()=>void>();
        render(
            <table>
                <tbody>
                    <TodoRow task={{taskId: "123", taskName:"Important task", taskUrgency: 4}} onEdit={handleEditMock} onRemove={handleRemoveMock}/>
                </tbody>
            </table>
        );
        const editButton: HTMLElement = screen.getByRole("button", {name: "Edit"});

        expect(handleEditMock).toHaveBeenCalledTimes(0);
        expect(handleRemoveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(editButton);
        expect(handleEditMock).toHaveBeenCalledTimes(1);
        expect(handleRemoveMock).toHaveBeenCalledTimes(0);

    });

    it("Calls the onRemove function when button is clicked", async () => {
        const handleEditMock = vi.fn<()=>void>();
        const handleRemoveMock = vi.fn<()=>void>();
        render(
            <table>
                <tbody>
                    <TodoRow task={{taskId: "123", taskName:"Important task", taskUrgency: 4}} onEdit={handleEditMock} onRemove={handleRemoveMock}/>
                </tbody>
            </table>
        );
        const removeButton: HTMLElement = screen.getByRole("button", {name: "Remove"});
        
        expect(handleEditMock).toHaveBeenCalledTimes(0);
        expect(handleRemoveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(removeButton);
        expect(handleEditMock).toHaveBeenCalledTimes(0);
        expect(handleRemoveMock).toHaveBeenCalledTimes(1);
    });
});
