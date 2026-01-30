import NavBar from '../components/navbar.jsx';
import RegisterMessageBlock from '../components/ergisterMessageBlock.jsx';
import RegisterBlock from '../components/registerBlock.jsx';

const Register = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="flex h-[calc(100vh-4rem)]">
        <RegisterMessageBlock />
        <RegisterBlock />
      </div>
    </div>
  );
};

export default Register;