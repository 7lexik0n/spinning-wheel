import React from "react";
import Wheel from "./Components/Wheel";

const App = () => {
  return (
    <div className="app__container">
      <Wheel variants={["variant_1", "variant_2", "variant_3", "variant_4", "variant_5"]} />
    </div>
  );
};

export default App;
