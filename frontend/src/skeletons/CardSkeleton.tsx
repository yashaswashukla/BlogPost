function CardSkeleton() {
  return (
    <div className="border-b-1 border-b border-slate-400 pt-10 pb-5 hover:cursor-pointer animate-pulse">
      <div className="flex gap-x-2">
        <div className="w-5 h-5 rounded-full bg-slate-300"></div>
        <div className="flex flex-col justify-center">
          <div className="h-2 bg-slate-300 w-10"></div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="h-2 bg-slate-300 w-24"></div>
        </div>
      </div>
      <div className="mt-4 h-5 bg-slate-300 w-5/12"></div>
      <div className="mt-8 h-3 bg-slate-300 w-8/12"></div>
      <div className="mt-4 h-3 bg-slate-300 w-8/12"></div>
      <div className="mt-4 h-3 bg-slate-300 w-7/12"></div>
    </div>
  );
}

export default CardSkeleton;
