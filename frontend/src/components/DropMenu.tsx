import { Library, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function DropMenu() {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 ">
      <div className="px-4 py-3 text-md text-zinc-900 text-center grid grid-cols-1">
        <div className="font-bold">{localStorage.getItem("name")}</div>
        <div className="mt-1 italic">
          {localStorage.getItem("email")?.toLocaleLowerCase()}
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 text-sm">
        <div className="px-4 py-2 text-md hover:bg-zinc-200">
          <Link to="/myblogs" className="flex gap-x-2 ">
            <Library size={20} />
            <div className="text-zinc-900 font-semibold">My Blogs</div>
          </Link>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
          className="text-left px-4 py-2 hover:bg-zinc-200"
        >
          <div className="flex gap-x-2">
            <LogOut size={20} />
            <div className="text-zinc-900 font-semibold">Log Out</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default DropMenu;
