 
function maximumCupcakes(trips) {
    if(trips != null && trips.length > 0 && trips.length <= 1000) {
        var trips, totalAmount, cost, promotions;
        var index = 0;
        var parameters = [];
        for(index = 0; index < trips.length; index++){
            parameters = trips[index].toString().split(' ');
            if(parameters != null && parameters.length === 3) {
                totalAmount = parseInt(parameters[0]) || 0;
                cost = parseInt(parameters[1]) || 0;
                promotions = parseInt(parameters[2]) || 0;

                if(totalAmount >= 2 && totalAmount <= 100000 && cost >= 1 && cost <= totalAmount && promotions >= 2 && promotions <= totalAmount) {
                  var totalCupcakes, bonusCupcakes, leftPromotions, temp;
                  totalCupcakes = parseInt(totalAmount/cost);
                  temp = parseInt(totalAmount/cost);
                  bonusCupcakes = parseInt(totalCupcakes/promotions);                             
                  if(temp > promotions){  
                    leftPromotions = parseInt(temp % promotions);
                  } else {
                    leftPromotions = 0;
                  }
                  while(bonusCupcakes > 0) {                  
                  	totalCupcakes += bonusCupcakes;
                    temp = bonusCupcakes;                    
                    if(temp > promotions){  
                    	leftPromotions += parseInt(temp % promotions);
                    	bonusCupcakes = parseInt(temp/promotions) || 0;
                    } else {
                    	bonusCupcakes = parseInt((temp + leftPromotions)/promotions) || 0;   
                    	leftPromotions = 0;
                    }
                  }                
                    console.log(totalCupcakes);
                }
            }
        }
    }
}