import { useState, useEffect } from "react";
import logo from "../../../assets/logo.svg";
import axios from "../../../instances/instance";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Buttons/button";
import MessageAlert from "../../../ErrorHandlers/errorHandle";

export default function NewProfileView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [user, setUser] = useState([]);
  const [newProfile, setNewProfile] = useState({
    fullName: "",
    address: "",
  });

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      MessageAlert(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/profiles/${id}/new-profile`,
        newProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.users);
      setNewProfile(data.users);
      fetchUser();
      navigate("/users");
    } catch (error) {
      MessageAlert(error);
    }
  };

  const change = (e) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="my-8 mx-48">
        <div>
          <div>
            <div className="flex justify-center items-center mx-8 mb-4">
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
          <div className="flex flex-col border-2 border-slate-700 outline outline-1 outline-slate-600 h-96  rounded-3xl">
            <form onSubmit={handleOnSubmit} className="mx-4">
              <div>
                <div className="flex flex-row my-12">
                  <label className="text-lg">FullName:</label>
                  <input
                    className="mx-8 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-2/4 h-8"
                    type="text"
                    onChange={change}
                    value={newProfile.fullName}
                    name="fullName"
                    placeholder="Full Name"
                  />

                  <label className="text-lg">Username:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="text"
                    value={user.username}
                    disabled
                    name="username"
                    placeholder="Username"
                  />

                  <label className="text-lg">Email:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="email"
                    value={user.email}
                    disabled
                    name="email"
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-row my-12">
                  <label className="text-lg">Gender:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="text"
                    value={user.gender}
                    disabled
                    name="gender"
                    placeholder="Gender"
                  />

                  <label className="text-lg">Member:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-3/4 h-8"
                    type="text"
                    name="member"
                    value={user.member}
                    disabled
                    placeholder="Member"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-row my-12">
                  <label className="text-lg">Address:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-full h-8"
                    type="text"
                    name="address"
                    onChange={change}
                    value={newProfile.address}
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Button name={"Create"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
