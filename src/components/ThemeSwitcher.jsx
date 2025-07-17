import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
  ];

  return (
    <div className='dropdown dropdown-center mr-2'>
      <div tabIndex={0} role='button' className='btn m-1'>
        Theme: {theme}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'
      >
        {themes.map((t) => (
          <li key={t}>
            <a onClick={() => changeTheme(t)}>{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
