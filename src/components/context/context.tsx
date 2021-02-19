import React, {Component} from 'react';
import {ThemeType} from '../../enums/theme.enum';
import {toggleDarkMode} from "../../utils/themeChanger";
import {BindMethod} from "../../decorators/bindMethod.decorator";

/*
* Theme prop should be global for all components
*/
export const ThemeContext = React.createContext(
    {
        theme: ThemeType.LIGHT,
        changeTheme: (_: ThemeType): void => {
        }
    });

export default class ThemeProvider extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        theme: ThemeType.LIGHT,
    }

    @BindMethod
    changeTheme(theme: ThemeType): void {
        if (this.state.theme !== theme) {
            this.setState(_ => {
                return ({ theme })
            })
            toggleDarkMode();
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={{
                ...this.state,
                changeTheme: this.changeTheme,
            }}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
