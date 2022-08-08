function plantEcoogicalScoring(plant, plot, climate){

    var plantScores = [{
        biodiversityAttractiveness:0,
        sunshine: 0,
        soilAdequation: 0,
        resistanceToDrought: 0,
        coldHardiness: 0,
        climateAdequation: 0
        }];

    if(plant.attracts_birds == "oui"){
        plantScores.biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 7 ~ ecoogicalScoring ~ scrore", scrore)
        
    }
    if(plant.attracts_butterflies == "oui"){
        plantScores.biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 12 ~ ecoogicalScoring ~ scrore", scrore)
        
    }
    if(plant.pollinators == "oui"){
        plantScores.biodiversityAttractiveness +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 17 ~ ecoogicalScoring ~ scrore", scrore)
        
    }

    // if the sunshine of the plot can be types tolerated by the plant then increase by 10 
    if(plant.sunshine.find(type => type == plot.sunshine)){
        plantScores.sunshine +=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 24 ~ ecoogicalScoring ~ score", score)
        
    }

    // if the plot soil is adequate for the plant then increase by 20 
    if(plant.soil_nature.find(soilQuality => soilQuality == plot.soil)){
        plantScores.soilAdequation +=20
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 31 ~ ecoogicalScoring ~ score", score)
        
    }

    //if the nb of months of plant drought tolerance is less than the climate expected nb of months drought
    // increase by 10
    if (plant.resistance_to_drought <= climate.months_drought){
        plantScores.resistanceToDrought+=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 39 ~ ecoogicalScoring ~ scrore", scrore)
        
    }

    // if the plant coudl support a the worst negative temperature of the climant, then
    // increase by 10
    if (plant.cold_hardiness <= climate.min_temp){
        plantScores.coldHardiness+=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 47 ~ ecoogicalScoring ~ scrore", scrore)
        
    }

    // if the plant i native from the climate zone, increase by 20
    if (plant.climate <= climate.climate_type){
        plantScores.climateAdequation=10
        console.log("🚀 ~ file: ecologicalScoring.js ~ line 54 ~ ecoogicalScoring ~ scrore", scrore)
        
        
    }

    console.log("🚀 ~ file: ecologicalScoring.js ~ line 40 ~ ecoogicalScoring ~ scrore", scrore)

    return plantScores
}
