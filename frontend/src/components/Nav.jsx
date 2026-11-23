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
    <nav className="fixed z-1 inset-x-4 h-20 flex items-center justify-between">
      <a
        href="/"
        onClick={closeMenu}
        className={`z-10 ${menuOpen ? "text-primary" : "text-white"}`}
      >
        Washvia
      </a>

      <div className="hidden md:flex gap-5 bg-white rounded-full py-1 pl-1 md:pl-5 pr-1">
        <ul className="md:flex items-center gap-5">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <ArrowButton onClick={handleLogin}>Login</ArrowButton>
      </div>

      <div className="flex">
        <ArrowButton onClick={handleLogin}>Login</ArrowButton>

        <MenuButton
          active={menuOpen}
          onToggle={() => setMenuOpen((pv) => !pv)}
          className={`${menuOpen ? "bg-primary" : "bg-white"}`}
        />

      </div>

      <AnimatePresence mode="wait">
        {menuOpen && <MobileNav onLogin={handleLogin} onClose={closeMenu} />}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
