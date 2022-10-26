<?
include_once('./header.php');

$idValue = '01075037095';
$pwValue = 'wndms0818!';

$sql = "SELECT * FROM instagram WHERE userid='$idValue' AND userpw='$pwValue'";
$result = mysqli_query($conn,$sql);

if( mysqli_num_rows($result) > 0){
  $row = mysqli_fetch_array($result);

  session_start();
  $session_id = session_id();

  $json_data = '{"session":"'.$session_id.'", "id":"'.$row['userid'].'", "name":"'.$row['username'].'"}';
}

echo $json_data;

include_once('./footer.php');
?>