import './PanelHeader.scss'

function PanelHeader ({children}: {children: React.ReactNode}) {
  return(
    <div className='panel-header'>
      {children}
    </div>
  )
}

export default PanelHeader