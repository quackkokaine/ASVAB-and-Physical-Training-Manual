(function(){
function Q(q,a,w,e){return {q:q,a:a,w:w,e:e||''}}
function pairs(list,fq,fe,rev){ // list of [prompt, answer]; wrong answers drawn from the other answers
  var pool=list.map(function(p){return p[1]});
  return list.map(function(p){return {q:fq(p[0]),a:p[1],pool:pool,e:fe?fe(p[0],p[1]):''}});
}
var ORD=['To take charge of this post and all government property in view.','To walk my post in a military manner, keeping always on the alert, and observing everything that takes place within sight or hearing.','To report all violations of orders I am instructed to enforce.','To repeat all calls from posts more distant from the guard house than my own.','To quit my post only when properly relieved.','To receive, obey and pass on to the sentry who relieves me all orders from the commanding officer, field officer of the day, officer of the day, and officers and petty officers of the watch.','To talk to no one except in the line of duty.','To give the alarm in case of fire or disorder.','To call the petty officer of the watch in any case not covered by instructions.','To salute all officers and all colors and standards not cased.','To be especially watchful at night, and during the time for challenging, to challenge all persons on or near my post, and to allow no one to pass without proper authority.'];
var SHORT=['To take charge of this post and all government property in view.','To quit my post only when properly relieved.','To talk to no one except in the line of duty.','To give the alarm in case of fire or disorder.','To salute all officers and all colors and standards not cased.','To report all violations of orders I am instructed to enforce.','To call the petty officer of the watch in any case not covered by instructions.'];
var orders=[
 Q('What is the <b>first</b> general order?',ORD[0],[ORD[4],ORD[6],ORD[9]],'The first order is to take charge of the post and all government property in view.'),
 Q('Which general order tells you when you may leave your post?',ORD[4],[ORD[0],ORD[2],ORD[6]],'You quit your post only when properly relieved.'),
 Q('What must a sentry do in case of fire or disorder?',ORD[7],[ORD[2],ORD[8],ORD[9]],'The order is to give the alarm.'),
 Q('Who may a sentry talk to?',ORD[6],[ORD[1],ORD[3],ORD[7]],'The seventh order: talk to no one except in the line of duty.'),
 Q('What should a sentry do in any case not covered by instructions?',ORD[8],[ORD[3],ORD[7],ORD[10]],'Call the petty officer of the watch.'),
 Q('Which order covers saluting?',ORD[9],[ORD[0],ORD[1],ORD[10]],'Salute all officers and all colors and standards not cased.'),
 Q('How many general orders are there?','Eleven',['Nine','Ten','Twelve'],'There are eleven, common to all branches of the U.S. Armed Forces.'),
 Q('Which order covers watchfulness at night?',ORD[10],[ORD[1],ORD[7],ORD[3]],'Be especially watchful at night and challenge all persons on or near your post.')
];

var OFF=[['Ensign (ENS)','O-1','off-ens'],['Lieutenant Junior Grade (LTJG)','O-2','off-ltjg'],['Lieutenant (LT)','O-3','off-lt'],['Lieutenant Commander (LCDR)','O-4','off-lcdr'],['Commander (CDR)','O-5','off-cdr'],['Captain (CAPT)','O-6','off-capt'],['Rear Admiral (lower half) (RDML)','O-7','off-rdml'],['Rear Admiral (RADM)','O-8','off-radm'],['Vice Admiral (VADM)','O-9','off-vadm'],['Admiral (ADM)','O-10','off-adm'],['Chief Warrant Officer 2 (CWO2)','W-2','off-cwo2'],['Chief Warrant Officer 3 (CWO3)','W-3','off-cwo3'],['Chief Warrant Officer 4 (CWO4)','W-4','off-cwo4']];
var offGrades=['O-1','O-2','O-3','O-4','O-5','O-6','O-7','O-8','O-9','O-10','W-2','W-3','W-4'];
var officers=OFF.map(function(p){return {q:'What is the pay grade of a <b>'+p[0]+'</b>?',a:p[1],pool:offGrades,e:p[0]+' is '+p[1]+'.'}});
officers.push({q:'Which rank is a flag officer?',a:'Vice Admiral',pool:['Commander','Captain','Lieutenant','Ensign','Lieutenant Commander'],e:'Flag officers are Rear Admiral (lower half) through Admiral.'});
officers.push({q:'What does the abbreviation <b>LCDR</b> stand for?',a:'Lieutenant Commander',pool:['Lieutenant','Commander','Lieutenant Junior Grade','Captain'],e:'LCDR is a Lieutenant Commander, O-4.'});
var offNames=OFF.map(function(p){return p[0]});
[['off-ens',0],['off-lt',2],['off-cdr',4],['off-capt',5],['off-vadm',8]].forEach(function(p){officers.push({q:'Which officer rank does this insignia show?',img:'img/'+p[0]+'.webp',a:offNames[p[1]],pool:offNames.slice(0,10),e:'This is a '+offNames[p[1]]+'.'})});
var ENL=[['Seaman Recruit (SR)','E-1'],['Seaman Apprentice (SA) or Fireman Apprentice (FA)','E-2'],['Seaman (SN) or Fireman (FN)','E-3'],['Petty Officer Third Class (PO3)','E-4'],['Petty Officer Second Class (PO2)','E-5'],['Petty Officer First Class (PO1)','E-6'],['Chief Petty Officer (CPO)','E-7'],['Senior Chief Petty Officer (SCPO)','E-8'],['Master Chief Petty Officer (MCPO)','E-9']];
var enGrades=['E-1','E-2','E-3','E-4','E-5','E-6','E-7','E-8','E-9'];
var enlisted=ENL.map(function(p){return {q:'What is the pay grade of a <b>'+p[0]+'</b>?',a:p[1],pool:enGrades,e:p[0]+' is '+p[1]+'.'}});
enlisted.push(Q('What color are the sleeve stripes for the non-rate deck (seaman) grades?','White',['Red','Gold','Blue'],'White is for deck (seaman); red is for engineering (fireman).'));
enlisted.push(Q('What color are the sleeve stripes for the non-rate engineering (fireman) grades?','Red',['White','Gold','Blue'],'Red is for engineering (fireman).'));
enlisted.push(Q('Which grades are non-rate?','E-1 to E-3',['E-4 to E-6','E-7 to E-9','E-1 to E-9'],'Seaman Recruit, Apprentice and Seaman or Fireman.'));
enlisted.push(Q('Which is the senior enlisted position in the whole Coast Guard?','Master Chief Petty Officer of the Coast Guard (MCPOCG)',['Chief Petty Officer','Petty Officer First Class','Seaman'],'MCPOCG is an E-9.'));
enlisted.push({q:'Which grade does this insignia show?',img:'img/enl-cpo-collar.webp',a:'Chief Petty Officer (CPO)',pool:['Petty Officer First Class (PO1)','Senior Chief Petty Officer (SCPO)','Master Chief Petty Officer (MCPO)','Petty Officer Second Class (PO2)'],e:'This is the Chief Petty Officer collar device (E-7).'});
var RT=[['AET','Avionics Electrical Technician'],['AMT','Aviation Maintenance Technician'],['AST','Aviation Survival Technician'],['BM','Boatswain\'s Mate'],['CS','Culinary Specialist'],['DC','Damage Controlman'],['DV','Diver'],['EM','Electrician\'s Mate'],['ET','Electronics Technician'],['GM','Gunner\'s Mate'],['HS','Health Services Technician'],['IS','Intelligence Specialist'],['IT','Information Systems Technician'],['ME','Maritime Enforcement Specialist'],['MK','Machinery Technician'],['MST','Marine Science Technician'],['MU','Musician'],['OS','Operations Specialist'],['PA','Public Affairs Specialist'],['SK','Storekeeper'],['YN','Yeoman']];
var rtNames=RT.map(function(p){return p[1]});
var ratings=RT.filter(function(_,i){return i%2===0||i>9}).map(function(p){return {q:'What does the rating abbreviation <b>'+p[0]+'</b> stand for?',a:p[1],pool:rtNames,e:p[0]+' is '+p[1]+'.'}});
ratings.push(Q('What is a rating?','The plain-language name for an enlisted person\'s occupational specialty',['A pay grade','A kind of uniform','A test score'],'Only enlisted personnel have a rating.'));
ratings.push(Q('Which personnel have a rating?','Only enlisted personnel',['Only officers','Everyone','Only reservists'],'Officers do not have ratings.'));
ratings.push(Q('Which rating is Reserve only?','Investigator (IV)',['Yeoman (YN)','Diver (DV)','Musician (MU)'],'IV is Reserve only.'));
ratings.push({q:'Which rating does this insignia show?',img:'img/rating-DV.webp',a:'Diver (DV)',pool:['Musician (MU)','Storekeeper (SK)','Yeoman (YN)','Culinary Specialist (CS)'],e:'This is the Diver rating badge.'});
ratings.push({q:'Which rating does this insignia show?',img:'img/rating-BM.webp',a:'Boatswain\'s Mate (BM)',pool:['Gunner\'s Mate (GM)','Machinery Technician (MK)','Operations Specialist (OS)','Yeoman (YN)'],e:'This is the Boatswain\'s Mate rating badge.'});
var FPN=[['FPCON NORMAL','Routine security posture'],['FPCON ALFA','Possible terrorist activity'],['FPCON BRAVO','Predictable terrorist threat activity exists'],['FPCON CHARLIE','Terrorist targeting against personnel and facilities is imminent'],['FPCON DELTA','Terrorist action against a specific location imminent']];
var fpDesc=FPN.map(function(p){return p[1]}),fpNames=FPN.map(function(p){return p[0]});
var fpcon=FPN.map(function(p){return {q:'Which condition means: <b>'+p[1]+'</b>?',a:p[0],pool:fpNames,e:p[0]+': '+p[1]+'.'}});
fpcon.push({q:'What does <b>FPCON ALFA</b> mean?',a:'Possible terrorist activity',pool:fpDesc,e:'ALFA means possible terrorist activity.'});
fpcon.push(Q('Which is the highest Force Protection Condition?','FPCON DELTA',['FPCON NORMAL','FPCON ALFA','FPCON BRAVO'],'The order is Normal, Alfa, Bravo, Charlie, Delta.'));
fpcon.push(Q('What do higher FPCON levels add?','More restrictions and Random Anti-terrorism Measures (RAM)',['Longer liberty','Fewer inspections','More leave'],'For example, limiting who may enter the installation.'));
fpcon.push(Q('What is FPCON?','A terrorism threat system that identifies what security measures to take',['A uniform standard','A fitness test','A firearms rule'],'Force Protection Condition.'));
var TERM=[['Aft','Towards the rear'],['Aloft','Above the ship\'s uppermost solid structure, overhead or high above'],['Alongside','By the side of the pier or ship'],['Awash','Sitting so low in the water that water is constantly washing across the top surface'],['Beam','Greatest athwartships width of a vessel'],['Billet','A crew member\'s assigned duties within the ship\'s organization'],['Bow','The front of the ship'],['Brow','A moveable ladder or ramp used to board a vessel from a dock or pier'],['Centerline','Imaginary line running from the ship\'s bow to stern'],['Check','To slack off slowly, to ease off a line a little'],['Davit','Shipboard crane that can be swung out over the side'],['Fast','Snugly secured'],['Fathom','A six foot unit of length'],['Fender','Equipment such as an inflated ball that goes between the vessel and another object to absorb shock'],['Gunwale','Upper edge or rail of a ship or boat\'s side'],['Hawser','Large line'],['Keel','Center of the hull, lowest in the water'],['Lee','Side of the vessel sheltered from wind'],['Mast','Vertical pole that may have a sail or rigging, or antennas'],['Part','To break, as of a line'],['Scullery','Compartment for washing and sterilizing eating utensils'],['Stern','Back of the vessel'],['Strike','Lower or bring down'],['Void','An empty compartment below decks'],['Wake','The track left in the water behind a ship'],['Windward','Side of the vessel the wind is coming from']];
var terms=pairs(TERM,function(x){return 'What does <b>'+x+'</b> mean?'},function(x,a){return x+': '+a+'.'});
terms.push(Q('What does BMOW stand for?','Boatswain\'s Mate of the Watch',['Boat Master of the Water','Bow Mate of the Week','Bridge Mate on Watch'],'The BMOW ensures all watches are properly manned and in order.'));
terms.push(Q('Which term means "begin work"?','Turn to',['Strike','Check','Part'],'"Turn to" is an order to begin work.'));
var FL=[['Bravo flag','Transfer of hazardous cargo','flag-bravo'],['Oscar flag','Man overboard','flag-oscar'],['Papa flag','Personnel recall','flag-papa'],['SOPA pennant','Most senior officer as commanding officer','pennant-sopa'],['Prep pennant','Five minutes before colors','pennant-prep'],['Third substitute','Commanding Officer not on board','pennant-third']];
var flMean=FL.map(function(p){return p[1]}),flNames=FL.map(function(p){return p[0]});
var flags=[];
FL.forEach(function(p){flags.push({q:'What does the <b>'+p[0]+'</b> mean?',a:p[1],pool:flMean,e:p[0]+': '+p[1]+'.'});flags.push({q:'Which flag or pennant means: <b>'+p[1]+'</b>?',a:p[0],pool:flNames,e:p[1]+' is the '+p[0]+'.'})});
['flag-bravo','flag-oscar','flag-papa'].forEach(function(f,i){flags.push({q:'What does this flag signal?',img:'img/'+f+'.webp',a:FL[i][1],pool:flMean,e:'This is the '+FL[i][0]+': '+FL[i][1]+'.'})});
var KN=[['Square knot','Used to join two lines of equal size and material together','knot-square'],['Bowline','Used to put a temporary eye in a line','knot-bowline'],['Clove hitch','Used to make fast a single line to a piling or railing','knot-clove'],['Slip clove hitch','Used to make fast a single line to a piling or railing, with a quick release','knot-slip-clove'],['Double becket bend','Used to join two lines of unequal size','knot-double-becket']];
var knN=KN.map(function(p){return p[0]}),knU=KN.map(function(p){return p[1]});
var knots=[];
KN.forEach(function(p){knots.push({q:'What is the <b>'+p[0]+'</b> used for?',a:p[1],pool:knU,e:p[0]+': '+p[1]+'.'});knots.push({q:'Which knot is used this way: <b>'+p[1].toLowerCase()+'</b>?',a:p[0],pool:knN,e:p[1]+': the '+p[0]+'.'})});
['knot-square','knot-bowline','knot-double-becket'].forEach(function(f){var p=KN.filter(function(k){return k[2]===f})[0];knots.push({q:'Which knot is shown?',img:'img/'+f+'.webp',a:p[0],pool:knN,e:'This is the '+p[0]+'.'})});
knots.push(Q('What is the end of a line called?','The bitter end',['The bight','The turn','The standing part'],'Parts of a line: bitter end, bight, turn, round turn, standing part.'));
knots.push(Q('Which is a part of a line?','Bight',['Brow','Davit','Gunwale'],'The parts of a line are bitter end, bight, turn, round turn and standing part.'));
var FC=[['A (Alpha)','Ordinary combustible materials such as wood, paper, plastics'],['B (Bravo)','Combustible liquids such as gasoline, diesel, paints, fuels, solvents, grease'],['C (Charlie)','Energized electrical equipment'],['D (Delta)','Combustible metals such as magnesium or titanium']];
var fcFuel=FC.map(function(p){return p[1]}),fcN=FC.map(function(p){return p[0]});
var fire=[];
FC.forEach(function(p){fire.push({q:'What is the fuel for a Class <b>'+p[0]+'</b> fire?',a:p[1],pool:fcFuel,e:'Class '+p[0]+': '+p[1]+'.'});fire.push({q:'Which class of fire involves: <b>'+p[1].toLowerCase()+'</b>?',a:'Class '+p[0],pool:fcN.map(function(x){return 'Class '+x}),e:p[1]+': Class '+p[0]+'.'})});
fire.push(Q('How do you fight a Class C fire?','Use a CO2 extinguisher and safely secure the source of electricity',['Use plain water','Use a PKP extinguisher only','Jettison it overboard'],'Class C is energized electrical equipment.'));
fire.push(Q('What can extinguish a Class B fire?','Halon, a PKP extinguisher or AFFF',['Plain water','A CO2 extinguisher only','Sand only'],'Class B fuels are combustible liquids.'));
fire.push(Q('What color is smoke from a Class A fire?','White or grey',['Black or brown','Blue only','Green'],'Class B smoke is black or brown.'));
fire.push(Q('What are the four elements of the fire tetrahedron?','Heat, oxygen, fuel and the chemical chain reaction',['Heat, water, wind and fuel','Oxygen, smoke, fuel and sparks','Heat, fuel, salt and air'],'Remove any side and flaming combustion stops.'));
fire.push(Q('What happens if one side of the fire tetrahedron is removed?','Flaming combustion stops and the fire goes out',['The fire grows','The fire spreads','Nothing changes'],'That is how extinguishing works.'));
fire.push(Q('What is the option for a Class D (combustible metal) fire?','Jettison it (push overboard); advanced training is needed',['Pour water on it','Use AFFF','Ignore it'],'Class D involves metals like magnesium or titanium.'));
var NOM=['Flash suppressor','Barrel','Front sight','Hand guard','Slip ring','Carrying handle','Rear sight','Charging handle','Ejection port dust cover','Magazine release','Forward assist','Stock','Heel of the butt','Buttcap','Toe of the butt','Pistol grip','Selector lever','Trigger','Trigger guard','Magazine well','Magazine catch','Bolt catch / bolt release','Bayonet lug'];
var m16=[];
[0,1,2,3,4,5,6,7,8,10,11,15,17,18].forEach(function(i){m16.push({q:'In the M-16 piece nomenclature, what comes right <b>after</b> the <b>'+NOM[i]+'</b>?',a:NOM[i+1],pool:NOM,e:'After the '+NOM[i].toLowerCase()+' comes the '+NOM[i+1].toLowerCase()+'.'})});
m16.push(Q('What is the first part in the piece nomenclature?','Flash suppressor',['Barrel','Stock','Trigger'],'The recitation starts with the flash suppressor.'));
m16.push(Q('How do you begin reciting the piece nomenclature?','"My piece nomenclature is..."',['"Attention on deck..."','"Sir, permission to..."','"Weapon ready..."'],'End with "My piece nomenclature is complete."'));
m16.push(Q('Which is a firearms safety rule?','Keep your finger off the trigger until on target and ready to shoot',['Point the muzzle at the ground only after firing','Assume a firearm is empty','Hand it over with the safety off'],'Also: treat all firearms as loaded, control the muzzle, and know your target and what is beyond it.'));
m16.push(Q('How should you treat all firearms?','As if they are loaded',['As if they are empty','As if they are unloaded after inspection','As toys'],'The first of the firearms safety rules.'));
m16.push(Q('What are the settings on the selector lever?','Safe, semi, burst',['On, off','Single, double','Light, heavy'],'The selector lever is part of the receiver.'));
var bank={
 history:[
  Q('Who established the Revenue Cutter Service in 1790?','Alexander Hamilton',['George Washington','Thomas Jefferson','Woodrow Wilson'],'Hamilton is the father of the Coast Guard.'),
  Q('Which department originally held the Revenue Cutter Service?','Treasury',['Transportation','Homeland Security','Navy'],'It was established under the Department of the Treasury.'),
  Q('In what year did the Revenue Cutter Service merge with the Life-Saving Service?','1915',['1790','1939','1967'],'This formed the modern Coast Guard.'),
  Q('Which President signed the "Act to Create the Coast Guard"?','Woodrow Wilson',['Abraham Lincoln','Franklin Roosevelt','Theodore Roosevelt'],'He signed it in 1915.'),
  Q('Which department did the Coast Guard move to in 1967?','Department of Transportation',['Department of the Treasury','Department of Homeland Security','Department of the Navy'],'In 2003 it moved to DHS.'),
  Q('When did the Coast Guard move to the Department of Homeland Security?','2003',['1967','1915','2018'],'After the September 11, 2001 attacks.'),
  Q('What was added to the Coast Guard in 1939?','The U.S. Lighthouse Service',['The Life-Saving Service','The Bureau of Marine Inspection','The Revenue Cutter Service'],'In 1942 the Bureau of Marine Inspection and Navigation was transferred.'),
  Q('How many cutters did the first laws authorize?','Ten',['Five','Twenty','One'],'They enforced tariff laws and prevented smuggling.'),
  Q('How many uniformed services make up the Armed Forces under 10 U.S.C. 101(a)(4)?','Five',['Three','Four','Six'],'Army, Navy, Air Force, Marine Corps and Coast Guard.'),
  Q('When is the Coast Guard a service in the Navy?','When operating as a service in the Navy',['Never','In peacetime','Only when in port'],'Otherwise it is a service in the Department of Homeland Security.')
 ],
 roles:[
  Q('Which are the Coast Guard\'s three roles?','Maritime safety, maritime security and maritime stewardship',['Air, land and sea','Offense, defense and logistics','Search, rescue and repair'],'Each role has several primary missions.'),
  Q('Which role includes Search and Rescue?','Maritime safety',['Maritime security','Maritime stewardship','None of them'],'Its two missions are Marine Safety and Search and Rescue.'),
  Q('Which role includes Illegal Drug Interdiction?','Maritime security',['Maritime safety','Maritime stewardship','Maritime survey'],'It has four primary missions.'),
  Q('Which role includes Ice Operations and Aids to Navigation (ATON)?','Maritime stewardship',['Maritime safety','Maritime security','Defense readiness'],'Stewardship has five primary missions.'),
  Q('How many primary missions are in maritime security?','Four',['Two','Five','Seven'],'Safety has two, security four, stewardship five.'),
  Q('How much of the world\'s fishery resources do America\'s marine waters contain?','One-fifth',['One-tenth','One-half','One-third'],'This is part of why stewardship matters.'),
  Q('What authority does the Coast Guard have over vessels?','Civil authority to board any vessel subject to U.S. jurisdiction',['None','Only Navy ships','Only foreign ships'],'It may inquire, examine, inspect, search, seize and arrest.')
 ],
 ethos:[
  Q('How does the Ethos describe the Coast Guardsman\'s role?','"I am their Shield."',['"I am their Sword."','"I am their Anchor."','"I am their Compass."'],'For them I am Semper Paratus.'),
  Q('Whom does the Ethos say a Coast Guardsman serves?','The people of the United States',['The Commandant','The President only','Their unit'],'I serve the people of the United States.'),
  Q('Which three verbs does the Ethos use for what a Coast Guardsman will do for the people?','Protect, defend and save',['Guard, arrest and rescue','Search, seize and board','Patrol, inspect and report'],'I will protect them. I will defend them. I will save them.'),
  Q('What does the Ethos say "For them I am"?','Semper Paratus',['Always Ready','Honor Bound','Devoted'],'Semper Paratus means always ready.'),
  Q('Which is a Core Value?','Devotion to Duty',['Courage','Commitment','Loyalty'],'The Core Values are Honor, Respect and Devotion to Duty.')
 ],
 suicide:[
  Q('What should you do if someone is in immediate danger?','Call 911',['Wait until morning','Tell a friend later','Post online'],'Do not leave the person alone.'),
  Q('What does ACE stand for?','Ask, Care, Escort',['Alert, Check, Evacuate','Act, Calm, Explain','Ask, Call, Exit'],'Be the ACE.'),
  Q('In ACE, what does Ask mean?','Ask directly, "Are you thinking about hurting yourself?"',['Ask them to be quiet','Ask others to decide','Ask them to wait'],'Do not be afraid to ask.'),
  Q('In ACE, what does Escort mean?','Do not leave the person alone; get them to help',['Walk them home and leave','Send them to bed','Leave them with a text'],'Never leave the person alone.'),
  Q('Which is a listed warning sign?','Feeling trapped, like there is no way out',['Asking about liberty','Being excited about graduation','Studying hard'],'Other signs include withdrawing from family and friends.'),
  Q('What does A.I.D. stand for?','Ask, Intervene immediately, Don\'t keep it a secret',['Ask, Ignore, Decide','Alert, Inform, Depart','Ask, Interview, Document'],'Provide A.I.D.'),
  Q('In Preserve L.I.F.E., what does the F stand for?','Find someone to stay with the person',['Fix the problem yourself','Forget about it','File a report only'],'Locate, Inform, Find, Expedite.')
 ],
 hazing:[
  Q('Which is an example of hazing?','Forcibly cutting or shaving hair',['Standing a watch','Correcting a uniform error','Running in formation'],'Others include "tacking on crows" and handcuffing a member to an object.'),
  Q('To whom should you report hazing or bullying?','Your Company Commander(s), without fear of reprisal',['Nobody','Your recruiter only','Your classmates only'],'If you cannot talk to them, go to an instructor, Section Commander, chaplain and others.'),
  Q('When does the hazing policy apply?','To all personnel at all times, on or off duty, at sea or ashore',['Only on duty','Only on base','Only in training'],'On or off duty, in or out of uniform.'),
  Q('Which is an example of bullying?','Forced consumption of food, alcohol, drugs or other substances',['Constructive coaching','A drill sergeant\'s instruction','Routine inspection'],'Bullying is abusive conduct without a proper military purpose.'),
  Q('Which of these is a listed place to report if you cannot speak to your Company Commander?','Work Life staff',['A newspaper','A civilian friend','A social media group'],'Also an Instructor, Section Commander, Chaplain, Battalion Commander or Command Master Chief.'),
  Q('What is the Coast Guard\'s policy on hazing?','Zero tolerance; every incident is investigated',['It is a tradition','It is allowed if consented','It is ignored in training'],'No service member may engage in or consent to hazing.')
 ],
 sapr:[
  Q('Which reporting option can lead to offenders being held accountable?','Unrestricted',['Restricted','Anonymous','Informal'],'It triggers a formal investigation by trained criminal investigators.'),
  Q('Who can receive a Restricted report?','SARC, FAS, Unit VA, TRACEN medical staff or a chaplain',['Your Company Commander','An instructor','TRACEN Police'],'Restricted lets a victim confidentially disclose without notifying the command.'),
  Q('What happens if you tell someone other than a SARC, FAS, VA, medical staff or chaplain?','The report is Unrestricted',['It stays Restricted','It is deleted','It is only informal'],'This is the important rule to remember.'),
  Q('What does an Unrestricted report trigger?','An immediate formal investigation',['Nothing','Only counseling','A phone call home'],'It also gives the full range of protections.'),
  Q('How often is the DoD Safe Helpline available?','24/7',['Weekdays only','Business hours only','Weekends only'],'Call 877-995-5247 or chat at www.safehelpline.org.'),
  Q('Who shall report a sexual assault?','Anyone who receives a report, hears about, suspects or witnesses one',['Only the victim','Only officers','Only chaplains'],'No bystanders: take action.'),
  Q('What is the Coast Guard\'s policy on sexual assault?','Zero tolerance',['Case by case','Handled informally','Optional reporting'],'There are two reporting options.')
 ],
 chain:[
  Q('Who is the Commander in Chief?','The President',['The Commandant','The Secretary of Homeland Security','The Executive Officer'],'The President is at the top of the chain.'),
  Q('Who is above the Commandant of the Coast Guard in the chain?','The Secretary of Homeland Security',['The Executive Officer','The Training Officer','The Battalion Officer'],'Then the President.'),
  Q('What emergency number does the guide list?','911',['411','311','611'],'Call 911 in an emergency.'),
  Q('Who is in your chain directly below the Battalion Commander?','The Section Commander',['The Executive Officer','The Training Officer','The Commandant'],'Then the Lead Company Commander and Company Commander.'),
  Q('What does CO stand for?','Commanding Officer',['Company Officer','Chief Officer','Command Order'],'XO is Executive Officer.'),
  Q('What does OOD stand for?','Officer of the Day',['Officer on Duty only','Order of the Deck','Operations Officer Daily'],'The page lists the OOD cell number.'),
  Q('What is the rank of the Commandant of the Coast Guard?','Admiral',['Captain','Commander','Rear Admiral'],'The Commandant is an Admiral.')
 ],
 orders:orders,
 officers:officers,
 enlisted:enlisted,
 ratings:ratings,
 fpcon:fpcon,
 followers:[
  Q('Which is the least desirable type of follower?','Sheep',['Effective','Survivors','Alienated'],'Sheep are passive and dependent.'),
  Q('Which follower is proactive and respectful of their leader\'s authority?','Effective',['Sheep','Yes People','Survivors'],'Effective followers are active and independent.'),
  Q('Which follower is a "watcher" who tries what works for others?','Survivors',['Sheep','Alienated','Effective'],'If it works for others, they will try it.'),
  Q('Which follower is active and can think critically but chooses not to?','Yes People',['Sheep','Alienated','Effective'],'They are more active but choose not to think critically.'),
  Q('Which follower can think critically and is independent but passive?','Alienated',['Sheep','Yes People','Effective'],'Like sheep and yes people, they are also passive.'),
  Q('How many types of followers are there?','Five',['Three','Four','Six'],'Sheep, Yes People, Alienated, Survivors, Effective.')
 ],
 grooming:[
  Q('Hair must not touch what when groomed?','The eyebrows',['The ears','The collar for men','The shoulders'],'It also must not extend below the front of properly worn headgear.'),
  Q('What is the maximum bulk of men\'s hair from the scalp?','1½ inches',['½ inch','3 inches','2 inches'],'Hair above the ear and around the neck is tapered.'),
  Q('What is the maximum bun bulk for women?','3 inches',['1½ inches','5 inches','1 inch'],'Ponytails and long hair must be fastened or pinned.'),
  Q('How far may sideburns extend?','No lower than a point level with the bottom of the ear opening',['To the jawline','To the chin','Level with the eyes'],'Men\'s hair on the back of the neck must not touch the collar.'),
  Q('How should women\'s hair relate to the collar?','It may touch but not fall below the bottom edge of the back of the collar',['It must touch the shoulders','It may fall to the middle of the back','It must be shaved'],'Haircuts present a balanced appearance.'),
  Q('Grooming standards are based on what?','Neatness, cleanliness, safety, military image and appearance',['Fashion trends','Personal choice','Seniority'],'Hair coloring must look natural.')
 ],
 uniforms:[
  Q('What does ODU stand for?','Operational Dress Uniform',['Official Duty Uniform','Operations Day Uniform','Ordinary Dress Uniform'],'It is a general-purpose, everyday uniform.'),
  Q('Where are ODU trousers bloused?','On the safety boot between the second and third eyelet',['At the ankle','Below the knee','Over the laces'],'Footwear is an 8 to 10 inch safety boot with black socks.'),
  Q('What belt goes with the ODU?','Black riggers belt',['Brass web belt','Brown leather belt','White belt'],'Bitter end behind but not past the first belt loop on the left.'),
  Q('Where are ribbons worn on Tropical Blue?','On the left side, ¼ inch above the pocket',['On the right sleeve','On the belt','On the collar'],'The name tag is worn on the right side.'),
  Q('Where is the name tag worn on dress uniforms?','On the right side, ¼ inch above the pocket',['On the left sleeve','On the hat','On the belt'],'Ribbons go on the left.'),
  Q('Which collar device rule applies to Tropical Blue?','E-4 and up',['E-1 and up','E-7 and up','Officers only'],'Collar devices are worn by E-4 and up.'),
  Q('Which uniform is suitable on all occasions when a uniform is prescribed?','Service Dress Blue "Bravo"',['Operational Dress Uniform','Tropical Blue','Gym clothes'],'Wash and wear dress pants are not authorized with it.'),
  Q('What T-shirt goes under the ODU shirt?','A blue crew neck',['A white v-neck','A red tank','No T-shirt'],'Blue T-shirt: crew neck.'),
  Q('What belt is worn with dress uniforms?','1¼ inch black web belt with a brass buckle',['Black riggers belt','Brown leather','Red web belt'],'For both Tropical Blue and Service Dress Blue.'),
  {q:'Which uniform is shown?',img:'img/uniform-odu.webp',a:'Operational Dress Uniform (ODU)',pool:['Tropical Blue','Service Dress Blue "Bravo"','Foul Weather Parka'],e:'This is the ODU.'}
 ],
 eval:[
  Q('Who gets the non-rate Enlisted Evaluation Report (EER)?','E-2 and E-3',['E-5 and E-6','Officers','E-7 and E-8'],'It is for non-rate members.'),
  Q('How many factors and competencies are in the EER?','4 factors and 9 competencies',['2 factors and 4 competencies','6 factors and 12 competencies','3 factors and 9 competencies'],'Military, Performance, Professional qualities and Leadership.'),
  Q('What scale scores each competency?','1 (lowest) to 7 (highest)',['1 to 5','1 to 10','A to F'],'Scored 1 to 7.'),
  Q('Which factor includes military bearing and customs, courtesies and traditions?','Military',['Performance','Leadership','Conduct'],'It is one of the four factors.'),
  Q('Which factor includes respect for others and followership?','Leadership',['Military','Performance','Professional qualities'],'Leadership has respect for others and followership.'),
  Q('What does a "Ready" mark mean?','Deemed ready to advance to the next pay grade',['Needs extra training','Should be removed','Is an officer'],'Not Ready means not ready for the next responsibilities.'),
  Q('Which mark means negative conduct or poor performance?','Not Recommended',['Ready','Not Ready','Pending'],'Should not be allowed to advance.')
 ],
 terms:terms,
 flags:flags,
 knots:knots,
 fire:fire,
 m16:m16
};
window.PQ_BANK=bank;
})();
