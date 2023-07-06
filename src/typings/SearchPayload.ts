import { AutocompleteQueryConfig, QueryConfig, RequestState } from '@elastic/search-ui'

export interface SearchPayload {
  requestState: RequestState
  queryConfig: QueryConfig | AutocompleteQueryConfig
  indexName?: string
}
