import { NextRequest, NextResponse } from 'next/server'
import getConnector from '@/utils/elastic/connector'
import type { SearchPayload } from '@/typings/SearchPayload'
import type { AutocompleteQueryConfig } from '@elastic/search-ui'

export async function POST(request: NextRequest) {
  const body: SearchPayload = await request.json()
  const { indexName, requestState, queryConfig } = body
  const connector = getConnector(indexName ?? '*')

  return connector.onAutocomplete(requestState, queryConfig as AutocompleteQueryConfig).then(NextResponse.json)
}
