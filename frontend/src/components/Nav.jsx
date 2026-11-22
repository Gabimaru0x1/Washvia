import ArrowButton from "./ArrowLink";
import { navLinks } from "../constants";
import { useModal } from "./modalContext";
import MobileNav from "./MobileNav";
import { useState } from "react";
import MenuButton from "./MenuButton";
import { AnimatePresence } from "motion/react";

const Nav = () => {
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleLogin = () => {
    closeMenu();
    openModal("login");
  };

  return (
    <header className="relative z-1">
      <nav className="absolute inset-x-8 flex items-center justify-between">
        <a href="/" onClick={closeMenu} className="z-10 text-primary">
          Washvia
        </a>

        <div className="relative z-10 -mr-3.5 md:hidden">
          <MenuButton
            active={menuOpen}
            onToggle={() => setMenuOpen((pv) => !pv)}
          />
        </div>

        <ul className="hidden md:flex items-center gap-5 bg-white rounded-full py-1 pl-5 pr-1">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}

          <li>
            <ArrowButton onClick={handleLogin}>Login</ArrowButton>
          </li>
        </ul>
      </nav>

      <AnimatePresence mode="wait">
        {menuOpen && <MobileNav onLogin={handleLogin} onClose={closeMenu} />}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
