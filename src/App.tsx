import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
    return (
        <>
            <Button onClick={() => console.log("Button")}>Add</Button>
            <Input isValid />
        </>
    );
}

export default App;
