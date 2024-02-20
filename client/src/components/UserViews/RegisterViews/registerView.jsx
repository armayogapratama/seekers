import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../Buttons/button";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../store/actions/actionAddUser";

export default function RegisterView() {
  const user = useSelector((state) => {
    return state.newUser.addNewUser;
  });
  console.log(user, "ini user >>>>>>>>>>>>>>");
  const dispatch = useDispatch();
  const isGenders = ["Male", "Female"];
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const change = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(newUser));
    navigate("/login");
  };

  return (
    <>
      <div className="my-8 mx-96">
        <div>
          <div>
            <div className="flex justify-center items-center mx-20 mb-8">
              <a
                className="flex items-center text-cyan-950 tracking-tighter text-3xl italic font-serif font-semibold"
                href="#">
                <img className="w-24" src={logo} alt="Seek" />
                Seek
                <i
                  className="fa-brands fa-searchengin mx-2 my-6"
                  style={{ color: "#354545" }}></i>
              </a>
            </div>
          </div>
          <div className="flex flex-col border border-1 border-slate-700 outline outline-1 outline-slate-600 h-96 rounded-3xl">
            <form onSubmit={handleOnSubmit} className="mx-8">
              <div className="flex my-8">
                <label className="text-lg">Username:</label>
                <input
                  className="mx-8 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-96 h-8"
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={change}
                  placeholder="Username"
                />
              </div>

              <div className="flex flex-row my-4">
                <label className="text-lg">Email:</label>
                <input
                  className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-56 h-8"
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={change}
                  placeholder="Email"
                />

                <label className="text-lg">Password:</label>
                <input
                  className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-56 h-8"
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={change}
                  placeholder="Password"
                  autoComplete="true"
                />
              </div>

              <div className="flex my-8">
                <label className="text-lg">Gender:</label>
                <select
                  name="gender"
                  value={newUser.gender}
                  onChange={change}
                  className="mx-8 border border-1 border-cyan-600 outline outline-1 outline-slate-600 p-1 rounded-lg bg-slate-200 w-36">
                  <option>Choose Gender</option>
                  {isGenders.map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col items-center">
                <Button name={"Create"} />
                <br />
                <div>OR</div>
                <br />
                <div className="text-slate-800">
                  You have an account?
                  <Link
                    to={"/login"}
                    className="hover:transition hover:duration-300 hover:easy-in-out font-semibold mx-2 border-2 text-slate-950 p-2 rounded-xl hover:text-cyan-700 hover:bg-white hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2 w-24">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
