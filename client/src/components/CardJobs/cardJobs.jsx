import { postMyJob } from "../../store/actions/actionMyJob";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CardJob({ job, i }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div key={i} className="mb-12 border-2 border-slate-400">
      <div className="m-2">
        <h1 className="text-center text-2xl">Company: {job.company_name}</h1>
      </div>
      <div className="m-4">
        <h1 className="text-center text-4xl">{job.title}</h1>
      </div>
      <div className="mx-8 mb-4 border-2 border-slate-400">
        <p className="px-4 py-2 text-justify">{job.plain_text_description}</p>
      </div>
      <div className="mx-4 my-2">
        <h2 className="text-2xl text-center">{job.source}</h2>
      </div>
      <div className="mx-4 my-2">
        <h2 className="text-center text-xl">
          Publication: {job.publication_time}
        </h2>
      </div>
      <div className="flex justify-center mx-12">
        {localStorage.access_token ? (
          <button
            onClick={() => {
              dispatch(postMyJob(job));
              navigate("/my-jobs");
            }}
            className="mx-4 border-1 border-slate-900 bg-cyan-600 text-white px-8 py-2 rounded hover:bg-slate-700">
            Add My Job
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="mx-4 border-1 border-slate-900 bg-cyan-600 text-white px-8 py-2 rounded hover:bg-slate-700">
            Add My Job
          </button>
        )}
      </div>
      <div className="m-2">
        <h3 className="text-center text-xl">{job.location}</h3>
      </div>
    </div>
  );
}
