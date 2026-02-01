import NavBar from '../components/navbar.jsx';
import HomeMenu from '../components/homeMenu.jsx';

import HomePortfolios from '../components/homePortfolios.jsx';
import HomeProjects from '../components/homeProjects.jsx';

const Home = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="flex h-[calc(100vh-4rem)]">
        <HomeMenu />
        <HomeProjects />
      </div>
    </div>
  );
};

export default Home;