console.log("script.js acrive")
const stats = []
const backgrounds = ['Артист', 'sample'/*'Моряк', 'Пират', 'Чужеземец', 'Беспризорник', 'Мудрец', 'Преступник', 'Шарлатан', 'Благородный', 'Народный герой', 'Прислужник', ',Гильдейский ремесленник', 'Отшельник', 'Солдат'*/]

function generateDice(_maxDiceValue, _count = 1) {
  if (_count == 0) return 0
  const randomNumbers = Array.from({ length: _count }, () => Math.floor(Math.random() * _maxDiceValue) + 1)
  let minNumber = Math.min(...randomNumbers)
  let sum = randomNumbers.reduce((acc, num) => acc + num, 0)
  if(_count != 1)
    return sum - minNumber
  else
    return sum
}


for (let j = 0; j < 6; j++) {
  stats[j] = generateDice(6, 4)
}

let strengthMod = addStat("strength", "Сила", 0)
let dexterityMod = addStat("dexterity", "Ловкость", 1)
let constitutionMod = addStat("constitution", "Телосложение", 2)
let intelligenceMod = addStat("intelligence", "Интеллект", 3)
let wisdomMod = addStat("wisdom", "Мудрость", 4)
let charismaMod = addStat("charisma", "Харизма", 5)

getRandomBackground(Math.floor(Math.random() * backgrounds.length)).then(() => {
  getClass('sample').then(() => {
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
    getRace('gnome')
  })
  addValue("passive_wisdom", `Пассивная мудрость (Восприятие): ${10 + Number(getValue("Восприятие").substring(1, 4))}`)
})

function addStat(_id, _value, _arrIndex) {
  let statMod = Math.floor((stats[_arrIndex] - 10) / 2)
  let statType = _value.substr(0, 3)
  document.getElementById(_id).innerText = `${_value}: [ ${statMod} ] ( ${stats[_arrIndex]} )`
  return [statMod, _value, statType]
}

function addHealPoint(_diceValue) {
  let healPoint = generateDice(_diceValue, 0) + constitutionMod[0] + _diceValue
  document.getElementById("hp").innerText = `Хиты: ( ${healPoint} )`
  addValue("hp_dice", `Кость Хитов: [ 1к${_diceValue} ]`)
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
        let currentSubrace = generateDice(subraces.length, 1)-1
        addTraits(subraces[currentSubrace].traits, "subraceTraits")
        if (subraces[currentSubrace].proficiencies[0] != "-") {
          let backTools = getValue("tools")
          if (backTools == "") {
            addValue("tools", `Инструменты (от расы): ${backTools} ${subraces[currentSubrace].proficiencies}`)
          }
          else
            addValue("tools", `,${subraces[currentSubrace].proficiencies}`)
        }
      }
    })
}

function addRace(_jsonData) {
  addValue("race", _jsonData)
}

function addValue(_id, _value = "", _values = [""]) {
  if (document.getElementById(_id) != null) {
    if (document.getElementById(_id).textContent != null) {
      document.getElementById(_id).innerHTML += _values
      document.getElementById(_id).innerHTML += _value
    }
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
      addValue(_id, `[ ${_statMod[0]} ] ${_id} (${_statMod[2]})`)
    } else {
      _haveMaster = true
    }
  }
  else {
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
      addValue("equip_background", "", json.equipment.map(n => n.name))
      addValue("tools", "", json.tools.map(n => n.name))
      addValue("goldValue", "Золотые монеты: " + json.startGold)
    })
}

async function getRandomBackground(_value) {
  await getBackground(backgrounds[_value])
}

function getValue(_id) {
  return document.getElementById(_id).textContent
}

async function getClass(_className) {
  await fetch(`./Data/Class/${_className}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      addHealPoint(json.hp_dice)
      json.saving_throws.forEach(element => {
        switch (element) {
          case "Сила":
            addValue("strength_save", `<b>Сила: ${strengthMod[0] + 2}</b>`)
            break
          case "Ловкость":
            addValue("dexterity_save", `<b>Ловкость: ${dexterityMod[0] + 2}</b>`)
            break
          case "Телосложение":
            addValue("constitution_save", `<b>Телосложение: ${constitutionMod[0] + 2}</b>`)
            break
          case "Интеллект":
            addValue("intelligence_save", `<b>Интеллект: ${intelligenceMod[0] + 2}</b>`)
            break
          case "Мудрость":
            addValue("wisdom_save", `<b>Мудрость: ${wisdomMod[0] + 2}</b>`)
            break
          case "Харизма":
            addValue("charisma_save", `<b>Харизма: ${charismaMod[0] + 2}</b>`)
            break
        }
      })
      if (getValue("strength_save") == "") {
        addValue("strength_save", `Сила: ${strengthMod[0]}`)
      }
      if (getValue("dexterity_save") == "") {
        addValue("dexterity_save", `Ловкость: ${dexterityMod[0]}`)
      }
      if (getValue("constitution_save") == "") {
        addValue("constitution_save", `Телосложение: ${constitutionMod[0]}`)
      }
      if (getValue("intelligence_save") == "") {
        addValue("intelligence_save", `Интеллект: ${intelligenceMod[0]}`)
      }
      if (getValue("wisdom_save") == "") {
        addValue("wisdom_save", `Мудрость: ${wisdomMod[0]}`)
      }
      if (getValue("charisma_save") == "") {
        addValue("charisma_save", `Харизма: ${charismaMod[0]}`)
      }
      json.equip.forEach(element => {
        addValue("equip_class", ", ", element[generateDice(element.length)])
      });
      getCurrentSkill(json)
    })

  function getCurrentSkill(json) {
    for (let i = 0; i < json.skill_count; i++) {
      let currentSkill = json.skills[generateDice(json.skills.length, 1)-1]
      let currentAbility = getValue(currentSkill[0]) || ""
      if (currentAbility == "" || currentAbility == null || currentAbility == undefined || currentAbility == '0') {
        let statMod
        switch (currentSkill[1]) {
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
        getSkill(currentSkill[0], statMod, true)
      }
      else setTimeout(getCurrentSkill, 1000, json)
    }
  }
}