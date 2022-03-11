<?php    

    include 'basedatos.php';

    if(!$myconn){
        echo "Error en la conexión a BBDD<br>"; 
    }else{

        $nick= $_POST["nick"];
        $name= $_POST["nombre"];
        $mail = $_POST["email"];
        $pass = $_POST["password"];
        $conf = $_POST["passconf"];


        $query="INSERT into usuarios(nick,name,email,passwd) VALUES ('".$_POST["nick"]."','".$_POST["nombre"]."','".$_POST["email"]."','".$_POST["password"]."');";
        $query=mysqli_query($myconn,$query);


    
        if(!$query){
            echo 'error';
        }else{
            if($pass == $conf){
                $uri = 'http://';
                $uri .= $_SERVER['HTTP_HOST'];
                header('Location: '.$uri.'/Players-Portal-v2/login.php');
                exit;
            }else 
		  echo '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">';
		  echo '<link rel="stylesheet" href="assets/css/style.css">';
		  echo '<br>';
		  echo 'Error, la contraseñas eran distintas';
		  echo '<p> Volver a intertar registrarse, <a href= "signup.php"> Registrate</a></p>';
        
        }
        mysqli_close($myconn);

}
?>
