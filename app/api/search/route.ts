import { NextRequest, NextResponse } from 'next/server'
import getConnector from '@/utils/elastic/connector'
import type { SearchPayload } from '@/typings/SearchPayload'
import type { QueryConfig } from '@elastic/search-ui'

export async function POST(request: NextRequest) {
  const body: SearchPayload = await request.json()
  const { indexName, requestState, queryConfig } = body
  const connector = getConnector(indexName ?? '*')

  return connector.onSearch(requestState, queryConfig as QueryConfig).then(NextResponse.json)
}
