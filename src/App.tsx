import "./App.css";
import Button from "./components/Button/Button";

function App() {
    return (
        <>
            <Button onClick={() => console.log("Button")}>Add</Button>
        </>
    );
}

export default App;
