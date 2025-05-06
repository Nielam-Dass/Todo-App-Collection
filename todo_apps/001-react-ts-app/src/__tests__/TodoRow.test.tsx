import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import TodoRow from '../TodoRow';

describe("TodoRow component tests", () => {
    it("Renders the component", () => {
        render(<TodoRow task={{taskId: "123", taskName:"Important task", taskUrgency: 4}} onEdit={()=>{}} onRemove={()=>{}}/>);
        expect(screen.queryByText("Important task")).toBeInTheDocument();
        expect(screen.queryByText("123")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Remove"})).toBeInTheDocument();
    });
});
