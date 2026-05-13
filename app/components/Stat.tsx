import React from 'react'

const Stat = ({ label, value }: { label: string; value: string | number }) => {
  return (
     <div className="flex flex-col gap-1">
    <span className="font-body text-xs uppercase tracking-widest text-text-muted">
      {label}
    </span>
    <span className="font-mono text-lg text-cyan">
      {value}
    </span>
  </div>
  )
}

export default Stat