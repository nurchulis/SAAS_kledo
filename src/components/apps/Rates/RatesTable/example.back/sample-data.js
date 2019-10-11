const data = [];

let id = 0;
for(let date=29; date<=31; date += 1 ){
  data.push({id, date, currentMonth: false});
  id += 1;
}

for(let date=1; date<=31; date += 1 ){
  data.push({id, date, currentMonth: true});
  id += 1;
}

for(let date=1; id<35; id += 1 ){
  data.push({id, date, currentMonth: false});
  date += 1;
}

console.log(data);
export default data;
