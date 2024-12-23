import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks";

function Default() {
  const navigate = useNavigate();
  const loggedIn = useUser();
  if (loggedIn) {
    navigate("/blogs");
  } else {
    navigate("/signin");
  }
}

export default Default;
