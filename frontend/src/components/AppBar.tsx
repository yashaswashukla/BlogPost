import { MouseEventHandler, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import DropMenu from "./DropMenu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
function AppBar({
  sendData,
  publish,
}: {
  sendData?: MouseEventHandler<HTMLButtonElement>;
  publish?: boolean;
  label?: string;
}) {
  const getName = () => {
    const name = localStorage.getItem("name") || "Anonymous";
    return name[0].toUpperCase();
  };
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full border-b border-zinc-300  px-20 py-3 z-20 flex justify-between">
        <Link to={"/blogs"}>
          <div className="flex flex-col justify-center font-bold text-zinc-900 text-2xl cursor-pointer h-full transition ease-in-out duration-300 hover:scale-110 focus:scale-90">
            BlogPost
          </div>
        </Link>
        <div className="flex gap-x-6">
          {publish && (
            <div className="flex flex-col justify-center">
              <button
                onClick={sendData}
                className="text-sm h-fit justify-center px-3 py-1.5 text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ease-in-out duration-150 hover:scale-110 font-semibold"
              >
                Publish
              </button>
            </div>
          )}
          {!publish && (
            <div className="flex flex-col justify-center">
              <Link
                to="/publish"
                className="h-fit text-sm justify-center px-3 py-1.5 text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ease-in-out duration-150 hover:scale-110 font-semibold"
              >
                New Post
              </Link>
            </div>
          )}
          <Popover open={menu} onOpenChange={setMenu}>
            <PopoverTrigger asChild>
              <button>
                <Avatar initial={getName()} size="big" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" sideOffset={15}>
              <DropMenu />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
