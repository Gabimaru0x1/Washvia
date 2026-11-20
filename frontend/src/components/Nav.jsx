import ArrowButton from "./ArrowLink";
import { navLinks } from "../constants";
import { useModal } from "./modalContext";
import AnimatedHambugerButton from "./MenuButton";

const Nav = () => {
  const { openModal } = useModal();

  return (
    <header className="py-8 px-13 absolute z-1 w-full">
      <nav className="flex items-center justify-between">
        <a href="/" className="text-white">
          Washvia
        </a>

        <div className="-mr-[14px] md:hidden">
          <AnimatedHambugerButton />
        </div>

        <ul className="hidden md:flex items-center gap-5 bg-white rounded-full py-1 pl-5 pr-1">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}

          <li>
            <ArrowButton onClick={() => openModal("login")}>Login</ArrowButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
