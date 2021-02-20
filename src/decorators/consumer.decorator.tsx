import React from "react";
import { ThemeContext } from "../components/context/context";

export function Consumer<C extends React.ComponentClass>(Component: C): C {
  return (((props) => (
    <ThemeContext.Consumer>
      {(context) => <Component {...props} context={context} />}
    </ThemeContext.Consumer>
  )) as any) as C;
}
