import * as React from 'react';
import { connect } from 'react-redux';


class ConnectedStorySlide extends React.Component {
    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        // TODO
        // const experimentId = e.target.
    }

	render() {
        return <form onSubmit={(e) => console.log("hate it here")}>
            <input type="text" id="experiment-id" name="experiment-id" />
            <input type="text" id="first-player-id" name="first-player-id" />
            <input type="text" id="second-player-id" name="second-player-id" />
            <input type="submit" />
        </form>;
    }
}

// Creates a new experiment and returns experiment info
// app.post('/experiment', (req, res, next) => {
//     const experimentId = uuid.v4()
//     const experimentData = {
//         id: experimentId,
//         firstPlayerId: experimentId + "-0",
//         secondPlayerId: experimentId + "-1",
//         loggingData: [],
//         images: []
//     }

//     fs.writeFile("../../data/" + experimentId + '.json', JSON.stringify(experimentData), (err) => {
//         // In case of a error throw err.
//         if (err) res.status(400).send("unable to save to file");
//     })
//     res.status(200).send(experimentData);
// });