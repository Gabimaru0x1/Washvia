import { Nav } from "../components";
import HeroImg from "../assets/hero.jpg";
import { ModalProvider } from "../components/Modal";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  return (
    <ModalProvider
      modals={{
        login: (closeModal, openModal) => (
          <Login
            onClose={closeModal}
            onSwitchMode={() => openModal("signup")}
          />
        ),
        signup: (closeModal, openModal) => (
          <Signup
            onClose={closeModal}
            onSwitchMode={() => openModal("login")}
          />
        ),
      }}
    >
      <Nav />

      <main className="relative h-screen">
        <img
          src={HeroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </main>
    </ModalProvider>
  );
};

export default Home;