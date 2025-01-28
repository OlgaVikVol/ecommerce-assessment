import { useParams } from "react-router-dom";

function Product() {
    const { id } = useParams();
    return <>Product - {id}</>;
}

export default Product;
