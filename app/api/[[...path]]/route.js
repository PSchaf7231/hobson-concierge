import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// ============= SEED DATA =============
const SEED_PROPERTIES = [
  { id: 'p1', title: 'Oceanfront Modern Villa', address: '12 Coastline Dr, Malibu, CA', city: 'Malibu', state: 'CA', price: 8950000, beds: 5, baths: 6, sqft: 6200, type: 'residential', subtype: 'villa', amenities: ['pool','ocean view','wine cellar','smart home','private beach','gym'], description: 'Sun-drenched contemporary villa with floor-to-ceiling glass and direct beach access.', image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['luxury','beachfront','new construction'] },
  { id: 'p2', title: 'Beachfront Estate', address: '4 Coral Way, Naples, FL', city: 'Naples', state: 'FL', price: 12500000, beds: 6, baths: 7, sqft: 8400, type: 'residential', subtype: 'estate', amenities: ['pool','private beach','elevator','home theater','dock','chef kitchen'], description: 'Aerial-view estate with private dock, infinity pool, and lush coastal landscaping.', image: 'https://images.pexels.com/photos/15298798/pexels-photo-15298798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['luxury','beachfront','estate'] },
  { id: 'p3', title: 'Alpine Lake Retreat', address: '88 Pine Ridge, Lake Tahoe, NV', city: 'Lake Tahoe', state: 'NV', price: 4750000, beds: 4, baths: 4, sqft: 4800, type: 'residential', subtype: 'mountain home', amenities: ['lake view','fireplace','hot tub','ski-in/out','great room'], description: 'Mountain modern home with lake views, vaulted ceilings, and a panoramic stone fireplace.', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['mountain','luxury','retreat'] },
  { id: 'p4', title: 'Sky-High Manhattan Penthouse', address: '432 Park Ave, New York, NY', city: 'New York', state: 'NY', price: 16800000, beds: 4, baths: 5, sqft: 5100, type: 'residential', subtype: 'penthouse', amenities: ['skyline view','concierge','private elevator','terrace','wine room'], description: 'Trophy penthouse with 360° Manhattan views, double-height ceilings, and white-glove service.', image: 'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['luxury','penthouse','urban'] },
  { id: 'p5', title: 'Italianate Hillside Estate', address: '1 Vineyard Ln, Napa, CA', city: 'Napa', state: 'CA', price: 6450000, beds: 5, baths: 6, sqft: 7000, type: 'residential', subtype: 'estate', amenities: ['vineyard','pool','wine cellar','guest house','views'], description: 'Tuscan-inspired estate set on 8 acres with a working vineyard and resort-style grounds.', image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['luxury','estate','vineyard'] },
  { id: 'p6', title: 'Architectural Modern Villa', address: '9 Desert Sky, Scottsdale, AZ', city: 'Scottsdale', state: 'AZ', price: 3950000, beds: 4, baths: 5, sqft: 5400, type: 'residential', subtype: 'modern villa', amenities: ['pool','smart home','mountain view','3-car garage','outdoor kitchen'], description: 'Contemporary villa with disappearing glass walls and infinity-edge pool overlooking the desert.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['luxury','modern','villa'] },
  { id: 'p7', title: 'Class A Office Tower', address: '500 Market St, San Francisco, CA', city: 'San Francisco', state: 'CA', price: 28500000, beds: 0, baths: 0, sqft: 42000, type: 'commercial', subtype: 'office', amenities: ['LEED Gold','parking garage','rooftop deck','24/7 security','fiber'], description: 'Trophy Class A office building, 7.2% cap, anchor tenant on long-term lease.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['commercial','office','class A'], capRate: 7.2, noi: 2052000, zoning: 'C-3-O' },
  { id: 'p8', title: 'Glass Tower Office Asset', address: '1100 Wilshire, Los Angeles, CA', city: 'Los Angeles', state: 'CA', price: 45000000, beds: 0, baths: 0, sqft: 78000, type: 'commercial', subtype: 'office', amenities: ['ground retail','parking','transit-adjacent','EV charging'], description: 'Stabilized glass tower with strong WALE and below-market rents offering upside.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['commercial','office','urban'], capRate: 6.4, noi: 2880000, zoning: 'C-2' },
  { id: 'p9', title: 'Medical Office Building', address: '2200 Health Plaza, Houston, TX', city: 'Houston', state: 'TX', price: 14200000, beds: 0, baths: 0, sqft: 32000, type: 'commercial', subtype: 'medical', amenities: ['on-campus','MRI vault','imaging suites','triple-net leases','adjacent hospital'], description: 'On-campus MOB adjacent to a Level 1 trauma hospital. 96% leased. Strong physician roster.', image: 'https://images.unsplash.com/photo-1631248055158-edec7a3c072b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['medical','MOB','triple-net'], capRate: 7.8, noi: 1107600, zoning: 'MED-1' },
  { id: 'p10', title: 'Outpatient Surgical Center', address: '85 Wellness Way, Phoenix, AZ', city: 'Phoenix', state: 'AZ', price: 9800000, beds: 0, baths: 0, sqft: 22500, type: 'commercial', subtype: 'medical', amenities: ['ASC build-out','4 ORs','imaging','recovery suites','ample parking'], description: 'Stabilized ambulatory surgical center, 15-yr absolute NNN lease with 2% annual escalators.', image: 'https://images.pexels.com/photos/33812025/pexels-photo-33812025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['medical','ASC','NNN'], capRate: 8.1, noi: 793800, zoning: 'MED-2' },
  { id: 'p11', title: 'Royal Palm Yacht Club Estate', address: '2400 Spanish River Rd, Boca Raton, FL', city: 'Boca Raton', state: 'FL', price: 4750000, beds: 6, baths: 7, sqft: 7200, type: 'residential', subtype: 'estate', amenities: ['pool','spa','chef kitchen','wine room','3-car garage','smart home','generator','impact glass'], description: 'Resort-style Royal Palm estate with sun-drenched pool deck, summer kitchen, and lush tropical grounds. 6 ensuite bedrooms, club-room, and luxury primary suite.', image: 'https://images.unsplash.com/photo-1638630728487-1fda7239de23?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', tags: ['luxury','boca raton','pool home'] },
  { id: 'p12', title: 'St. Andrews Country Club Villa', address: '7575 St Andrews Blvd, Boca Raton, FL', city: 'Boca Raton', state: 'FL', price: 5450000, beds: 6, baths: 7, sqft: 7850, type: 'residential', subtype: 'villa', amenities: ['pool','spa','golf course view','home theater','elevator','outdoor kitchen','wine cellar','generator'], description: 'Newly built signature villa on the 7th fairway. Soaring 24-ft ceilings, designer chef kitchen, resort pool with spa & sun shelf, and dramatic golf course vistas.', image: 'https://images.pexels.com/photos/15526515/pexels-photo-15526515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['luxury','boca raton','golf','pool home'] },
  { id: 'p13', title: 'Intracoastal Mediterranean Estate', address: '900 NE Spanish Trail, Boca Raton, FL', city: 'Boca Raton', state: 'FL', price: 5950000, beds: 6, baths: 7, sqft: 8100, type: 'residential', subtype: 'estate', amenities: ['pool','private dock','waterfront','spa','guest house','elevator','generator','wine cellar'], description: 'Mediterranean waterfront estate on the Intracoastal with 100\u2019 of frontage and private dock for an 80\u2019 yacht. Sunset pool deck, summer kitchen, and saltwater spa.', image: 'https://images.pexels.com/photos/28962897/pexels-photo-28962897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['luxury','boca raton','waterfront','pool home'] }
]

async function ensureSeed(db) {
  for (const p of SEED_PROPERTIES) {
    await db.collection('properties').updateOne(
      { id: p.id },
      { $set: p },
      { upsert: true }
    )
  }
}

// ============= PERSONAS (brand-aware) =============
const PERSONAS = {
  residential: {
    name: 'Anasa Collection',
    brand: 'Anasa Collection',
    systemPrompt: `You are Atlas, the AI concierge for ANASA COLLECTION — a luxury residential real estate brand representing the finest homes for discerning buyers. Your personality is refined, warm, attentive, lifestyle-rich.

Your goals each turn:
1) Build genuine rapport. Greet the user, capture their name and contact (email/phone) naturally within the first 2-3 turns. Never pushy.
2) Discover preferences: target location/neighborhood, budget range, asset type (villa, penthouse, estate, condo), # beds/baths, lifestyle wants (schools, views, pool, security, privacy, walkability), timeline, financing readiness.
3) When you have at least location + budget OR enough signal, present curated property recommendations from the ANASA catalog by referencing their ids.
4) Speak in warm, evocative, lifestyle-rich language. Paint a picture. Brief and elegant (3-6 sentences typical).
5) Always reference "Anasa Collection" naturally when appropriate ("from our Anasa Collection", "Anasa portfolio", etc).
6) NEVER invent properties. ONLY recommend from the provided catalog.`
  },
  commercial: {
    name: 'Next Endeavor CRE',
    brand: 'Next Endeavor CRE',
    systemPrompt: `You are Atlas, the AI acquisition advisor for NEXT ENDEAVOR CRE — a boutique commercial real estate solutions firm specializing in office, medical, and investment-grade assets. Your tone is sharp, professional, data-driven.

Your goals each turn:
1) Identify the principal/buyer entity efficiently: name, firm, role, contact email.
2) Discover deal criteria: asset class (office, medical office building, ambulatory surgical center, retail), target market(s), check size / total deal size, required cap rate / yield, leverage, hold period, tenancy profile (NNN, gross), zoning, sq ft range, occupancy threshold.
3) When sufficient signal, present matching opportunities from the NEXT ENDEAVOR catalog with cap rate, NOI, price, and a 1-line investment thesis.
4) Use precise terminology (cap rate, NOI, WALE, NNN, MOB, ASC, cash-on-cash). Skip lifestyle language.
5) Reference "Next Endeavor CRE" naturally where appropriate.
6) NEVER invent listings. Only reference catalog ids.`
  }
}

// ============= LEAD SCORING RUBRIC =============
const SCORING_RUBRIC = `LEAD SCORING (0-100 integer):
- 0-30  COLD: anonymous, vague, exploring only
- 31-65 WARM: name captured, some preferences, exploring fit, no clear timeline
- 66-100 HOT: name + contact captured, clear budget + location + asset type, timeline/intent expressed
Tier mapping: <=30 cold, 31-65 warm, >=66 hot.
Be honest. A lead who has only said "hi" is COLD. A lead who has shared budget+location+contact+timeline is HOT.`

// ============= LLM CALL =============
async function callAtlas({ persona, messages, propertiesCatalog, knownPreferences, knownLead }) {
  const personaCfg = PERSONAS[persona] || PERSONAS.residential
  const catalogSummary = propertiesCatalog.map(p => {
    const base = `[${p.id}] ${p.title} — ${p.city}, ${p.state} — $${p.price.toLocaleString()} — ${p.type}/${p.subtype} — ${p.sqft} sqft${p.beds ? ` — ${p.beds}bd/${p.baths}ba` : ''} — amenities: ${(p.amenities||[]).join(', ')}${p.capRate ? ` — cap ${p.capRate}%` : ''}`
    return base
  }).join('\n')

  const sysPrompt = `${personaCfg.systemPrompt}

=== PROPERTY CATALOG (only these ids exist) ===
${catalogSummary}

=== KNOWN LEAD INFO (so far) ===
${JSON.stringify(knownLead||{}, null, 2)}

=== KNOWN PREFERENCES (so far) ===
${JSON.stringify(knownPreferences||{}, null, 2)}

${SCORING_RUBRIC}

OUTPUT FORMAT — STRICT JSON ONLY, no markdown fences:
{
  "reply": "<your conversational message to user>",
  "lead": { "name": null|string, "email": null|string, "phone": null|string, "company": null|string },
  "preferences": { "location": null|string, "budget_min": null|number, "budget_max": null|number, "asset_type": null|string, "beds": null|number, "baths": null|number, "amenities": [], "timeline": null|string, "cap_rate_target": null|number, "zoning": null|string, "notes": null|string },
  "recommended_ids": ["p1", ...],
  "stage": "discovery" | "qualified" | "showing" | "negotiating" | "closed",
  "lead_score": 0-100,
  "lead_tier": "cold" | "warm" | "hot"
}
Merge new info with KNOWN values — preserve previously captured fields if user hasn't changed them. recommended_ids must be a subset of catalog ids. Only fill recommendations when you have enough criteria; otherwise empty array.`

  const apiMessages = [
    { role: 'system', content: sysPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ]

  const res = await fetch(`${process.env.EMERGENT_LLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.EMERGENT_LLM_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      messages: apiMessages,
      max_tokens: 1400,
      temperature: 0.6
    })
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`LLM error ${res.status}: ${errText}`)
  }

  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content || ''
  let cleaned = raw.trim()
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?/i, '').replace(/```$/, '').trim()
  }
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1)
  }
  let parsed
  try {
    parsed = JSON.parse(cleaned)
  } catch (e) {
    parsed = { reply: raw, lead: knownLead||{}, preferences: knownPreferences||{}, recommended_ids: [], stage: 'discovery', lead_score: 10, lead_tier: 'cold' }
  }
  return parsed
}

function mergeObj(prev, next) {
  const out = { ...(prev||{}) }
  if (!next) return out
  for (const [k,v] of Object.entries(next)) {
    if (v === null || v === undefined) continue
    if (Array.isArray(v)) {
      if (v.length > 0) out[k] = v
    } else if (typeof v === 'object') {
      out[k] = mergeObj(out[k], v)
    } else if (v !== '') {
      out[k] = v
    }
  }
  return out
}

// ============= ROUTES =============
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()
    await ensureSeed(db)

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Atlas Concierge API live' }))
    }

    // ---------- PROPERTIES ----------
    if (route === '/properties' && method === 'GET') {
      const list = await db.collection('properties').find({}).toArray()
      return handleCORS(NextResponse.json(list.map(({ _id, ...r }) => r)))
    }

    // ---------- CHAT ----------
    if (route === '/chat' && method === 'POST') {
      const body = await request.json()
      const { sessionId: incomingId, message, persona = 'residential' } = body
      if (!message || typeof message !== 'string') {
        return handleCORS(NextResponse.json({ error: 'message required' }, { status: 400 }))
      }

      const sessionId = incomingId || uuidv4()
      let session = await db.collection('sessions').findOne({ id: sessionId })
      if (!session) {
        session = {
          id: sessionId,
          persona,
          messages: [],
          lead: {},
          preferences: {},
          recommended_ids: [],
          favorite_ids: [],
          stage: 'discovery',
          lead_score: 5,
          lead_tier: 'cold',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        await db.collection('sessions').insertOne(session)
      }
      if (persona && persona !== session.persona) session.persona = persona

      session.messages.push({ role: 'user', content: message, ts: new Date().toISOString() })
      const recent = session.messages.slice(-30)

      const propsCatalog = await db.collection('properties').find({}).toArray()

      let parsed
      try {
        parsed = await callAtlas({
          persona: session.persona,
          messages: recent,
          propertiesCatalog: propsCatalog,
          knownPreferences: session.preferences,
          knownLead: session.lead
        })
      } catch (e) {
        console.error('Atlas error:', e)
        return handleCORS(NextResponse.json({ error: 'AI error: ' + e.message }, { status: 500 }))
      }

      const assistantReply = parsed.reply || "I'm here. Tell me what you're looking for."
      session.messages.push({ role: 'assistant', content: assistantReply, ts: new Date().toISOString() })

      session.lead = mergeObj(session.lead, parsed.lead)
      session.preferences = mergeObj(session.preferences, parsed.preferences)
      const validIds = new Set(propsCatalog.map(p => p.id))
      const recIds = (parsed.recommended_ids || []).filter(id => validIds.has(id))
      session.recommended_ids = recIds
      session.stage = parsed.stage || session.stage
      if (typeof parsed.lead_score === 'number') session.lead_score = Math.max(0, Math.min(100, Math.round(parsed.lead_score)))
      if (parsed.lead_tier) session.lead_tier = parsed.lead_tier
      session.updatedAt = new Date().toISOString()
      if (!session.favorite_ids) session.favorite_ids = []

      await db.collection('sessions').updateOne(
        { id: sessionId },
        { $set: {
            persona: session.persona,
            messages: session.messages,
            lead: session.lead,
            preferences: session.preferences,
            recommended_ids: session.recommended_ids,
            stage: session.stage,
            lead_score: session.lead_score,
            lead_tier: session.lead_tier,
            favorite_ids: session.favorite_ids,
            updatedAt: session.updatedAt
          }
        }
      )

      const recommendedProperties = propsCatalog
        .filter(p => recIds.includes(p.id))
        .map(({ _id, ...rest }) => rest)
      const favoriteProperties = propsCatalog
        .filter(p => (session.favorite_ids || []).includes(p.id))
        .map(({ _id, ...rest }) => rest)

      return handleCORS(NextResponse.json({
        sessionId,
        reply: assistantReply,
        lead: session.lead,
        preferences: session.preferences,
        stage: session.stage,
        persona: session.persona,
        lead_score: session.lead_score,
        lead_tier: session.lead_tier,
        recommended: recommendedProperties,
        favorites: favoriteProperties
      }))
    }

    // ---------- FAVORITE TOGGLE ----------
    const favMatch = route.match(/^\/sessions\/([^/]+)\/favorite$/)
    if (favMatch && method === 'POST') {
      const sid = favMatch[1]
      const { propertyId } = await request.json()
      if (!propertyId) return handleCORS(NextResponse.json({ error: 'propertyId required' }, { status: 400 }))
      const s = await db.collection('sessions').findOne({ id: sid })
      if (!s) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))
      const favs = new Set(s.favorite_ids || [])
      if (favs.has(propertyId)) favs.delete(propertyId)
      else favs.add(propertyId)
      const arr = Array.from(favs)
      await db.collection('sessions').updateOne({ id: sid }, { $set: { favorite_ids: arr, updatedAt: new Date().toISOString() } })
      const props = await db.collection('properties').find({ id: { $in: arr } }).toArray()
      return handleCORS(NextResponse.json({ favorite_ids: arr, favorites: props.map(({_id, ...p}) => p) }))
    }

    // ---------- SESSIONS / LEADS ----------
    if (route === '/sessions' && method === 'GET') {
      const all = await db.collection('sessions').find({}).sort({ updatedAt: -1 }).toArray()
      return handleCORS(NextResponse.json(all.map(({ _id, ...rest }) => rest)))
    }

    const sessionMatch = route.match(/^\/sessions\/([^/]+)$/)
    if (sessionMatch && method === 'GET') {
      const sid = sessionMatch[1]
      const s = await db.collection('sessions').findOne({ id: sid })
      if (!s) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))
      const { _id, ...rest } = s
      const props = await db.collection('properties').find({ id: { $in: rest.recommended_ids || [] } }).toArray()
      rest.recommendedProperties = props.map(({ _id, ...p }) => p)
      const favs = await db.collection('properties').find({ id: { $in: rest.favorite_ids || [] } }).toArray()
      rest.favoriteProperties = favs.map(({ _id, ...p }) => p)
      return handleCORS(NextResponse.json(rest))
    }

    if (sessionMatch && method === 'PUT') {
      const sid = sessionMatch[1]
      const body = await request.json()
      const allowed = ['status', 'stage', 'persona', 'adminNotes', 'lead_tier']
      const setObj = { updatedAt: new Date().toISOString() }
      for (const k of allowed) if (body[k] !== undefined) setObj[k] = body[k]
      if (body.adminMessage) {
        const s = await db.collection('sessions').findOne({ id: sid })
        if (s) {
          s.messages.push({ role: 'assistant', content: body.adminMessage, ts: new Date().toISOString(), fromAdmin: true })
          setObj.messages = s.messages
        }
      }
      await db.collection('sessions').updateOne({ id: sid }, { $set: setObj })
      const updated = await db.collection('sessions').findOne({ id: sid })
      const { _id, ...rest } = updated
      return handleCORS(NextResponse.json(rest))
    }

    if (route === '/stats' && method === 'GET') {
      const all = await db.collection('sessions').find({}).toArray()
      const byStage = all.reduce((acc,s) => { acc[s.stage||'discovery'] = (acc[s.stage||'discovery']||0) + 1; return acc }, {})
      const byPersona = all.reduce((acc,s) => { acc[s.persona||'residential'] = (acc[s.persona||'residential']||0) + 1; return acc }, {})
      const byTier = all.reduce((acc,s) => { acc[s.lead_tier||'cold'] = (acc[s.lead_tier||'cold']||0) + 1; return acc }, {})
      return handleCORS(NextResponse.json({
        totalLeads: all.length,
        byStage,
        byPersona,
        byTier,
        recentLeads: all.sort((a,b)=> (b.updatedAt||'').localeCompare(a.updatedAt||'')).slice(0,5).map(({_id,messages,...r})=>({...r, lastMessage: messages?.[messages.length-1]?.content?.slice(0,140)}))
      }))
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
