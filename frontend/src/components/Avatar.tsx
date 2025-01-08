function Avatar({ initial, size }: { initial: string; size: string }) {
  return (
    <div
      className={`bg-zinc-900 rounded-full ${
        size === "big"
          ? "w-11 h-11 hover:bg-zinc-800 transition ease-in-out duration-150 hover:scale-110"
          : "w-6 h-6"
      } `}
    >
      <div className="flex justify-center h-full">
        <div
          className={`flex flex-col justify-center ${
            size === "small" ? "text-xs font-semibold" : "text-xl font-bold"
          }  text-cream-500`}
        >
          {initial}
        </div>
      </div>
    </div>
  );
}
export default Avatar;
