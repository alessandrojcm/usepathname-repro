import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector'
/**
 * Factory method to obtain a new connector, receives the index to search on.
 * @param index
 */
export default function getConnector(index: string) {
  return new ElasticsearchAPIConnector(
    {
      host: process.env.ELASTICSEARCH_HOST as string,
      index,
    }
  )
}
