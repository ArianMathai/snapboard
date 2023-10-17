import MessageApplication from "../components/MessageApplication";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import {AuthProvider, useAuth} from "../context/AuthContext";
import Login from "../components/Login";

describe("Message Application", () => {
    it("renders correctly", () => {

        const component = renderer.create(
            <AuthProvider>
            <MemoryRouter>
                <MessageApplication />
            </MemoryRouter>
            </AuthProvider>
        );
        // Use this line to create or update a snapshot
        expect(component).toMatchSnapshot();
    });
});

//Should we have all our snapshots in the same test file?
describe ("Sign in page renders correctly", () => {
    it("renders correctly", () =>{

        const component = renderer.create(
            <AuthProvider>
                <MemoryRouter>
                    <Login></Login>
                </MemoryRouter>
            </AuthProvider>
        )
        expect(component).toMatchSnapshot();
    })
} )



