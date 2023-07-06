'use client'
import React, {ReactNode, useCallback, useMemo} from 'react';
import {SearchBox, SearchProvider} from "@elastic/react-search-ui";
import {providerConfigFactory} from "@/utils/elastic/providerConfig";
import {SearchDriverOptions} from "@elastic/search-ui";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

type WriteURL = (url: string, {replaceUrl}: { replaceUrl: boolean }) => void

const config = providerConfigFactory(' *')
const ShellClient = ({children}: { children: ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const getNewUrl = useCallback(
        (url?: string) => {
            const newParams = new URLSearchParams(url ?? searchParams.toString())
            return `${pathname}?${newParams.toString()}`
        },
        [pathname, searchParams],
    )
    const writeUrl = useCallback<WriteURL>(
        (url, {replaceUrl}) => {
            router[replaceUrl ? 'replace' : 'push'](getNewUrl(url))
        },
        [getNewUrl, router],
    )
    const onSearchEnter = useCallback(() => {
        router.push(`/search-results?${searchParams.toString()}`)
    }, [router, searchParams])
    const _config = useMemo<SearchDriverOptions>(
        () => ({
            ...config,
            routingOptions: {
                readUrl: () => {
                    return searchParams.toString()
                },
                writeUrl,
            },
        }),
        [writeUrl, searchParams],
    )
    return (
        <SearchProvider config={_config}>
            <main>
                <header>
                    <SearchBox searchAsYouType debounceLength={125}
                               inputView={({getAutocomplete, getInputProps, getButtonProps}) => (
                                   <>
                                       <div>
                                           <input
                                               {...getInputProps({
                                                   placeholder: "I am a custom placeholder"
                                               })}
                                               onKeyDown={(e) => {
                                                   getInputProps().onKeyDown(e)
                                                   e.key === 'Enter' && onSearchEnter()
                                               }}
                                           />
                                           {getAutocomplete()}
                                       </div>
                                       <input
                                           {...getButtonProps({
                                               "data-custom-attr": "some value"
                                           })}
                                       />
                                   </>
                               )}/>
                </header>
                {children}
            </main>
        </SearchProvider>
    );
};

export default ShellClient;
