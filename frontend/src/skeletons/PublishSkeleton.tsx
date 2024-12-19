import { GridLoader } from "react-spinners";

function PublishSkeleton() {
  return (
    <div className="fixed top-0 left-0 bg-black/80 z-20 w-full h-screen">
      <div className="relative flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="bg-white rounded-lg px-20 py-10 grid grid-cols-1 z-30">
            <div className="flex justify-center">
              <GridLoader size={25} color="#0891b2" />
            </div>
            <div className="text-3xl mt-8 font-bold text-black">
              Posting your Blog
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishSkeleton;
