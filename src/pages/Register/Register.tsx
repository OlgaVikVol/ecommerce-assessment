import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { userActions, register as registerUser } from "../../store/user.slice";

export interface RegisterFormInputs {
    email: string;
    password: string;
    name: string;
}

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token, registerErrorMessage } = useSelector(
        (s: RootState) => s.user
    );

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const onSubmit = (data: RegisterFormInputs) => {
        dispatch(userActions.clearRegisterError());
        dispatch(registerUser(data));
    };

    return (
        <div className={styles.register}>
            <Headling>Register</Headling>
            {registerErrorMessage && (
                <div className={styles["error"]}>{registerErrorMessage}</div>
            )}
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

                <div className={styles.field}>
                    <label htmlFor="name">Name:</label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="Name"
                        isValid={!errors.password}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name?.message && (
                        <span className={styles.error}>
                            {String(errors.name.message)}
                        </span>
                    )}
                </div>

                <Button appearance="big" type="submit">
                    Register
                </Button>
            </form>

            <div className={styles.links}>
                <div>Already have an account?</div>
                <Link to="/auth/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;
