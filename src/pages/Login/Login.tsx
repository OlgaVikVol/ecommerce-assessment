import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useLogin } from "../../shared/hooks/useLogin";
export interface LoginFormInputs {
    email: string;
    password: string;
}

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const response = await login(data.email, data.password);
        if (response) {
            navigate("/");
        }
    };

    return (
        <div className={styles.login}>
            <Headling>Login</Headling>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label htmlFor="email">Email:</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        isValid={!errors.email}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email?.message && (
                        <span className={styles.error}>
                            {String(errors.email.message)}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label htmlFor="password">Password:</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        isValid={!errors.password}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password?.message && (
                        <span className={styles.error}>
                            {String(errors.password.message)}
                        </span>
                    )}
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <Button appearance="big" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Enter"}
                </Button>
            </form>

            <div className={styles.links}>
                <div>Do not have an account yet?</div>
                <Link to="/auth/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
