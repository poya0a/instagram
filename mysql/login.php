<?
include_once('./header.php');

$idValue = $_POST['idValue'];
$pwValue = $_POST['pwValue'];

$sql = "SELECT * FROM instagram WHERE usernumber='$idValue' AND userpw='$pwValue'";
$result = mysqli_query($conn,$sql);

if( mysqli_num_rows($result) > 0){
  $row = mysqli_fetch_array($result);

  session_start();
  $session_id = session_id();

  $json_data = '{"sessionId":"'.$session_id.'", "id":"'.$row['userid'].'", "name":"'.$row['username'].'"}';
}

echo $json_data;

include_once('./footer.php');
?>