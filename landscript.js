const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


let layers = document.getElementsByClassName("card-layer")
let texts = document.getElementsByClassName("card-text")





for (let i = 0; i < layers.length; i++){
  layers[i].addEventListener("mouseover", () => {
    layers[i].style.cssText += "background-color: rgba(0, 0, 0, 0.7);"
    texts[i].style.cssText += "color: rgba(255, 180, 67, 1);"
  })
  texts[i].addEventListener("mouseover", () => {
    layers[i].style.cssText += "background-color: rgba(0, 0, 0, 0.7);"
    texts[i].style.cssText += "color: rgba(255, 180, 67, 1);"
  })
  layers[i].addEventListener("mouseout", () => {
    layers[i].style.cssText += "background-color: rgba(0, 0, 0, 0);"
    texts[i].style.cssText += "color: rgba(255, 180, 67, 0);"
  })
  texts[i].addEventListener("mouseout", () => {
    layers[i].style.cssText += "background-color: rgba(0, 0, 0, 0);"
    texts[i].style.cssText += "color: rgba(255, 180, 67, 0);"
  })
}




