import { useRoutes } from "react-router-dom";
import { routerConfig } from "./router";
import ModalRoot, { ModalContext } from "./modals/ModalRoot";
import useInitModal from "./hooks/useInitModal";
import { useInitGlobalRouter } from "./hooks/useGlobalRouter";
import ProtectedRoute from "./components/ProtectedRoute";
import { usePreventZoom } from "./hooks/usePreventZoom";

const App = () => {
  // Global Router used in axios interceptors
  useInitGlobalRouter();
  // Prevent zoom in mobile
  usePreventZoom();

  const element = useRoutes(routerConfig);
  const { modalRef, globalModal } = useInitModal();

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
