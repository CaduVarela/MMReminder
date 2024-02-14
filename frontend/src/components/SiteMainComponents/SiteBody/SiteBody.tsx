import './SiteBody.scss'

function Body ({children}: {children: React.ReactNode}) {
  return(
    <div className="site-body">
      {children}
    </div>
  )
}

export default Body