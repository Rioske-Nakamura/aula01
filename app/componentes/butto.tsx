import React from "react";

type Buttonprops = {
  name: string;
  onClick: () => void;
};

const Button: React.FC<Buttonprops> = ({ name, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
