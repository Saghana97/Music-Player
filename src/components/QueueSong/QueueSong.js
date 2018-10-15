import React, { Component } from "react";
import "./QueueSong.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
//queuesong sets the song details to be played in the queue
class QueueSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      playingSong: "",
      playingSongName: "",
      isFirstPlaying: true
    };
  }
  renderPlayer = (e, args) => {
    this.setState({ render: true });
    this.setState({
      playingSong: this.props.allSongs[args],
      playingSongName: this.props.allSongsName[args]
    });
  };

  render() {
    console.log("queue song getting called");
    return (
      <div
        className="queue-song-wrapper"
        onClick={e => this.renderPlayer(e, this.props.id)}
      >
        <div className="song_name">
          <div className="song_title">{this.props.name}</div>
          <div className="song_artist">{this.props.artist_name}</div>
        </div>
        {/* {this.state.render && (
            <AudioPlayer
              songInPlayer={this.state.playingSong}
              songName={this.state.playingSongName}
            />
        )} */}
      </div>
    );
  }
}

export default QueueSong;
