import LandingPage from "./Components/LandingPage/LandingPage";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Navbar from "./Components/Navbar/NavBar";
import {  NavLink } from "react-router-dom";

configure({ adapter: new Adapter() });

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

//   expect(linkElement).toBeInTheDocument();
// });

describe("<LangindPage />", () => {
  let land;

  beforeEach(() => {
    land = shallow(<LandingPage />);
  });

  it('Debería renderizar un "button"', () => {
    expect(land.find("button").text()).toEqual("Get Into");
  });
});


describe("<Nav />", () => {
  let nav;
  
  beforeEach(() => {
    nav = shallow(<Navbar />);   
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {    
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/home");
    expect(nav.find(NavLink).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Create Pokemon" y que cambie la ruta hacia "/create"', () => {
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/create");
    expect(nav.find(NavLink).at(1).text()).toEqual("Create Pokemon");
  });
});