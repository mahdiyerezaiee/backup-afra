import { Link } from "react-router-dom"

const HeaderClientMian:React.FC = () => {
return(
    <nav className="navbar navbar-mian navbar-expand-lg  ">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">صفحه اصلی <span className="sr-only">(current)</span></Link>
        </li>
        </ul>
      <span className="navbar-text">
      </span>
    </div>
  </nav>
)
}
export default HeaderClientMian