import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../../store/actions/actionUser";

export default function UserView() {
  const users = useSelector((state) => {
    const data = state.users.data;
    return data;
  });
  const loading = useSelector((state) => {
    return state.users.loading;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <div className="mb-48 mt-36">
        <div className="flex flex-col items-center">
          <div className="my-4 text-4xl">Profiles</div>

          <div>
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
              <table className="mx-16 table-auto border-spacing-x- border-separate border border-slate-800">
                <thead>
                  <tr>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      No.
                    </th>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      Username
                    </th>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      Email
                    </th>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      Gender
                    </th>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      Member
                    </th>
                    <th className="px-16 py-8 border border-slate-600 bg-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((el, i) => {
                    return (
                      <tr key={i}>
                        <td className="py-4 text-center border border-slate-600 bg-slate-200">
                          {i + 1}
                        </td>
                        <td className="text-center border border-slate-600 bg-slate-200">
                          {el.username}
                        </td>
                        <td className="px-8 text-center border border-slate-600 bg-slate-200">
                          {el.email}
                        </td>
                        <td className="text-center border border-slate-600 bg-slate-200">
                          {el.gender}
                        </td>
                        <td className="text-center border border-slate-600 bg-slate-200">
                          {el.member}
                        </td>
                        <td className="text-center border border-slate-600 bg-slate-200">
                          <Link to={`/profiles/${el.id}/new-profiles`}>
                            <i className="fa-solid fa-pencil"></i>
                          </Link>

                          <Link className="ml-4" to={`/profiles/${el.id}`}>
                            <i className="fa-solid fa-circle-info"></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
