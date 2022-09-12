import '../style.css';
import { forEnglish, forEnglishCaps, forEnglishShift } from './eng.js';
import { forRussian, forRussianCaps, forRussianShift } from './rus.js';

// Add textArea special for virtual-keyboard
const textArea = document.createElement('textarea');
textArea.setAttribute('placeholder', 'Welcome to first pet-project: Virtual-keyboard');
document.body.prepend(textArea); // Метод prepend позволяет вставить в начало какого-либо элемента другой элемент.

const digitCodes = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
    'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',

    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU',
    'KeyI', 'KeyO', 'KeyP', 'Key{', 'Key}', 'Keyslesh',

    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ',
    'KeyK', 'KeyL', 'Double-colon', 'Quote', 'Enter',

    'ShiftL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM',
    'Comma', 'Point', 'Question', 'ArrowUp', 'ShiftR',

    'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight',
    'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
];

let capsLock = false;
let shift = false;

// sessionStorage — хранить данные в браузере
let language = sessionStorage.getItem('chooseLanguage') ? sessionStorage.getItem('chooseLanguage') : 'rus';

const initKeyboard = () => {
    sessionStorage.setItem('chooseLanguage', language);

    let keyboard;
      if (language === 'rus') {
        keyboard = forRussian;
        if (capsLock) {
          keyboard = forRussianCaps;
        } else if (shift) {
          keyboard = forRussianShift;
        }
      } else if (language === 'eng') {
        keyboard = forEnglish;
        if (capsLock) {
          keyboard = forEnglishCaps;
        } else if (shift) {
          keyboard = forEnglishShift;
        }
      }

    const CheckStatus = () => {
        let laptopKeyboard = document.querySelector('.keyboard');

        if (laptopKeyboard) {
          let breaks = 0;

          for (let set = 0; set < laptopKeyboard.children.length; set += 1) {
            if (laptopKeyboard.children[set].nodeName !== 'DIV') {
              breaks += 1;
            } else {
              laptopKeyboard.children[set].innerHTML = keyboard[set - breaks];
            }
          }

        } else {
          laptopKeyboard = document.createElement('div');
          laptopKeyboard.classList.add('keyboard');
          let collection = '';

          laptopKeyboard.addEventListener('mousedown', (click) => {
            click.preventDefault();
          });


        digitCodes.forEach((value, index) => {
          let classification = '';
          if (value === 'Backspace') {
            classification = 'backspace origin';
          } else if (value === 'Tab') {
            classification = 'tab origin';
          } else if (value === 'Keyslesh') {
            classification = 'keysleft origin';
          } else if (value === 'CapsLock') {
            classification = 'capsLock origin';
          } else if (value === 'Enter') {
            classification = 'specialEnter origin';
          } else if (value === 'ShiftL') {
            classification = 'specialShift origin';
          } else if (value === 'ShiftR') {
            classification = 'specialShiftTwo origin';
          } else if (value === 'ControlLeft') {
            classification = 'controlL origin';
          } else if (value === 'Space') {
            classification = 'specialSpace origin';
          }

        // Add class in tag and letters gap
        collection += `<div class= "key ${classification}" data-code="${value}"> ${ keyboard[index] }</div>`;

        const breaks = [13, 27, 40, 53];
        if (breaks.includes(index)) {
          collection += '<br>';
        }
      });

        // Свойство innerHTML позволяет считать содержимое элемента в виде HTML-строки или установить новый HTML.
        laptopKeyboard.innerHTML = collection;

        const exist = document.querySelector('.keyboard');
        if (exist) {
          exist.replaceWith(laptopKeyboard);
        } else {
          textArea.after(laptopKeyboard);
        }
        }
      };
      CheckStatus();
};
initKeyboard();

function animation(click) {
  const clicebel = click.target;
  // getAttribute - получаем объект
  if (clicebel && digitCodes.includes(clicebel.getAttribute('data-code'))) {
    // добавляем класс
    clicebel.classList.add('cartoon');
  }
}

function clearHigh(click) {
  const clicebel = click.target;
  const definedKey = clicebel ? clicebel.getAttribute('data-code') : '';
  if (definedKey ==='ShiftL' ) {
    shift = false;
    initKeyboard();
  } else if (definedKey === 'ShiftR') {
    shift = false;
    initKeyboard();
  }
  if (definedKey !== 'CapsLock' || capsLock === false) {
    setTimeout(() => {
      if (clicebel) {
        // Возвращаем в первоначальный вариант
        clicebel.classList.remove('cartoon');
      }
    }, 200);
  }
}

// Нажатие на клавиатуру
const clickOnKeyboard = (click) => {
  if (document.activeElement !== textArea) {
    textArea.focus();
  }

  /* Отмена действия браузера => для отмены действия браузера существует
  стандартный метод event.preventDefault(). */
  click.preventDefault();
  const newClick = { ...click };
  newClick.shiftOnKeyboard = click.shiftOnKeyboard;
  newClick.altOnKeyboard = click.altOnKeyboard;
  newClick.moreTimes = click.moreTimes;
  newClick.target = document.querySelector(`[data-code=${click.code}]`);
  return newClick;
};

const clickKeyboard = (click) => {
  animation(click);
  if (click.shiftOnKeyboard && click.altOnKeyboard && !click.moreTimes) {
    if (language == 'rus') {
       'eng'
    } else {
       'rus'
    }
  }

  const definedKey = click.target ? click.target.getAttribute('data-code') : '';
  const write = textArea.selectionStart;

  // Добавление символов на клавиатуру
  if (click.target && [...click.target.classList].indexOf('origin') === -1 && [...click.target.classList].indexOf('key') !== -1) {
    let spacendr = click.target.innerHTML;
    textArea.value = textArea.value.substring(0, write) + spacendr + textArea.value.substring(write);
    textArea.setSelectionRange(write + 1, write + 1);
  }

  if (definedKey === 'Space') {
    let spacendr = click.target.innerHTML;
    spacendr = spacendr === 'Space' ? " " : spacendr;
    textArea.value = textArea.value.substring(0, write) + spacendr + textArea.value.substring(write);
  }

  // Необходимо что при нажатии на backspace текст удалял какой-либо элемиент
  if (definedKey === 'Backspace' && write > 0) {
    textArea.value = textArea.value.substring(0, write - 1) + textArea.value.substring(write);
    textArea.setSelectionRange(write - 1, write - 1);
  }

  // При нажатии, чтобы все символы на экране отображался с большими буквами
  if (definedKey === 'CapsLock') {
    capsLock = !capsLock;
    initKeyboard();
  }
  // Работает только левый шифт, на будущее: необходимо, чтобы работал и правы
  if (definedKey === 'ShiftL') {
      shift =! shift;
    initKeyboard();
  }

  if (definedKey === 'ShiftR') {
      shift =! shift;
      initKeyboard();
  }

  if (definedKey === 'Tab') {
    const tabulation = textArea.selectionStart;
    textArea.value = `${textArea.value.substring(0, tabulation)}  ${textArea.value.substring(tabulation)}`;
    textArea.setSelectionRange(tabulation + 4, tabulation + 4);
  }

  if (definedKey === 'Enter') {
    textArea.value = `${textArea.value.substring(0, write)}\n${textArea.value.substring(write)}`;
    textArea.setSelectionRange(write + 1, write + 1);
    return null;
  }
  return null;

};

document.addEventListener('keyup', (click) => clearHigh(clickOnKeyboard(click)));
document.addEventListener('keydown', (click) => clickKeyboard(clickOnKeyboard(click)));
document.addEventListener('mousedown', animation);
document.addEventListener('mousedown', (click) => clickKeyboard(click));
document.addEventListener('mouseup', (click) => clearHigh(click));
