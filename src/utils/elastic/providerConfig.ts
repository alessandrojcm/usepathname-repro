import { APIConnectorFactory } from './ApiConnector'
import type { FieldConfiguration, SearchDriverOptions, SearchFieldConfiguration } from '@elastic/search-ui'

const fieldNames = [
  'displayInformation',
]

const providerConfig: Partial<SearchDriverOptions> = {
  debug: process.env.NODE_ENV === 'development',
  alwaysSearchOnInitialLoad: true,
  autocompleteQuery: {
    results: {
      result_fields: {
        displayInformation: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
      },
    },
    suggestions: {
      types: {
        documents: {
          fields: ['displayInformation'],
        },
      },
      size: 10,
    },
  },
  searchQuery: {
    sort: [
      {
        field: 'searchSortOrder',
        direction: 'asc',
      },
      {
        field: '_score',
        direction: 'desc',
      },
    ],
    search_fields: fieldNames.reduce<Record<string, SearchFieldConfiguration>>(
      (prv, curr) => ({
        ...prv,
        [curr]: {
          weight: 1,
        },
      }),
      {},
    ),
    result_fields: fieldNames.reduce<Record<string, FieldConfiguration>>(
      (prv, curr) => ({
        ...prv,
        [curr]: {
          snippet: {},
        },
      }),
      {},
    ),
  },
}

// Factory method that initializes a new connector with a predefined index
export function providerConfigFactory(index: string): SearchDriverOptions {
  return {
    ...providerConfig,
    apiConnector: APIConnectorFactory(index),
  }
}

export default providerConfig
