import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";

function Login() {
    const submit = () => {};
    return (
        <div className={styles.login}>
            <Headling>Login</Headling>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="">Email:</label>
                    <Input id="email" type="email" isValid={false} placeholder="Email" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="">Password:</label>
                    <Input id="password" type="password" isValid={false} placeholder="Password" />
                </div>
                <Button appearance="big">Enter</Button>
            </form>
            <div className={styles.links}>
                <div>Do not have an account yet?</div>
                <Link to="/auth/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
