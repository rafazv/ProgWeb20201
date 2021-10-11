import './FakeContent.css';
import { useState } from 'react';

function FakeContent(props) {

    const randomValue = Math.random()*100;
    const [ random, setRandom ] = useState(randomValue);

    const handleClick = () => {
        setRandom(Math.random()*100);
    }

    return (
        <div className="container-fluid mt-2">
            {/* <div className="welcome">{props.welcome}</div> */}
            <div>{random}</div>
            <button onClick={handleClick} type="button" className="btn btn-primary mt-2">Click</button>
        </div>
    );
}

FakeContent.defaultProps = {welcome: "Bem vindo!"};

export default FakeContent