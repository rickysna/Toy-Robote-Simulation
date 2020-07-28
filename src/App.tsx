import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import ToyRobot from "./ToyRobot";

function App({reduxStore}: any) {
  return (
    <ReduxProvider store={reduxStore}>
      <main className="App">
        <ToyRobot/>
      </main>
    </ReduxProvider>
  );
}

export default App;
