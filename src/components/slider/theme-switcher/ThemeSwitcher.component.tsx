import React, {useContext} from 'react';
import {ThemeContext} from "../../context/context";
import {ThemeType} from "../../../enums/theme.enum";
import MoonImg from "../../../assets/img/moon.svg";
import SunImg from "../../../assets/img/sun.svg";
import './ThemeSwitcher.style.css';

function ThemeSwitcher() {

    const {theme, changeTheme} = useContext(ThemeContext);

    return (
        <div className="flex">
            <div
                className={`${theme === ThemeType.LIGHT ? 'bg-gray-100 ' : 'bg-gray-400 '}rounded-lg`}>
                <div
                    className={`${theme === ThemeType.LIGHT ? 'active bg-white border border-solid border-gray-200 shadow-sm ' : ''}flex w-30px h-30px cursor-pointer rounded-lg`}
                    onClick={() => changeTheme(ThemeType.LIGHT)}
                >
                    <img className="m-auto sun" src={SunImg} alt="sun"/>
                </div>
                <div
                    className={`${theme === ThemeType.DARK ? 'active bg-gray-800 border border-solid border-gray-200 shadow-sm ' : ''}flex w-30px h-30px cursor-pointer rounded-lg`}
                    onClick={() => changeTheme(ThemeType.DARK)}
                >
                    <img className="m-auto moon" src={MoonImg} alt="moon"/>
                </div>
            </div>
        </div>
    );
}

export default ThemeSwitcher;
