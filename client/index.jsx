const React = require('react');
const ReactDOM = require('react-dom');
const Umbra = require('./components/umbra.jsx');
const ConnectionInfo = require('./components/connectionInfo.jsx');

const App = React.createClass({
  getInitialState() {
    return {
      zero: {
        alpha: 0,
        beta: 0,
        gamma: 0,
      },
      textShadows: '',
    };
  },

  componentDidMount() {
    imperio.desktopRoomSetup(imperio.socket, imperio.room, this.updateConnInfo);
    imperio.desktopRoomUpdate(imperio.socket, this.updateConnInfo);
    imperio.desktopGyroHandler(imperio.socket, this.updateUmbra);
    imperio.desktopTapHandler(imperio.socket, this.setZeros);
  },

  /* ------------------------------------ */
  /* ----       Event Handlers       ---- */
  /* ------------------------------------ */

  updateConnInfo(roomData) {
    // console.log('Room Updated!', roomData);
  },

  setZeros(gyroData) {
    console.log('We got the tap data!', gyroData);
    this.setState({ zero: gyroData });
  },

  updateUmbra(gyroObj) {
    // actual alpha and beta will be between 0 and 180/-180
    const actual = this.orientRawGyroData(gyroObj);
    const offsetInterval = 8;
    const offsetX = -actual.alpha * offsetInterval / 90;
    const offsetY = -actual.beta * offsetInterval / 90;
    const offsetDist = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
    const blur = 50;

    let textShadows = '';
    const numShadows = 25;
    for (let i = 1; i < numShadows; i++) {
      textShadows += `${offsetX * i}px `;
      textShadows += `${offsetY * i}px `;
      textShadows += `${blur * i / numShadows * Math.abs(offsetDist) / 10}px `;
      // textShadows += `rgba(20, 20, 20, ${1 - (0.8 - (0.8 / i))})`;
      textShadows += 'rgba(40, 40, 40, 1)';
      if (i < numShadows - 1) textShadows += ', ';
    }

    this.setState({ textShadows });
  },

  orientRawGyroData(gyroObj) {
    // store orientation in global object to help capture zero orientation
    const orient = {};
    orient.alpha = gyroObj.alpha;
    orient.beta = gyroObj.beta;
    orient.gamma = gyroObj.gamma;

    // alpha raw is 0->360; This will set it to -180->180
    if (orient.alpha > 180) orient.alpha = orient.alpha - 360;

    // correct raw angles by offsetting by zero orientation
    const actual = {};
    actual.alpha = orient.alpha - this.state.zero.alpha;
    actual.beta = orient.beta - this.state.zero.beta;
    actual.gamma = orient.gamma - this.state.zero.gamma;

    return actual;
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div>
        <Umbra textShadows={this.state.textShadows} />
        <ConnectionInfo />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
