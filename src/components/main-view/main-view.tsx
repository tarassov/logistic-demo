import { Layout } from "antd";
import { LatLngExpression } from "leaflet";
import { SplitPane } from "react-multi-split-pane";
import { callbackify } from "util";
import useLogistic from "../../hooks/use-logistic";
import MapView from "../map-view/map-view";
import OrdersView from "../orders-view/order-view";
import styles from "./main-view.module.css";

const DEFAULT_POSITION: LatLngExpression = [41.44, 2.13];
const { Header, Content, Footer } = Layout;

const MainView = () => {
	const { setCurrentMap, currentMap, fixSize } = useLogistic(null);

	const setRef = (element: L.Map) => {
		setCurrentMap(element);
	};

	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				<h2>Demo logistic</h2>
			</Header>
			<Content className={styles.content}>
				<SplitPane
					split="vertical"
					minSize={300}
					onDragFinished={() => fixSize()}
				>
					<div className={styles.splitPane}>
						<div className={styles.ordersList}>
							{currentMap ? <OrdersView map={currentMap} /> : "Loading..."}
						</div>
					</div>
					<div className={styles.splitPane}>
						<MapView initialPosition={DEFAULT_POSITION} ref={setRef} />
					</div>
				</SplitPane>
			</Content>
			<Footer className={styles.footer}>Demo logistic</Footer>
		</Layout>
	);
};

export default MainView;
