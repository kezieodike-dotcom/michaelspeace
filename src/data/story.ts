import type {LoveStoryEntry} from '../types/wedding';

const chapter=(id:string,title:string,dateStr:string,content:string,imageUrls:string[]=[]):LoveStoryEntry=>({id,title,dateStr,content,imageUrl:'',imageId:null,...(imageUrls.length?{imageUrls}:{}),displayOrder:Number(id),published:true,createdAt:'2026-10-01T00:00:00.000Z'});

export const STORY_CHAPTERS:LoveStoryEntry[]=[
 chapter('1','Two Beginnings, One Beautiful Story','Abuja · Enugu',`Every love story begins long before two people meet.

Michael Chukwu was born in Abuja, Nigeria, while Pius Peace Sorochi was born in Enugu, Nigeria. Their lives began in different cities, hundreds of kilometres apart, with different childhood experiences, friendships, and dreams.

 As they grew up, each experienced the joys and lessons that shaped the people they would eventually become. Neither childhood could tell the full story of what lay ahead. Yet, looking back today, their individual journeys form the opening chapters of a story they would one day share.`,['/images/childhood-michael-birthday.png','/images/childhood-michael-portrait.png','/images/childhood-peace-portrait.png']),
 chapter('2','Growing Into Who They Were Meant to Be','2018 · University of Nigeria',`Before they became friends, Michael and Peace were two individuals finding their way through life. Their school years, friendships, personal experiences, and growing understanding of the world helped shape their character. Beyond their everyday activities, they shared something important: a passion for God.

In 2018, their paths led them to the University of Nigeria, where they both gained admission to study Psychology. Neither could have known just how memorable that season would become.`),
 chapter('3','November 2018 — The Meeting','November 2018',`Sometimes, the most significant chapters begin with an ordinary moment.

In November 2018, within the university environment, Michael and Peace met for the first time. Two students, both pursuing their academic goals, were introduced to a connection that would grow beyond the classroom.

What began as a meeting soon developed into friendship. November 2018 became a date worth remembering because it marked the beginning of a friendship that would continue through different seasons of life.`,['/images/meeting-2018-group.png','/images/meeting-2018-selfie.png','/images/meeting-2018-selfie-two.png','/images/meeting-2018-portrait.png']),
 chapter('4','Friendship, Growth, and Shared Dreams','2018–2023 · University years',`University was more than a place where Michael and Peace pursued their studies. It was also the setting in which their friendship grew.

Through student life, they came to know each other more deeply. They continued learning, growing, and preparing for the future. In 2023, they graduated, bringing one important chapter of their lives to a close.

Graduation was a moment of gratitude and excitement—a celebration of their academic journey and the possibilities ahead.`,['/images/shared-dreams-group-selfie.png','/images/shared-dreams-campus-selfie.png','/images/shared-dreams-friends.png','/images/shared-dreams-group-portrait.png','/images/shared-dreams-friends-outdoors.png']),
 chapter('5','Edo State — A Remarkable Reunion','February–August 2024 · Edo State',`In February 2024, Peace began her National Youth Service Corps journey in Edo State and served as the State Sisters Coordinator of the Nigerian Christian Corpers' Fellowship (NCCF). Months later, in August 2024, Michael was also posted to Edo State and served as the In-House Brothers Coordinator.

They found themselves serving in the same local government area. After the years they had spent building their friendship at university, their paths had converged again—this time in a new environment, with new responsibilities and opportunities to serve.`,['/images/edo-reunion-group-field.png','/images/edo-reunion-red-dress.png','/images/edo-reunion-service-team.png','/images/edo-reunion-blue-dress.png','/images/edo-reunion-dinner.png','/images/edo-reunion-cake.png','/images/edo-reunion-delegates.png']),
 chapter('6','Growing Together in Faith and Service','2024 · NCCF',`Their time in Edo State was not just another chapter of NYSC. It was also a season of service.

Peace served as State Sisters Coordinator, while Michael served as In-House Brothers Coordinator. Though their responsibilities differed, they were both involved in the work of the fellowship.

Serving others and participating in a shared Christian community gave their friendship another setting in which to grow. Edo State became a significant place in their journey—a place where their paths crossed once again.`,['/images/faith-service-team.png','/images/faith-service-sisters.png','/images/faith-service-portrait.png','/images/faith-service-cooking.png','/images/faith-service-community.png']),
 chapter('7','November 2025 — A New Question, A New Promise','November 2025',`Seven years after they first met, another November milestone arrived.

In November 2025, Michael proposed to Peace. The friendship that began in November 2018 had reached a new chapter and was moving towards a lifelong commitment.

A proposal represents a decision to look towards the future together—to choose partnership, embrace responsibility, and prepare for the journey of marriage. For Michael and Peace, November 2025 became the beginning of their preparations for the next stage of their story.`,['/images/promise-season-couple.png','/images/promise-season-garden-selfie.png','/images/promise-season-conference.png','/images/promise-season-garden-portrait.png','/images/promise-season-red-dress.png']),
 chapter('8','November 2026 — The Journey Continues','November 2026',`And now, another November is here.

From their separate beginnings in Abuja and Enugu, to their meeting at university in 2018, their graduation in 2023, their shared season of service in Edo State in 2024, and the proposal in 2025, their story has unfolded across different places and seasons.

As Christians, they look towards marriage with gratitude for the journey so far and faith for what lies ahead. Their wedding is not the end of their story. It is the beginning of a new chapter—one in which friendship becomes a lifelong partnership and two individual journeys become a shared home and future.

The story began in November. A proposal came in November. And now, in November, they prepare to say yes to forever.

Two beginnings. One friendship. A shared faith. One lifelong journey.

And by God's grace, the story continues.`,['/images/journey-white-portrait.png','/images/journey-green-portrait.png','/images/journey-black-floral.png','/images/journey-close-portrait.png','/images/journey-couple-close.png'])
];
