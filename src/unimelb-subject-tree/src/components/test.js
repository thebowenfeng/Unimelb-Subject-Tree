function Test(props) {
    return (
        <div>
            <h2>{props.text}</h2>
            <button onClick={props.custFunc}>{props.btnText}</button>
        </div>
    );
}

export default Test;