import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {noop} from '../util'
import {formElement, icon} from '../service/css'

export const StyledInput = styled.input`
  ${formElement}
  box-shadow: 0 0 0 1px var(--color-border) inset,  0 4px 16px var(--color-shade) inset;
  &:focus { box-shadow: 0 0 0 1px var(--color-button) inset,  0 4px 16px var(--color-shade) inset; }
  // height should be 2*0.5rem padding + 0.875rem fontsize
  line-height: 1.875rem;
  padding: 0 0.75rem;
  background-color: var(--color-input-background);
  color: var(--color-foreground);
    
  &[type=checkbox] {
    width: 1.875rem;
    height: 1.875rem;
    margin-right: -1.875rem;
    padding: 0;
    opacity: 0;
    +span {
      ${formElement}
      width: 1.875rem;
      height: 1.875rem;
      padding: 0;
      font-size: 1rem;
      line-height: 1.875rem;
      overflow: hidden;
      background-color: var(--color-input-background);//#e8e8e8;
      box-shadow: inset 0 0 0 1px var(--color-border);
      color: var(--color-input-background-off);
      text-align: center;
      &:before { 
        ${icon}
        content: '\uE907';
        color: inherit;
      }
    }
    &:checked+span { color: var(--color-input-selected); }
    &:focus+span { box-shadow: 0 0 0 1px var(--color-buttonL40) inset,  0 4px 16px var(--color-shade) inset; }
  }
  
  &[disabled] {
    opacity: 0.6;
  }
  
  &[type=number] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
     display: none;
     -webkit-appearance: none;
     } 
  }
  
  &[type=date] {
    height: 1.875rem;
    overflow: hidden;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button { display: none; } 
  }
  
  &[type=color] {
    height: 1.875rem;
    width: 3rem;
    padding: 0.0625rem 0.125rem;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button { display: none; } 
  }
`

export const InputText = forwardRef(({ value, onChange:_onChange, setter, ...attr}, ref) => {
  return <StyledInput
      ref={ref}
      value={value}
      onChange={_onChange || setter && (({ target: { value } }) => setter(value)) || noop}
      {...attr}
      type="text"
  />
})

export const InputDate = ({ value, onChange:_onChange, setter, ...attr}) => {
  return <StyledInput
      value={value}
      onChange={_onChange || setter && (({ target: { value } }) => setter(value)) || noop}
      {...attr}
      type="date"
  />
}

export const InputNumber = ({ value, onChange:_onChange, setter, ...attr}) => {
  return <StyledInput
      value={value}
      onChange={_onChange || setter && (({ target: { value } }) => setter(parseFloat(value))) || noop}
      {...attr}
      type="number"
  />
}

export const InputColor = ({ value, onChange:_onChange, setter, ...attr}) => {
  return <StyledInput
      value={value}
      onChange={_onChange || setter && (({ target: { value } }) => setter(value)) || noop}
      {...attr}
      type="color"
  />
}

export const InputCheckbox = ({value, setter, onChange, ...attr}) => {
  return <><StyledInput
      onChange={onChange || setter && (({ target: { checked } }) => setter(checked)) || noop}
      className="visually-hidden"
      checked={value||false}
      {...attr}
      type="checkbox"
  /><span className={attr.className} onClick={attr.onClick||noop} /></>
}

export const InputRange = ({ value, onChange:_onChange, setter, ...attr}) => {
  return <StyledInput
      value={value}
      onChange={_onChange || setter && (({ target: { value } }) => setter(parseFloat(value))) || noop}
      {...attr}
      type="range"
  />
}
