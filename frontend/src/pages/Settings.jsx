import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncdeleteuser,
    asynclogoutuser,
    asyncupdateuser,
} from "../store/actions/userActions";
const Settings = () => {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: user?.username,
            email: user?.email,
            password: user?.password,
        },
    });

    const UpdateHandler = (updateduser) => {
        dispatch(asyncupdateuser(user?.id, updateduser));
    };

    const DeleteHandler = () => {
        dispatch(asyncdeleteuser(user.id));
    };

    const LogoutHandler = (user) => {
        dispatch(asynclogoutuser());
    };
    return (
        <form onSubmit={handleSubmit(UpdateHandler)} className="w-full p-5">
            <input
                {...register("username")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="john-doe"
            />

            <input
                {...register("email")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="john@doe.doe"
            />
            <input
                {...register("password")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="password"
                placeholder="********"
            />
            <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400">
                Update User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={LogoutHandler}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Logout User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={DeleteHandler}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Delete User
            </button>
        </form>
    );
};

export default Settings;
