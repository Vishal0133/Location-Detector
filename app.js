let button=document.querySelector("button");

button.addEventListener("click",()=>{
    if(navigator.geolocation) {    //if browser supports

        /*
    To obtain the user's current location, you can call the getCurrentPosition() method.
     This initiates an asynchronous request to detect the user's position, 
     and queries the positioning hardware to get up-to-date information. 

     it takes three parameters success,error,options. we dont need 3rd parameter

        */
     button.innerText="Allow to Detect Location";
    
     navigator.geolocation.getCurrentPosition(onSuccess,onError);


}
else{
    button.innerText="Your browser doesn't support"
}
}
);

function onSuccess(position){
    button.innerText="Your Loaction is.....";
    console.log(position);
    let {latitude,longitude}=position.coords;
    console.log(latitude,longitude);
    //https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=316c6197376a4d5ca63c28c7fd68365e

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=316c6197376a4d5ca63c28c7fd68365e`)
    .then(res => res.json()) .then(result=>{
       let all_details=result.results[0].components;
       let {state,city,county,suburb,postcode}=all_details;
       console.log(result);

       button.innerText=`${state} ,${city}, ${county},${postcode}`;
    })
    

    
    
}
function onError(error){
    if(error==1){
        button.innerText="You denied the request";
    }
    else if(error==2){
        button.innerText="Location not available";
    }
    else{
        button.innerText="Something went wrong";
    }
    button.setAttribute("disabled","true") //if user denies
}