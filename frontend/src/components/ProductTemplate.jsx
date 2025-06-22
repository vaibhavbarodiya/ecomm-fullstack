import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";

const ProductTemplate = ({ p }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const AddtoCartHandler = () => {
        const copyUser = { ...user, cart: [...user.cart] };
        const index = user.cart.findIndex((ci) => ci.product.id == p.id);
        if (index == -1) {
            copyUser.cart.push({ product: p, quantity: 1 });
        } else {
            copyUser.cart[index] = {
                ...copyUser.cart[index],
                quantity: copyUser.cart[index].quantity + 1,
            };
        }
        dispatch(asyncupdateuser(user.id, copyUser));
    };

    return (
        <div key={p.id} className="w-[31%] h-[65vh] shadow-lg p-2 mr-5 mb-5">
            <img className="h-[60%] block mx-auto" src={p.image} alt="" />
            <h1 className="text-2xl">{p.title.slice(0, 18)}...</h1>
            <p className="mt-5">{p.description.slice(0, 90)}...</p>
            <div className="flex justify-between items-center p-3">
                <Link to={`/update-product/${p.id}`} className="text-blue-400">
                    More Info
                </Link>
                <button onClick={AddtoCartHandler} className="text-yellow-400">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductTemplate;
