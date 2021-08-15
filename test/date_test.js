const dt = new Date();
dt.setDate(dt.getHours()+9);
console.log(dt)

const today = dt.toISOString().slice(0, 19).replace('T', ' ');
console.log(today)