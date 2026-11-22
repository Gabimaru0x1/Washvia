import { navLinks } from "../constants";
import ArrowButton from "./ArrowLink";
// import { useModal } from "./modalContext";

const MobileNav = ({onClose, onLogin}) => {
//   const { openModal } = useModal();

  return (
    <div className="md:hidden">
      <ul
        className="fixed inset-0 flex flex-col gap-3 overflow-y-auto
          bg-white px-8 pt-24 pb-8 text-gray-900
          md:static md:flex md:flex-row md:items-center md:gap-5
          md:rounded-full md:py-1 md:pl-5 md:pr-1"
      >
        {navLinks.map((item) => (
          <li key={item.label}>
            <a href={item.href} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}

        <li>
          <ArrowButton onClick={onLogin}>Login</ArrowButton>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
