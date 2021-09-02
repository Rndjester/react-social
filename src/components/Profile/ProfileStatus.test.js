import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
    test("status in props sholud be in state", () => {
        const component = create(<ProfileStatus status = 'status'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('status');
    });

    test("after create app <span> should be 1", () => {
        const component = create(<ProfileStatus status = 'status'/>);
        const root = component.root
        const span = root.findByType("span");
        expect(span.children.length).toBe(1);
    });

    test("after create app <input> should be not", () => {
        const component = create(<ProfileStatus status = 'status'/>);
        const root = component.root
        const input = root.findByType("input");
        expect(input).toBeNull();
    });
});