
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const clues = document.querySelectorAll(".clue");
    const submitButtons = document.querySelectorAll("button[id^='submit']");
    const answers = document.querySelectorAll("input[id^='answer']");
    const message = document.getElementById("message");
    const anniversaryTitle = document.getElementById("anniversaryTitle");
    const catImage = document.querySelector(".cat-image");

    let currentClue = 0;
    let allCluesAnswered = false;

    const incorrectAttempts = {};

    // Define an array of different clues for each question
    const questionClues = [
        "c_t",
        "i_tr_ _u_o_",
        "_m_n",
        "_ _ve_be_",
        "_e_t and k_a_ _",
        "_ h_ur_",
        "9/_/202_",
        "_/2_/202_",
        "ayaw no clue HAHAHA",
        " 'yes' dapat ang answer HAHAHAHA "
    ];

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        showClue(currentClue);
        anniversaryTitle.style.display = "none";
    });

    submitButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const answer = answers[index].value.toLowerCase();
            const nextClue = currentClue + 1;

            if (answer === getAnswerForClue(currentClue)) {
                hideClue(currentClue);
                currentClue = nextClue;
                resetIncorrectAttempts(currentClue);

                if (currentClue < clues.length) {
                    showClue(currentClue);
                } else {
                    if (!allCluesAnswered) {
                        showLoadingGIF();
                        allCluesAnswered = true;

                        setTimeout(() => {
                            hideLoadingGIF();
                            showMessage();
                            catImage.src = "peachcat.gif";
                        }, 5000);

                        catImage.onload = function () {
                            catImage.width = catImage.naturalWidth;
                            catImage.height = catImage.naturalHeight;
                        };
                        catImage.src = "heart.gif";
                    }
                }
            } else {
                if (!incorrectAttempts[currentClue]) {
                    incorrectAttempts[currentClue] = 1;
                } else {
                    incorrectAttempts[currentClue]++;
                }

                if (incorrectAttempts[currentClue] >= 4) {
                    // Show a message with the question-specific clue after the fourth incorrect attempt
                    alert("You have made 4 incorrect attempts. Here's a clue: " + questionClues[currentClue]);
                } else if (incorrectAttempts[currentClue] >= 3) {
                    showClue(currentClue); // Show clue after 3 incorrect attempts
                } else {
                    alert("HOY MALI MERON KA NA LANG " + (3 - incorrectAttempts[currentClue]) + " NA BUHAY NA NATITIRA HAHAHAH.");
                }
            }
        });
    });

    function showMessage() {
        message.style.display = "block";
    }

    function showClue(index) {
        clues[index].style.display = "block";
    }

    function hideClue(index) {
        clues[index].style.display = "none";
    }

    function showLoadingGIF() {
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "loading";
        document.body.appendChild(loadingDiv);
    }

    function hideLoadingGIF() {
        const loadingDiv = document.getElementById("loading");
        if (loadingDiv) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
    }

    function getAnswerForClue(clueNumber) {
        const answers = [
            "cat",
            "intramuros",
            "eman",
            "november",
            "jett and khaki",
            "6 hours",
            "9/4/2021",
            "11/24/2021",
            "iu",
            "yes"
        ];

        return answers[clueNumber];
    }

    function resetIncorrectAttempts(clueNumber) {
        incorrectAttempts[clueNumber] = 0;
    }

    function showUnblurredImage(imageId) {
        const image = document.getElementById(imageId);
        const blurredSrc = image.getAttribute("src");
        const unblurredSrc = blurredSrc.replace("-blurred", ""); // Remove the "-blurred" part from the filename

        image.setAttribute("src", unblurredSrc);
        image.classList.remove("blurred");
        image.removeEventListener("click", handleClick);
    }

    // Add click event listeners to each image
    const imageIds = ["image1", "image2", "image3"];
    imageIds.forEach((imageId) => {
        const image = document.getElementById(imageId);
        image.addEventListener("click", () => showUnblurredImage(imageId));
    });
});