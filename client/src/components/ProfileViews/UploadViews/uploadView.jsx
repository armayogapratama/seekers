import { useState, useEffect } from "react";
import logo from "../../../assets/logo.svg";
import axios from "../../../instances/instance";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Buttons/button";
import MessageAlert from "../../../ErrorHandlers/errorHandle";

export default function UploadImageView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [uploadImage, setUploadImage] = useState({
    image: "",
  });

  const fetchProfileUser = async () => {
    try {
      const { data } = await axios.get(`/profiles/${id}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadImage(data.profile);
    } catch (error) {
      MessageAlert(error);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [id]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", uploadImage.image[0]);
      console.log(uploadImage.image);
      console.log(formData);

      const { data } = await axios.patch(
        `/profiles/${id}/update-profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.profile);

      fetchProfileUser();
      navigate(`/profiles/${id}`);
    } catch (error) {
      MessageAlert(error);
    }
  };

  const change = (e) => {
    setUploadImage({
      ...uploadImage,
      [e.target.name]: e.target.files,
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
                <div className="flex flex-row my-8">
                  <label className="text-lg">FullName:</label>
                  <input
                    className="mx-8 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-2/4 h-8"
                    type="text"
                    onChange={change}
                    value={uploadImage.fullName}
                    name="fullName"
                    disabled
                    placeholder="Full Name"
                  />

                  <label className="text-lg">Username:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="text"
                    value={uploadImage.username}
                    onChange={change}
                    name="username"
                    disabled
                    placeholder="Username"
                  />

                  <label className="text-lg">Email:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="email"
                    value={uploadImage.email}
                    onChange={change}
                    disabled
                    name="email"
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-row my-8">
                  <label className="text-lg">Gender:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-1/4 h-8"
                    type="text"
                    value={uploadImage.gender}
                    onChange={change}
                    name="gender"
                    disabled
                    placeholder="Gender"
                  />

                  <label className="text-lg">Member:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-3/4 h-8"
                    type="text"
                    name="member"
                    value={uploadImage.member}
                    onChange={change}
                    disabled
                    placeholder="Member"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-row my-8">
                  <label className="text-lg">Image</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-full h-8"
                    type="file"
                    name="image"
                    onChange={change}
                    placeholder="Image"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-row my-8">
                  <label className="text-lg">Address:</label>
                  <input
                    className="mx-4 bg-slate-200 rounded border border-1 border-cyan-700 outline outline-1 outline-slate-600 w-full h-8"
                    type="text"
                    name="address"
                    onChange={change}
                    value={uploadImage.address}
                    disabled
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Button name={"Upload"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
