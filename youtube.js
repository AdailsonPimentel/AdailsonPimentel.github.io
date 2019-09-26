/* 
 YouTube Audio Embed 
 --------------------

 Author: Amit Agarwal
 Web: http://www.labnol.org/?p=26740
 Via: https://codepen.io/onigetoc/pen/YNdYBw
*/

var player;

function onYouTubeIframeAPIReady() {

  var ctrlq = document.getElementById("youtube-audio");
  ctrlq.innerHTML = '<img id="youtube-icon" src=""/><div id="youtube-player"></div>';
  ctrlq.style.cssText = 'width:100px;margin:0 0 -7px 15px;cursor:pointer;cursor:hand;display:none';
  ctrlq.onclick = toggleAudio;

  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: ctrlq.dataset.video,
    playerVars: {
      autoplay: ctrlq.dataset.autoplay,
      loop: ctrlq.dataset.loop,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function togglePlayButton(play) {
  document.getElementById("youtube-icon").src = play ? "https://1.bp.blogspot.com/-D9431tkZ8EA/XYw_85Btl1I/AAAAAAAADoY/NnZE4O1HjR896CDr1uqdk8tY1wcw15gEACLcBGAsYHQ/s1600/pause.png" : "https://1.bp.blogspot.com/-HH5XEMjzi74/XYw_829pnHI/AAAAAAAADoU/85cmRtl1tCYRrGuJEHqgsnUC_qmOau29QCLcBGAsYHQ/s1600/play.png";
}

function toggleAudio() {
  if (player.getPlayerState() == 1 || player.getPlayerState() == 3) {
    player.pauseVideo();
    togglePlayButton(false);
  } else {
    player.playVideo();
    togglePlayButton(true);
  }
}

function onPlayerReady(event) {
  //event.target.setVolume(100);
  player.setPlaybackQuality("small"); //highres, hd1080, hd720, large, medium, small
  document.getElementById("youtube-audio").style.display = "block";
  togglePlayButton(player.getPlayerState() !== 5);
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    togglePlayButton(false);
  }
}
