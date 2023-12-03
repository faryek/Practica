console.log("script.js acrive")
const maxDice6Value = 6
const maxDice8Value = 8
const stats = []
const gameBackgrounds = ["Entertainer", "Sailor", "Pirate", "Outlander", "Urchin", "Sage", "Criminal", "Noble", "Folk hero", "Acolyte", "Guild artisan", "Hermit", "Soldier"]

function generateDice(_maxDiceValue, _count) {
  if (_count == 0) return 0
  const randomNumbers = Array.from({ length: _count }, () => Math.floor(Math.random() * _maxDiceValue) + 1)
  let minNumber = Math.min(...randomNumbers)
  let sum = randomNumbers.reduce((acc, num) => acc + num, 0)

  console.log(`array ${randomNumbers} Value ${sum} minNumber ${minNumber}`)
  const Value = sum - minNumber * (_count - 1)
  return Value
}

const Value = generateDice(6, 4);
console.log("Final Value:", Value);


for (let j = 0; j < 6; j++) {
  stats[j] = generateDice(maxDice6Value, 4)
  console.log(stats[j])
}

addHealPoint(maxDice8Value)

function addStat(_id, _value, _arrIndex) {
  document.getElementById(_id).innerText = `${_value}: [ ${Math.floor((stats[_arrIndex] - 10) / 2)} ] ( ${stats[_arrIndex]} )`
}

addStat("strength", "Сила", 0)
addStat("dexterity", "Ловкость", 1)
addStat("constitution", "Телосложение", 2)
addStat("intelligence", "Интеллект", 3)
addStat("wisdom", "Мудрость", 4)
addStat("charisma", "Харизма", 5)

function addHealPoint(_diceValue) {
  let healPoint = generateDice(_diceValue, 0) + Math.floor((stats[2] - 10) / 2) + _diceValue
  document.getElementById("hp").innerText = `Хиты: ( ${healPoint} )`
}

addBackground(gameBackgrounds[generateDice(gameBackgrounds.length, 1)])

function addBackground(_background) {
  function addValue(_id, _value) {
    document.getElementById(_id).innerHTML = _value
  }
  switch (_background) {
    case "Entertainer":
      addValue("goldValue", `Золотые монеты: [ 15 ]`)
      addValue("acrobatics", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Акробатика (Лов)</b>`)
      addValue("performance", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Выступление (Хар)</b>`)
      break
    case "Sailor":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("athletics", `<b>[ ${Math.floor((stats[0] - 10) / 2) + 2} ] Атлетика (Сил)</b>`)
      addValue("perception", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Восприятие (Муд)</b>`)
      break
    case "Pirate":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("athletics", `<b>[ ${Math.floor((stats[0] - 10) / 2) + 2} ] Атлетика (Сил)</b>`)
      addValue("perception", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Восприятие (Муд)</b>`)
      break
    case "Outlander":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("athletics", `<b>[ ${Math.floor((stats[0] - 10) / 2) + 2} ] Атлетика (Сил)</b>`)
      addValue("survival", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Выживание (Муд)</b>`)
      break
    case "Urchin":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("sleightOfHand", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Ловкость рук (Лов)</b>`)
      addValue("stealth", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Скрытность (Лов)</b>`)
      break
    case "Sage":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("history", `<b>[ ${Math.floor((stats[3] - 10) / 2) + 2} ] История (Инт)</b>`)
      addValue("magic", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Магия (Инт)</b>`)
      break
    case "Criminal":
      addValue("goldValue", `Золотые монеты: [ 15 ]`)
      addValue("deception", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Обман (Хар)</b>`)
      addValue("stealth", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Скрытность (Лов)</b>`)
      break
    case "Charlatan":
      addValue("goldValue", `Золотые монеты: [ 15 ]`)
      addValue("sleightOfHand", `<b>[ ${Math.floor((stats[1] - 10) / 2) + 2} ] Ловкость рук (Лов)</b>`)
      addValue("deception", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Обман (Хар)</b>`)
      break
    case "Noble":
      addValue("goldValue", `Золотые монеты: [ 25 ]`)
      addValue("history", `<b>[ ${Math.floor((stats[3] - 10) / 2) + 2} ] История (Инт)</b>`)
      addValue("persuasion", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Убеждение (Хар)</b>`)
      break
    case "Folk hero":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("survival", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Выживание (Муд)</b>`)
      addValue("animalCare", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Уход за животными (Муд)</b>`)
      break
    case "Acolyte":
      addValue("goldValue", `Золотые монеты: [ 15 ]`)
      addValue("insight", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Проницательность (Муд)</b>`)
      addValue("religion", `<b>[ ${Math.floor((stats[3] - 10) / 2) + 2} ] Религия (Инт)</b>`)
      break
    case "Guild artisan":
      addValue("goldValue", `Золотые монеты: [ 15 ]`)
      addValue("insight", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Проницательность (Муд)</b>`)
      addValue("persuasion", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Убеждение (Хар)</b>`)
      break
    case "Hermit":
      addValue("goldValue", `Золотые монеты: [ 5 ]`)
      addValue("medicine", `<b>[ ${Math.floor((stats[4] - 10) / 2) + 2} ] Медицина (Муд)</b>`)
      addValue("religion", `<b>[ ${Math.floor((stats[3] - 10) / 2) + 2} ] Религия (Инт)</b>`)
      break
    case "Soldier":
      addValue("goldValue", `Золотые монеты: [ 10 ]`)
      addValue("athletics", `<b>[ ${Math.floor((stats[0] - 10) / 2) + 2} ] Атлетика (Сил)</b>`)
      addValue("intimidation", `<b>[ ${Math.floor((stats[5] - 10) / 2) + 2} ] Запугивание (Хар)</b>`)
      break
  }
}