const dt = new Date();
console.log(dt);
dt.setHours(dt.getHours()+9);
console.log(dt)

const today = dt.toISOString().slice(0, 19).replace('T', ' ');
console.log(today)