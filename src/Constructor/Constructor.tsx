import React from 'react';
import { PagesList } from "./fragments/PagesList/PagesList";
import Preview from "./fragments/Preview/Preview";
import { PagesStore, Page } from './stores/PagesStore';
import { Title } from './styled/Components';
import styled from "styled-components";

const defaultPagesStore = new PagesStore([new Page('Main', 1), new Page('Additional', 2)]);

const Main = styled.main`
    display: flex;
    flex-direction: row;
    padding: 40px 0;
    background-color: #e5e5e5;
`;
export default function Constructor() {
    return (
        <div className="constructor">
            <header>
                <Title>Content Management</Title>
            </header>
            <Main>
            <PagesList pages={defaultPagesStore} />
            <Preview />
            </Main>
        </div>
    );
}
