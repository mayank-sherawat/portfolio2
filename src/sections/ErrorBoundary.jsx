import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { err: null }
  static getDerivedStateFromError(err) { return { err } }
  componentDidCatch(err, info) { console.error('[portfolio]', err, info) }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: '4rem 2rem', color: '#f5f5f5', fontFamily: 'IBM Plex Mono, monospace' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>something broke</h2>
          <pre style={{ color: '#ff7a7a', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
            {String(this.state.err && (this.state.err.stack || this.state.err.message || this.state.err))}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
