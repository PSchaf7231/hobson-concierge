'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import {
  CalendarClock, FileText, StickyNote, Contact, FolderLock, User,
  Home, Megaphone, Image as ImageIcon, Users, FileSignature, LineChart,
  Plus, Trash2, ExternalLink, Lock, X
} from 'lucide-react'

const NAVY = '#0A1628'
const GOLD = '#D4AF37'

const TILES = [
  { key: 'showings', label: 'Showings', icon: CalendarClock },
  { key: 'templates_sops', label: 'Templates & SOPs', icon: FileText },
  { key: 'notes', label: 'Notes', icon: StickyNote },
  { key: 'contacts_crm', label: 'Contacts & CRM', icon: Contact },
  { key: 'vault_docs', label: 'Vault & Docs', icon: FolderLock },
  { key: 'personal', label: 'Personal', icon: User },
  { key: 'listings', label: 'Listings', icon: Home },
  { key: 'marketing', label: 'Marketing', icon: Megaphone },
  { key: 'social_media_assets', label: 'Social Media Assets', icon: ImageIcon },
  { key: 'leads_pipeline', label: 'Leads & Pipeline', icon: Users },
  { key: 'transactions', label: 'Transactions', icon: FileSignature },
  { key: 'market_analytics', label: 'Market Analytics', icon: LineChart }
]

function authHeaders(key) {
  return { 'Content-Type': 'application/json', 'x-hub-key': key }
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      const res = await fetch('/api/hub/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.ok) {
        localStorage.setItem('hub_key', password)
        onUnlock(password)
      } else {
        setError('Wrong password.')
      }
    } catch {
      setError('Could not reach the server.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
      <form onSubmit={submit} className="w-full max-w-sm p-8 rounded-xl border" style={{ borderColor: `${GOLD}40`, background: '#0F1E33' }}>
        <div className="flex flex-col items-center gap-2 mb-6">
          <Lock className="h-6 w-6" style={{ color: GOLD }} />
          <h1 className="text-xl font-semibold" style={{ color: GOLD }}>Private Hub</h1>
        </div>
        <Input
          type="password"
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 bg-white/5 text-white border-white/20"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <Button type="submit" disabled={checking || !password} className="w-full" style={{ background: GOLD, color: NAVY }}>
          {checking ? 'Checking…' : 'Unlock'}
        </Button>
      </form>
    </div>
  )
}

function EntryDialog({ open, onClose, tile, entry, onSave }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (open) {
      setName(entry?.name || '')
      setLink(entry?.link || '')
      setNotes(entry?.notes || '')
    }
  }, [open, entry])

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{entry ? 'Edit entry' : `New entry in ${tile.label}`}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label className="text-xs text-stone-500">Name (any label — address, "Limo Assets", etc.)</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 123 Main St, or Limo Assets" />
          </div>
          <div>
            <label className="text-xs text-stone-500">Link (Google Drive folder, doc, etc.)</label>
            <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://drive.google.com/..." />
          </div>
          <div>
            <label className="text-xs text-stone-500">Notes</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            disabled={!name.trim()}
            style={{ background: GOLD, color: NAVY }}
            onClick={() => onSave({ name: name.trim(), link: link.trim(), notes })}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TilePanel({ tile, hubKey, onClose }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/hub/entries?tile=${tile.key}`, { headers: authHeaders(hubKey) })
    setEntries(res.ok ? await res.json() : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [tile.key])

  async function save(fields) {
    if (editing) {
      await fetch(`/api/hub/entries/${editing.id}`, { method: 'PUT', headers: authHeaders(hubKey), body: JSON.stringify(fields) })
    } else {
      await fetch('/api/hub/entries', { method: 'POST', headers: authHeaders(hubKey), body: JSON.stringify({ tile: tile.key, ...fields }) })
    }
    setDialogOpen(false)
    setEditing(null)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete this entry?')) return
    await fetch(`/api/hub/entries/${id}`, { method: 'DELETE', headers: authHeaders(hubKey) })
    load()
  }

  const Icon = tile.icon

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" style={{ color: GOLD }} /> {tile.label}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          {loading && <p className="text-sm text-stone-500">Loading…</p>}
          {!loading && entries.length === 0 && (
            <p className="text-sm text-stone-500">Nothing here yet — add your first entry below.</p>
          )}
          {entries.map((e) => (
            <div key={e.id} className="flex items-start justify-between gap-2 p-3 rounded-lg border border-stone-200">
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{e.name}</p>
                {e.notes && <p className="text-sm text-stone-500 whitespace-pre-wrap">{e.notes}</p>}
                {e.link && (
                  <a href={e.link} target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 mt-1" style={{ color: '#B8892E' }}>
                    Open link <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => { setEditing(e); setDialogOpen(true) }}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(e.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => { setEditing(null); setDialogOpen(true) }} className="w-full" style={{ background: GOLD, color: NAVY }}>
          <Plus className="h-4 w-4 mr-1" /> Add entry
        </Button>

        <EntryDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditing(null) }} tile={tile} entry={editing} onSave={save} />
      </DialogContent>
    </Dialog>
  )
}

export default function HubPage() {
  const [hubKey, setHubKey] = useState(null)
  const [activeTile, setActiveTile] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('hub_key')
    if (saved) setHubKey(saved)
  }, [])

  if (!hubKey) return <PasswordGate onUnlock={setHubKey} />

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold" style={{ color: GOLD }}>Hobson Hub</h1>
          <button
            className="text-sm text-white/50 hover:text-white/80"
            onClick={() => { localStorage.removeItem('hub_key'); setHubKey(null) }}
          >
            Lock
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TILES.map((tile) => {
            const Icon = tile.icon
            return (
              <Card
                key={tile.key}
                onClick={() => setActiveTile(tile)}
                className="cursor-pointer p-5 flex flex-col items-center gap-2 text-center hover:-translate-y-0.5 transition-transform bg-white/95"
              >
                <Icon className="h-6 w-6" style={{ color: GOLD }} />
                <span className="text-sm font-medium" style={{ color: NAVY }}>{tile.label}</span>
              </Card>
            )
          })}
        </div>
      </div>

      {activeTile && (
        <TilePanel tile={activeTile} hubKey={hubKey} onClose={() => setActiveTile(null)} />
      )}
    </div>
  )
}
