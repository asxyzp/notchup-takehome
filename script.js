//Script to fetch & display appropriate data

//Contains course ID w/ it's course name of all available courses for notchup
let allCourses = {
	1 : "Scratch Junior",
	2 : "Game Development",
	3 : "App Development",
	4 : "Web Development",
	5 : "Python",
	6 : "Artificial Intelligence"
};

let allCourseID = Object.keys(allCourses);	//Will store keys/course ID of all available courses on allCourseID

//Setting min & max date for date attribute based on current date
let date = new Date();			//Gets date
let minhour;					//For storing minimum hour
let minday, minmonth, minyear;	//For storing minimum date, month & year
let maxday, maxmonth, maxyear;	//For storing maximum date, month & year

//Getting current day, month & year 
let day = date.getDate();		//Gets current day 
let month = date.getMonth();	//Gets current month
let year = date.getFullYear();	//Gets current year
let hour = date.getHours();		//Gets current hour
let min = date.getMinutes();	//Gets current minute

let maxDatesPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; 	//Maximum dates per month
//If the year is a leap year then the number of days in february is changed to 29
let isLeapYear = (year) => {
	if(year%4==0){
		if(year%100==0){
			if(year%400==0){
				maxDatesPerMonth[1]=29;
			}
		}
	}
}
isLeapYear(year);

//Generates minhour & mindate
let getMinHourDate = () =>{
	minhour = hour+4;
	if(minhour>23)
	{
		minhour%=24;
		minday=day+1;									//Minday will be greater than current day + 1 if minhour+4>23
		if(minday>maxDatesPerMonth[month-1]){			//If Minday exceeds the maximum number of days in the month
			minday=minday%maxDatesPerMonth[month-1];	//Provide date of other month
			minmonth=month+1;							//Increase month by 1
			if(minmonth>12){							//If year is greater than 12
				minmonth=minmonth%12;					//Change month to 1
				year+=1;								//Increase year by 1
				return minyear+'-'+minmonth+'-'+minday;	//In the YYYY-MM-DD format
			}
			return minyear+'-'+minmonth+'-'+minday;		//In the YYYY-MM-DD format
		}
	}
	minday=day;
	minmonth=month;
	minyear=year;
	if(minday<10)
		minday='0'+minday;
	if(minmonth<10)
		minmonth='0'+minmonth;
	minyear+='';
	return minyear+'-'+minmonth+'-'+minday;			//In the YYYY-MM-DD format
}

//Generates mindate, minmonth & minyear
let getMaxDate = () =>{
	maxday=day+7;									//Minday will be greater than current day + 4
	if(maxday>maxDatesPerMonth[month-1]){			//If Minday exceeds the maximum number of days in the month
		maxday=maxday%maxDatesPerMonth[month-1];	//Provide date of other month
		maxmonth=month+1;							//Increase month by 1
		if(maxmonth>12){							//If year is greater than 12
			maxmonth=maxmonth%12;					//Change month to 1
			year+=1;								//Increase year by 1
			return maxyear+'-'+maxmonth+'-'+maxday; //In the YYYY-MM-DD format
		}
		return maxyear+'-'+maxmonth+'-'+maxday;		//In the YYYY-MM-DD format
	}
	maxmonth=month;
	maxyear=year;
	if(maxday<10)
		maxday='0'+maxday;							//Since minday is in the form DD
	if(maxmonth<10)
		maxmonth='0'+maxmonth;						//Since maxday is in the form DD
	maxyear+='';
	return maxyear+'-'+maxmonth+'-'+maxday;			//In the YYYY-MM-DD format
}


let numbers = [0,1,2,3,4,5,6,7,8,9];
let characters = [];
for(let i=65;i<=65+26;i++){
	characters.push(String.fromCharCode(i));
}


$(document).ready(function(){
	//Setting min day & max day depending on output of the functions getMinHourDate() & getMaxDate()
	$(".suitable-date").attr('min',getMinHourDate());
	$(".suitable-date").attr('max',getMaxDate());

});

//Fetching up data from the site
fetch("https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec")
//Response is then converted to JSON file
.then(response=>response.json())
.then(data=>{

	let availableCourseID = [];		//Will store the ID of all available courses which are fetch from the data source

	//Converts allCourseID values to number
	for(let i=0;i<allCourseID.length;i++)
		allCourseID[i] = Number(allCourseID[i]);

	//To check which courses are not available & then disabling it's respective radio button
	for(let i=0;i<data.length;i++)
		availableCourseID.push(data[i]["course_id"]);
	
	//Checking if the number of available courses is same as the number of all sourses
	if(Object.keys(allCourses).length!=availableCourseID.length){
		//If noy, then it will check which ID is not available & will respectively disable it's radio button
		//And put a line-through text decoration for the radio button's labels
		for(let i=0;i<allCourseID.length;i++){
			if(availableCourseID.indexOf(allCourseID[i])===-1){
				switch(allCourseID[i]){
					//When scratch isn't available, disable it's radio button & strikethrough it's text
					case 1:
						$("[for='scratch']").css("text-decoration",'line-through');
						$(".scratch").prop("disabled",true);						
						break;
					case 2:
					//When game isn't available, disable it's radio button & strikethrough it's text
						$("[for='game']").css("text-decoration",'line-through');
						$(".game").prop("disabled",true);
						break;
					case 3:
					//When app isn't available, disable it's radio button & strikethrough it's text
						$("[for='app']").css("text-decoration",'line-through');
						$(".app").prop("disabled",true);
						break;
					case 4:
					//When web isn't available, disable it's radio button & strikethrough it's text
						$("[for='web']").css("text-decoration",'line-through');
						$(".web").prop("disabled",true);
						break;
					case 5:
					//When python isn't available, disable it's radio button & strikethrough it's text
						$("[for='python']").css("text-decoration",'line-through');
						$(".python").prop("disabled",true);
						break;
					case 6:
					//When ai isn't available, disable it's radio button & strikethrough it's text
						$("[for='ai']").css("text-decoration",'line-through');
						$(".ai").prop("disabled",true);
						break;
				}
			}
		}
	}

	let courseTimeSlots = {};	//An object which will store course_id with all available slots in the unixtime
	for(let i=0;i<availableCourseID.length;i++){
		courseTimeSlots[availableCourseID[i]]=data[i]["slots"];
	}

	let allSlots = Object.values(courseTimeSlots);	//Will store all slot values which will be converted to date type
	
	//Converting all fetched time slots for all dates & time from UNIX time to appropriate time format
	for(i=0;i<allSlots.length;i++){
		for(let j=0;j<allSlots[i].length;j++){
			let unix_timestamp = (Number(allSlots[i][j]["slot"]));
			let fullDate = new Date(unix_timestamp);	//From unixtime to date
			let date =  fullDate.getDate();				//Getting date (1-31)
			if(date<10)
				date="0"+date;
			date+="";
			let month = fullDate.getMonth()+"";			//Getting month (1-12)
			if(month<10)
				month="0"+month;
			month+="";
			let year = 	fullDate.getFullYear()+"";		//Getting year
			let hours = fullDate.getHours()+"";			//Getting hours (0-23)
			let minutes = fullDate.getMinutes()+"";		//Getting minutes (1-60)
			allSlots[i][j] = [year+"-"+month+"-"+date, hours,minutes];	//Storing time slot in the format [YYYY-MM-DD, HH:MM]
		}
	}

	let availableTimeSlots=[];			//Stores all available time slots for the day
	let courseSelected;					//Stores the course selected using radio button
	let dateSelected;					//Stores date selected from the date input box
	
	//Getting current date in YYYY-MM-DD format & hours, min in string
	let cDay,cMonth,cYear,cHour,cMin;
	if(day<10)				//Getting days in string
		cDay="0"+day;		
	else
		cDay=""+day;
	if(month<10)			//Getting months in string
		cMonth="0"+month;
	else
		cMonth=""+month;
	cYear=year+"";			//Getting years in string
	let cYMD = cYear+'-'+cMonth+'-'+cDay;
	cHour = hour+"";		//Getting hours in string
	cMin = min+"";			//Getting minutes in string

	$('input[name="course"]').on("change",function(){
		courseSelected = $('input[name="course"]:checked').val();
	});

	//When course is changed then it will be stored in courseSelected
	//when date is changed then it will be stored in dateSelected
	$('.suitable-date').on("change",function(){

		/*
			Function : showOrNot(length)
			Functionality : It selects what to show & what not to show depending on the parameter which is the length of available time slots which can be empty or non-empty
			Parameters : length : Number of available time slots (>=0)
			Return value : NONE
		*/
		let showOrNot = (length) =>{
				//When number of available slots = 0
				if(availableTimeSlots.length==0){
					$(".timeslot-txt").css("display","block");
					$(".no-timeslot-msg").css("display","block");
					$(".tslot_label").css("display","none");		//Hiding the time-slot input values
				}

				//When the number of available slots >0
				else{
					$(".no-timeslot-msg").css("display","none");
					$(".timeslot-txt").css("display","block");
					for(let i=0;i<availableTimeSlots.length;i++){
						if (i==0){
							$(".dropdown").after(`<label class="tslot_label" for="${availableTimeSlots[i]}"><input type="radio" id="${availableTimeSlots[i]}" value="${availableTimeSlots[i]}" name="tslot" class="tslot" checked/>&nbsp;${availableTimeSlots[i]}&nbsp;</label>`);
						}
						else{
							$(".dropdown").after(`<label class="tslot_label" for="${availableTimeSlots[i]}"><input type="radio" id="${availableTimeSlots[i]}" value="${availableTimeSlots[i]}" name="tslot" class="tslot"/>&nbsp;${availableTimeSlots[i]}&nbsp;</label>`);
						}
					}
				}
		}

		
		dateSelected = $('.suitable-date').val();

		//Checking if courseSelected is empty or not
		if($(`input[name='course']:checked`).val()!=''){
			//When selected course is scratch
			if($(`input[name='course']:checked`).val()=='scratch'){
				console.log("SCRATCH AT "+dateSelected);
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot

					//Appropriate time slots will be pushed into the array
					for(let i=0;i<courseTimeSlots[1].length;i++){
						if(courseTimeSlots[1][i][0]==dateSelected){
							if(Number(courseTimeSlots[1][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[1][i][1]+":"+courseTimeSlots[1][i][2]);
							}
						}
					}

					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];

					for(let i=0;i<courseTimeSlots[1].length;i++){
						if(courseTimeSlots[1][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[1][i][1]+":"+courseTimeSlots[1][i][2]);
						}
					}
					
					showOrNot(availableTimeSlots.length);
				}
			}

			//When select course is game Development
			if($(`input[name='course']:checked`).val()=='game'){
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot
					
					for(let i=0;i<courseTimeSlots[2].length;i++){
						if(courseTimeSlots[2][i][0]==dateSelected){
							if(Number(courseTimeSlots[2][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[2][i][1]+":"+courseTimeSlots[2][i][2]);
							}
						}
					}
					
					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];
					
					for(let i=0;i<courseTimeSlots[2].length;i++){
						if(courseTimeSlots[2][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[2][i][1]+":"+courseTimeSlots[2][i][2]);
						}
					}
					
					showOrNot(availableTimeSlots.length);
				}
			}

			//When selected course is web Development
			if($(`input[name='course']:checked`).val()=='app'){
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot
					for(let i=0;i<courseTimeSlots[3].length;i++){
						if(courseTimeSlots[3][i][0]==dateSelected){
							if(Number(courseTimeSlots[3][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[3][i][1]+":"+courseTimeSlots[3][i][2]);
							}
						}
					}
					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];
					for(let i=0;i<courseTimeSlots[3].length;i++){
						if(courseTimeSlots[3][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[3][i][1]+":"+courseTimeSlots[3][i][2]);
						}
					}
					showOrNot(availableTimeSlots.length);
				}
			}

			//When selected course is app development
			if($(`input[name='course']:checked`).val()=='web'){
				console.log("APP AT "+dateSelected);
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot
					for(let i=0;i<courseTimeSlots[4].length;i++){
						if(courseTimeSlots[4][i][0]==dateSelected){
							if(Number(courseTimeSlots[4][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[4][i][1]+":"+courseTimeSlots[4][i][2]);
							}
						}
					}
					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];
					for(let i=0;i<courseTimeSlots[4].length;i++){
						if(courseTimeSlots[4][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[4][i][1]+":"+courseTimeSlots[4][i][2]);
						}
					}
					showOrNot(availableTimeSlots.length);
				}
			}

			//When selected course is python
			if($(`input[name='course']:checked`).val()=='python'){
				console.log("PYTHON AT "+dateSelected);
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot
					for(let i=0;i<courseTimeSlots[5].length;i++){
						if(courseTimeSlots[5][i][0]==dateSelected){
							if(Number(courseTimeSlots[5][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[5][i][1]+":"+courseTimeSlots[5][i][2]);
							}
						}
					}
					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];
					for(let i=0;i<courseTimeSlots[5].length;i++){
						if(courseTimeSlots[5][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[5][i][1]+":"+courseTimeSlots[5][i][2]);
						}
					}
					showOrNot(availableTimeSlots.length);
				}
			}

			//When selected course is AI
			if($(`input[name='course']:checked`).val()=='ai'){
				console.log("AI AT "+dateSelected);
				if(dateSelected==cYMD){				//If the selected date is the current date
					availableTimeSlots = [];		//Will store the avilable time slot
					for(let i=0;i<courseTimeSlots[6].length;i++){
						if(courseTimeSlots[6][i][0]==dateSelected){
							if(Number(courseTimeSlots[6][i][1])>Number(cHour)+4){
								availableTimeSlots.push(courseTimeSlots[6][i][1]+":"+courseTimeSlots[6][i][2]);
							}
						}
					}
					showOrNot(availableTimeSlots.length);
				}
				else{
					availableTimeSlots = [];
					for(let i=0;i<courseTimeSlots[6].length;i++){
						if(courseTimeSlots[6][i][0]==dateSelected){
							availableTimeSlots.push(courseTimeSlots[6][i][1]+":"+courseTimeSlots[6][i][2]);
						}
					}
					showOrNot(availableTimeSlots.length);
				}
			}			
		}
	});
});

