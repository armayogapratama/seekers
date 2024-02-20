import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CardJob from "../CardJobs/cardJobs";
import MessageAlert from "../../ErrorHandlers/errorHandle";

export default function HomeView() {
  const [jobs, setJobs] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [value] = useDebounce(searchJob, 2000);
  const [loading, setLoading] = useState(false);

  const fetchData = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/jobs?search=${e}`
      );
      setJobs(data.dataJob);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      MessageAlert(error);
    }
  };

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const change = (e) => {
    setSearchJob(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          <div className="ml-16">
            <input
              className="mx-8 border-2 border-cyan-600 outline outline-1 outline-cyan-700 bg-slate-200 rounded-lg h-12 w-4/5"
              type="search"
              name="search"
              placeholder="Looking for Job"
              onChange={change}
              value={searchJob}
            />
            <button
              onClick={() => fetchData(searchJob)}
              className="text-xl border-2 border-slate-600 outline outline-1 outline-cyan-700 py-2 px-8 rounded bg-cyan-400 hover:bg-cyan-700 hover:text-slate-100 hover:transition hover:duration-300 hover:easy-in-out">
              Search
            </button>
          </div>
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
              {jobs.map((job, i) => {
                return <CardJob key={i} job={job} i={i} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
