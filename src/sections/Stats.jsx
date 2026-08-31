import Counter from '../components/ui/Stats.jsx'

const STATS = [
  { v: 1.5,  d: 1, suf: '+', label: 'years shipping',   sub: 'production code' },
  { v: 3,    d: 0, suf: '',  label: 'live projects',    sub: 'shipped to real users' },
  { v: 5,    d: 0, suf: '',  label: 'certifications',   sub: 'IBM · Google · HKUST' },
  { v: 8.76, d: 2, suf: '',  label: 'CGPA',             sub: 'B.E. Computer Science' }
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-value display">
                <Counter value={s.v} decimals={s.d} suffix={s.suf} />
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
