import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./index";
import { navData } from "@/lib/navData";
import { NavDataType } from "./nav.type";
import * as nextAuth from 'next-auth/react';
import customHook from "@/hooks";


describe("Navbar tests", () => {
    test('should render navbar witgetByTexth unauthenticated', () => {
        jest.spyOn(nextAuth, 'useSession').mockImplementation(() => ({ data: { user: { image: 'https://lh3.googleusercontent.com/a/ACg8ocJZsCJMiGTT9OQza1a0YoDtAIM00joFqnoouKzajfUhDnI=s96-c' } }, status: 'unauthenticated' }));
        // render navbar
        const { queryByTestId, queryByText, getByTestId } = render(<Navbar externalNavData={navData as NavDataType} />)
        // query shimmer
        const profilePictureElement = queryByTestId("profile_shimmer")
        expect(profilePictureElement).not.toBeInTheDocument()
        // query Your Work Item
        const youWork = queryByText("Your Work")
        expect(youWork).not.toBeInTheDocument()
        // get login button
        const loginBtn = getByTestId("login_btn")
        expect(loginBtn).toBeInTheDocument()

    })

    test('should render navbar with authenticated', () => {
        jest.spyOn(nextAuth, 'useSession').mockImplementation(() => ({ data: { user: { image: 'https://lh3.googleusercontent.com/a/ACg8ocJZsCJMiGTT9OQza1a0YoDtAIM00joFqnoouKzajfUhDnI=s96-c' } }, status: 'authenticated' }));
        const { getByTestId, getByText, queryByTestId } = render(<Navbar externalNavData={navData as NavDataType} />)
        const profilePictureElement = getByTestId("profile_shimmer")
        expect(profilePictureElement).toBeInTheDocument()
        const youWork = getByText("Your Work")
        expect(youWork).toBeInTheDocument()

        // query login button
        const loginBtn = queryByTestId("login_btn")
        expect(loginBtn).not.toBeInTheDocument()
    })

    test('navbar in mobile view', () => {
        jest.spyOn(nextAuth, 'useSession').mockImplementation(() => ({ data: { user: { image: 'https://lh3.googleusercontent.com/a/ACg8ocJZsCJMiGTT9OQza1a0YoDtAIM00joFqnoouKzajfUhDnI=s96-c' } }, status: 'authenticated' }));
        jest.spyOn(customHook, 'useWindowDimensions').mockImplementation(() => ({ windowDimensions: { width: 300, height: 300 }, isDesktop: false }));
        const { getByTestId, getByText, queryByTestId } = render(<Navbar externalNavData={navData as NavDataType} />)
        const cta = getByTestId("hamburger")
        expect(cta).toBeInTheDocument()
    })
})