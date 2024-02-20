export default function Button({ name }) {
  return (
    <div>
      <button
        type="submit"
        className="hover:transition hover:duration-300 hover:easy-in-out text-xl font-semibold mx-2 border-2 border-cyan-700 text-white bg-cyan-950 p-2 rounded-xl hover:text-cyan-700 hover:bg-white hover:border hover:border-1 hover:border-cyan-950 hover:rounded hover:p-2 w-36">
        {name}
      </button>
    </div>
  );
}
