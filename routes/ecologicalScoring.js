function plantEcologicalScoring(plant, plot, climate){

    console.log("🚀 ~ file: ecologicalScoring.js ~ line 3 ~ plantEcologicalScoring ~ plot", plot)
    console.log("🚀 ~ file: ecologicalScoring.js ~ line 4 ~ plantEcologicalScoring ~ plant", plant)
    console.log("🚀 ~ file: ecologicalScoring.js ~ line 5 ~ plantEcologicalScoring ~ climate", climate)

    var biodiversityAttractiveness =0
    var sunshine = 0
    var soilAdequation = 0
    var resistanceToDrought = 0
    var coldHardiness = 0
    var climateAdequation = 0
    
    if(plant.attracts_birds.toLowerCase() == "oui"){
        biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 7 ~ ecoogicalScoring ~ biodiversityAttractiveness", biodiversityAttractiveness)
        
    }
    if(plant.attracts_butterflies.toLowerCase() == "oui"){
        biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 12 ~ ecoogicalScoring ~ biodiversityAttractiveness", biodiversityAttractiveness)
        
    }
    if(plant.pollinators.toLowerCase() == "oui"){
        biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 17 ~ ecoogicalScoring ~ biodiversityAttractiveness", biodiversityAttractiveness)
        
    }

    // if the sunshine of the plot can be types tolerated by the plant then increase by 10 
    console.log("🚀 ~ file: ecologicalScoring.js ~ line 34 ~ plantEcologicalScoring ~ plot.sunshine", plot.sunshine)
    console.log("🚀 ~ file: ecologicalScoring.js ~ line 35 ~ plantEcologicalScoring ~ plant.sunshine.toLowerCase()", plant.sunshine.toLowerCase())

    var regExPlotClimate = new RegExp(plot.sunshine, 'gmi')
    //var regexSunshine = /soleil/gmi
    if (plant.sunshine.match(regExPlotClimate)){
        sunshine +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 24 ~ ecoogicalScoring ~ score", sunshine)
        
    }

    // if the plot soil is adequate for the plant then increase by 20 
    var regExPlotSoil = new RegExp(plot.soil, 'gmi')
    console.log('Mimic: soleil, mi-ombre'.match(regExPlotSoil))

    if(plant.soil_nature.match(regExPlotSoil)){
        soilAdequation +=20
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 31 ~ ecoogicalScoring ~ score", soilAdequation)
        
    }

    //if the nb of months of plant drought tolerance is less than the climate expected nb of months drought
    // increase by 10
    if (plant.resistance_to_drought <= climate.months_drought){
        resistanceToDrought +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 39 ~ ecoogicalScoring ~ scrore", resistanceToDrought)
        
    }

    // if the plant coudl support a the worst negative temperature of the climant, then
    // increase by 10
    if (plant.cold_hardiness <= climate.min_temp){
        coldHardiness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 47 ~ ecoogicalScoring ~ scrore", coldHardiness)
        
    }

    // if the plant i native from the climate zone, increase by 20
    if (plant.climate.toLowerCase() == climate.climate_type.toLowerCase()){
        climateAdequation =10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 54 ~ ecoogicalScoring ~ scrore", climateAdequation)
        
        
    }


    return [biodiversityAttractiveness, sunshine, soilAdequation, resistanceToDrought, coldHardiness, climateAdequation]
}

function plotEcologicalScoring(plot, climate){

console.log("🚀 ~ file: ecologicalScoring.js ~ line 73 ~ plotEcologicalScoring ~ climate", climate)
console.log("🚀 ~ file: ecologicalScoring.js ~ line 74 ~ plotEcologicalScoring ~ plot", plot)

    var plotScores = {
        biodiversityAttractiveness:0,
        sunshine: 0,
        soilAdequation: 0,
        resistanceToDrought: 0,
        coldHardiness: 0,
        climateAdequation: 0
        };

    var nbPlants = plot.groundedPlants.length

    // for each plant calculate the ecological scoring

    var biodiversityAttractivenessScore = 0
    var sunshineScore = 0
    var soilAdequationScore = 0
    var resistanceToDroughtScore = 0
    var coldHardinessScore = 0
    var climateAdequationScore = 0


    if (nbPlants !=0){

        plot.groundedPlants.map((currentPlant)=>{
            
            var result  = plantEcologicalScoring(currentPlant, plot, climate )

            biodiversityAttractivenessScore += result[0]
            sunshineScore += result[1]
            soilAdequationScore += result[2]
            resistanceToDroughtScore += result[3]
            coldHardinessScore += result[4]
            climateAdequationScore += result[5]

        })
        
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 111 ~ plot.groundedPlants.map ~ biodiversityAttractivenessScore", biodiversityAttractivenessScore)
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 113 ~ plot.groundedPlants.map ~ sunshineScore", sunshineScore)
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 115 ~ plot.groundedPlants.map ~ soilAdequationScore", soilAdequationScore)
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 117 ~ plot.groundedPlants.map ~ resistanceToDroughtScore", resistanceToDroughtScore)
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 119 ~ plot.groundedPlants.map ~ coldHardinessScore", coldHardinessScore)
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 121 ~ plot.groundedPlants.map ~ climateAdequationScore", climateAdequationScore)

        //calculate the average of each part of the scores
        plotScores.biodiversityAttractiveness = biodiversityAttractivenessScore/nbPlants
        plotScores.sunshine = sunshineScore/nbPlants
        plotScores.soilAdequation = soilAdequationScore/nbPlants
        plotScores.resistanceToDrought = resistanceToDroughtScore/nbPlants
        plotScores.coldHardiness = coldHardinessScore/nbPlants
        plotScores.climateAdequation = climateAdequationScore/nbPlants

        console.log("🚀 ~ file: ecologicalScoring.js ~ line 108 ~ plotEcologicalScoring ~ plotScores", plotScores)
    }


    return plotScores
}

module.exports = {plantEcologicalScoring, plotEcologicalScoring};


