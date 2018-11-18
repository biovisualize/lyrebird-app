import React from "react";
import PropTypes from "prop-types";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.play(this.props.source.url);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.source &&
      prevProps.source.timestamp !== this.props.source.timestamp
    ) {
      this.play(this.props.source.url);
    }
  }

  renderVis(sound) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaElementSource(sound);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    const width = 1000;
    const height = 200;
    const canvas = this.canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      const values = dataArray.slice(0, 450).filter((d, i) => i % 5 === 0);
      const barWidth = Math.ceil(width / values.length);
      const max = Math.max.apply(null, values);

      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "black";
      values.forEach((value, i) => {
        const barHeight = (value * height) / max;
        const x = i * barWidth;
        const y = height - barHeight;
        ctx.rect(x, y, barWidth - 2, height);
      });
      ctx.fill();
    };

    var renderloop = () => {
      if (!source.mediaElement.ended) {
        render();
        requestAnimationFrame(renderloop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    renderloop();
  }

  play(url) {
    var sound = new Audio();
    sound.crossOrigin = "Anonymous";
    sound.src = url;
    sound.play();
    this.renderVis(sound);
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

Player.propTypes = {
  source: PropTypes.object
};

export default Player;
