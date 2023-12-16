console.log("script.js acrive")
const maxDice6Value = 6
const maxDice8Value = 8
const stats = []
const backgrounds = ['Артист', 'Моряк', 'Пират', 'Чужеземец', 'Беспризорник', 'Мудрец', 'Преступник', 'Шарлатан', 'Благородный', 'Народный герой', 'Прислужник', ',Гильдейский ремесленник', 'Отшельник', 'Солдат']

function generateDice(_maxDiceValue, _count) {
  if (_count == 0) return 0
  const randomNumbers = Array.from({ length: _count }, () => Math.floor(Math.random() * _maxDiceValue) + 1)
  let minNumber = Math.min(...randomNumbers)
  let sum = randomNumbers.reduce((acc, num) => acc + num, 0)
  const Value = sum - minNumber * (_count - 1)
  return Value
}

const Value = generateDice(6, 4);


for (let j = 0; j < 6; j++) {
  stats[j] = generateDice(maxDice6Value, 4)
}

let strengthMod = addStat("strength", "Сила", 0)
let dexterityMod = addStat("dexterity", "Ловкость", 1)
let constitutionMod = addStat("constitution", "Телосложение", 2)
let intelligenceMod = addStat("intelligence", "Интеллект", 3)
let wisdomMod = addStat("wisdom", "Мудрость", 4)
let charismaMod = addStat("charisma", "Харизма", 5)
addHealPoint(maxDice8Value)
getBackground('sample'/*generateDice(backgrounds.length-1, 1)*/).then(()=> {
  getSkill("Акробатика", dexterityMod, false)
  getSkill("Анализ", intelligenceMod, false)
  getSkill("Атлетика", strengthMod, false)
  getSkill("Восприятие", wisdomMod, false)
  getSkill("Выживание", wisdomMod, false)
  getSkill("Выступление", charismaMod, false)
  getSkill("Запугивание", charismaMod, false)
  getSkill("История", intelligenceMod, false)
  getSkill("Ловкость рук", dexterityMod, false)
  getSkill("Магия", intelligenceMod, false)
  getSkill("Медицина", wisdomMod, false)
  getSkill("Обман", charismaMod, false)
  getSkill("Природа", intelligenceMod, false)
  getSkill("Проницательность", wisdomMod, false)
  getSkill("Религия", intelligenceMod, false)
  getSkill("Скрытность", dexterityMod, false)
  getSkill("Убеждение", charismaMod, false)
  getSkill("Уход за животными", wisdomMod, false)
})

addValue("passive_wisdom", `Пассивная мудрость (Восприятие): ${10+getSkill("Восприятие", wisdomMod, false)[0]}`)
getRace('gnome')

function addStat(_id, _value, _arrIndex) {
  let statMod = Math.floor((stats[_arrIndex] - 10) / 2)
  let statType = _value.substr(0, 3)
  document.getElementById(_id).innerText = `${_value}: [ ${statMod} ] ( ${stats[_arrIndex]} )`
  return [statMod, _value, statType]
}

function addHealPoint(_diceValue) {
  let healPoint = generateDice(_diceValue, 0) + constitutionMod[0] + _diceValue
  document.getElementById("hp").innerText = `Хиты: ( ${healPoint} )`
}


function getRace(_raceName) {
  fetch(`./Data/Race/${_raceName}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      addRace(`Раса: ${json.name}<br>Размер существа: ${json.size}`)
      addTraits(json.traits, "raceTraits")
      addValue("moveSpeed", `Скорость: ${json.speed}`)
      addValue("languages", `Знание языков: ${json.languages}`)
      if ('subraces' in json) {
        let subraces = json.subraces
        let currentSubrace = generateDice(subraces.length, 1) - 1
        addTraits(subraces[currentSubrace].traits, "subraceTraits")
        if (subraces[currentSubrace].proficiencies[0] != "-") {
          addValue("tools", `${subraces[currentSubrace].proficiencies}`)
        }
      }
    })
}

function addRace(_jsonData) {
  addValue("race", _jsonData)
}

function addValue(_id, _value) {
  if(document.getElementById(_id).textContent != null && document.getElementById(_id).textContent == "")
    document.getElementById(_id).innerHTML += _value
  else {
    console.log(document.getElementById(_id).textContent)
  }
}

function addTraits(_jsonData, _traitsType) {
  let resultString = ""
  let length = _jsonData.length
  for (let i = 0; i < length; i++) {
    resultString += `<b>${i + 1}. ${_jsonData[i].name}</b><br> ${_jsonData[i].description}<br>`
  }
  addValue(_traitsType, resultString)
}


function getSkill(_id, _statMod, _haveMaster) {
  let value = ""
  if (!_haveMaster) {
    if (!document.getElementById(_id).outerHTML.endsWith("</b></p>")) {
      value = _statMod[0]
      console.log("Персонаж не владеет " + _id)
      addValue(_id, `[ ${_statMod[0]} ] ${_id} (${_statMod[2]})`)
    } else {
      _haveMaster = true
    }
  }
  else {
    console.log("Персонаж владеет " + _id)
    value = _statMod[0] + 2
    addValue(_id, `<b>[ ${_statMod[0] + 2} ] ${_id} (${_statMod[2]})</b>`)
  }
  return [value, _haveMaster]
}

async function getBackground(_backgroundName) {
  await fetch(`./Data/Background/${_backgroundName}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      let statMod
      json.abilities.forEach(element => {
        switch (element.statMod) {
          case "Сила":
            statMod = strengthMod
            break
          case "Ловкость":
            statMod = dexterityMod
            break
          case "Телосложение":
            statMod = constitutionMod
            break
          case "Интеллект":
            statMod = intelligenceMod
            break
          case "Мудрость":
            statMod = wisdomMod
            break
          case "Харизма":
            statMod = charismaMod
            break
        }
        getSkill(element.name, statMod, true)
      });
      json.equipment.forEach(element => {
        addValue("equip_background", element.name + ", ")
      })
    })
}