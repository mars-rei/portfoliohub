import NavBar from '../components/navbar.jsx';
import VerifyMessageBlock from '../components/verifyMessageBlock.jsx';
import VerifyBlock from '../components/verifyBlock.jsx';

const Verify = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="flex h-[calc(100vh-4rem)]">
        <VerifyMessageBlock />
        <VerifyBlock />
      </div>
    </div>
  );
};

export default Verify;