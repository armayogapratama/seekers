import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { jobsList } from "../../store/actions/actionMyJob";
import axios from "../../instances/instance";
import MessageAlert from "../../ErrorHandlers/errorHandle";
import { handleOnDelete } from "../../store/actions/actionDelete";

export default function MyJobView() {
  const listMyJobs = useSelector((state) => {
    return state.myJob.data;
  });
  // console.log(listMyJobs, "Ini list Jobs >>>>>>>>>>>");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const [myJobs, setMyJobs] = useState([]);
  const token = localStorage.getItem("access_token");

  const { isError, isLoading, isSuccess } = useSelector((state) => {
    return state.deleteMyJob;
  });

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(jobsList(data.myJobs));
      // setMyJobs(data.myJobs);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      MessageAlert(error);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, [isLoading]);

  // const handleOnDelete = async (myJobId) => {
  //   try {
  //     await axios.delete(`/my-jobs/${myJobId}/delete`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     fetchMyJobs();
  //   } catch (error) {
  //     MessageAlert(error);
  //   }
  // };

  return (
    <>
      {loading ? (
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
        <div className="flex flex-col items-center m-4 border-2 border-slate-400">
          {listMyJobs.map((el, i) => {
            return (
              <div key={i} className="mb-12 border-2 border-slate-400">
                <div className="m-2">
                  <h1 className="text-center text-2xl">
                    Company: {el.companyName}
                  </h1>
                </div>
                <div className="m-4">
                  <h1 className="text-center text-4xl">{el.title}</h1>
                </div>
                <div className="mx-8 mb-4 border-2 border-slate-400">
                  <p className="px-4 py-2 text-justify">{el.jobDescription}</p>
                </div>
                <div className="mx-4 my-2">
                  <h2 className="text-2xl text-center">{el.source}</h2>
                </div>
                <div className="mx-4 my-2">
                  <h2 className="text-center text-xl">
                    Publication: {el.publicationTime}
                  </h2>
                </div>

                <div className="flex justify-center mx-12">
                  <a
                    className="border-1 border-slate-900 bg-cyan-600 text-white px-8 py-2 rounded hover:bg-slate-700"
                    href={el.application_url}>
                    Link
                  </a>
                </div>
                <div className="m-2">
                  <h3 className="text-center text-xl">{el.location}</h3>
                </div>
                <div className="flex justify-end mb-2">
                  <a
                    onClick={() => {
                      dispatch(handleOnDelete(el.id));
                    }}
                    className="px-8 py-2 rounded hover:bg-slate-700 text-lg">
                    <i className="fa-solid fa-trash fa-2xl"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
