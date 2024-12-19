import Quote from "../components/Quote";
import SignInAuth from "../components/SignInAuth";

function Signin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <SignInAuth />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default Signin;
