import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import NotFound from "../NotFound";
import { JSX } from "react";
import { MemoryRouter } from "react-router-dom";


function NotFoundWrapper(): JSX.Element {
    return (
        <MemoryRouter>
            <NotFound/>
        </MemoryRouter>
    );
}

describe("NotFound component tests", () => {
    it("Renders the component", () => {
        render(<NotFoundWrapper/>);
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        const linkElement: HTMLElement = screen.getByRole("link", {name: "Go to main page"});
        expect(linkElement).toHaveAttribute("href", "/");
    });
});
