import React from 'react';
import { Subheader } from '../../styled/Components';
import styled from "styled-components";

const StyledPreview = styled.div`
    width: 65%;
    margin-left: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 0 0;
    box-sizing: border-box;
`;

export default function Preview() {
    return (
        <StyledPreview>
            <Subheader>Preview</Subheader>
        </StyledPreview>
    )
}
