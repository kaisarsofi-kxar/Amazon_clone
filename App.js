import { Provider } from "react-redux";
import StackNavigation from "./navigation/StackNavigation";
import store from "./store";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./UserContext";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigation />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}
