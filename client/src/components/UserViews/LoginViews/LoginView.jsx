import logo from "../../../assets/logo.svg";
import axios from "../../../instances/instance";
import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../Buttons/button";
import MessageAlert from "../../../ErrorHandlers/errorHandle";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../../../store/actions/actionLogin";

export default function LoginView() {
  const log = useSelector((state) => {
    return state.login.login;
  });
  console.log(log, "ini log <<<<<<<");
  const dispatch = useDispatch();
  const { isLogged, setIsLogged } = useOutletContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLogin(user));
    setIsLogged(true);
    navigate("/");
  };

  const handleCredentialResponse = async (response) => {
    console.log("Login response", response);
    try {
      const res = await axios.post("/users/google-login", null, {
        headers: {
          google_token: response.credential,
        },
      });
      console.log(res.data.access_token);
      const token = res.data.access_token;
      localStorage.setItem("access_token", token);
      navigate("/");
    } catch (error) {
      MessageAlert(error);
    }
  };

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "947249678952-3utcnmgklhkg2o2jr613g7h3cmhsl4ab.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      // google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  const change = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
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
          <div className="flex border-2 border-slate-700 outline outline-1 outline-slate-600 h-96 rounded-3xl">
            <form onSubmit={handleOnSubmit} className="mx-24">
              <div className="my-8">
                <label className="text-lg">Email:</label>
                <input
                  className="mx-12 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-72 h-8"
                  type="email"
                  value={user.email}
                  onChange={change}
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="my-8">
                <label className="text-lg">Password:</label>
                <input
                  className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-72 h-8"
                  type="password"
                  value={user.password}
                  onChange={change}
                  name="password"
                  placeholder="Password"
                  autoComplete="true"
                />
              </div>

              <div className="flex flex-col items-center">
                <Button name={"Login"} />
                <br />
                <div>OR</div>
                <br />
                <div>
                  <div className="px-3 hover:scale-125" id="buttonDiv"></div>
                </div>
                <br />
                <div className="text-slate-800">
                  You don't have account?
                  <Link
                    to={"/register"}
                    className="hover:transition hover:duration-300 hover:easy-in-out font-semibold mx-2 border-2 border-cyan-700 text-slate-950  p-2 rounded-xl hover:text-cyan-700 hover:bg-white hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2 w-24">
                    Signup
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
