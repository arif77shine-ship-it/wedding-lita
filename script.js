/* =====================================================
   ELEMENT
===================================================== */

const cover = document.getElementById("cover");

const mainContent = document.getElementById("mainContent");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("music");

const backgroundVideo =
    document.getElementById("backgroundVideo");

const musicButton =
    document.getElementById("musicButton");


/* =====================================================
   OPEN INVITATION
===================================================== */

openInvitation.addEventListener("click", function () {

    /*
        Hilangkan cover
    */

    cover.classList.add("hide");

    /*
        Tampilkan website
    */

    mainContent.classList.remove("hidden");


    /*
        Jalankan musik
    */

    music.volume = 0.6;

    music.play()
        .then(() => {

            musicButton.innerHTML = "♫";

        })
        .catch(() => {

            console.log(
                "Browser memblokir autoplay audio."
            );

        });


    /*
        Jalankan video
    */

    backgroundVideo.play()
        .catch(() => {

            console.log(
                "Video autoplay diblokir browser."
            );

        });


    /*
        Scroll ke atas
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.innerHTML = "♫";

    } else {

        music.pause();

        musicButton.innerHTML = "🔇";

    }

});


/* =====================================================
   COUNTDOWN
===================================================== */


/*
   GANTI TANGGAL DI SINI

   Format:
   Tahun-Bulan-Tanggal Jam:Menit:Detik
*/

const weddingDate =
    new Date("December 20, 2026 08:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance < 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;


        if (
            elementTop <
            windowHeight - 80
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


/* =====================================================
   PREVENT VIDEO PAUSE
===================================================== */

backgroundVideo.addEventListener(
    "ended",
    function () {

        backgroundVideo.currentTime = 0;

        backgroundVideo.play();

    }
);


/* =====================================================
   TOUCH SUPPORT
===================================================== */

document.addEventListener(
    "touchstart",
    function () {

        /*
           Jika musik belum berjalan,
           coba jalankan kembali setelah
           interaksi pengguna.
        */

        if (
            music.paused &&
            !cover.classList.contains("hide")
        ) {

            return;

        }

        if (music.paused) {

            music.play()
                .catch(() => {});

        }

    },
    {
        once: false
    }
);