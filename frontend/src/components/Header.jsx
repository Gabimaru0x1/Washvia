import ArrowButton from "./ArrowButton";

const Header = () => {
  return (
    <header className="py-8">
      <nav className="flex justify-between items-center">
        <a href="/">Washvia</a>
        <ul className="flex space-x-10">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">Services</a>
          </li>
          <li>
            <a href="/contact">Pricing</a>
          </li>
          <li>
            <a href="/contact">About</a>
          </li>
        </ul>

        <ArrowButton >
          Login
        </ArrowButton>
      </nav>
    </header>
  );
};

export default Header;
