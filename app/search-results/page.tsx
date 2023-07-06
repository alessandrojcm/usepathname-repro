'use client'
import React from 'react';
import {Paging, Results} from "@elastic/react-search-ui";

const Page = () => {
    return (
        <>
            <Results/>
            <Paging/>
        </>
    );
};

export default Page;
