import React, { Component } from "react";
import "./AlbumContent.css";
import { Dialog } from "@material-ui/core";
//import AudioPlayer from "../AudioPlayer/AudioPlayer";
//zimport data from "../../helpers/data";
//converting the file uploaded to a base 64 format
const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

class AlbumContent extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      song_name: "",
      artist_name: "",
      song: "",
      play: false,
      queue: []
    };
  }
  //function to add the songs
  adding = () => {
    this.setState({ modalOpen: true });
  };
  //function to close
  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  //function to set the song name with a value
  getName = e => {
    this.setState({ song_name: e.target.value });
  };
  //function to get the artist name
  getArtist = e => {
    this.setState({ artist_name: e.target.value });
  };
  //add the song in the base64 format
  addSong = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({ song: base64 });
    });
  };
  //function to delete the song
  deleteSong = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.songs.splice(index, 1);
    this.setState({modalOpen:true});
    this.setState({modalOpen:false});
  };
  //function to play the song
  playSong = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ play: true });
  };

  componentDidUpdate() {
    // console.log(this.props.data);
  }
  //add the song name,artist and song to data
  addToData = () => {
    const { song_name, artist_name, song } = this.state;
    if(this.state.song_name.length !=0 && this.state.artist_name!=0){
    this.props.songs.push({
      song_name: song_name,
      artist_name: artist_name,
      song: song
    });
    this.setState({song_name:"",artist_name:""});
    this.setState({ modalOpen: false });
    }
    else{
      alert("Not valid");
    }
  };
  //adding the songs to a queue
  addToQueue = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log(index);
    if (this.props.data[this.props.albumIndex].songs[index].song) {
      this.props.queue.push(
        this.props.data[this.props.albumIndex].songs[index].song
      );
      if (this.props.data[this.props.albumIndex].songs[index].song_name) {
        this.props.queueSongName.push(
          this.props.data[this.props.albumIndex].songs[index].song_name
        );
        this.props.artistName.push(
          this.props.data[this.props.albumIndex].songs[index].artist_name
        );
        // console.log(this.props.queue);
      }

      if (this.props.queue.length > 0) {
        this.setState({ play: true });
      }
    }
  };
  //add the albums to the queue
  addAlbumToQueue = (e, index) => {
    console.log(this.props);
    for (var i = 0; i < this.props.data[index].songs.length; i++) {
      if (
        this.props.data[index].songs[i].song &&
        this.props.data[index].songs[i].song_name &&
        this.props.data[index].songs[i].artist_name
      ) {
        this.props.queue.push(this.props.data[index].songs[i].song);
        this.props.queueSongName.push(
          this.props.data[index].songs[i].song_name
        );
        this.props.artistName.push(this.props.data[index].songs[i].artist_name);
      }
    }
    if (this.props.queue.length > 0) {
      this.setState({ play: true });
    }
  };
  render() {
    return (
      <div className="content-wrapper">
        <div className="add-songs">
          <br />
          <button onClick={this.adding}>Add Songs</button>
          {this.props.queue.length > 0 && (
            <button
              onClick={e => this.addAlbumToQueue(e, this.props.albumIndex)}
            >
              {" "}
              Add All Songs to Queue{" "}
            </button>
          )}
          {/* <input type="file" multiple accept="audio/*" onChange={this.addSong} />  */}
          <Dialog
            open={this.state.modalOpen}
            onClose={this.handleClose}
            className="form-dialog"
          >
            <div className="form">
              <input
                type="text"
                id="song_name"
                className="input"
                placeholder="Song Name"
                onChange={this.getName}
              />{" "}
              <br />
              <input
                type="text"
                id="artist_name"
                className="input"
                placeholder="Artist Name"
                onChange={this.getArtist}
              />{" "}
              <br />
              <p> Upload the song</p>
              <input type="file" accept="audio/*" onChange={this.addSong} />
              <div className="button">
                <button className="add-song-button" onClick={this.addToData}>
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
          </Dialog>
        </div>
        <div className="songs-list">
          {this.props.songs &&
            this.props.songs.map((item, index) => (
              <div className="song" key={index}>
                <div className="song-name">
                  <div className="classForSong">
                    <span className="text">{item.song_name} </span>{" "}
                    <span className="artist">{item.artist_name} </span>
                  </div>
                  <button
                    className="delete_song"
                    onClick={e => this.deleteSong(index, e)}
                  >
                    {" "}
                    X{" "}
                  </button>
                  <button
                    className="queue_button"
                    onClick={e => this.addToQueue(e, index)}
                  >
                    + queue{" "}
                  </button>
                  {/* <audio controls={this.state.play}> <source src= {item.song} />> </audio> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default AlbumContent;
