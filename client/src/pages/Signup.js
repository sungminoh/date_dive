import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('시/도');
    const [subLocation, setSubLocation] = useState('');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const navigate = useNavigate();

    const koreaLocation = {
        '시/도': [""],
        서울특별시: ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
        부산광역시: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
        대구광역시: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
        인천광역시: ["중구", "동구", "남구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
        광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
        대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
        울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
        세종특별자치시: [""],
        경기도: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시", "의정부시", "시흥시", "파주시", "광명시", "김포시", "군포시", "광주시", "이천시", "양주시", "오산시", "구리시", "안성시", "포천시", "의왕시", "하남시", "여주시", "여주군", "양평군", "동두천시", "과천시", "가평군", "연천군"],
        강원도: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
        충청북도: ["청주시", "충주시", "제천시", "청원군", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군", "증평군"],
        충청남도: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "당진군", "금산군", "연기군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
        전라북도: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
        전라남도: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
        경상북도: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
        경상남도: ["창원시", "마산시", "진주시", "진해시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
        제주특별자치도: ["제주시", "서귀포시", "북제주군", "남제주군"]
    }

    const emailCheck = (email) => {
        return emailRegEx.test(email);
    }
    const onChange1 = (e) => {
        setEmail(e.target.value);
    };
    const onChange2 = (e) => {
        setPassword(e.target.value);
    };
    const onChange3 = (e) => {
        setNickname(e.target.value);
    };
    const onLocationChange = (e) => {
        setLocation(e.target.value);
        setSubLocation('');
    };
    const onSubLocationChange = (e) => {
        setSubLocation(e.target.value);
    };
    const checkHandler = ({ target }) => {
        if (target.id === 'male') {
            if (target.checked) {
                setGender('male');
                setCheckbox1(true);
                setCheckbox2(false);
            } else {
                setGender('');
                setCheckbox1(false);
            }
        } else {
            if (target.checked) {
                setGender('female');
                setCheckbox1(false);
                setCheckbox2(true);
            } else {
                setGender('');
                setCheckbox2(false);
            }
        }
    }

    async function handleSubmit() {
        try {
            if (emailCheck(email)) {
                const response = await axios.post('/api/user/signup', {
                    email: email,
                    password: password,
                    nickname: nickname,
                    gender: gender,
                    location: location + ' ' + subLocation
                }
                )
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                email: <input onChange={onChange1} value={email} />
            </div>
            <div>
                password: <input onChange={onChange2} value={password} />
            </div>
            <div>
                nickname: <input onChange={onChange3} value={nickname} />
            </div>
            <div>
                gender:
                <input id='male' onChange={checkHandler} checked={checkbox1} type="checkbox" /> Male
                <input id='female' onChange={checkHandler} checked={checkbox2} type="checkbox" /> Female
            </div>
            <div>
                location: <select onChange={onLocationChange}>
                    {Object.keys(koreaLocation).map((division) => (
                        <option key={division} value={division}>
                            {division}
                        </option>
                    ))}
                </select>
                <select onChange={onSubLocationChange}>
                    {koreaLocation[location].map((subDivision) => (
                        <option key={subDivision} value={subDivision}>
                            {subDivision}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>
                    signup
                </button>
            </div>
        </div>
    )
}

export default Signup;