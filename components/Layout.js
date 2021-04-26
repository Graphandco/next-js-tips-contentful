import {useState, useEffect} from 'react'
import Link from 'next/link'
import { HiCode } from 'react-icons/hi';
import { FiSun } from 'react-icons/fi';
import { RiMoonClearFill } from 'react-icons/ri';

export default function Layout({ children }) {

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem('theme')
    );
    setTheme(localStorage.getItem('theme'))
  }, [])

  const switchTheme = () => {
    if (theme === 'light') {
      saveTheme('dark')
    } else {
      saveTheme('light')
    }
  };
  
  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Graph and</span>
              <span> Tips</span>
            </h1>
            <h2><HiCode /> Share your code</h2>
          </a>
        </Link>
        <div className="theme-switcher"  onClick={switchTheme} >
          {/* <label class="switch">
            <input type="checkbox" onChange={switchTheme}/>
            <span class="slider round"></span>
          </label> */}
          <FiSun className={theme === 'light' ? 'active light' : 'dark'}/>
          <RiMoonClearFill className={theme === 'dark' ? 'active dark' : 'light'}/>
        </div>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Graph and Co :)</p>
      </footer>
    </div>
  )
}