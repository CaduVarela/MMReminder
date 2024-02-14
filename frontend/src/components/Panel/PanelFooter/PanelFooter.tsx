import './PanelFooter.scss'

function PanelFooter({children} : {children?: React.ReactNode}) {
  return(
    <div className='panel-footer'>
      {children}
    </div>
  )
}

export default PanelFooter