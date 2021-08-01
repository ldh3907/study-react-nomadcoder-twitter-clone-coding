import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "MyBase";
import AuthGoogle from "../img/AuthGoogle.svg";
import AuthGithub from "../img/AuthGithub.svg";
import "./Auth.css";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <section id="auth">
      <div className="auth-form">
        <h1>로그인/회원가입</h1>
        <AuthForm />
        <div className="auth-auth-wrap">
          <button id="auth-auth" onClick={onSocialClick} name="google">
            <img id="auth-auth-img" src={AuthGoogle} />
            구글계정으로 로그인
          </button>
          <button id="auth-auth" onClick={onSocialClick} name="github">
            <img id="auth-auth-img" src={AuthGithub} />
            깃허브 계정으로 로그인
          </button>
        </div>
      </div>
    </section>
  );
};
export default Auth;
