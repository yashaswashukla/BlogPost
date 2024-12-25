import { Link, useNavigate } from "react-router-dom";

function DropMenu({ menu }: { menu: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full bg-white border border-gray-100 divide-y divide-gray-300 rounded-lg shadow transition-transform duration-300 ${
        menu ? "translate-y-0" : "-translate-y-96"
      } `}
    >
      <div className="px-4 py-3 text-sm text-gray-900 text-center grid grid-cols-1">
        <div className="font-bold">{localStorage.getItem("name")}</div>
        <div className="mt-1 italic font-gray-500">
          {localStorage.getItem("email")?.toLocaleLowerCase()}
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-300">
        <div className="px-4 py-2 text-md hover:bg-gray-100">
          <div className="flex gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
            <Link to="/myblogs">My Blogs</Link>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
          className="text-left px-4 py-2 hover:bg-gray-100"
        >
          <div className="flex gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>

            <div>Log Out</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default DropMenu;
