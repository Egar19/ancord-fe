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
        className='dropdown-content flex flex-col bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm max-h-60 overflow-y-auto space-y-1'
      >
        {themes.map((t) => (
          <li key={t}>
            <a
              onClick={() => changeTheme(t)}
              className='cursor-pointer hover:bg-base-200 px-2 py-1 rounded'
            >
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
