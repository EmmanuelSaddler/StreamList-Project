import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Welcome to StreamingBuddy!</h1>
        <h2 style={{textAlign: 'center'}}>Please Log In With Google</h2>
        <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
        <GoogleLogin
          onSuccess={(response) => {
            localStorage.setItem("auth", JSON.stringify(response));
            console.log("success:", response);
            window.location.reload();
          }}
          onError={() => {
            console.log("Login Failed.");
          }}
        />
        </div>
    </div>
  );
}
