import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import TodoHome from '../TodoHome';
import { BrowserRouter } from 'react-router-dom';


describe("Todo home page tests", () => {
    it("Renders the title", () => {
        render(
            <BrowserRouter>
                <TodoHome tasks={[]} addTask={()=>{}} deleteTask={()=>{}}/>
            </BrowserRouter>
        );
        expect(screen.getByText("Todo App")).toBeInTheDocument();
    });
});
