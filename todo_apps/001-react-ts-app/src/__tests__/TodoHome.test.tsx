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
});
