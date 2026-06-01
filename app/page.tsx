'use client'

import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

// ── Mock data (replace with real API calls) ──
const revenueData = [
  { month: 'Jan', mrr: 897, leads: 24 },
  { month: 'Feb', mrr: 1794, leads: 41 },
  { month: 'Mar', mrr: 3588, leads: 78 },
  { month: 'Apr', mrr: 5979, leads: 112 },
  { month: 'May', mrr: 9867, leads: 189 },
  { month: 'Jun', mrr: 14925, leads: 267 },
]

const leadTierData = [
  { name: 'Hot 🔥', value: 23, color: '#ef4444' },
  { name: 'Warm ⚡', value: 41, color: '#f59e0b' },
  { name: 'Cold ❄️', value: 36, color: '#0ea5e9' },
]

const pipelineStages = [
  { stage: 'New Lead', count: 47, color: '#6366f1' },
  { stage: 'Enriched', count: 43, color: '#8b5cf6' },
  { stage: 'Qualified', count: 38, color: '#a78bfa' },
  { stage: 'Outreach Sent', count: 31, color: '#0ea5e9' },
  { stage: 'In Convo', count: 18, color: '#22c55e' },
  { stage: 'Booked', count: 11, color: '#f59e0b' },
  { stage: 'Quote Sent', count: 8, color: '#f97316' },
  { stage: 'Paid', count: 5, color: '#ef4444' },
]

const agents = [
  { name: 'Prospector', status: 'active', processed: 1247, success_rate: 98.2 },
  { name: 'Qualifier', status: 'active', processed: 1241, success_rate: 99.1 },
  { name: 'Outreach', status: 'active', processed: 892, success_rate: 94.7 },
  { name: 'Conversation', status: 'idle', processed: 421, success_rate: 87.3 },
  { name: 'Scheduler', status: 'active', processed: 203, success_rate: 96.5 },
  { name: 'Revenue', status: 'active', processed: 156, success_rate: 99.4 },
  { name: 'Analytics', status: 'active', processed: 1247, success_rate: 100.0 },
]

const recentLeads = [
  { name: 'John Martinez', address: 'Dallas TX', tier: 'hot', score: 91, stage: 'Outreach Sent', time: '2m ago' },
  { name: 'Sarah Johnson', address: 'Fort Worth TX', tier: 'warm', score: 74, stage: 'Qualified', time: '8m ago' },
  { name: 'Mike Williams', address: 'Plano TX', tier: 'hot', score: 88, stage: 'Booked', time: '15m ago' },
  { name: 'Lisa Chen', address: 'Arlington TX', tier: 'warm', score: 67, stage: 'In Conversation', time: '22m ago' },
  { name: 'Robert Davis', address: 'Irving TX', tier: 'cold', score: 42, stage: 'Nurture Queue', time: '31m ago' },
]

// ── Component helpers ──
function StatusDot({ status }: { status: string }) {
  const color = status === 'active' ? '#22c55e' : status === 'idle' ? '#f59e0b' : '#ef4444'
  return <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }} />
}

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    hot: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warm: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    cold: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  }
  const labels: Record<string, string> = { hot: '🔥 HOT', warm: '⚡ WARM', cold: '❄️ COLD' }
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold ${styles[tier] || ''}`}>
      {labels[tier] || tier.toUpperCase()}
    </span>
  )
}

function MetricCard({ label, value, sub, color = '#0ea5e9' }: {
  label: string; value: string; sub: string; color?: string
}) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-slate-500 text-xs mt-1">{sub}</p>
    </div>
  )
}

// ── Main Dashboard ──
export default function ATLASDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>

      {/* Header */}
      <header className="border-b border-slate-700/50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)' }}>
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">ATLAS</h1>
              <p className="text-slate-400 text-xs">Garcar Enterprise · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="active" />
            <span className="text-green-400 text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Monthly Recurring Revenue" value="$9,867" sub="+64% vs last month" color="#22c55e" />
          <MetricCard label="Active Leads" value="47" sub="23 hot, 41 warm, 36 cold" color="#0ea5e9" />
          <MetricCard label="Avg Lead Score" value="71.4" sub="Up from 68.2 last week" color="#a78bfa" />
          <MetricCard label="Conversion Rate" value="10.6%" sub="Lead → Paid client" color="#f59e0b" />
        </div>

        {/* Revenue Chart */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">💰 Revenue Growth (MRR)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'MRR']}
              />
              <Area type="monotone" dataKey="mrr" stroke="#6366f1" fill="url(#mrrGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Middle Row: Pipeline + Tier Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Pipeline Funnel */}
          <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">🎯 Lead Pipeline</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pipelineStages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="stage" type="category" width={100}
                  stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {pipelineStages.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Tier Donut */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">🌡️ Lead Temperature</h2>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={leadTierData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  dataKey="value" paddingAngle={3}>
                  {leadTierData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  formatter={(v: number) => [`${v}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {leadTierData.map((d) => (
                <div key={d.name} className="flex justify-between text-sm">
                  <span style={{ color: d.color }}>{d.name}</span>
                  <span className="text-slate-300 font-medium">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">🤖 Agent Status</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {agents.map((agent) => (
              <div key={agent.name} className="bg-slate-900/60 border border-slate-700/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{agent.name}</span>
                  <StatusDot status={agent.status} />
                </div>
                <p className="text-slate-400 text-xs">{agent.processed.toLocaleString()} processed</p>
                <p className="text-xs font-medium mt-1" style={{ color: agent.success_rate > 95 ? '#22c55e' : '#f59e0b' }}>
                  {agent.success_rate}% success
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">📌 Recent Leads</h2>
            <span className="text-slate-400 text-sm">Live feed</span>
          </div>
          <div className="space-y-3">
            {recentLeads.map((lead, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                    flex items-center justify-center text-white text-xs font-bold">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{lead.name}</p>
                    <p className="text-slate-400 text-xs">{lead.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TierBadge tier={lead.tier} />
                  <div className="text-right">
                    <p className="text-slate-300 text-xs">{lead.stage}</p>
                    <p className="text-slate-500 text-xs">{lead.time}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `conic-gradient(${lead.score > 80 ? '#22c55e' : lead.score > 60 ? '#f59e0b' : '#0ea5e9'} ${lead.score * 3.6}deg, #334155 0deg)`,
                      boxShadow: '0 0 0 2px #1e293b'
                    }}>
                    <span className="bg-slate-900 w-7 h-7 rounded-full flex items-center justify-center text-white">
                      {lead.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-slate-600 text-xs">ATLAS v1.0 · Garcar Enterprise · Alvarado, Texas · Built with AI</p>
        </div>

      </main>
    </div>
  )
}
