import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_WHO_WE_ARE = () => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/who-we-are')
            .then((response) => {
                dispatch({
                    type: Types.GET_WHO_WE_ARE,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}

export const GET_PRAISE_DETAILS = (praiseId) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        dispatch({
            type: Types.GET_PRAISE_DETAILS,
            payload: { "id": "627c3688-95c8-42bc-9597-3f6074527d7e", "sheikhName": "الشيخ الشعراوى", "sheikhImage": "https://res.cloudinary.com/urgent-solutions/image/upload/v1620290301/c8fa7e719be1492190aba4f06681d521.jpg", "title": "امام الدعاه", "description": "عَشق الشيخ الشعراوي اللغة العربية، وعُرِفَ ببلاغة كلماته مع بساطة في الأسلوب، وجمال في التعبير، ولقد كان للشيخ باع طويل مع الشعر، فكان شاعرًا يجيد التعبير بالشعر في المواقف المختلفة، وخاصة في التعبير عن آمال الأمة أيام شبابه، عندما كان يشارك في العمل الوطني بالكلمات القوية المعبرة، وكان الشيخ يستخدم الشعر أيضًا في تفسير القرآن الكريم، وتوضيح معاني الآيات، وعندما يتذكر الشيخ الشعر كان يقول \"عرفوني شاعرًا\"\nوعندما سمع الشيخ الذي كان يدرس لنا التفسير هذه الأبيات قال لي: يا ولد هذه لها قصة عندنا في الأدب. فسألته: ما هي القصة: فقال: قصة شخص إسمه عروة بن أذينة. وكان شاعرًا بالمدينة وضاقت به الحال، فتذكر صداقته مع هشام بن عبد الملك. أيام أن كان أمير المدينة قبل أن يصبح الخليفة. فذهب إلى الشام ليعرض تأزم حالته عليه لعله يجد فرجًا لكربه. ولما وصل إليه استأذن على هشام ودخل. فسأله هشام كيف حالك يا عروة؟ فرد: والله إن الحال قد ضاقت بي. فقال لي هشام: ألست أنت القائل:\n\nلقد علمت وما الإشراق من خلقي\t\tأن الذي هـو رزقي سوف يأتيني\nواستطرد هشام متسائلًا: فما الذي جعلك تأتي إلى الشام وتطلب مني. فأحرج عروة الذي قال لهشام: جزاك الله عني خيرًا يا أمير المؤمنين.. لقد ذَكَّرْتَ مني ناسيًا، ونَبَّهْتَ مني غافلًا. ثم خرج. وبعدها غضب هشام من نفسه لأنه رد عروة مكسور الخاطر. وطلب القائم على خزائن بيت المال وأعد لعروة هدية كبيرة وحملوها على الجمال. وقام بها حراس ليلحقوا بعروة في الطريق. وكلما وصلوا إلى مرحلة يقال لهم: كان هنا ومضى. وتكرر ذلك مع كل المراحل إلى أن وصل الحراس إلى المدينة. فطرق قائد الركب الباب وفتح له عروة. وقال له: أنا رسول أمير المؤمنين هشام. فرد عروة: وماذا أفعل لرسول أمير المؤمنين وقد ردني وفعل بي ما قد عرفتم ؟ فقال قائد الحراس: تمهل يا أخي. إن أمير المؤمنين أراد أن يتحفك بهدايا ثمينة وخاف أن تخرج وحدك بها. فتطاردك اللصوص، فتركك تعود إلى المدينة وأرسل إليك الهدايا معنا. ورد عروة: سوف أقبلها ولكن قل لأمير المؤمنين لقد قلت بيتا ونسيت الآخر. فسأله قائد الحراس: ما هو ؟ فقال عروة:\n\nأسعى له فيعنيني تطلبه\t\tولو قعدت أتاني لا يعنيني\nوهذا يدلك -فيما يضيفه إمام الدعاة- على حرص أساتذتنا على أن ينمو في كل إنسان موهبته، ويمدوه بوقود التفوق.", "media": { "images": ["https://res.cloudinary.com/urgent-solutions/image/upload/v1620290438/409d280bb8a1463b84df74beca34c2e6.jpg", "https://res.cloudinary.com/urgent-solutions/image/upload/v1620290519/eba3ad913e094d65adeeecfaefdcfb10.jpg", "https://res.cloudinary.com/urgent-solutions/image/upload/v1620290536/6291fba50d5a4643a8c2b3bef034c93a.jpg"], "audio": [], "video": ["https://www.youtube.com/watch?v=x8aJqqJ_c2s", "https://www.youtube.com/watch?v=F_63k-3QZ4I"], "document": [] } },
        });
        await requester
            .get('/praises/get-praise-details', { params: { praiseId } })
            .then((response) => {
                dispatch({
                    type: Types.GET_PRAISE_DETAILS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}
export const CLEAN_PRAISE_DETAILS = () => ({ type: Types.CLEAN_PRAISE_DETAILS })
// export const GET_OUR_GOALS = () => {
//     return async function (dispatch) {
//         await requester
//             .get(`/content/introduction/goals/get-goals`)
//             .then((response) => {
//                 dispatch({
//                     type: Types.GET_OUR_GOALS,
//                     payload: response.data.model,
//                 });
//             })
//             .catch((error) => {
//                 console.log('ERR', error);
//             });
//     }
// }