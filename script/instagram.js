const WrapComponent = () => {

  const [login, setLogin] = React.useState(true);
  const [main, setMain] = React.useState(false);

  const loginState = () => {
      setLogin(true);
      setMain(false);
  }

  const mainState = () => {
      setLogin(false);
      setMain(true);
  }

  const loginEvent=()=>{
    if( localStorage.length <= 0 ) return;

    const localData = JSON.parse(localStorage.getItem('userId')); 
    let result = getCookie('PHPSESSID');

    if( result === undefined || localData === null ) return;

    if( result === localData.sessionId){
        mainState();
    }
  }

  React.useEffect(()=>{
    loginEvent();
  },[]);


  const getCookie=(name)=>{
    let temp = [];
    let obj = [];
    let found = '';

    if(document.cookie==='') return;

    temp = document.cookie.split(';');

    temp.map((item, idx)=>{
      obj[idx] = {
         name:  item.split('=')[0].trim(),
         value: item.split('=')[1].trim()
      } 
    });  

    obj.map((item)=>{
      if(item.name === name){
         found = item.value;
      }
    });

    return found;
  }

  return (
      <div id='wrap'>
          {login && <LoginComponent mainState={mainState}/>}
          {main && <MainComponent loginState={loginState} mainState={mainState}/>}
      </div>
  );
};

    const LoginComponent = ({mainState}) => {
    
    
        const [field, setField] = React.useState({classId : false, classPw : false });
        const [idValue, setIdValue] = React.useState('');
        const [pwValue, setPwValue] = React.useState('');
    
        const idFocus=()=>{
            setField({...field, classId : true});
        }
        
        const idClick=()=>{
            setField({...field, classId : true});
        }

        const idChange=(e)=>{
            setIdValue(e.target.value);
        }

        const pwChange=(e)=>{
            setPwValue(e.target.value);
        }
        
        const pwFocus=()=>{
            setField({...field, classPw : true});
        }
        
        const pwClick=()=>{
            setField({...field, classPw : true});
        }

        const axiosEvent=()=>{

          let formData = new FormData();

          formData.append('idValue', idValue);
          formData.append('pwValue', pwValue);
    
          axios({
            url:'./mysql/login.php',
            method:'POST',
            data: formData
          })
          .then((res)=>{
    
            if(res.data==='') {
              alert('아이디, 비밀번호를 확인해 주세요.');
            }
            else {
              localStorage.setItem('userId', `{"sessionId": "${res.data.sessionId}", "id": "${res.data.id}", "name": "${res.data.name}"}` );
              location.href = './';
              mainState();
            }
          })
          .catch((err)=>{
              console.log( err );
          });
        }

        const onClickLogin=(e)=>{
          e.preventDefault();
          axiosEvent();
        }
    
        return (
            <div id='loginWrap'>
                <div className='container'>
                    <div className='gap'>
                        <div className='wrap'>
    
                            <div className='top'>
    
                                <div className='slide-container'>
                                    <div className='slide-view'>
                                        <ul className='slide-wrap'>
                                            <li className='slide slide1'><img src="./images/slide_01.png" alt="img" /></li>
                                            <li className='slide slide2'><img src="./images/slide_02.png" alt="img" /></li>
                                            <li className='slide slide3'><img src="./images/slide_03.png" alt="img" /></li>
                                            <li className='slide slide4'><img src="./images/slide_04.png" alt="img" /></li>
                                        </ul>
                                    </div>
                                </div>
    
                                <div className='login-box'>
                                    <div className='login-wrap'>
                                    
                                        <form id='loginForm' method='post'>
        
                                            <div className='logo-box'>
                                                <a href="#!"><img src="./images/logo_txt.png" alt="logo" /></a>
                                            </div>
                                    
                                            <ul className='input-box'>
                                                <li className={field.classId ? 'input-id on' : 'input-id'}>
                                                    <label>
                                                        <span className='guide-txt'>전화번호, 사용자 이름 또는 이메일</span>
                                                        <input type="text" onFocus={idFocus} onClick={idClick} onChange={idChange} value={idValue}/>
                                                    </label>
                                                </li>
                                                <li className={field.classPw ? 'input-pw on' : 'input-pw'}>
                                                    <label>
                                                        <span className='guide-txt'>비밀번호</span>
                                                        <input type="password" onFocus={pwFocus} onClick={pwClick} onChange={pwChange} value={pwValue}/>
                                                    </label>
                                                </li>
                                            </ul>
        
                                            <div className='btn-box'>
                                                <button type='button' onClick={onClickLogin}>로그인</button>
                                            </div>
                                        </form>
        
                                        <div className='or-box'>
                                            <i className='back-line'/>
                                            <span>또는</span>
                                            <i className='back-line'/>
                                        </div>
        
                                        <div className='facebook-box'>
                                            <button>
                                                <i className='facebook-logo'/>
                                                <span>Facebook으로 로그인</span>
                                            </button>
                                        </div>
        
                                        <a href="#!">비밀번호를 잊으셨나요?</a>
                                        
                                    </div>
        
                                    <div className='sign-up-box'>
                                        <div>
                                            <p>
                                                계정이 없으신가요?
                                                <a href="#!">가입하기</a>
                                            </p>
                                        </div>
                                    </div>
        
                                    <div className='app-box'>
                                        <p>앱을 다운로드하세요.</p>
                                        <div className='link-box'>
                                            <a href="#!"><img src="./images/appstore_ico.png" alt="link" /></a>
                                            <a href="#!"><img src="./images/googleplay_ico.png" alt="link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='footer'>
                                <div className='footer-box'>
                                    <ul>
                                        <li><a href="https://about.meta.com/" rel="nofollow noopener noreferrer" target="_blank">Meta</a></li>
                                        <li><a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">소개</a></li>
                                        <li><a href="https://about.instagram.com/blog/" rel="nofollow noopener noreferrer" target="_blank">블로그</a></li>
                                        <li><a href="https://www.instagram.com/about/jobs/" rel="nofollow noopener noreferrer" target="_blank">채용 정보</a></li>
                                        <li><a href="https://help.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">도움말</a></li>
                                        <li><a href="https://developers.facebook.com/docs/instagram" rel="nofollow noopener noreferrer" target="_blank">API</a></li>
                                        <li><a href="https://www.instagram.com/legal/privacy/" rel="nofollow noopener noreferrer" target="_blank">개인정보처리방침</a></li>
                                        <li><a href="https://www.instagram.com/legal/terms/" rel="nofollow noopener noreferrer" target="_blank">약관</a></li>
                                        <li><a href="https://www.instagram.com/directory/profiles/" rel="nofollow noopener noreferrer" target="_blank">인기 계정</a></li>
                                        <li><a href="https://www.instagram.com/directory/hashtags/" rel="nofollow noopener noreferrer" target="_blank">해시태그</a></li>
                                        <li><a href="https://www.instagram.com/explore/locations/" rel="nofollow noopener noreferrer" target="_blank">위치</a></li>
                                        <li><a href="https://www.instagram.com/web/lite/" rel="nofollow noopener noreferrer" target="_blank">Instagram Lite</a></li>
                                        <li><a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fhelp%2Finstagram%2F261704639352628&e=AT1XlmxholzesOTqoqINjr_LrnhD50NBsccmq3bWTXMFSUNdhZGszCMxR5Y3IZtQYt1LihWHsPLwFecYH0cnfxwaChgVVfrpMoOishIwh-j0BgkVM2j9VqC_b3HYfOe_OdlrVpW6NC-2o3oX3yzSPg" rel="nofollow noopener noreferrer" target="_blank">연락처 업로드 & 비사용자</a></li>
                                    </ul>
                                    <div className='footer-bottom'>
                                        <div className='language-box'>
                                            <div><p>한국어</p><i/></div>
                                            <select className='language-select'>
                                                <option value="af">Afrikaans</option>
                                                <option value="en">English</option>
                                                <option value="ko">한국어</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p>© 2022 Instagram from Meta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const MainComponent = ({loginState, mainState}) => {

        const [userName, setUserName] = React.useState('');
        const [usermenu, setUsermenu] = React.useState(false);

        const loginEvent=()=>{
            if( localStorage.length <= 0 ) return;
      
            const localData = JSON.parse(localStorage.getItem('userId')); 
            let result = getCookie('PHPSESSID');
      
            if( result === undefined || localData === null ) return;

            if( result === localData.sessionId){
                mainState();
                setUserName(localData.id)
            }
        }

        React.useEffect(()=>{
          loginEvent();
        },[]);

        const getCookie=(name)=>{
            let temp = [];
            let obj = [];
            let found = '';
        
            if(document.cookie==='') return;
        
            temp = document.cookie.split(';');
        
            temp.map((item, idx)=>{
              obj[idx] = {
                 name:  item.split('=')[0].trim(),
                 value: item.split('=')[1].trim()
              } 
            });  
        
            obj.map((item)=>{
              if(item.name === name){
                 found = item.value;
              }
            });
        
            return found;
        }

        const logoutClick=(e)=>{
            e.preventDefault();

            let value = getCookie('PHPSESSID');
            let newDate = new Date();

            newDate.setDate(newDate.getDate()-1);  

            document.cookie = `${'PHPSESSID'}=${value}; path=/; expires=${newDate.toUTCString()};`;

            localStorage.removeItem('userId');
            loginState();
            setUserName('');
        }  

        const usermenuClick=(e)=>{
            e.preventDefault();
            if(usermenu===false){
                setUsermenu(true);
                if(usermenu===true){
                    setUsermenu(false);
                }
            }
            else {
                setUsermenu(false);  
            }
        }

        return (
            <div id='mainWrap'>
                <header id='header'>
    
                    <div className='container'>
                        <div className='gap'>
                            <div className='wrap'>
    
                                <div className='logo-box'>
                                    <a href="#!"><img src="./images/logo_txt.png" alt="logo" /></a>
                                </div>
    
                                <div className='search-box'>
                                    <label>
                                        <i class="fa fa-search"></i>
                                        <input type="search" placeholder='검색'/>
                                    </label>
                                </div>
    
                                <div className='nav-box'>
                                    <nav>
                                        <ul className='menu-list'>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn1"><i class="fa fa-home"/></a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn2"><i class="fa fa-paper-plane-o"/></a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn3"><i class="fa fa-plus-square-o"/></a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn4"><i class="fa fa-safari"/></a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn5"><i class="fa fa-heart-o"/></a>
                                            </li>
                                            <li className='menu-item'>
                                                <a href="#!" className="menu-btn6" onClick={usermenuClick}><i className='user-ico'/></a>
                                                {
                                                    usermenu &&
                                                    <div className='user-menu'>
                                                        <ul>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-user-circle-o"/><span>프로필</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-bookmark-o"/><span>저장됨</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-moon-o"/><span>모드 전환</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-cog"/><span>설정</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-commenting-o"/><span>문제 신고</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!"><i class="fa fa-exchange"/><span>계정 전환</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="logout-btn" onClick={logoutClick}><span>로그아웃</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </header>
                
                
                <main id='main'>
                    <div className='container'>
                        <div className='gap'>
                            <div className='wrap'>
                                <section>
    
                                    <div className='story-box'>
                                        <div className='story-feed'>
                                            <ul className='story-list'>
                                                <li className='story'></li>
                                            </ul>
                                        </div>
                                    </div>
    
                                    <div className='post-box'>
                                        <div className='post-feed'>
                                            <ul className='post-list'>
                                                <li className='post'>
                                                    <div className='top'></div>
                                                    <div className='center'></div>
                                                    <div className='bottom'></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
    
                                </section>
    
                                <aside>
                                    <div className='login-info'>
                                        <a href="#!"><img src="./images/img02.jpg" alt="info" /></a>
                                        <a href="#!"><p className='login-name'>{userName}</p><p className='login-txt'>test</p></a>
                                        <a href="#!"><button>전환</button></a>
                                    </div>
    
                                    <div className='recommend-box'>
    
                                        <div className='recommend-more'>
                                            <p>회원님을 위한 추천</p>
                                            <button>모두 보기</button>
                                        </div>
    
                                        <ul className='recommend-list'>
                                            <li className='recommend-user'>
                                                <a href="#!"><img src="./images/img03.jpg" alt="info" /></a>
                                                <a href="#!"><p className='recommend-name'>test</p><p className='recommend-txt'>test</p></a>
                                                <a href="#!"><button>팔로우</button></a>
                                            </li>
                                        </ul>
                                    </div>
    
                                    <div className='footer'>
                                        <ul className='footer-list'>
                                            <li className='footer-item'><a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">소개</a></li>
                                            <li className='footer-item'><a href="https://help.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">도움말</a></li>
                                            <li className='footer-item'><a href="https://about.instagram.com/blog/" rel="nofollow noopener noreferrer" target="_blank">홍보 센터</a></li>
                                            <li className='footer-item'><a href="https://developers.facebook.com/docs/instagram" rel="nofollow noopener noreferrer" target="_blank">API</a></li>
                                            <li className='footer-item'><a href="https://www.instagram.com/about/jobs/" rel="nofollow noopener noreferrer" target="_blank">채용 정보</a></li>
                                            <li className='footer-item'><a href="https://www.instagram.com/legal/privacy/" rel="nofollow noopener noreferrer" target="_blank">개인정보처리방침</a></li>
                                            <li className='footer-item'><a href="https://www.instagram.com/legal/terms/" rel="nofollow noopener noreferrer" target="_blank">약관</a></li>
                                            <li className='footer-item'><a href="https://www.instagram.com/explore/locations/" rel="nofollow noopener noreferrer" target="_blank">위치</a></li>
                                            <li className='footer-item'><a href="#!" rel="nofollow noopener noreferrer" target="_blank">언어</a></li>
                                        </ul>
    
                                        <span>© 2022 Instagram from Meta</span>
                                    </div>
    
                                </aside>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    };



ReactDOM.render(
  <WrapComponent />,
  document.getElementById('root')
);


