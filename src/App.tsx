import { useRoutes } from "react-router-dom";
import { routerConfig } from "./router";
import ModalRoot, { ModalContext } from "./modals/ModalRoot";
import useInitModal from "./hooks/useInitModal";
import { useInitGlobalRouter } from "./hooks/useGlobalRouter";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  // Global Router used in axios interceptors
  useInitGlobalRouter();

  const element = useRoutes(routerConfig);
  const { modalRef, globalModal } = useInitModal();

  // You can add <ProtectRouter /> if you need to do route protect

  return (
    <ModalContext.Provider value={globalModal}>
      <ProtectedRoute>
        <ModalRoot ref={modalRef} />
        {element}
      </ProtectedRoute>
    </ModalContext.Provider>
  );
};

export default App;
