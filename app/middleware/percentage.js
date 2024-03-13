const { CategoryModel } = require("../model/category")

function percentage(params) {
    const cost = []
    params.forEach(key => {
        cost.push(key.categoryID)
        cost.push(key.howMuch)
    })
    const SuM = []
    for (let index = 1; index < cost.length; index = index + 2) {
        SuM.push(Number(cost[index]))
    }
    const sum = SuM.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    const percent = []
    SuM.forEach(key => {
        let calculate = (key * 100) / sum
        calculate = `${calculate.toFixed(2)}%`
        percent.push(calculate)
    })

    let i = 0
    for (let index = 1 ; index < cost.length; index = index + 2) {
            cost[index] = percent[i]
            i = i + 1
        }
    return cost
}

async function nameOfCategory(params) {
    for (let index = 0; index < params.length; index = index + 2) {
        const findCategory = await CategoryModel.find({_id: params[index]})
        params[index] = findCategory[0].title
    }
    return params
}

function finalPercentage(params) {
    let countMap = new Map();

    for (let i = 0; i < params.length; i += 2) {
        let key = params[i];
        let value = params[i + 1];

        
        if (countMap.has(key)) {
            const array = [countMap.get(key), value]
            let sum = array.reduce((acc, currentValue) => {
                let number = parseFloat(currentValue.replace("%", ""));
                return acc + number;
            }, 0);
            sum = sum.toFixed(2)
            sum = sum.toString() + "%"

            countMap.set(key, sum);
        } else {
            countMap.set(key, value);
        }
    }

    let result = [];

    countMap.forEach((value, key) => {
        result.push(key);
        result.push(value);
    });

    return result;
}



module.exports = {
    percentage, nameOfCategory, finalPercentage
}