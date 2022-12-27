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
    const toggle = document.querySelector('.toggle-inner')

    if (mode === 'dark'){
        body.classList.add('dark-mode')

        toggle.classList.add('toggle-active')

    } if (mode === 'light') {
        body.classList.remove('dark-mode')
        toggle.classList.add('toggle-active')

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
    const toggleTheme = () => {
        if (mode === "light") {
            setMode("dark");
            //SET THEME IN LOCALSTORAGE
            //window.localStorage.setItem("theme", "dark");
        } else {
            setFont("light");
            //SET THEME IN LOCALSTORAGE
            //window.localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className="App">


            <div
                id="toggle"
                onClick={() => mode === "light" ? setMode("dark") : setMode("light")}
            >
                <div className="toggle-inner"/>

            </div>

        </div>
    );
}



export default Setting
