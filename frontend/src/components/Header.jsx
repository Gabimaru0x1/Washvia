

function Header() {
  return (
    <header className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <h3>Logo</h3>

      <nav className='flex space-x-4'>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
