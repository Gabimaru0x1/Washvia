import { Nav } from "../components";
import HeroImg from "../assets/hero.jpg";
import Login from "./Login";
import { ModalProvider } from "../components/Modal";

const Home = () => {
  return (
    <ModalProvider
      modals={{ login: (closeModal) => <Login onClose={closeModal} /> }}
    >
      <Nav />

      <main className="h-screen">
        <img
          src={HeroImg}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-black/50" />
      </main>
    </ModalProvider>
  );
};

export default Home;
