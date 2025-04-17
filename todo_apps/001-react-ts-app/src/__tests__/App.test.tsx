import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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

    it("Displays not found message", () => {
        render(
            <StaticRouter location={'/does-not-exist'}>
                <App/>
            </StaticRouter>
        );
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });
});
