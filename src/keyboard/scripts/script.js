import '../style.css'
import { forEnglish,  forEnglishCaps,  forEnglishShift} from './eng.js';
import { forRussian, forRussianCaps,  forRussianShift } from './rus.js'

// Cоздания области, в которую я буду записать буковки и цифры
const textArea = document.createElement('textarea');                      // В HTML-документах создаёт элемент c тем тегом, что указан в аргументе или HTMLUnknownElement, если имя тега не распознаётся.
textArea.setAttribute('placeholder', 'Привет дорогой друг, это моя первая работа с домом. \nПрошу тебя иди строга по кросс-чеку. Не придумывай ничего своего. \nБлагодарю')  // Текст, который будет находится внутри элемента => ::placeholder представляет собой текст placeholder (en-US) в <textarea> (en-US) элементах.
document.body.prepend(textArea);                                          // node.prepend(...nodes or strings) – вставляет узел в начало.

//Для будущей отрисовки самой клавиатуры
const digitCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 
'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Key{', 'Key}', 'Keyslesh',
'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Double-colon', 'Quote', 'Enter', 
'ShiftL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Point', 'Question', 'ArrowUp','ShiftR', 
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

let caps_lock = false;
let shift = false;
let language = sessionStorage.getItem('chooseLanguage') ? sessionStorage.getItem('chooseLanguage') : 'rus';

const klavitereishn = () => {
    let keyboard;
    sessionStorage.setItem('chooseLanguage', language);          // Свойство sessionStorage позволяет получить доступ к объекту Storage текущей сессии и добавляет данные в него используя setItem
    // Начальное положение клавиатуры
    if (language === 'rus') {                        // Если используем русскую клавиатуру
        keyboard = forRussian;
        // Если используем больше буквы
        if (caps_lock) {
            keyboard = forRussianCaps
        // Если зажимаешь шифт
        } else if (shift) {
            keyboard = forRussianShift
        }
    } else if (language === 'eng') {              // Если используем английскую клавиатуру
        keyboard = forEnglish;
        if (caps_lock) {
            keyboard = forEnglishCaps
        } else if (shift) {
            keyboard = forEnglishCaps
        }
    }

    // document.activeElement => Элемент, на котором будут вызываться события клавиатуры, если пользователь начнет ввод текста
    if (!(document.activeElement == textArea)) {   
      // Элемент получает фокус, когда пользователь кликает по нему или использует клавишу Tab  
      textArea.focus ()                               
    }

    // Добавляем непосредственно саму клавиатуру
    const klavitereishn_write  = () => {
        // Document метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов
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

        // Создаем непосредственно саму клавиатуру
        laptopKeyboard = document.createElement('div');
        laptopKeyboard.classList.add('keyboard');
        let collection = '';

        //Обращаемся к строке 47 и просим нарисовать все элементы c классами
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
            classification = 'specialEnter origin'
          } else if (value === 'ShiftL') {
            classification = 'specialShift origin'
          } else if (value === 'ShiftR') {
            classification = 'specialShiftTwo origin'
          } else if (value === 'ControlLeft') {
            classification = 'controlL origin'
          } else if (value === 'Space') {
            classification = 'specialSpace origin'
          }

          // Вставляем класс к тегам
          collection += `<div class="key ${classification}" data-code="${value}">${keyboard[index]}</div>`;         

          // Следующий код гласит, в какой части элемента необходимо новая строка
          const breaks = [13, 27, 40, 53];
          if (breaks.includes(index)) {
            collection += '<br>';
          }
        });
      
        // innerHtml получает HTML рамзетку
        laptopKeyboard.innerHTML = collection;
        // Document метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов
        const exist = document.querySelector('.keyboard');
        if (exist) {
          exist.replaceWith(laptopKeyboard);                 // Метод .replaceWith() заменяет одни элементы другими.
        } else {
          textArea.after(laptopKeyboard);                    // Метод .after() добавляет текст после заданного элемента. 
        }
      }
    };
   klavitereishn_write();
  };
klavitereishn();

// Нажатие на клавиатуру
function clickOnKeyboard (click) {
  // Отмена действия браузера => для отмены действия браузера существует стандартный метод event.preventDefault().
  click.preventDefault();
    const newClick = {...click};
    newClick.shiftOnKeyboard = click.shiftOnKeyboard
    newClick.altOnKeyboard = click.altOnKeyboard
    newClick.moreTimes = click.moreTimes
    newClick.target = document.querySelector(`[data-code=${click.code}]`);
    return newClick
};

function animation (click) {
  const clicebel = click.target;
  // getAttribute - получаем объект
  if (clicebel && digitCodes.includes(clicebel.getAttribute('data-code'))) {
    // добавляем класс
    clicebel.classList.add('cartoon');
  }
};

function clearHigh (click) {
  const clicebel = click.target;
  const definedKey = clicebel ? clicebel.getAttribute('data-code') : '';
  if (definedKey === ('ShiftL' || 'ShiftR')) {
    shift = false;
    klavitereishn()
  }
  if (definedKey !== 'CapsLock' || caps === false) {
    setTimeout(() => {
      if (clicebel) {
        // Возвращаем в первоначальный вариант
        clicebel.classList.remove('cartoon');
      }
    }, 200);
  }
};

const clickKeyboard = (click) => {
  animation (click)
  if (click.shiftOnKeyboard && click.altOnKeyboard && !click.moreTimes ) {
    language = (language === 'rus') ? 'eng' : 'rus';
    return null;
  }

  const currentKeyCode = click.target ? click.target.getAttribute('data-code') : '';
  const caret = textArea.selectionStart;

  // Добавление символов на клавиатуру
  if (click.target && [...click.target.classList].indexOf('origin') === -1 && [...click.target.classList].indexOf('key') !== -1) {
    let letter = click.target.innerHTML;
    letter = letter === 'Space' ? ' ' : letter;
    textArea.value = textArea.value.substring(0, caret) + letter + textArea.value.substring(caret);
    textArea.setSelectionRange(caret + 1, caret + 1);
  }

  // Необходимо что при нажатии на backspace текст удалял какой-либо элемиент
  if (currentKeyCode === 'Backspace' && caret > 0) {
    textArea.value = textArea.value.substring(0, caret - 1) + textArea.value.substring(caret);
    textArea.setSelectionRange(caret - 1, caret - 1);
  }

  // При нажатии, чтобы все символы на экране отображался с большими буквами
  if (currentKeyCode === 'CapsLock') {
    caps_lock = true;
    klavitereishn();
  }

  if (currentKeyCode === 'ShiftL' || 'ShiftR') {
    shift = true;
    klavitereishn();
  }

  return null;
};



document.addEventListener('keyup', (click) => clearHigh(clickOnKeyboard(click)));
document.addEventListener('keydown', (click) => clickKeyboard(clickOnKeyboard(click)));
document.addEventListener('mousedown', animation);
document.addEventListener('mousedown', (click) => clickKeyboard(click));
document.addEventListener('mouseup', (click) => clearHigh(click));