import React, {FC, useState} from "react";
import {TPageItem} from "../../fragments/PagesList/TPagesList";
import {observer} from "mobx-react";
import { Button } from '../../styled/Button';
import styled, { css } from "styled-components";

const StyledPageItem = styled.div`
    width: 100%;
    display: flex;
    color: #484848;
    border-bottom: 1px solid #484848;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    
    &:first-of-type {
     border-top: 1px solid #484848;
    }
    
     &:last-of-type {
         border-bottom: none;
    }
    
    button {
    align-items: flex-end;
    }
`;

export const PageItem: FC<TPageItem> = observer(({page, removePage}) => {
    const [showEditInput, setShowEditInput] = useState(false);

    return (
        <StyledPageItem>
            <Dot published={page.published} />
            {!showEditInput && page.name}
            {showEditInput && (
                <>
                    <input type="text" value={page.name ?? undefined} onChange={(event) => {
                        console.log(page);
                        page.setName(event.target.value);
                    }}/>
                    <Button onClick={() => setShowEditInput(false)}>Save</Button>
                </>
            )}
            {!showEditInput && (
                <Button className="edit" onClick={() => setShowEditInput(true)}>
                    ✎
                </Button>
            )}
            <Button className="publish" onClick={() => page.toggle()}>
                Publish
            </Button>
            <Button className="delete" onClick={() => removePage()}>
                ❌
            </Button>
        </StyledPageItem>
    )
});

type TDot = {
    readonly published: boolean;
}
const Dot = styled.div<TDot>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    top: 7px;
    margin-right: 8px;
    ${props => props.published && css`
    background-color: #24B7A8;
    `}
    ${props => !props.published && css`
    background-color: red;
    `}
`;
