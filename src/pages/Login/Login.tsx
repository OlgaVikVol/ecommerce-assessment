import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { login, userActions } from "../../store/user.slice";
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
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token, loginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(userActions.clearLoginError());
        dispatch(login(data));
    };

    return (
        <div className={styles.login} data-testid="login-page">
            <Headling data-testid="login-heading">Login</Headling>
            {loginErrorMessage && (
                <div className={styles.error} data-testid="login-error">
                    {loginErrorMessage}
                </div>
            )}
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                data-testid="login-form"
            >
                <div className={styles.field} data-testid="login-email-field">
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
                        data-testid="login-email-input"
                    />
                    {errors.email?.message && (
                        <span
                            className={styles.error}
                            data-testid="login-email-error"
                        >
                            {String(errors.email.message)}
                        </span>
                    )}
                </div>

                <div
                    className={styles.field}
                    data-testid="login-password-field"
                >
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
                        data-testid="login-password-input"
                    />
                    {errors.password?.message && (
                        <span
                            className={styles.error}
                            data-testid="login-password-error"
                        >
                            {String(errors.password.message)}
                        </span>
                    )}
                </div>

                <Button
                    appearance="big"
                    type="submit"
                    data-testid="login-submit-button"
                >
                    Enter
                </Button>
            </form>

            <div className={styles.links} data-testid="login-links">
                <div>Do not have an account yet?</div>
                <Link to="/auth/register" data-testid="login-register-link">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
