import { useState, useCallback } from 'react';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { FaAngular } from 'react-icons/fa6';
import { RiReactjsLine } from 'react-icons/ri';
import { SiPhp } from 'react-icons/si';

import Button from 'react-bootstrap/Button';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [_isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(
    (mouseDownEvent) => {
      setIsResizing(true);

      const startWidth = sidebarWidth;
      const startPosition = mouseDownEvent.clientX;

      const onMouseMove = (mouseMoveEvent) => {
        const diff = mouseMoveEvent.clientX - startPosition;
        const newWidth = startWidth + diff;
        setSidebarWidth(Math.max(100, newWidth));
      };

      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [sidebarWidth],
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hadleMouseEnter = useCallback(() => {
    console.log('ehh');
    setIsSidebarOpen(true);
  }, []);

  return (
    <div className='App'>
      <div className='page-container'>
        <div
          className={`sidebar ${!isSidebarOpen ? 'hide' : ''}`}
          style={{
            width: `${sidebarWidth}px`,
            transform: `translateX(${!isSidebarOpen ? `-${sidebarWidth - 30}px` : '0'})`,
          }}
          onMouseEnter={hadleMouseEnter}
        >
          <div className='sidebar-links'>
            <Link to='/about'>
              <FaHome />
              Home
            </Link>
            <Link to=''>
              <FaAngular />
              Angular
            </Link>
            <Link to=''>
              <RiReactjsLine />
              React
            </Link>
            <Link to=''>
              <SiPhp />
              PHP
            </Link>
          </div>
          <div className={`resize-handle ${!isSidebarOpen ? 'rotate180' : ''}`} onMouseDown={startResizing}>
            <Button variant='dark' className='toggle-btn' onClick={toggleSidebar}>
              <IoIosArrowDropleftCircle />
            </Button>
          </div>
        </div>
        <div className='page-content' style={{ paddingLeft: `${sidebarWidth}px` }}>
          <div className='main-content'>
            <h1>Main Content</h1>
            <p>This is the main content area. The sidebar can be resized.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
