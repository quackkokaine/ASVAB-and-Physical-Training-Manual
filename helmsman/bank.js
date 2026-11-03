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
var terms=pairs([['floor','Deck'],['bathroom','Head'],['wall','Bulkhead'],['bed','Rack'],['mop','Swab'],['stairs','Ladder'],['ceiling','Overhead'],['flag','Colors'],['room','Compartment'],['upstairs','Topside'],['downstairs','Below'],['drinking fountain (or rumor)','Scuttlebutt']],function(x){return 'What is the Coast Guard word for <b>'+x+'</b>?'},function(x,a){return 'The civilian word "'+x+'" is "'+a+'" in the Coast Guard.'});
terms.push(Q('Which phrase means "I understand your order and will comply"?','Aye aye, sir/ma\'am',['Belay','Avast','Carry on'],'"Aye aye" means you understand and will comply.'));
terms.push(Q('What is the quarterdeck?','An area designated by the Commanding Officer for official and ceremonial functions',['The ceiling of a compartment','A place where recruits eat','A recruit\'s bed'],'The quarterdeck is set aside by the CO for official and ceremonial functions.'));
terms.push(Q('What is a "performance tracker"?','A recruit progress documentation slip',['A kind of watch','A drill team','A pay record'],'It is the recruit progress documentation slip.'));
terms.push(Q('Which word means "Stop"?','Belay or Avast',['Scuttlebutt','Swab','Topside'],'"Belay" or "Avast" means stop.'));
var L='Alpha,Bravo,Charlie,Delta,Echo,Foxtrot,Golf,Hotel,India,Juliett,Kilo,Lima,Mike,November,Oscar,Papa,Quebec,Romeo,Sierra,Tango,Uniform,Victor,Whiskey,Xray,Yankee,Zulu'.split(',');
var DEC={A:['Able','Apple','Adam','Ace'],B:['Baker','Boston','Bruno','Beta'],C:['Cobra','Chicago','Cuba','Candy'],D:['Dog','Dixie','Denver','David'],E:['Easy','Edward','Eagle','Eskimo'],F:['Fox','Fred','Florida','Falcon'],G:['George','Gamma','Gulf','Gulliver'],H:['Harbor','How','Henry','Hawk'],I:['Item','Indigo','Ida','Igloo'],J:['Jig','Jungle','Jack','Johnny'],K:['King','Kite','Kentucky','Keen'],L:['Love','Lemon','London','Lincoln'],M:['Mark','Mars','Monkey','Metro'],N:['Nectar','Nancy','Nugget','Nickel'],O:['Oboe','Ocean','Orange','Otto'],P:['Peter','Pablo','Prince','Pacific'],Q:['Queen','Quiet','Quartz','Quito'],R:['Roger','Robert','Rocket','Ruby'],S:['Sugar','Sam','Silver','Santiago'],T:['Tare','Tiger','Texas','Tonic'],U:['Uncle','Union','Umbrella','Ursula'],V:['Vice','Victory','Vector','Violet'],W:['William','Whisper','Whale','Wilson'],X:['Xenon','Xylophone','Xerxes','Xanadu'],Y:['Yellow','Yoke','Yodel','Yonder'],Z:['Zebra','Zero','Zed','Zephyr']};
var phon=[];
for(var pi=0;pi<26;pi++){var pc=String.fromCharCode(65+pi);phon.push({q:'What is the phonetic word for the letter <b>'+pc+'</b>?',a:L[pi],pool:DEC[pc],e:pc+' is '+L[pi]+'.'})}
var T=[['Midnight','0000'],['1:00 a.m.','0100'],['3:00 a.m.','0300'],['5:00 a.m.','0500'],['6:00 a.m.','0600'],['9:00 a.m.','0900'],['Noon','1200'],['1:00 p.m.','1300'],['2:00 p.m.','1400'],['3:00 p.m.','1500'],['4:00 p.m.','1600'],['5:00 p.m.','1700'],['6:00 p.m.','1800'],['7:00 p.m.','1900'],['8:00 p.m.','2000'],['9:00 p.m.','2100'],['10:00 p.m.','2200'],['11:00 p.m.','2300']];
var timePool=T.map(function(x){return x[1]}),regPool=T.map(function(x){return x[0]});
var time=T.filter(function(_,i){return i%2===0||i>6}).map(function(p){return {q:'What is <b>'+p[0]+'</b> in military time?',a:p[1],pool:timePool,e:'Add 12 to the hour for p.m. times: '+p[0]+' is '+p[1]+'.'}});
[['1500','3:00 p.m.'],['2100','9:00 p.m.'],['1700','5:00 p.m.'],['0500','5:00 a.m.'],['1900','7:00 p.m.']].forEach(function(p){time.push({q:'What regular time is <b>'+p[0]+'</b>?',a:p[1],pool:regPool.filter(function(x){return x!=='Noon'&&x!=='Midnight'}),e:p[0]+' is '+p[1]+'.'})});
time.push(Q('Which hours does military time number?','00 to 23',['1 to 12','0 to 24','1 to 24'],'Military time numbers the hours 00 to 23, so a.m. and p.m. are not needed.'));
var G=[['Port','The left side of a vessel when looking forward'],['Starboard','The right side of a vessel when looking forward'],['Galley','The cooking compartment or "kitchen" on a vessel'],['Messdeck','The compartment where enlisted personnel eat'],['Muster','Assembly of the crew for accountability'],['Hatch','A square or rectangular opening in a deck'],['Passageway','A compartment designed for traffic, a "hallway"'],['Watch','A period of duty, usually four hours'],['Underway','When a vessel is not tied to a pier or at anchor'],['Heading','The direction a ship points at any given moment'],['Inboard','Toward the ship\'s center line'],['Outboard','Out, away from the ship\'s center line'],['Cabin','The Commanding Officer\'s living quarters'],['Eyes in the boat','Look straight ahead at the position of attention'],['OOD','Officer of the Day/Deck'],['Secure','Lock up, finish up'],['Forward','Towards the bow'],['Head','The compartment with toilet facilities; bathroom']];
var glossary=pairs(G,function(x){return 'What does <b>'+x+'</b> mean?'},function(x,a){return x+': '+a+'.'});
var bank={
 finance:[
  Q('What must you have at Cape May to receive your pay?','A checking or savings account and an ATM card',['A credit card only','A mailing address','A pre-paid phone card'],'Pay is direct deposited, and an ATM card is the only way to get it.'),
  Q('What should you do with your ATM card before you arrive?','Try it at least once',['Mail it to Cape May','Cancel it','Give it to your recruiter'],'Test it at least once so you do not spend training time sorting out problems.'),
  Q('What should you arrange with your creditors before you leave?','Delay payments for two months or pay in advance',['Close all your accounts','Pay double when you return','Nothing; they are told automatically'],'You will be away, so either delay payments for two months or pay ahead.'),
  Q('What happens if you arrive without a bank account and ATM card?','Your pay is seriously disrupted',['You are paid in cash','You are sent home','Nothing changes'],'You would have to spend training time sorting it out.')
 ],
 bring:[
  Q('How much cash should you bring?','About $50 in small bills',['About $200 in large bills','About $500','No cash at all'],'Bring about $50 in small bills.'),
  Q('Which items must you bring?','Social Security card and at least one form of photo ID',['Passport and birth certificate','Credit card and library card','Only a driver\'s license'],'Both a Social Security card and a photo ID are required.'),
  Q('Which of these is contraband?','Any glass container',['A cartridge-type razor','Unframed family photos','A pre-paid phone card'],'Glass containers are contraband. Plastic containers are permitted.'),
  Q('What size bag may you bring?','One small suitcase or duffel no larger than an airline carry-on, with your name on it',['Two large suitcases','A backpack with no name','Any size bag you like'],'It stores your arrival clothes until graduation.'),
  Q('How many white v-neck t-shirts are permitted?','3',['1','6','10'],'Three white v-neck t-shirts are permitted.'),
  Q('What happens to contraband?','It is disposed of, and some of it can get you removed from training',['It is mailed home','It is held until graduation','It is returned after week one'],'Contraband is thrown away, and possessing some of it gets you removed from training immediately.'),
  Q('Which of these is also contraband?','Magazines and newspapers',['Toothbrush','Address book','Stationery and stamps'],'Magazines, newspapers, food and drinks are all contraband.'),
  Q('How are the items issued to you paid for?','Through an allotment from your Coast Guard pay',['With cash on arrival','With a credit card','They are free'],'Issued items are paid for through an allotment.')
 ],
 fitness:[
  Q('What is the minimum number of bent-knee sit-ups for men in one minute?','38',['29','32','45'],'Men: 38. Women: 32.'),
  Q('What is the minimum number of bent-knee sit-ups for women in one minute?','32',['15','29','38'],'Women need 32 in one minute.'),
  Q('What is the minimum number of push-ups for men in one minute?','29',['15','32','38'],'Men: 29. Women: 15.'),
  Q('What is the minimum number of push-ups for women in one minute?','15',['29','32','38'],'Women need 15 in one minute.'),
  Q('What is the minimum 1.5 mile run time for men?','12:51',['12:15','13:51','15:26'],'Men: 12:51. Women: 15:26.'),
  Q('What is the minimum 1.5 mile run time for women?','15:26',['12:51','14:26','16:26'],'Women: 15:26.'),
  Q('How long should you hold each stretch?','10 to 15 seconds, without bouncing',['1 to 2 seconds, bouncing lightly','30 to 60 seconds','5 minutes'],'Slowly extend and hold each stretch for 10 to 15 seconds. Do not bounce.'),
  Q('What does the 1.5 mile run measure?','Full-body endurance',['Abdominal muscular endurance','Upper body muscular endurance','Flexibility'],'The run measures full-body endurance.'),
  Q('What do sit-ups measure?','Abdominal muscular endurance',['Full-body endurance','Upper body muscular endurance','Balance'],'Sit-ups measure abdominal muscular endurance.'),
  Q('How should your hands be placed for a push-up?','Shoulder-width apart',['Touching each other','Twice shoulder-width apart','Behind your head'],'Hands shoulder-width apart, body in a straight line from shoulders to ankles.')
 ],
 arrival:[
  Q('Where must recruits report at Philadelphia International Airport?','The USO office on the secure side of Terminal A-East',['The ticket counter of Terminal B','Baggage claim','The parking garage'],'A USO volunteer helps with the rest of your trip.'),
  Q('Whom do you call if your flight is late?','Training Center Cape May',['Your recruiter only','Your family','The airline only'],'Call Training Center Cape May at 1-609-898-6971.'),
  Q('Why should you travel in comfortable clothes?','You sleep in the clothes you arrive in on the first night',['You change at the airport','Uniforms are issued on the plane','You will be exercising at the gate'],'Your first night you sleep in the clothes you arrive in.'),
  Q('How should you start your travel?','Well rested',['Hungry','In a hurry','Wearing new shoes'],'Start your travel well rested.')
 ],
 keys:[
  Q('Which code of law are you now subject to?','The Uniform Code of Military Justice (UCMJ)',['Only civilian law','The Posse Comitatus Act','The Hamilton Act'],'Lying, cheating or stealing will not be tolerated.'),
  Q('Which is a Coast Guard Core Value?','Devotion to Duty',['Courage','Loyalty','Commitment'],'The Core Values are Honor, Respect and Devotion to Duty.'),
  Q('Which Core Value means treating everyone with fairness, dignity and compassion?','Respect',['Honor','Devotion to Duty','Courage'],'Respect: we treat each other and those we serve with fairness, dignity and compassion.'),
  Q('What should you do if you do something wrong?','Own up to it',['Hide it','Blame someone else','Wait to see if anyone notices'],'Do not hide it or lie. Own up to it.'),
  Q('How will you learn to obey orders?','Quickly, willingly and without question',['Only after discussing them','Only when convenient','After a vote'],'This helps in training and in your career.'),
  Q('Which Core Value says "integrity is our standard"?','Honor',['Respect','Devotion to Duty','Loyalty'],'Honor: integrity is our standard.')
 ],
 orders:orders,
 terms:terms,
 phonetic:phon,
 bearing:[
  Q('What angle do your feet make at the position of attention?','45 degrees',['30 degrees','90 degrees','Parallel, 0 degrees'],'Turn your feet out equally to 45 degrees, heels touching.'),
  Q('Where do your arms and thumbs go at attention?','Arms hang naturally, thumbs along the trouser seams, palms in',['Hands behind your back','Fists on your hips','Arms crossed'],'Palms face in with fingers in their natural curl.'),
  Q('How do you address military personnel?','"Sir" or "Ma\'am" at the beginning and end of the sentence',['By first name','Only at the end of the sentence','Never; you stay silent'],'Begin and end with Sir or Ma\'am.'),
  Q('Who may grant "Carry on"?','Only the person in authority, and only if you show proper military bearing',['Any recruit','Any visitor','A recruit with a higher grade'],'"Carry on" is granted only by the person in authority.'),
  Q('A salute is always accompanied by what?','A proper greeting, such as "Sir, Good Morning, Sir"',['A handshake','A smile','Silence'],'It recognizes the other person\'s seniority.'),
  Q('What is the purpose of the position of attention?','To build military bearing and self-discipline',['To rest','To prepare for swimming','To measure height'],'Stand still and do not talk.'),
  Q('How should your legs be at attention?','Straight but not stiff at the knees',['Locked at the knees','Slightly bent','Wide apart'],'Keep your hips and shoulders level.')
 ],
 time:time,
 chain:[
  Q('Who are your immediate supervisors?','Your Company Commander (CC) and Lead Company Commander (LCC)',['The Section Commander only','The Chaplain','The Training Officer'],'The chain continues up to the President.'),
  Q('Who is the supervisor of your CC and LCC?','The Section Commander (SC)',['The Chaplain','The Command Master Chief','The Executive Officer'],'The Section Commander is next in the chain.'),
  Q('Who is at the top of the chain of command?','The President of the United States (Commander-in-Chief)',['The Commandant','The Secretary of Homeland Security','The Commanding Officer'],'The President is the Commander-in-Chief.'),
  Q('Who comes directly after the Secretary of Homeland Security?','The Coast Guard Commandant',['The Commanding Officer','Force Readiness Command','The Executive Officer'],'Then Force Readiness Command.'),
  Q('Which is NOT in your chain of command?','The Chaplain',['The Section Commander','The Battalion Officer','The Training Officer'],'The Command Master Chief, Chaplain and Equal Opportunity Advisor are good to know but not in your chain.'),
  Q('Who is directly under the Commanding Officer (CO)?','The Executive Officer (XO)',['The Training Officer','The Section Commander','The Company Commander'],'CO, then XO, then Training Officer.'),
  Q('Who comes after the Training Officer (TO)?','The Regimental Officer (RO)',['The Battalion Commander','The Section Commander','The Executive Officer'],'TO, then RO, then BO, then BC.')
 ],
 stages:[
  Q('How long is basic training?','Eight weeks',['Six weeks','Ten weeks','Twelve weeks'],'You can be held back for disciplinary, medical or academic reasons.'),
  Q('When do you take the mid-term exam?','At the end of week four',['At the end of week two','At the end of week six','On graduation day'],'It comes at the end of the Practical Training stage.'),
  Q('When do you receive orders to your first assignment?','At the end of week five',['On arrival','At the end of week two','At graduation'],'Training in that stage covers first aid and watch standing.'),
  Q('Which stage includes firefighting and marksmanship?','Practical Training',['Arrival','Learning the Basics','Graduation'],'Also line handling and seamanship.'),
  Q('When are graduation ceremonies usually held?','Friday morning at 1100',['Saturday at 1300','Friday at 1800','Sunday at 0900'],'Outdoors, or in the gymnasium in bad weather.'),
  Q('What do you complete after passing the mid-term?','Your Assignment Data Card (ADC)',['Your swim test','Your dependent ID','Your leave form'],'Assignments are limited to district only.'),
  Q('What happens right after forming week?','You are assigned to a Recruit Training Company and meet your Company Commanders',['You graduate','You take the mid-term','You receive orders'],'This is the Company Formation stage.'),
  Q('Which stage do many recruits find the hardest stretch?','Company Formation (the first weekend with the company)',['Graduation','Arrival','Preparation for Your First Unit'],'You learn to act as a team member and obey orders.'),
  Q('Which is a reason you may be held back?','Disciplinary, medical or academic reasons',['Your hair length','Your home state','Being from another district'],'Basic training is eight weeks unless you are held back.')
 ],
 pay:[
  Q('Where are the ATMs on the Training Center?','Dempsey Hall and the Exchange',['The Chapel','The Dispensary','Healy Hall'],'ATMs are at Dempsey Hall and the Exchange.'),
  Q('How much tuition assistance is available each fiscal year?','Up to $4,500',['Up to $1,000','Up to $10,000','Up to $250'],'Tuition assistance is up to $4,500 per fiscal year.'),
  Q('What happens to the Montgomery GI Bill at enlistment?','You are automatically enrolled',['You must apply in week 8','You are never eligible','You pay nothing and get nothing'],'During week 3 you can choose to disenroll.'),
  Q('How is the Post 9/11 GI Bill earned?','By serving honorably for 36 months',['By enlisting','By passing boot camp','By completing a swim test'],'The two programs differ in important ways.'),
  Q('When do recruits with families normally apply for BAH?','During week one',['During week five','At graduation','After the first duty assignment'],'The amount depends on your dependents.'),
  Q('Which pay grade do most recruits enlist at?','E-1',['E-3','E-4','O-1'],'Some programs start at E-2 or E-3.')
 ],
 support:[
  Q('Who should you start with when you need counseling?','Your Company Commander',['The Commandant','A stranger','Your recruiter'],'Your CC has experience with problems like yours.'),
  Q('How are counseling appointments made?','Through your Company Commander',['By phone from home','At the ATM','By mail'],'You can also see a chaplain or other counseling resource.'),
  Q('When are chapel services held?','Sunday mornings',['Friday evenings','Wednesday afternoons','Saturday nights'],'Catholic and Protestant chaplains hold services every Sunday morning.'),
  Q('How many recruits per company serve as Company Religious Representatives?','Two',['One','Four','Ten'],'Two recruits per company.'),
  Q('Which service is at the Training Center Dispensary?','Family physicians, physical therapy, dental and optometry',['A trauma center','Cardiac surgery','A full emergency room'],'Emergency room services are at local hospitals.')
 ],
 liberty:[
  Q('Whom may recruits NOT socialize with?','Cape May training staff and recruits in other companies not in your week of training',['Recruits in your own company','Their families on visiting days','Their chaplains'],'You must report any inappropriate relationship.'),
  Q('What happens if you fail to report an inappropriate relationship?','It is a punishable offense',['Nothing','You receive extra liberty','You are promoted'],'You must report any incident.'),
  Q('How much off-base liberty may a company earn in week seven?','Eight hours',['Two hours','One full day','None, ever'],'Liberty can be limited to Training Center grounds.'),
  Q('How is liberty obtained?','It is earned',['It is given to everyone','It is bought','It is won in a lottery'],'If you do not meet academic and physical fitness requirements, you will not normally get it.'),
  Q('Is drinking alcohol under age 21 permitted on liberty?','No',['Yes, in moderation','Yes, with the CC\'s permission','Only off base'],'You represent the Coast Guard on liberty.')
 ],
 family:[
  Q('How does your family reach you in an emergency?','Through their local American Red Cross office',['By emailing the President','By visiting the gate','By calling your recruiter'],'For urgent questions they can reach the Battalion Officer.'),
  Q('When is mail delivered?','Monday through Friday',['Every day','Only on weekends','Only on Sunday'],'Heavy volume can slow it down.'),
  Q('Who inspects your incoming mail?','Your Company Commander',['The recruiter','A chaplain','The mail orderly alone'],'Suspicious packages are opened by you in front of your CC.'),
  Q('How often is outgoing mail picked up?','Twice a day',['Once a week','Once a day','Only on Fridays'],'Use the Post Office drop box or the mailbox between Munro Hall and the Auditorium.'),
  Q('Can you receive personal phone calls during recruit training?','No',['Yes, every day','Yes, after lights out','Yes, on the quarterdeck'],'Contact your family when you reach the Philadelphia USO.'),
  Q('What may you receive in the mail?','Letters, cards and photos that are not obscene',['Food packages','Magazines','Newspapers'],'Contraband is seized.'),
  Q('Which building might be on your mailing address?','Healy Hall, James Hall or Munro Hall',['Sexton Hall only','Dempsey Hall only','The Chapel'],'Healy, James or Munro Hall.')
 ],
 faq:[
  Q('How much paid leave do you earn each year?','30 days',['10 days','14 days','45 days'],'You earn 30 days of paid leave each year.'),
  Q('Can your family pick you up at the end of recruit training?','Yes, they are invited to graduation',['No, never','Only if you are an officer','Only by bus'],'They are always invited and encouraged to attend.'),
  Q('How long is recruit training?','Eight weeks, unless you are held back',['Six weeks','Twelve weeks','One year'],'Held back for disciplinary, medical, academic or physical fitness reasons.'),
  Q('Can you become an officer later?','Yes, ask your unit Educational Services Officer',['No, never','Only in the Navy','Only after 20 years'],'Details come from the Educational Services Officer.'),
  Q('Is there time off during training?','Yes, divine hours on Sunday, and liberty may be earned later',['No, never','Every Saturday for a full day','Only on holidays'],'In later weeks you may earn a few hours of weekend liberty.')
 ],
 glossary:glossary
};
window.PQ_BANK=bank;
})();
