import styled from "styled-components";

interface GridProps {
    size: number;
}

export const Grid = styled.div<GridProps>`
      min-height: 1rem;
      backGround: ${props => props.size ? 'white' : '#111'};
      display: grid;
      grid-auto-rows: 2rem;
      grid-template-columns: repeat(6, 1fr);
    `;


export const GridItem = styled.div`
        font-size: 1rem;
    `;
