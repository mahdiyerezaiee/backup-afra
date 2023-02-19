import React from 'react'

const FooterClient:React.FC= () => {
    return (

        <footer className="bg_img padding-top oh" data-background="/assets/img/footer-bg.jpg" style={{backgroundImage: `url(/assets/img/footer-bg.jpg)`}}>
        <div className="footer-top-shape">
        <img className='light-mode-footer' src="/assets/img/footer-top-shape.png" alt="css"/>
        <img className='dark-mode-footer' src="/assets/img/footer-top-shape-dark-mode.png" alt="css"/>
        </div>
        
        
        
        <div className="footer-bottom" style={{
    marginTop: "278px"
}}>
            <div className="container">
                <div className="copyright-area">
                    <div className="footer-bottom-wrapper">
                        {/* <div className="logo">
                            <a href="index.html"><img src="/assets/img/afralogo.png" alt="logo"/></a>
                        </div> */}
                        
                        <div className="copyright ">  <span > تهیه شده توسط :   گروه توسعه هولدینگ افرا </span></div>
</div>
                    </div>
                </div>
            </div>
        
    </footer>
    // <footer>
    //     <div className="footer-wrapper" style={{background:'lightblue'}}>
    //         <div className="footer-section f-section-1">
    //             <p className=""> © کپی رایت</p>
    //         </div>
    //         <div className="footer-section f-section-2">
    //             <span className="copyright"> تهیه شده توسط :   گروه توسعه هولدینگ افرا </span></div>
    //     </div>
    //     </footer>
    )
}
export default FooterClient;
