import type {
  APIConnector as EAPIConnector,
  AutocompleteQueryConfig,
  AutocompleteResponseState,
  QueryConfig,
  RequestState,
  ResponseState,
} from '@elastic/search-ui'
import ky from 'ky'

// Largely taken from https://docs.elastic.co/search-ui/guides/nextjs-integration#integration-with-elasticsearch-connector
// but we are adding an attribute to change indexes.
class APIConnector implements EAPIConnector {
  constructor(private _activeIndex: string) {}

  get activeIndex() {
    return this._activeIndex
  }

  set activeIndex(index: string) {
    this._activeIndex = index
  }

  onResultClick() {
    // optional. Called when a result has been clicked
  }
  onAutocompleteResultClick() {
    // optional. Called when an autocomplete result has been clicked
  }

  async onSearch(requestState: RequestState, queryConfig: QueryConfig) {
    const response = await ky.post('/api/search', {
      json: {
        requestState,
        queryConfig,
        indexName: this.activeIndex,
      },
    })
    return response.json<ResponseState>()
  }

  async onAutocomplete(requestState: RequestState, queryConfig: AutocompleteQueryConfig) {
    const response = await ky.post('/api/autocomplete', {
      json: {
        requestState,
        queryConfig,
        indexName: this.activeIndex,
      },
    })
    return response.json<AutocompleteResponseState>()
  }
}

export function APIConnectorFactory(index: string) {
  return new APIConnector(index)
}

export default APIConnector
