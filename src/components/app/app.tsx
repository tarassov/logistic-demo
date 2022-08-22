import { Provider } from "react-redux";
import { store } from "../../services/redux/store/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<header className="app-header">Logistic</header>
				App init
			</Provider>
		</div>
	);
}

export default App;
