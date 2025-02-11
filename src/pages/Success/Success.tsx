import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Success.module.css';

function Success() {
	const navigate = useNavigate();

return (
	<div className={styles.success}>
			<img src="/pizza.png" alt="Pizza image" />
			<div className={styles.text}>Your order has been successfully placed!</div>
			<Button appearance="big" onClick={() => navigate('/')}>Make a new order</Button>
		</div>
)

}

export default Success;
