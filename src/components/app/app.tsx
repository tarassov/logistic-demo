import { Provider } from "react-redux";
import { store } from "../../services/redux/store/store";
import MainView from "../main-view/main-view";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<MainView />
			</Provider>
		</div>
	);
}

export default App;
