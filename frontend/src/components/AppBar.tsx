import { MouseEventHandler, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import DropMenu from "./DropMenu";
function AppBar({
  sendData,
  publish,
}: {
  sendData?: MouseEventHandler<HTMLButtonElement>;
  publish?: boolean;
}) {
  const getName = () => {
    const name = localStorage.getItem("name") || "Anonymous";
    return name[0].toUpperCase();
  };
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full border-b border-slate-200  px-20 py-2 bg-white z-10 flex justify-between">
        <Link to={"/blogs"}>
          <div className="flex flex-col justify-center font-semibold text-2xl cursor-pointer h-full transition ease-in-out delay-300 hover:scale-110 focus:scale-90">
            Medium
          </div>
        </Link>
        <div className="flex gap-x-6">
          {publish && (
            <button
              onClick={sendData}
              className="flex flex-col justify-center px-3 bg-green-500 rounded-full text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 transition ease-in-out delay-300 hover:scale-110 focus:scale-90 font-semibold"
            >
              Publish
            </button>
          )}
          <Link
            to="/publish"
            className="flex flex-col justify-center px-3 bg-cyan-600 rounded-full text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition ease-in-out delay-300 hover:scale-110 focus:scale-90 font-semibold"
          >
            New Post
          </Link>

          <button
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <Avatar initial={getName()} size="big" />
          </button>
        </div>
      </div>
      <div className="fixed top-20 right-10 z-40">
        <DropMenu menu={menu} />
      </div>
    </div>
  );
}

export default AppBar;
