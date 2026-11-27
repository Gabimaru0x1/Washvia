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
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    if (!menuOpen) return;

    setMenuClosing(true);
    setMenuOpen(false);
  };

  const handleLogin = () => {
    closeMenu();
    openModal("login");
  };

  const handleToggle = () => {
    if (menuOpen) {
      closeMenu()
    } else {
      setMenuOpen(true)
    }
  }

  const usePrimaryColor = menuOpen || menuClosing;

  return (
    <nav className="fixed z-1 inset-x-4 md:inset-x-8 py-5 flex items-center justify-between">
      <a
        href="/"
        onClick={closeMenu}
        className={`z-10 ${usePrimaryColor ? "text-primary" : "text-white"}`}
      >
        Washvia
      </a>

      <div className="hidden md:flex gap-5 bg-white rounded-full py-1 pl-5 pr-1">
        <ul className="flex-center gap-5">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <ArrowButton onClick={handleLogin}>Login</ArrowButton>
      </div>

      <div className="flex-center z-10 md:hidden">
        <ArrowButton onClick={handleLogin}>Login</ArrowButton>

        <MenuButton
          active={menuOpen}
          onToggle={handleToggle}
          className={`${usePrimaryColor ? "bg-primary" : "bg-white"}`}
        />
      </div>

      <AnimatePresence mode="wait" onExitComplete={() => setMenuClosing(false)}>
        {menuOpen && <MobileNav onClose={closeMenu} />}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
