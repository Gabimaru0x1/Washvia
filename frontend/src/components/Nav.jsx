import ArrowButton from "./ArrowLink";
import { navLinks } from "../constants";

const Nav = () => {
  return (
    <header className="py-8 px-13 absolute z-1 w-full">
      <nav className="flex items-center justify-between">
        <a href="/" className="text-white">Washvia</a>

        <ul className="hidden md:flex items-center gap-5 bg-white rounded-full py-1 pl-5 pr-1">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}

          <li>
            <ArrowButton href="/login">Login</ArrowButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
