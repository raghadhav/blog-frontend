const Button = (props) => {
    const login = (e) => {
        props.onClick();
        console.log("Somebody clicked me!!!");
    };
    return (
        <div id="header">
            <button type="button" id="loginBtn" text="Login" onClick={login} />
        </div>
    );
}

export default Button;