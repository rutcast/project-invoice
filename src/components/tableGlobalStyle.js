import {css} from 'styled-components'
import {StyledTable} from './Table'
import {cssVarValue} from '../service/css'

export const tableGlobalStyle = css`
  ${StyledTable} {
    .drag { width: 1rem; }
    .paid { width: 2.5rem; }
    
    .last { width: 50%; }
    .client { width: 75%; }
    .description { width: 100%; }
    
    .nr { width: 4rem; }
    .times,
    .recent,
    .dateLatest,
    .date { width: 5.5rem; }
    .totalDiscounted,
    .totalVATDiscounted,
    .totalIncDiscounted { width: 7rem; }
    .invoices { width: 5rem; }
    .actions { width: 8rem; }  // todo check actions vs action
    .hours { width: 4.5rem; }
    .amount { width: 7rem; }
    .vat { width: 4rem; }
    .action { width: 2rem; }  // todo check actions vs action
    .allPaid { width: 3rem; }
    td div {}
    input {
      width: 100%;
    }
    input+span { transform: translateY(-2px); }
    @media ${cssVarValue.breakpointLow} {
      //.last,
      //.description { width: 16vw; }
      .client { width: 15vw; }
      .hours { width: 3rem; }
      .description { width: 30vw; }
      .vat { width: 2.75rem; }
    } 
  } 
`