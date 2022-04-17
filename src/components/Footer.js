import { useEffect } from "react"

export default function Footer({ user }) {

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <footer>
            <div className="container-footer">
                <p className="text-center">stay connected!</p>
                <ul className="socials-list">
                    <li className="socials-list-item">
                        {/* <a href="https://twitter.com/KedarBasutkar"> */}
                        <a href={`https://wwww.twitter.com/${user.twitterId.data.username}`}>
                            <i className="fa-brands fa-twitter social-icon"></i>
                        </a>
                    </li>
                    <li className="socials-list-item">
                        <a href={user.github.html_url}>
                            <i className="fa-brands fa-github social-icon"></i>
                        </a>
                    </li>
                    <li className="socials-list-item">
                        <a href="https://www.linkedin.com/in/kedar-basutkar-67b30a216/">
                            {/* <i className="fa-brands fa-linkedin-in "></i> */}
                            <i className="fa-brands fa-hashnode social-icon"></i>
                        </a>
                    </li>
                </ul>
                <div className="footer-list">
                    <p className="footer-name">
                        <a href="index.html">{user.github.login}</a>
                    </p>
                    <p className="copyright-text">© 2022 {user.github.login}. all rights reserved</p>
                </div>
                <table>
                    <tr>
                        <td className="color1"></td>
                        <td className="color2"></td>
                        <td className="color3"></td>
                        <td className="color4"></td>
                    </tr>
                </table>
            </div>
        </footer>    
    )
}