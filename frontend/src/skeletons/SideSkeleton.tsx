function SideSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 mt-20 px-16">
        <div className="h-4 bg-slate-300 w-3/12"></div>
        <div className="mt-4 h-2 bg-slate-300 w-4/12"></div>
        <div className="mt-2 h-2 bg-slate-300 w-4/12"></div>
      </div>
    </div>
  );
}

export default SideSkeleton;
