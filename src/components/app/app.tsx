import { Provider } from "react-redux";
import { store } from "../../services/redux/store/store";
import LogisticMap from "../logistic-map/logistic-map";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<LogisticMap />
			</Provider>
		</div>
	);
}

export default App;
