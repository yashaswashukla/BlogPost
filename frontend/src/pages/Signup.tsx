import Quote from "../components/Quote";
import SignUpAuth from "../components/SignUpAuth";

function Signup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <SignUpAuth />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default Signup;
