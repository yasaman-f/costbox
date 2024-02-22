const sundate = require("sundate");

function DateConverter(shamsiDate) {

    const dateString = shamsiDate;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();
    
    const result = [year, month < 10 ? month : month, day < 10 ? '0' + day : day];

    const ResUlt = sundate.j_to_g(result[0], result[1], result[2])
    console.log(ResUlt);
    
}


module.exports = {DateConverter}

