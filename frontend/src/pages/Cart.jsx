import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";

const Cart = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);

    const IncreaseQuantity = (index) => {
        const copyUser = { ...user, cart: [...user.cart] };
        copyUser.cart[index] = {
            ...copyUser.cart[index],
            quantity: copyUser.cart[index].quantity + 1,
        };
        dispatch(asyncupdateuser(user.id, copyUser));
    };

    const DecreaseQuantity = (index) => {
        const copyUser = { ...user, cart: [...user.cart] };

        if (copyUser.cart[index].quantity == 1) {
            copyUser.cart.splice(index, 1);
        } else {
            copyUser.cart[index] = {
                ...copyUser.cart[index],
                quantity: copyUser.cart[index].quantity - 1,
            };
        }
        dispatch(asyncupdateuser(user.id, copyUser));
    };

    // let x = user.cart.reduce((ac, cv) => {
    //     return ac + Number(cv.product.price) * cv.quantity;
    // }, 0);
    // console.log(x);

    return (
        <div className="p-5">
            {user.cart.map((ci, i) => {
                return (
                    <div
                        className="mb-3 bg-gray-200 rounded p-2 flex justify-between items-center"
                        key={i}
                    >
                        <img
                            className="h-[10vmax]"
                            src={ci.product.image}
                            alt=""
                        />
                        <h1>{ci.product.title}</h1>
                        <h2>{ci.product.price}</h2>
                        <div>
                            <button
                                onClick={() => IncreaseQuantity(i)}
                                className="text-2xl"
                            >
                                +
                            </button>
                            <span className="mx-3">{ci.quantity}</span>
                            <button
                                onClick={() => DecreaseQuantity(i)}
                                className="text-2xl"
                            >
                                -
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;
