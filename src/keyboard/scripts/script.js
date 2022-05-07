import '../style.css'


// Cоздания области, в которую я буду записать буковки и цифры
const textArea = document.createElement('textarea');                      // В HTML-документах создаёт элемент c тем тегом, что указан в аргументе или HTMLUnknownElement, если имя тега не распознаётся.
document.body.prepend(textArea);                                          // node.prepend(...nodes or strings) – вставляет узел в начало.
textArea.setAttribute('placeholder', 'Привет дорогой друг, это моя первая работа с домом. \nПрошу тебя иди строга по кросс-чеку. Не придумывай ничего своего. \nБлагодарю')  // Текст, который будет находится внутри элемента => ::placeholder представляет собой текст placeholder (en-US) в <textarea> (en-US) элементах.

// Клавиатура (для русской клавиатуре)
const forRussian = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 
'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 
'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '↑' ,'Shift', 
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl']
const forRussianShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 
'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 
'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 
'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑','Shift', 
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→','Ctrl']
const forRussianCaps = ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 
'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 
'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '↑', 'Shift', 
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl']; 

// Для английской клавиатуре
const forEnglish = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 
'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 
'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl'];
const forEnglishShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 
'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',  
'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 
'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 
'Ctrl', 'Win', 'Alt', 'Space',  'Alt', '←', '↓', '→', 'Ctrl'];
const forEnglishCaps = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 
'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 
'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', 'Shift', 
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl']; 

//Для будущей отрисовки самой клавиатуры
const digitCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 
'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Key{', 'Key}', 'Keyslesh',
'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Double-colon', 'Quote', 'Enter', 
'ShiftL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Point', 'Question', 'ArrowUp','ShiftR', 
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

let caps_lock = false;
let shift = false;
let language = sessionStorage.getItem('kl') ? sessionStorage.getItem('kl') : 'russian';

const klavitereishn = () => {
    let keyboard;
    sessionStorage.setItem('kl', language);          // Свойство sessionStorage позволяет получить доступ к объекту Storage текущей сессии и добавляет данные в него используя setItem

    if (language === 'russian') {                    // Если используем русскую клавиатуру
        keyboard = forRussian;
        if (caps_lock) {
            keyboard = forRussianCaps
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

    
    if (!(document.activeElement == textArea)) {      // document.activeElement => Элемент, на котором будут вызываться события клавиатуры, если пользователь начнет ввод текста
      textArea.focus ()                               // Элемент получает фокус, когда пользователь кликает по нему или использует клавишу Tab
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

      
          collection += `<div class="key ${classification}" data-code="${value}">${keyboard[index]}</div>`;         // Вставляем класс к тегам

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