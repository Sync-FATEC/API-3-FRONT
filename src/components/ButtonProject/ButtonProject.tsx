// FILE: src/components/ButtonProject/ButtonProject.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from 'react-router-dom';
import './ButtonProject.css';

interface ButtonProjectProps {
  text: string;
  color: string;
  iconButton: IconProp;
  action: () => void;
}

const ButtonProject: React.FC<ButtonProjectProps> = ({
  text = 'Default Text',
  color = 'defaultColor',
  iconButton,
  action,
}) => {
  const navigate = useNavigate();

  return (
    <button 
      id={color}
      className='buttons'
      onClick={action}>
      <FontAwesomeIcon icon={iconButton} />
      {text}
    </button>
  );
};

export default ButtonProject;