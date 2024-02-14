import './PanelBody.scss'

function PanelBody ({children}: {children: React.ReactNode}) {
  return(
    <div className='panel-body'>
      {children}
    </div>
  )
}

export default PanelBody