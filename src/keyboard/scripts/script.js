import '../style.css'
import { forEnglish,  forEnglishCaps,  forEnglishShift} from './eng.js';
import { forRussian, forRussianCaps,  forRussianShift } from './rus.js'

// Cоздания области, в которую я буду записать буковки и цифры
const textArea = document.createElement('textarea');                      // В HTML-документах создаёт элемент c тем тегом, что указан в аргументе или HTMLUnknownElement, если имя тега не распознаётся.
document.body.prepend(textArea);                                          // node.prepend(...nodes or strings) – вставляет узел в начало.
textArea.setAttribute('placeholder', 'Привет дорогой друг, это моя первая работа с домом. \nПрошу тебя иди строга по кросс-чеку. Не придумывай ничего своего. \nБлагодарю')  // Текст, который будет находится внутри элемента => ::placeholder представляет собой текст placeholder (en-US) в <textarea> (en-US) элементах.

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
    } else if (language === 'english') {              // Если используем английскую клавиатуру
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
            classification = 'backspace special';
          } else if (value === 'Tab') {
            classification = 'tab special';
          } else if (value === 'Keyslesh') {
            classification = 'keysleft';
          } else if (value === 'CapsLock') {
            classification = 'capsLock special';
          } else if (value === 'Enter') {
            classification = 'specialEnter'
          } else if (value === 'ShiftL') {
            classification = 'specialShift'
          } else if (value === 'ShiftR') {
            classification = 'specialShiftTwo'
          } else if (value === 'ControlLeft') {
            classification = 'controlL'
          } else if (value === 'Space') {
            classification = 'specialSpace'
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
}

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
    });
  }
};



// function clickOnKeyboard (click) {...}
document.addEventListener('keydown', (click) => clickKeyboard(clickOnKeyboard(click)));
// function animation (click) {...}
document.addEventListener('mousedown', animation);
// function writeOnKeyboard (click) {...} 
document.addEventListener('mousedown', (click) => writeOnKeyboard(click));

document.addEventListener('mouseup', (click) => clearHigh(click));