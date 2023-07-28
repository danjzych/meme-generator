///////////////////////////////////////
// LOCAL STORAGE  & DEFAULT SETTINGS //
///////////////////////////////////////
let storedMemes;
if (JSON.parse(localStorage.getItem('storedMemes'))) {
  storedMemes = JSON.parse(localStorage.getItem('storedMemes'));
} else {
  storedMemes = [
    {
      'src': 'https://www.dailypaws.com/thmb/d3vNqnLf6Vqjz8oz5XObGCQxms4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tiny-white-kitten-873941684-2000-0bac130389984aba9751de5e5e50d25f.jpg',
      'topText': 'don\'t be scared',
      'bottomText': 'i\'m here',
      'key': 0
    }
  ];
};

let currentKey;
if (JSON.parse(localStorage.getItem('currentKey'))) {
  currentKey = JSON.parse(localStorage.getItem('currentKey'))
} else {
  currentKey = 1;
}

//////////////////////////////////////
//////////// HELPER FUNCS ////////////
//////////////////////////////////////
function createMeme(src, topText, bottomText, key = currentKey) {
  let newMeme = document.createElement('div');
  let newImg = document.createElement('img');
  newImg.src = src;
  newMeme.appendChild(newImg);

  const top = document.createElement('p');
  top.innerText = topText;
  top.setAttribute('id', 'top');
  top.classList.add('memeText');
  newMeme.appendChild(top);

  const bottom = document.createElement('p');
  bottom.innerText = bottomText;
  bottom.setAttribute('id', 'bottom');
  bottom.classList.add('memeText');
  newMeme.appendChild(bottom);

  const x = document.createElement('p');
  x.innerText = 'X';
  x.classList.add('delete');
  newMeme.appendChild(x);

  newMeme.setAttribute('key', key)

  newMeme.classList.add('meme');

  addDelete(newMeme);

  document.querySelector('.container').appendChild(newMeme);
};

function addDelete(meme) {
  meme.addEventListener('click', (event) => {

    if (event.target.classList[0] === 'delete') {
      meme.remove();

      storedMemes = storedMemes.filter((stored) => {
        return stored.key !== Number(meme.getAttribute('key'));
      });

      localStorage.setItem('storedMemes', JSON.stringify(storedMemes));
    };

  });
};

//////////////////////////////////////
//////////////// PAGE ////////////////
//////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {

  //load memes from localStorage to page
  storedMemes.forEach(meme => {

    createMeme(meme.src, meme.topText, meme.bottomText, meme.key)

  })

  //Add meme functionality
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    let src = document.querySelector('#URL').value;
    let topText = document.querySelector('#topText').value;
    let bottomText = document.querySelector('#bottomText').value;

    //prevent duplicates
    let duplicate = false;
    storedMemes.forEach(meme => {
      if (meme.src === src && meme.topText === topText && meme.bottomText === bottomText) duplicate = true;
    })

    if (duplicate === true) {
      window.alert('Sorry, no duplicate memes!');
    } else {
      createMeme(src, topText, bottomText);

      const obj = {};
      obj.src = src;
      obj.topText = topText;
      obj.bottomText = bottomText;
      obj.key = currentKey;
      storedMemes.push(obj)
      localStorage.setItem('storedMemes', JSON.stringify(storedMemes));

      currentKey++;
      localStorage.setItem('currentKey', currentKey)
    };

    form.reset();
    event.preventDefault();
  });

  //clear all memes functionality
  const clear = document.querySelector('#clear');
  clear.addEventListener('click', (event) => {

    let memes = document.querySelectorAll('.meme');

    for (const meme of memes) {
      meme.remove();
    };

    localStorage.clear();

  });

});