import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from "react-redux";
import CellList from "./components/cell-list";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
