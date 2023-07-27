//////////////////
//LOCAL STORAGE //
//////////////////
let memes;

if (JSON.parse(localStorage.getItem('memes'))) {
  memes = JSON.parse(localStorage.getItem('toDos'));
} else {
  memes = {};
};


//////////////////
// HELPER FUNCS //
//////////////////


//////////////////
////// PAGE //////
//////////////////
document.addEventListener('DOMContentLoaded', () => {


  //create new meme
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    let src = document.querySelector('#URL').value;
    let topText = document.querySelector('#topText').value;
    let bottomText = document.querySelector('#bottomText').value;

    let newMeme = document.createElement('div');
    let newImg = document.createElement('img');
    newImg.src = src;
    newMeme.appendChild(newImg);

    const top = document.createElement('p');
    top.innerText = topText;
    top.classList.add('top');
    top.classList.add('memeText');
    newMeme.appendChild(top);

    const bottom = document.createElement('p');
    bottom.innerText = bottomText;
    bottom.classList.add('bottom');
    bottom.classList.add('memeText');
    newMeme.appendChild(bottom);

    const x = document.createElement('p');
    x.innerText = 'X';
    x.classList.add('delete');
    newMeme.appendChild(x)

    newMeme.classList.add('meme');

    document.querySelector('.container').appendChild(newMeme);

    form.reset();
    event.preventDefault();
    memes = document.querySelectorAll('.meme');

    //save to local storage
  });

  //delete a meme
  var memes = document.querySelectorAll('.meme');
  memes.forEach(meme => {

    meme.addEventListener('click', (event) => {

      if (event.target.classList[0] === 'delete') {
        meme.remove();
      };

    });

  });

  //clear all memes
  const clear = document.querySelector('#clear');
  clear.addEventListener('click', (event) => {

    for (const meme of memes) {
      meme.remove();
    };

  })

});