import React, { Component } from "react";
import "./Album.css";
import data from "../../helpers/data";
import AlbumDetail from "../AlbumDetail/AlbumDetail";
import { Dialog } from "@material-ui/core";
import QueueSong from "../QueueSong/QueueSong";
import AlbumContent from "../AlbumContent/AlbumContent";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
//storing the file in a base 64 format
const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

//component album for the player
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      album_text: "",
      album_image: "",
      queue: [],
      queue_name: [],
      artist_name: [],
      data: data,
      callComponent: false,
      modalOpen: false,
      currentAlbumIndex: null,
      currentSongList: [],
      playSongIndex: null,
      render: false,
      currentSong: "",
      loop: false,
      cover_image: [],
      editStatus: false,
      editIndex: "",
      previousAlbumName: "",
      previousAlbumImage: ""
    };
  }
  //getting the details of the album
  getDetail = (e, index, songs) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      modalOpen: true,
      currentAlbumIndex: index,
      currentSongList: songs
    });
  };

  handleSecondClose = () => {
    this.setState({ modalOpen: false });
  };
  //setting state for the album
  addAlbum = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  //getting the name of the album
  getName = e => {
    this.setState({ album_text: e.target.value });
  };
  //function to add the data to the album content
  addToData = () => {
    if (this.state.album_text.length != 0 && this.state.album_image) {
      data.push({
        album_name: this.state.album_text,
        album_image: this.state.album_image,
        songs: []
      });
      this.setState({ album_text: "", album_image: "" });
      this.setState({ open: false });
    } else {
      alert("cannot add");
    }
  };

  //get the file and store it in a base 64 format
  getFile = e => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({ album_image: base64 });
    });
  };

  addEditData = e => {
    console.log("all data",this.state.data)
    console.log(
      "state before edit",
      data[this.state.editIndex].album_image,
      data[this.state.editIndex].album_name
    );

    this.setState({
      previousAlbumName: data[this.state.editIndex].album_name,
      previousAlbumImage: data[this.state.editIndex].album_image
    });

    if (this.state.album_text) {
      data[this.state.editIndex].album_name = this.state.album_text;
    }
    if (this.state.album_image) {
      data[this.state.editIndex].album_image = this.state.album_image;
    }
    this.setState({
      album_text: "",
      album_image: ""
    });
    var temp = this.state.cover_image;

    for (var i = 0; i < temp.length; i++) {
      if (this.state.previousAlbumImage === temp[i]) {
        temp[i] = this.state.album_image;
      }
    }
    this.setState({ cover_image: temp });
    this.setState({ editStatus: false });

    console.log("aftr  --all data",this.state.data)
  };

  componentWillReceiveProps() {
    console.log(" will receieve");
  }

  componentWillUpdate() {
    console.log("update");
  }

  componentDidUpdate() {
    console.log("did");
  }

  componentWillMount() {
    console.log("data");
  }
  //function to delete the album
  deleteAlbum = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    this.state.data.splice(index, 1);
    this.setState({
      data: this.state.data
    });
  };

  //function
  editAlbum = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(index, "index");
    this.setState({ editIndex: index });
    this.setState({ editStatus: true });
    //this.setState({ editIndex: index });
  };

  handleEditClose = () => {
    this.setState({ editStatus: false });
  };

  clearQueue = () => {
    this.setState({
      playSongIndex: "",
      currentSong: "",
      queue: [],
      queue_name: [],
      artist_name: []
    });
  };

  songClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(index, "index");
    this.setState({ playSongIndex: index });
    this.setState({ currentSong: this.state.queue[index] });
  };

  playNext = e => {
    e.stopPropagation();
    e.preventDefault();
    let nextId = this.state.playSongIndex + 1;
    if (nextId < this.state.queue.length) {
      this.setState({ playSongIndex: nextId });
      this.setState({ currentSong: this.state.queue[nextId] });
    }
  };

  playPrevious = e => {
    e.stopPropagation();
    e.preventDefault();
    let previousId = this.state.playSongIndex - 1;
    if (previousId >= 0) {
      this.setState({ playSongIndex: previousId });
      this.setState({ currentSong: this.state.queue[previousId] });
    }
  };

  loopSong = e => {
    this.setState({ loop: !this.state.loop });
  };
  //add all the songs to the queue
  addAllToQueue = () => {
    const { data, queue, queue_name, artist_name, cover_image } = this.state;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].songs.length; j++) {
        if (data[i].songs[j].song) {
          queue.push(data[i].songs[j].song);
          queue_name.push(data[i].songs[j].song_name);
          artist_name.push(data[i].songs[j].artist_name);
          cover_image.push(data[i].album_image);
        }
      }
    }
    this.setState({ open: true });
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="album-wrapper Maindiv">
        <div className="Contentdiv">
          <div className="heading">
            <p> Your Albums </p>
          </div>
          <div className="add-album">
            <button className="add" onClick={this.addAlbum}>
              {" "}
              Add new album{" "}
            </button>
            <button className="add" onClick={this.addAllToQueue}>
              Add all to queue
            </button>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            className="form-dialog"
          >
            <div className="form">
              <input
                type="text"
                id="album_name"
                className="input"
                placeholder="Album Name"
                onChange={this.getName}
              />{" "}
              <br />
              <p> Upload a cover image</p>
              <input
                type="file"
                name="pic"
                accept="image/*"
                className="input-file"
                onChange={this.getFile}
                id="picture"
              />
              <div className="button">
                <button className="add-album-button" onClick={this.addToData}>
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
          </Dialog>
          <Dialog
            open={this.state.editStatus}
            onClose={this.handleEditClose}
            className="form-dialog"
          >
            <div className="form">
              <input
                type="text"
                id="album_name"
                className="input"
                placeholder="Album Name"
                onChange={this.getName}
              />{" "}
              <br />
              <p> Upload a cover image</p>
              <input
                type="file"
                name="pic"
                accept="image/*"
                className="input-file"
                onChange={this.getFile}
                id="picture"
              />
              <div className="button">
                <button
                  className="add-album-button"
                  onClick={e => this.addEditData(e)}
                >
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
          </Dialog>

          <div className="album-container">
            {this.state.data &&
              this.state.data.length > 0 &&
              this.state.data.map((datum, index) => (
                <div key={index}>
                  <div
                    className="album-detail-wrapper"
                    onClick={e => this.getDetail(e, index, datum.songs)}
                  >
                    <div
                      className="album-image"
                      style={{
                        backgroundImage: "url(" + datum.album_image + ")"
                      }}
                    />
                    <div className="album-name"> {datum.album_name} </div>
                    <div />
                    <button onClick={e => this.deleteAlbum(e, index)}>
                      {" "}
                      Delete{" "}
                    </button>
                    <button onClick={e => this.editAlbum(e, index)}>
                      {" "}
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            <Dialog
              open={this.state.modalOpen}
              onClose={this.handleSecondClose}
            >
              <div className="content">
                <AlbumContent
                  albumIndex={this.state.currentAlbumIndex}
                  songs={this.state.currentSongList}
                  data={this.state.data}
                  queue={this.state.queue}
                  contentModal={this.state.modalOpen}
                  queueSongName={this.state.queue_name}
                  artistName={this.state.artist_name}
                  coverImage={this.state.cover_image}
                />
              </div>
            </Dialog>
          </div>
        </div>
        <div className="Queuediv">
          <p className="playListSongs"> Your Playlist </p>
          <button onClick={this.clearQueue}> Clear Queue </button>
          {this.state.data &&
            this.state.queue_name &&
            this.state.queue_name.map((song, index) => (
              <div
                className="song-list"
                onClick={e => this.songClick(e, index)}
              >
                <QueueSong
                  name={song}
                  id={index}
                  artist_name={this.state.artist_name[index]}
                  playSong={this.state.queue[index]}
                  allSongs={this.state.queue}
                  allSongsName={this.state.queue_name}
                />
              </div>
            ))}
        </div>
        <div className="audio-wrapper">
          <img
            src={this.state.cover_image[this.state.playSongIndex]}
            alt=""
            className="cover-image"
          />
          <p>{this.state.queue_name[this.state.playSongIndex]}</p>
          <i
            className={
              this.state.loop ? "fas fa-retweet active" : "fas fa-retweet"
            }
            onClick={e => this.loopSong(e)}
          />
          <i className="fas fa-backward" onClick={e => this.playPrevious(e)} />
          <audio
            id="player"
            controls
            autoPlay
            preload="auto"
            key={this.state.currentSong}
            src={
              this.state.currentSong ? this.state.currentSong : this.state.queue
            }
            loop={this.state.loop}
          >
            <source id="source" />
          </audio>
          <i class="fas fa-forward" onClick={e => this.playNext(e)} />
        </div>
      </div>
    );
  }
}

export default Album;
