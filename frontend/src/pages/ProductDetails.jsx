import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    asyncdeleteproduct,
    asyncupdateproduct,
} from "../store/actions/productActions";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector((state) => state.userReducer);
    const { products } = useSelector((state) => state.productReducer);
    const product = products.find((p) => p.id == id);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            image: product?.image,
            title: product?.title,
            price: product?.price,
            category: product?.category,
            description: product?.description,
        },
    });

    const UpdateProductHandler = (updatedProduct) => {
        dispatch(asyncupdateproduct(product.id, updatedProduct));
    };
    const DeleteHandler = () => {
        dispatch(asyncdeleteproduct(id));
        navigate("/");
    };

    return (
        <div className="w-full">
            <div key={product?.id} className="w-full  shadow-lg  mr-5 mb-5 p-5">
                <img
                    className="h-[40vh] block mx-auto"
                    src={product?.image}
                    alt=""
                />
                <h1 className="text-4xl">{product?.title}</h1>
                <p className="mt-5">{product?.description}</p>
                <p className="my-5 text-red-400 text-5xl">{product?.price}</p>
                <div className="flex justify-between items-center p-3">
                    <button className="text-yellow-400">Add to cart</button>
                </div>
            </div>

            {/*  */}
            {user?.isAdmin && (
                <form
                    onSubmit={handleSubmit(UpdateProductHandler)}
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
                    <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-blue-400">
                        Update Product
                    </button>
                    <br />
                    <br />
                    <button
                        onClick={DeleteHandler}
                        type="button"
                        className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
                    >
                        Delete Product
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductDetails;
