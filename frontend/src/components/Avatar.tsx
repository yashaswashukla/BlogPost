function Avatar({ initial, size }: { initial: string; size: string }) {
  return (
    <div
      className={`bg-black rounded-full ${
        size === "big" ? "w-12 h-12" : "w-6 h-6"
      } ${
        size === "big"
          ? "hover:bg-slate-900 transition ease-in-out delay-300 hover:scale-110"
          : ""
      }`}
    >
      <div className="flex justify-center h-full">
        <div
          className={`flex flex-col justify-center ${
            size === "small" ? "text-xs font-semibold" : "text-xl font-bold"
          }  text-gray-600 dark:text-gray-200`}
        >
          {initial}
        </div>
      </div>
    </div>
  );
}
export default Avatar;
