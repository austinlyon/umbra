const React = require('react');

const ConnectionInfo = React.createClass({

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="connection-wrap">
        <div id="connection">Connect: {imperio.nonce}</div>
      </div>
    );
  },
});

module.exports = ConnectionInfo;
