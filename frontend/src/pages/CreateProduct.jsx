import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { asynccreateproduct } from "../store/actions/productActions";
const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const CreateProductHandler = (product) => {
        product.id = nanoid();
        dispatch(asynccreateproduct(product));
        navigate("/");
    };
    return (
        <form
            onSubmit={handleSubmit(CreateProductHandler)}
            className="w-full p-5"
        >
            <input
                {...register("image")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="url"
                placeholder="Product Image URL"
            />

            <input
                {...register("title")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="Product Title"
            />
            <input
                {...register("price")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="0.00"
            />
            <input
                {...register("category")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="Product Category"
            />
            <textarea
                {...register("description")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="Product Description Here..."
            ></textarea>
            <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400">
                Create Product
            </button>
        </form>
    );
};

export default CreateProduct;
