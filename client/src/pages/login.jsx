import NavBar from '../components/navbar.jsx';
import LoginMessageBlock from '../components/loginMessageBlock.jsx';
import LoginBlock from '../components/loginBlock.jsx';

const Login = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="flex h-[calc(100vh-4rem)]">
        <LoginMessageBlock />
        <LoginBlock />
      </div>
    </div>
  );
};

export default Login;