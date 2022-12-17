import '../../assets/css/login.css'
const Login:React.FC = () => {
  return(
<div style={{overflow:"hidden" , overflowY:"hidden"}}>
      <div className="body-login">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    <div className=" login">
    <div className="login-box ">
        <span>ورود </span>
        <p className='mt-5'> {''}.{''}برای استفاده از خدمات هولدینگ افرا، وارد حساب کاربری خود شوید </p>

        <input/>
        <input/>
        <input/>

    </div>
    </div>
</div>
  )
}
export default Login