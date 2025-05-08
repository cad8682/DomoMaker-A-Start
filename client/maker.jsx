const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;

    if (!name || !age) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, onDomoAdded);
    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            name="domoForm"
            onSubmit={(e) => handleDomo(e, OptimizationStages.triggerReload)}
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            console.log("Data.domos: " + data.domos);
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    //From Project 2
    const encostumeDomo = async (id) => {
        try {
            const response = await fetch(`/api/encostumeDomo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Failed to encostume your Domo');
                return;
            }

            const updatedDomo = await response.json();

            setDomos((prevDomos) =>
                prevDomos.map((domo) =>
                    domo._id === updatedDomo._id ? updatedDomo : domo
                )
            );
        } catch (err) {
            console.error('Error encostuming your Domo:', err);
        }
    };

    if(domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        )
    }

    const domoNodes = domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src={`/assets/img/${domo.outfit}.jpg`} alt={`${domo.outfit} face`} className='domoFace' />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoCostume">Costume Available: {domo.availableCostume}</h3>
                {/*Project 2 helped with the button*/}
                {domo.availableCostume && (
                    <button onClick={() => encostumeDomo(domo._id)}>Encostume Domo!</button>
                )}
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;