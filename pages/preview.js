import { useUserContext } from "../src/context/user-context"
import { useEffect, useState } from "react"

const generateBody = (user) => {
    const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Siddhi Gate</title>
    
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet">
    
            <link rel="stylesheet" href="./style.css">
    
    </head>
    <body>
        
        <header class="header">
            <div class="flex-all-center">
                <img class="logo" src="${user.github.avatar_url}" alt="profile picture">
                ${user.github.login}
            </div>
        </header>
    
        <main class="main-wrapper">
            <div class="main-info">
                <div class="wrapper">
                    
                <h1>${user.github.name}</h1>
                <p>${user.github.bio}</p>
                <a href="${user.github.html_url}">Get in touch</a>
                </div>
            </div>
            <div class="main-image">
                <img src="${user.github.avatar_url}" alt="profile picture">
            </div>
        </main>
    </body>
    </html>`

    return body
}

export default function Preview() {

    const [userContent, setUserContent] = useState(null)
    const { user } = useUserContext()

    useEffect(() => {
        setUserContent(generateBody(user))        
    }, [user])

    const handleClipboard = () => {
        navigator.clipboard.writeText(userContent)
    }

    const download = (filename, textInput) => {
        let element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();
    }

    const handleDownload = () => {
        var filename = "portfolio.html";
        download(filename, userContent);
    }

    return (
        <>
            {user && (
                <div className="preview">
                    <h1>preview✨</h1>
                    <button className="btn-preview" onClick={handleClipboard} >copy to clipboard</button>
                    <button className="btn-preview" onClick={handleDownload} >download</button>
                    <textarea 
                        value={userContent}
                    />
                </div>
            )}
        </>
    )
}