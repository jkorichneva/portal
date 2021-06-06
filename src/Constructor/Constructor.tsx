import React, { useEffect, useState } from 'react';
import { PagesList } from "./fragments/PagesList/PagesList";
import Preview from "./fragments/Preview/Preview";
import { PagesStore, Page } from './stores/PagesStore';
import { Title } from './styled/Components';
import styled from "styled-components";
import { getDataFromIndexedDB, addDataToDB } from './utils/dbUtils';

const Main = styled.main`
    display: flex;
    flex-direction: row;
    padding: 40px 0;
`;

const StyledConstructor = styled.div`
    padding-top: 40px;
    background-color: #fafafa;
`;

export default function Constructor() {
    const [pagesStore, setPagesStore] = useState(new PagesStore([]));

    useEffect(() => {
        async function fetchPages() {
            let pages = await getDataFromIndexedDB('pages', 1);
            console.log(pages);
            if (!pages.length) {
                pages = [new Page('Main'), new Page('Additional')];
                await addDataToDB('pages', pages);
            } else {
                pages = pages.map(page => new Page(page.name, page.id));
            }
            const defaultPagesStore = new PagesStore(pages);
            // @ts-ignore
            setPagesStore(defaultPagesStore);
        }
        fetchPages();
    }, []);
    return (
        <StyledConstructor>
            <header>
                <Title>Content Management</Title>
            </header>
            <Main>
            <PagesList pages={pagesStore} />
            <Preview />
            </Main>
        </StyledConstructor>
    );
}
