import React, {Component} from 'react';
import previous from './assets/svg/previous.svg';
import playbutton from './assets/svg/playbutton.svg';
import pause from './assets/svg/pause.svg';
import next from './assets/svg/next.svg';

class Player extends Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.progress = React.createRef();

    }

    truncateString(str, length) {
        return str.length > length ? str.substring(0, length - 3) + '...' : str
    }

    handlePlay() {
        if (this.props.is_playing) {
            this.props.set_play();
            this.audio.pause();
        } else {
            this.props.set_play();
            this.audio.play();
        }
    }
    // test

    componentDidMount() {

        const nx = () => {
            this.props.next_play()
        };
        const myAudio = this.audio;
        this.audio.addEventListener('timeupdate', function () {
            document.getElementById('play-bar').style.width = parseInt(((myAudio.currentTime / myAudio.duration) * 100), 10) + "%";
        });

        this.audio.addEventListener('ended', function () {
            myAudio.currentTime = 0;
            nx();
        })
    };

    updateCurrent(e) {
        let clickPosition = (e.pageX - this.progress.current.offsetLeft) / this.progress.current.offsetWidth;
        // move the playhead to the correct position
        this.audio.currentTime = clickPosition * 180;
    }

    clean(str) {
        let cleaned = str.replace(/vevo/gi, '');
        return cleaned.replace(/official/gi, '');
    }

    render() {
        let list;
        let song_list;
        const {song} = this.props;
        if (this.props.play_location === 'detail') {
            list = <div className={'player'}>
                <div className={'player-container'}>
                    <div className={'row'}>
                        <div className={'col-md-2 col-sm-4'}>
                            <img src={song.snippet.thumbnails.high.url} alt={'artwork'} className={'track-artwork'}/>
                            <p className={'track-name'}>{this.clean(this.truncateString(song.snippet.title, 17))}</p>
                            <p className={'track-artist'}>{this.clean(this.truncateString(song.snippet.channelTitle, 20))}</p>
                        </div>
                        <div className={'col-md-2 col-sm-2 control-container'}>
                            <p className={'player-controls'}><img src={previous} alt={'previous'} onClick={() => this.props.previous_song()}/>
                                <img className={'middle-control'} src={this.props.is_playing ? pause : playbutton} onClick={() => this.handlePlay()}
                                     alt={'pause'}/> <img
                                    src={next} onClick={() => this.props.next_play()} alt={'next'}/></p>
                        </div>
                        <div className={'col-md-5 col-sm-5 control-container'}>
                            <div className="progress" id="base-progress" onClick={e => this.updateCurrent(e)} ref={this.progress}>
                                <div className="progress-bar" id="play-bar" role="progressbar"
                                     aria-valuenow="75" aria-valuemin="0"
                                     aria-valuemax="100"/>
                            </div>
                        </div>
                        <div className={'col-md-2'}>

                        </div>
                    </div>
                </div>
            </div>;
            song_list = song.audio_file;
        }
        return (
            <div>
                <audio id="player" className={song.time} ref={(audio) => {
                    this.audio = audio
                }} src={song_list} autoPlay/>
                {Object.keys(this.props.song).length !== 0 ? list : ''}
            </div>
        )
    }
}

export default Player