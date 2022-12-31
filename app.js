
const form =  document.querySelector('#searchForm');
//dom manupulation
const res = document.querySelector('#tableResult');
var upd;
//this will be executed only when submit button is clicked 
form.addEventListener('submit',(e)=>{
    //to stop the previous coin to get upadted while we are switching on another coin so puuting condition
    //if upd has some value means previous coin is getting updated  so we have to clear it first
    if(upd)
    {//stop updating
        clearTimeout(upd);
    }
    //to stop automatic refereshing on clicking submit buttton 
    //we use preventDefault 
    e.preventDefault();
    const cType = form.elements.coinType.value;
    //console.log(cType);
    //for fetching the api we use to create async function
    fetchPrice(cType);
})
//apis works on promises so it well take some time thts why we use async function
const fetchPrice = async(cType) =>{
 //whenevr we are fetching from apis put awaits (bcz it will take some time to fetch )
 const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${cType}?currency=USD`);
 console.log(r.data.coin.price);
 //slant inverted commas r used for to add const in link 
 //console.log(r.data.ticker.price);
 const price = r.data.coin.price;
 const volume = r.data.coin.volume;
 const change = r.data.coin.priceChange1d;
 const base = r.data.coin.name;
 const target = 'USD';
 

   res.innerHTML=`<tr style="background-color:blue; color:white; font-weight:700">
   <!--this for table row and td for table content in that row-->
   <td>Property</td>
   <td>Value</td>
 </tr>
 <tr>
   <td>${base}</td>
   <td>${price} ${target}</td>
 </tr>
 <tr>
     <td>volume</td>
     <td>${volume}</td>
   </tr>
   <tr>
     <td>change</td>
     <td>${change}</td>
   </tr>
   `;

   //we r calling the fetch function again to refetch after some time(in this case 10sec) means upadte the price
   upd =  setTimeout(()=>fetchPrice(cType),10000);
}