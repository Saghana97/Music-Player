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
      queue: [],
      editSong: false,
      editIndex: "",
      prevSongName: "",
      prevArtistName: "",
      prevSong: ""
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

  //function to close edit modal
  editClose = () => {
    this.setState({ editSong: false });
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
    this.setState({ modalOpen: true });
    this.setState({ modalOpen: false });
  };

  //function to edit song
  editSong = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ editIndex: index });
    this.setState({ editSong: true });
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
    this.props.songs.push({
      song_name: song_name,
      artist_name: artist_name,
      song: song
    });
    this.setState({ song_name: "", artist_name: "", song: "" });
    this.setState({ modalOpen: false });
  };

  //saving the edited data
  editComplete = e => {
    const { song_name, artist_name, song, editIndex } = this.state;
    console.log(
      this.props.queue,
      this.props.queueSongName,
      this.props.artistName,
      "queue emptyy?"
    );

    let prevSongName = this.props.songs[editIndex].song_name;
    let prevSong = this.props.songs[editIndex].song;
    let prevArtistName = this.props.songs[editIndex].artist_name;

    // this.setState({
    //   prevSongName: this.props.songs[editIndex].song_name,
    //   prevSong: this.props.songs[editIndex].song,
    //   prevArtistName: this.props.songs[editIndex].artist_name
    // });

    if (song_name) this.props.songs[editIndex].song_name = song_name;
    if (artist_name) this.props.songs[editIndex].artist_name = artist_name;
    if (this.song) this.props.songs[editIndex].song = song;

    // var temp = this.props.queue;

    console.log(prevSong, prevSongName, prevArtistName, "##########");

    for (var i = 0; i < this.props.queue.length; i++) {
      console.log("inside");
      if (this.props.queueSongName[i] === prevSongName) {
        console.log("same same");
        this.props.queue.splice(editIndex, 1);
        this.props.queueSongName.splice(editIndex, 1);
        this.props.artistName.splice(editIndex, 1);
        this.props.queue.splice(i, 0, this.props.songs[editIndex].song);
        this.props.queueSongName.splice(
          i,
          0,
          this.props.songs[editIndex].song_name
        );
        this.props.artistName.splice(
          i,
          0,
          this.props.songs[editIndex].artist_name
        );
        // this.props.queue.join();
        // this.props.queueSongName.join();
        // this.props.artistName.join();
      }
      this.props.queue.length--;
      this.props.queueSongName.length--;
      this.props.artistName.length--;
    }

    this.setState({ editSong: false });
    this.setState({ modalOpen: true });
    this.setState({ modalOpen: false });
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
      this.props.coverImage.push(
        this.props.data[this.props.albumIndex].album_image
      );

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
        this.props.coverImage.push(this.props.data[index].album_image);
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
          <Dialog
            open={this.state.editSong}
            onClose={this.editClose}
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
                <button className="add-song-button" onClick={this.editComplete}>
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
                  <button
                    className="delete_song"
                    onClick={e => this.editSong(e, index)}
                  >
                    {" "}
                    Edit
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
