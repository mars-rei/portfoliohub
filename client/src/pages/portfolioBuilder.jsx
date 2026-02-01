import LeftCanvasMenu from '../components/leftCanvasMenu.jsx';
import Canvas from '../components/canvas.jsx';
import RightCanvasMenu from '../components/rightCanvasMenu.jsx';
import ToolBar from '../components/toolBar.jsx';

const PortfolioBuilder = () => {
  return (
    <div>
      <div className="h-screen w-screen flex flex-row">
        <LeftCanvasMenu />
        <Canvas />
        <RightCanvasMenu />
      </div>
      <div className="relative">
        <ToolBar />
      </div>
    </div>
  );
};

export default PortfolioBuilder;