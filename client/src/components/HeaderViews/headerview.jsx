import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function HeaderView({ context }) {
  const { isLogged, setIsLogged } = context;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <div>
      <header className="mx-auto mb-8 box-border">
        <div className="bg-cyan-300 h-16">
          <div className="flex justify-between items-center">
            <div className="flex items-center mx-20">
              <a
                className="flex items-center text-cyan-950 tracking-tighter text-2xl italic font-serif font-semibold"
                href="#">
                <img className="w-12" src={logo} alt="Seek" />
                Seek
                <i
                  className="fa-brands fa-searchengin mx-2 my-6"
                  style={{ color: "#354545" }}></i>
              </a>
            </div>
            <div className="flex items-center mx-20">
              <a
                className="hover:text-xl"
                href="http://github.com/armayogapratama">
                <i className="fa-brands fa-github fa-xl mx-2"></i>
              </a>
              <a
                className="hover:text-xl"
                href="http://linkedin.com/in/arma-yoga-pratama">
                <i className="fa-brands fa-linkedin fa-xl"></i>
              </a>
              <a
                className="hover:text-xl"
                href="http://instagram.com/gansss_18">
                <i className="fa-brands fa-instagram fa-xl mx-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-cyan-200 h-20">
          <nav className="flex justify-around items-center">
            <div className="my-6">
              <NavLink
                to={"/"}
                className=" focus:bg-cyan-600 hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2">
                HOME
              </NavLink>
              <NavLink
                to={"/my-jobs"}
                className=" focus:bg-cyan-600 hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2">
                MY JOB
              </NavLink>
            </div>
            <div>
              {isLogged ? (
                <Link
                  to={"/users"}
                  className="hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded-full hover:p-2 w-16">
                  User
                </Link>
              ) : (
                <Link
                  to={"/register"}
                  className="hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2">
                  Signup
                </Link>
              )}
              {isLogged ? (
                <button
                  onClick={handleLogout}
                  className="hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2">
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="hover:transition hover:duration-300 hover:easy-in-out mx-2 border-2 border-cyan-700 text-white bg-slate-700 p-2 rounded hover:text-white hover:bg-cyan-600 hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
