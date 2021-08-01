import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "MyBase";

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
    <div>
      <div>
        <AuthForm />
        <button onClick={onSocialClick} name="google">
          구글계정으로 로그인하기
        </button>
        <button onClick={onSocialClick} name="github">
          깃허브 계정으로 로그인하기
        </button>
      </div>
    </div>
  );
};
export default Auth;
