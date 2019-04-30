document.addEventListener("DOMContentLoaded", function() {

  const loadingTag = document.querySelector('#loading-animation')
  const bodyTag = document.querySelector("body")

  function hideLoadingDiv() {
    loadingTag.classList.add("loading-done")
  }

  setTimeout(hideLoadingDiv, 2000)

  const logoTag = document.querySelector('#logo')
  const titleTag = document.querySelector('#title')

  logoTag.addEventListener("mouseover", function() {
    logoTag.src = 'bk-logo.png'
  })

  logoTag.addEventListener("mouseout", function() {
    logoTag.src = 'cone.png'
  })
  // highlight nav on scroll

  const aboutSection = document.querySelector("#about-section")
  const aboutSectionLocation = aboutSection.offsetTop - 150

  const productsSection = document.querySelector("#products-section")
  const productsSectionLocation = productsSection.offsetTop - 150

  const contactSection = document.querySelector("#contact-section")
  const contactSectionLocation = contactSection.offsetTop - 350;

  console.log(aboutSection, productsSectionLocation, contactSectionLocation)

  const sections = document.querySelectorAll(".mainSection")

  const aboutTag = document.querySelector("#aboutLink")
  const productsTag = document.querySelector("#productsLink")
  const contactTag = document.querySelector("#contactLink")

  let breakpoint = window.matchMedia('(max-width: 768px)');
  var pixels = window.pageYOffset

  // scroll event listener

  document.addEventListener("scroll", function() {

    const shinrinText = document.querySelector("#shinrin-text")

    const ingredientsText = document.querySelector("#ingredients")

    const lichenImage = document.querySelector("#littleLichen")

    const saltImage = document.querySelector("#saltImage")

    var pixels = window.pageYOffset

    if (pixels > 405) {
      lichenImage.style.marginLeft = "50px";
      shinrinText.style.opacity = 1
      console.log("reveal linchen")
    } else if (breakpoint.matches) {
      lichenImage.style.marginLeft = "50px";
      shinrinText.style.opacity = 1
    } else {
      lichenImage.style.marginLeft = "-1150px";
      shinrinText.style.opacity = 0
    }

    if (pixels > 700) {
      ingredientsText.style.opacity = 1
      saltImage.style.marginRight = "90px";
    } else if (breakpoint.matches) {
      ingredientsText.style.opacity = 1
      saltImage.style.marginRight = "90px";
    } else {
      ingredientsText.style.opacity = 0
      saltImage.style.marginRight = "-1050px";
    }

    // scroll bar highlight nav

    const scrollbarTag = document.querySelector("div.scrollbar")

    console.log(pixels)

    const pageHeight = bodyTag.getBoundingClientRect().height
    const scrollableDistance = pageHeight - window.innerHeight
    const percent = pixels / scrollableDistance
    const width = 100 * percent

    scrollbarTag.style.width = `${width}%`

    sections.forEach(section => {
      if (pixels >= aboutSectionLocation && pixels < productsSectionLocation) {

        aboutTag.classList.add("highlight")
        productsTag.classList.remove("highlight")
        contactTag.classList.remove("highlight")

      } else if (pixels >= productsSectionLocation && pixels < contactSectionLocation) {

        aboutTag.classList.remove("highlight")
        productsTag.classList.add("highlight")
        contactTag.classList.remove("highlight")
      } else if (pixels > productsSectionLocation) {
        aboutTag.classList.remove("highlight")
        productsTag.classList.remove("highlight")
        contactTag.classList.add("highlight")
      }
    })
  })

  // Firebase init

  var config = {
    apiKey: "AIzaSyBFSjR3SgKo8MYzXj5uHnFOZNv1UNzBbOM",
    authDomain: "bathk-8d6a5.firebaseapp.com",
    databaseURL: "https://bathk-8d6a5.firebaseio.com",
    projectId: "bathk-8d6a5",
    messagingSenderId: "229558748005"
  };

  firebase.initializeApp(config);

  // submit form, submit to firebase

  var messagesRef = firebase.database().ref('/messages');

  document.getElementById('form').addEventListener('submit', submitForm);

  function submitForm(e) {

    const contactTitle = document.getElementById("contactTitle")

    contactTitle.innerHTML = "Thank you!"

    e.preventDefault();

    console.log("did that even work?")

    const nameTag = document.getElementById('name')
    const emailTag = document.getElementById('email')
    const subjectTag = document.getElementById('subject')
    const messageTag = document.getElementById('message')

    var name = encodeURIComponent(nameTag.value)
    var email = encodeURIComponent(emailTag.value)
    var subject = encodeURIComponent(subjectTag.value)
    var message = encodeURIComponent(messageTag.value)

    saveMessage(name, email, subject, message);
    document.getElementById("form").reset();
  }

  function saveMessage(name, email, subject, message) {

    console.log(name, email, subject, message)
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email: email,
      subject: subject,
      message: message
    });
  }

})
