import React, { Component } from "react";
import "./AudioPlayer.css";
//audio player to play the songs in the player
class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.song = "";
    this.name = "";
    this.artist = "";
  }

  componentDidMount() {
    var audio = document.getElementById("player");
    console.log(audio);
    audio.pause();
    audio.currentTime = 0;
    audio.src = this.props.songInPlayer;
  }

  componentDidUpdate() {
    var audio = document.getElementById("player");
    audio.pause();
    audio.currentTime = 0;
    audio.src = this.props.songInPlayer;
    // document.getElementById("player").load();
  }

  componentWillReceiveProps() {}

  render() {
    return (
      <div className="audio-wrapper">
        <p>{this.props.songName}</p>
        <audio
          id="player"
          controls
          autoPlay
          preload="auto"
          key={this.props.songInPlayer}
        >
          {/* <source id="source" /> */}
        </audio>
      </div>
    );
  }
}

export default AudioPlayer;
