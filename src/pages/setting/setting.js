import {useEffect, useState} from "react";

const Setting = () => {
    const [font, setFont] = useState(getDefaultFont());
    const [mode, setMode] = useState(getDefaultMode());

    function getDefaultMode() {
        const savedMode = localStorage.getItem('mode');
        return savedMode ? savedMode : 'light';
    } function getDefaultFont() {
        const savedFont = localStorage.getItem('font');
        return savedFont ? savedFont : 'small';
    }
useEffect(()=>{
    const body = document.body
    if (mode === 'dark'){
        body.classList.add('dark-mode')


    } if (mode === 'light') {
        body.classList.remove('dark-mode')

    }
    localStorage.setItem('mode', mode); // mode saved to local storage

},[mode])

    useEffect(()=>{
    const body = document.body
    if (font === 'small'){
        body.classList.remove('medium')
        body.classList.remove('large')
        body.classList.add('small')
    }if (font === 'medium'){
            body.classList.remove('small')
            body.classList.remove('large')

            body.classList.add('medium')
    }if (font === 'large'){
            body.classList.remove('medium')
            body.classList.remove('small')
        body.classList.add('large')
    }
    localStorage.setItem('font', font); // mode saved to local storage

},[font])


    return (
        <div className="App">

            <span>تغییر تم</span>

          <div>
              <div className='theme bg-light border border-dark' onClick={()=>setMode('light')}></div>
              <div className='theme bg-dark border border-light' onClick={()=>setMode('dark')}></div>
              </div>
                       <span>تغییر فونت سایز</span>

          <div>
              {font === 'small' ? <div className='border-bottom border-danger d-inline border-width-4px '>
              <div className='theme      ' onClick={()=>setFont('small')}>
               <div className="m-auto text-center siz   h6">  A </div></div>
              </div>:<div className="d-inline"><div className='theme      ' onClick={()=>setFont('small')}>
                  <div className="m-auto text-center siz   h6">  A </div></div></div> }
              {font === 'medium' ? <div className='border-bottom border-danger d-inline border-width-4px '>

              <div className='theme     text-center ' onClick={()=>setFont('medium')}>
                  <div className="m-auto text-center siz   h4">  A </div></div>
              </div>:<div className="d-inline"><div className='theme     text-center ' onClick={()=>setFont('medium')}>
                  <div className="m-auto text-center siz   h4">  A </div></div></div> }
              {font === 'large' ? <div className='border-bottom border-danger d-inline border-width-4px'>
                  <div className='theme     text-center h2' onClick={()=>setFont('large')}>
                  <div className="m-auto text-center siz   h2">  A </div></div>
              </div>:<div className="d-inline"> <div className='theme     text-center h2' onClick={()=>setFont('large')}>
                  <div className="m-auto text-center siz   h2">  A </div></div></div> }


        </div>
        </div>
    );
}



export default Setting
