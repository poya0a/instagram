<?PHP

include_once('./header.php');

$sql = "CREATE TABLE IF NOT EXISTS instagram (
  idx          INT(11)      NOT NULL AUTO_INCREMENT COMMENT '자동증가 고유번호',
  usernumber   VARCHAR(50)  NOT NULL                COMMENT '휴대폰 번호 또는 이메일 주소',
  username     VARCHAR(50)  NOT NULL                COMMENT '성명',
  userid       VARCHAR(20)  NOT NULL                COMMENT '사용자 이름',
  userpw       VARCHAR(20)  NOT NULL                COMMENT '비밀번호',
  userdate     DATE         NOT NULL                COMMENT '가입일',
  PRIMARY KEY (idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COMMENT='인스타그램 회원 가입 테이블'";

$result = mysqli_query($conn, $sql);

if(!$result){
  die('테이블 생성 실패');
}

else{
  echo('테이블 생성 성공');
}

include_once('./footer.php');

?>
