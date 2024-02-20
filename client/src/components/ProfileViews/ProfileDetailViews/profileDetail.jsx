import axios from "../../../instances/instance";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MessageAlert from "../../../ErrorHandlers/errorHandle";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../../store/actions/actionProfileDetail";

export default function ProfileDetailView() {
  // const [infoUser, setInfoUser] = useState({});
  const { id } = useParams();
  // const token = localStorage.getItem("access_token");
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => {
    return state.profiles.data;
  });
  console.log(profile, "ini profile <<<<<<<<");

  const isLoading = useSelector((state) => {
    return state.profiles.loading;
  });
  console.log(isLoading, "ini loading <<<<<<<<");

  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center mt-4 mb-2">
        {isLoading ? (
          <div className="my-4">
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 border-2 border-slate-400">
            <div className="mx-4 my-2">
              <h1 className="text-center font-semibold text-4xl">
                {profile.fullName}
              </h1>
            </div>
            <div className="mx-4 my-1">
              <h2 className="text-2xl text-center">{profile.username}</h2>
            </div>
            <div className="flex justify-center mx-16 my-8">
              <img
                className="w-96 rounded-2xl"
                src={profile.image}
                alt="Image Profile"
              />
            </div>
            <div className="mx-4 my-1">
              <h2 className="text-2xl text-center">{profile.email}</h2>
            </div>
            <div className="mx-4 my-2">
              <h2 className="text-center text-xl">{profile.gender}</h2>
            </div>
            <div className="mx-4 my-2">
              <h2 className="text-center text-xl">{profile.member}</h2>
            </div>
            <div className="mx-8 mb-4 border-2 border-slate-400">
              <p className="text-center px-4 py-2">{profile.address}</p>
            </div>
            <div className="flex justify-center mx-12 mb-4">
              <Link
                to={`/profiles/${profile.id}/update-profile`}
                className="border-1 border-slate-900 bg-cyan-600 text-white px-4
              py-2 rounded hover:bg-slate-700">
                Update Profile
              </Link>

              <Link
                to={`/profiles/${profile.id}/upload-image`}
                className="mx-4 border-1 border-slate-900 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-slate-700">
                Upload Image
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
