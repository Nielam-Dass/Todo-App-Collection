import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import TodoSpecForm from "../TodoSpecForm";

describe("TodoSpecForm component tests", () => {
    it("Renders the component", () => {
        render(<TodoSpecForm/>);
        expect(screen.getByText("TodoSpecForm")).toBeInTheDocument();
    });
});
