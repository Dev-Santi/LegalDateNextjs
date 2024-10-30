function createDate() {
    const year = {
        yearNumber: "2025",
        months: []
   }
   
   const daysNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
   const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre","Diciembre"]
   const monthsLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
   
   let dayIndex = 2;
   for (let i = 0; i < 12; i++) {
       const currentDays = []
       const m = ((i + 1) + "").length < 2 ? "0" + (i+1) : "" + (i+1);
   
       for (let j = 1; j <= monthsLengths[i]; j++) {
           const d = (j + "").length < 2 ? "0" + j : "" + j;
           
           
           currentDays.push({
               date: "2025-" + m + "-" + d,
               name: daysNames[dayIndex],
               holiday: {},
               isJudicialVacation: false
           })
   
           dayIndex++;
           if(dayIndex == 7) dayIndex = 0;
       }
       
       year.months.push({
           monthName: months[i],
           days: currentDays
       })
   }
   
   console.log(year)
}