import { useNavigate } from "react-router-dom";
import { AppPath } from "../../common/enums/app-path.enum";
import style from "./login.module.css";
import { useEffect } from "react";

const Login = (): JSX.Element => {
  const handleCallbackResponse = (response) => {
    localStorage.setItem("jwt", JSON.stringify(response.credential));
    navigate(AppPath.ROOT);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
        navigate(AppPath.ROOT);
    }

    const initGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id:
          "44550232200-45em93qa664j1m2l7br6ue7ig8iddlht.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    };

    if (typeof google !== "undefined" && google.accounts) {
      initGoogleSignIn();
    } else {
      document
        .getElementById("googleApiScript")
        .addEventListener("load", initGoogleSignIn);
    }
  }, []);

  return (
    <div className={style.container}>
      <div id="signInDiv"></div>
    </div>
  );
};

export { Login };
