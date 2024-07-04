import './darkmode.css';
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";



const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark');
    localStorage.setItem('selectedTheme', 'dark');
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light');
    localStorage.setItem('selectedTheme', 'light');
  };

  const selectedTheme = localStorage.getItem('selectedTheme');

  if (selectedTheme === 'dark') {
    setDarkMode();
  }

  const toggleTheme = (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
    checkbox.parentElement.classList.toggle('checked');
  };

  return (
    <div className={`dark_mode ${selectedTheme === 'dark' ? 'checked' : ''}`}>
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === 'dark'}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <IoSunny className="sun-icon" />
        <FaMoon className="moon-icon"/>
      </label>
    </div>
  );
};

export default DarkMode;
