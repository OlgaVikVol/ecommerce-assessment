import { forwardRef } from "react";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles["input-wrapper"]} data-testid="input-wrapper">
            <input
                data-testid="search-input"
                ref={ref}
                className={cn(styles.input, className, {
                    [styles["invalid"]]: isValid,
                })}
                {...props}
            />
            <img
                data-testid="search-icon"
                className={styles.icon}
                src="/search-icon.svg"
                alt="Search Icon"
            />
        </div>
    );
});

export default Search;
