function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center px-4">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            "The customer support I received was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="max-w-md mt-4 text-md font-bold">
            Julius Windfield
          </div>
          <div className="max-w-md text-md text-slate-500">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
