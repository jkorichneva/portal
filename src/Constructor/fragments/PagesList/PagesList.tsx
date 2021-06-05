import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {Subheader} from '../../styled/Components';
import {TPagesList} from "./TPagesList";
import {PageItem} from "../../components/PageItem/PageItem";
import styled from "styled-components";
import { Button } from '../../styled/Button';

const StyledList = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #999;
    padding: 10px 0 0;
    box-sizing: border-box;
`;

export const PagesList: FC<TPagesList> = observer(({ pages }) => {
    return (
        <StyledList>
            <Subheader>Pages</Subheader>
            {pages.pages.map((page) => (
                <PageItem page={page} key={page.id} />
            ))}
            <Button>
                + Create page
            </Button>
        </StyledList>
    )
});

