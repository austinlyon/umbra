const React = require('react');

const Umbra = React.createClass({
  propTypes: {
    textShadows: React.PropTypes.string.isRequired,
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    const textShadowStyle = { textShadow: this.props.textShadows };
    return (
      <div id="caster-wrap">
        <div className="caster" style={textShadowStyle}>Imperio!</div>
      </div>
    );
  },
});

module.exports = Umbra;
