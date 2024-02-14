import './PagePanel.scss'

function PagePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className='panel-container'>
      <div className="panel">
        {children}
      </div>
    </div>
  )
}

export default PagePanel