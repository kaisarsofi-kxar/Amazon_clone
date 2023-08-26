import { Provider } from "react-redux";
import StackNavigation from "./navigation/StackNavigation";
import store from "./store";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation />
        <ModalPortal />
      </Provider>
    </>
  );
}
