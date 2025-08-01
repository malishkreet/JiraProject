// src/components/Toggle.jsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

export const Toggle = ({ checked, onChange }) => (
    <SwitchLabel id='checkbox'>
        <HiddenCheckbox
            id='checkbox'
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
        />
        <Slider checked={checked} />
    </SwitchLabel>
);

// ===== STYLES =====

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px; 
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + span {
    box-shadow: 0 0 1px #4FD1C5;
  }
  &:checked + span {
    background-color: #4FD1C5;
  }
  &:checked + span::before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  inset: 0;
  cursor: pointer;
  background-color: #d1d5db;
  border-radius: 9999px;
  transition: background-color 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.25s;
  }
`;
