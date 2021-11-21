window.onload = function () {
    const slideImages = document.querySelectorAll('.slide-in');
    const video = document.querySelector('.viewer');
    const toggle = document.querySelector('.toggle');
    const skipButtons = document.querySelectorAll('[data-skip]');
    const slides = document.querySelectorAll('.player__slider');
    const range = document.querySelector('.progress__filled');
    const progress = document.querySelector('.progress');
    const blackBearPhoto = document.querySelector('#blackBearPhoto');
    let ToggleBlackBearPhoto = true;
    let imageOrder = 1;
    let anime;
    let countDown = false;
    let mousedown = false;

    // homepage anime 
    function blackBearMove() {
        if (ToggleBlackBearPhoto) {
            anime = setInterval(() => {//pictures 1~4 and 4~1
                if (!countDown) {
                    imageOrder++;
                    if (imageOrder === 4) {
                        countDown = !countDown;
                    }
                    blackBearPhoto.src = `photo/bear${imageOrder}.png`;
                }
                else {
                    imageOrder--;
                    if (imageOrder === 1) {
                        countDown = !countDown;
                    }
                    blackBearPhoto.src = `photo/bear${imageOrder}.png`;
                }
            }, 100);
            ToggleBlackBearPhoto = !ToggleBlackBearPhoto;
        }
        else {//stop the anime
            clearInterval(anime);
            ToggleBlackBearPhoto = !ToggleBlackBearPhoto;
        }
    }
    //slide to 1/3 of pictures and the pictures slide in
    function checkSlide() {
        let windowTop = window.scrollY;//the top of win
        let windowBottom = windowTop + window.innerHeight;//the bottom of win

        slideImages.forEach((img) => {
            let imgThird = img.offsetTop + img.height / 3;//set the 1/3
            if (imgThird < windowBottom && imgThird > windowTop) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    //play the video
    function togglePlay() {
        if (video.paused) {
            video.play();
            toggle.textContent = '❚ ❚';
        } else {
            video.pause();
            toggle.textContent = '►';
        }
    }
    //Fast forward or fall back(use dataset)
    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }
    //control volume and rate
    function handleSlide() {
        video[this.name] = this.value;
    }
    //width of video bar
    function handleRange() {
        const percent = (video.currentTime / video.duration) * 100;
        range.style.flexBasis = `${percent}%`;
    }

    //Pull video bar
    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
    //scroll out images
    document.addEventListener('scroll', checkSlide);
    //blackBear Anime
    blackBearPhoto.addEventListener('click', blackBearMove);
    //video progress
    video.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', handleRange);
    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    slides.forEach(slide => slide.addEventListener('change', handleSlide));
    slides.forEach(slide => slide.addEventListener('mousemove', handleSlide));
    range.addEventListener('change', handleRange)
    range.addEventListener('mousemove', handleRange)
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
}