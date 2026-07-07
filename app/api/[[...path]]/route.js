      if (!s) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))
      const favs = await db.collection('properties').find({ id: { $in: s.favorite_ids || [] } }).toArray()
      const recs = await db.collection('properties').find({ id: { $in: s.recommended_ids || [] } }).toArray()
      return handleCORS(NextResponse.json({
        sessionId: s.id,
        leadName: s.lead?.name || null,
        persona: s.persona,
        brand: s.persona === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE',
        favorites: favs.map(({_id, ...p}) => p),
        recommended: recs.map(({_id, ...p}) => p),
        preferences: s.preferences || {}
      }))
    }

    // Single property fetch (for PDF brief)
    const propMatch = route.match(/^\/properties\/([^/]+)$/)
    if (propMatch && method === 'GET') {
      const pid = propMatch[1]
      const p = await db.collection('properties').findOne({ id: pid })
      if (!p) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))
      const { _id, ...rest } = p
      return handleCORS(NextResponse.json(rest))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (err) {
    console.error('API error:', err)
    return handleCORS(NextResponse.json({ error: 'Internal server error: ' + err.message }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
